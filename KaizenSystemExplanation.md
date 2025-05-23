# Kaizen Method Journal System - Comprehensive Explanation

This document provides a detailed explanation of the Kaizen Method Journal system, covering user management, WebSocket integration, TypeScript implementation, database schema relationships, and real-time dashboard data management.

## Table of Contents
1. [User Management](#user-management)
2. [Database Schema and Relationships](#database-schema-and-relationships)
3. [TypeScript Implementation](#typescript-implementation)
4. [WebSocket Integration](#websocket-integration)
5. [Real-time Dashboard Data Management](#real-time-dashboard-data-management)
6. [Component Architecture](#component-architecture)

## User Management

The Kaizen Method Journal implements a comprehensive user management system using Supabase for authentication and user data storage.

### Authentication Context

The system uses React Context API to manage authentication state throughout the application:

```typescript
// AuthContext.tsx
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Authentication state management
}
```

The `AuthProvider` component wraps the entire application, providing authentication state and methods to all components. It handles:

1. **User Session Management**: Automatically retrieves and maintains the user's session
2. **Sign In**: Authenticates users with email and password
3. **Sign Up**: Creates new user accounts and associated profiles
4. **Sign Out**: Terminates user sessions

### User Registration Flow

When a new user registers:

1. The system creates an authentication record in Supabase Auth
2. A corresponding profile record is created in the `profiles` table
3. Default subscription settings are established

```typescript
const signUp = async (email: string, password: string, username: string) => {
  try {
    // Create auth user
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } }
    });

    // Create user profile
    await createOrUpdateProfile(authData.user.id, username);
  } catch (error) {
    // Error handling
  }
};
```

### Profile Management

User profiles are stored in the `profiles` table, linked to the Supabase Auth users via the `id` field. This relationship ensures that user data remains consistent and accessible throughout the application.

## Database Schema and Relationships

The database schema is designed to support the journal application's features while maintaining data integrity and security.

### Core Tables

#### Profiles Table
```sql
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  username text UNIQUE,
  created_at timestamptz DEFAULT now()
);
```

The `profiles` table is the central entity that connects to all user-specific data. It has a one-to-one relationship with Supabase Auth users.

#### Journal Entries Table
```sql
CREATE TABLE journal_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  entry_number bigint NOT NULL,
  date date DEFAULT CURRENT_DATE,
  mood string,
  spiritual_goals text,
  mental_goals text,
  physical_goals text,
  learnings text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, entry_number)
);
```

Journal entries have a many-to-one relationship with profiles. Each entry belongs to a single user, and users can have multiple entries.

#### Time Tracking Table
```sql
CREATE TABLE time_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  activity text NOT NULL,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'planned',
  date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

The time tracking table allows users to plan and track activities, with real-time status updates.

#### Long-Term Goals Table
```sql
CREATE TABLE long_term_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  goal text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);
```

Long-term goals are tracked with a one-to-one relationship with user profiles.

#### Subscriptions Table
```sql
CREATE TABLE subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  status text NOT NULL DEFAULT 'free',
  plan_id text NOT NULL DEFAULT 'free',
  current_period_end timestamptz,
  cancel_at_period_end boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);
```

Subscriptions track user plan status with a one-to-one relationship with profiles.

### Row-Level Security (RLS)

All tables implement Row-Level Security to ensure users can only access their own data:

```sql
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own entries"
  ON journal_entries
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
```

This security model ensures that even if an API endpoint has a vulnerability, users cannot access data they don't own.

## TypeScript Implementation

The application uses TypeScript to provide type safety and improve developer experience.

### Database Types

The system uses TypeScript to define database types that match the Supabase schema:

```typescript
// database.types.ts
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          created_at: string
        }
        Insert: {
          id: string
          username: string
          created_at?: string
        }
        Update: {
          id?: string
          username?: string
          created_at?: string
        }
      }
      journal_entries: {
        Row: {
          id: string
          user_id: string
          entry_number: number
          date: string
          mood: string
          spiritual_goals: string | null
          mental_goals: string | null
          physical_goals: string | null
          learnings: string | null
          created_at: string
        }
        // Insert and Update types
      }
      // Other tables
    }
  }
}
```

These types ensure that database operations are type-safe, reducing runtime errors.

### React Component Types

Components use TypeScript interfaces to define props, ensuring proper data flow:

```typescript
// DashboardStats.tsx
interface Stats {
  totalEntries: number;
  streak: number;
  topMood: string;
  completionRate: number;
}

export function DashboardStats({ stats }: { stats: Stats }) {
  // Component implementation
}
```

### Custom Hooks

The application uses custom React hooks to encapsulate business logic and data fetching:

```typescript
// useJournalStats.ts
export function useJournalStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalEntries: 0,
    streak: 0,
    topMood: '',
    completionRate: 0,
    weeklyProgress: {
      spiritual: 0,
      mental: 0,
      physical: 0
    }
  });

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  // Implementation details
  
  return stats;
}
```

These hooks provide a clean separation of concerns and reusable functionality.

## WebSocket Integration

The application implements real-time updates using WebSockets to provide a responsive user experience.

### WebSocket Hook

A custom hook manages WebSocket connections:

```typescript
// websocket.ts
export function useWebSocket<T>(channel: string) {
  const [messages, setMessages] = useState<T[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: 'subscribe',
        channel: channel
      }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'broadcast' && data.event === 'news') {
        setMessages(prev => [...prev, data.payload]);
      }
    };

    return () => {
      ws.close();
    };
  }, [channel]);

  return messages;
}
```

This hook:
1. Establishes a WebSocket connection
2. Subscribes to a specific channel
3. Processes incoming messages
4. Cleans up the connection when the component unmounts

### Real-time Updates

Components can subscribe to real-time updates by using the WebSocket hook:

```typescript
const messages = useWebSocket<NewsItem>('news-channel');
```

This allows for immediate UI updates when data changes, without requiring manual refreshes.

## Real-time Dashboard Data Management

The dashboard displays real-time data through a combination of WebSockets, interval-based updates, and reactive state management.

### Time Tracker Component

The Time Tracker component demonstrates real-time updates with a countdown timer:

```typescript
// TimeTracker.tsx
useEffect(() => {
  const interval = setInterval(() => {
    const now = Date.now();
    const newRemainingTimes = entries.reduce((acc, entry) => {
      if (entry.status === 'in_progress') {
        const end = new Date(entry.end_time).getTime();
        acc[entry.id] = Math.max(0, end - now);
      } else if (entry.status === 'paused') {
        acc[entry.id] = remainingTimes[entry.id] || 0;
      }
      return acc;
    }, {} as { [key: string]: number });
    setRemainingTimes(newRemainingTimes);
  }, 1000);

  return () => clearInterval(interval);
}, [entries, remainingTimes]);
```

This effect:
1. Creates an interval that runs every second
2. Updates the remaining time for each active timer
3. Cleans up the interval when the component unmounts

### Journal Stats Hook

The `useJournalStats` hook fetches and processes journal data to provide dashboard statistics:

```typescript
// useJournalStats.ts
const fetchStats = async () => {
  try {
    const { data: entries } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', user?.id)
      .order('date', { ascending: false });
    
    // Process entries to calculate stats
    // Update state with calculated stats
  } catch (error) {
    // Error handling
  }
};
```

These stats are then displayed in various dashboard components.

### Subscription Updates

The subscription system uses a similar pattern to keep subscription status up-to-date:

```typescript
// useSubscription.ts
const fetchSubscription = async () => {
  try {
    // Fetch subscription data
    // Create default subscription if none exists
    // Update state with subscription data
  } catch (error) {
    // Error handling
  } finally {
    setLoading(false);
  }
};
```

## Component Architecture

The application follows a component-based architecture with clear separation of concerns.

### Dashboard Components

The Dashboard page combines multiple components to create a comprehensive view:

```typescript
// Dashboard.tsx
return (
  <div className="min-h-screen p-6">
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      
      <DashboardStats stats={{
        totalEntries: stats.totalEntries,
        streak: stats.streak,
        topMood: stats.topMood,
        completionRate: stats.completionRate
      }} />

      <ProgressChart data={stats.weeklyProgress} />
      
      <TimeTracker />
      
      <DailyIdeas />
      
      {/* Journal entries list */}
    </div>
  </div>
);
```

Each component is responsible for a specific feature:

1. **DashboardStats**: Displays key metrics in card format
2. **ProgressChart**: Visualizes weekly progress in different areas
3. **TimeTracker**: Manages time-based activities with real-time updates
4. **DailyIdeas**: Captures and displays daily thoughts and ideas

### Data Flow

Data flows through the application in a predictable pattern:

1. **Authentication Context**: Provides user information
2. **Custom Hooks**: Fetch and process data from the database
3. **Component Props**: Pass data to components
4. **Component State**: Manages local UI state
5. **WebSockets/Intervals**: Update data in real-time

This architecture ensures that components remain focused on their specific responsibilities while maintaining a consistent data flow throughout the application.

---

This comprehensive explanation covers the key aspects of the Kaizen Method Journal system, from user management to real-time data updates. The system combines modern web technologies to create a responsive, secure, and feature-rich journaling application.
