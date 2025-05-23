import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { PlusCircle, BookOpen, Calendar as CalendarIcon } from 'lucide-react';
import type { Mood } from '../components/MoodSelector';
import { DashboardStats } from '../components/DashboardStats';
import { ProgressChart } from '../components/ProgressChart';
import { JournalCheckboxes } from '../components/JournalCheckboxes';
import { DailyIdeas } from '../components/DailyIdeas';
import { TimeTracker } from '../components/TimeTracker';
import { useJournalStats } from '../hooks/useJournalStats';

interface JournalEntry {
  id: string;
  entry_number: number;
  date: string;
  mood: Mood;
  spiritual_goals: string;
  mental_goals: string;
  physical_goals: string;
  learnings: string;
  spiritual_completed: boolean;
  mental_completed: boolean;
  physical_completed: boolean;
  learnings_completed: boolean;
}

const moods: Record<Mood, string> = {
  happy: '😊',
  sad: '😢',
  angry: '😠',
  neutral: '😐',
  excited: '🤩',
  tired: '😴',
  anxious: '😰'
};

export default function Dashboard() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [username, setUsername] = useState<string>('');
  const { user } = useAuth();
  const stats = useJournalStats();

  useEffect(() => {
    if (user) {
      fetchEntries();
      fetchUsername();
    }
  }, [user]);

  const fetchUsername = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', user?.id)
      .single();

    if (!error && data) {
      setUsername(data.username);
    }
  };

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .order('date', { ascending: false });

    if (!error && data) {
      setEntries(data);
    }
  };

  const handleStatusChange = (entryId: string, newStatus: any) => {
    setEntries(entries.map(entry => 
      entry.id === entryId 
        ? { ...entry, ...newStatus }
        : entry
    ));
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {username}'s Journey
          </h1>
          <div className="flex gap-2">
            <Link
              to="/new-entry"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              New Entry
            </Link>
            <Link
              to="/calendar"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              <CalendarIcon className="w-5 h-5 mr-2" />
              Calendar
            </Link>
          </div>
        </div>

        <DashboardStats stats={{
          totalEntries: stats.totalEntries,
          streak: stats.streak,
          topMood: stats.topMood,
          completionRate: stats.completionRate
        }} />

        <ProgressChart data={stats.weeklyProgress} />
        
        <TimeTracker />
        
        <DailyIdeas />

        <div className="space-y-6">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" role="img" aria-label={entry.mood}>
                      {moods[entry.mood]}
                    </span>
                    <div>
                      <span className="text-sm text-gray-500">
                        {format(new Date(entry.date), 'MMMM d, yyyy')}
                      </span>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Entry #{entry.entry_number}
                      </h2>
                    </div>
                  </div>
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-indigo-600 mb-2">Spiritual</h3>
                    <p className="text-gray-600">{entry.spiritual_goals}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-purple-600 mb-2">Mental</h3>
                    <p className="text-gray-600">{entry.mental_goals}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-pink-600 mb-2">Physical</h3>
                    <p className="text-gray-600">{entry.physical_goals}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Today's Learnings</h3>
                  <p className="text-gray-600">{entry.learnings}</p>
                </div>

                <div className="mt-6 pt-4 border-t">
                  <JournalCheckboxes
                    entryId={entry.id}
                    initialStatus={{
                      spiritual_completed: entry.spiritual_completed,
                      mental_completed: entry.mental_completed,
                      physical_completed: entry.physical_completed,
                      learnings_completed: entry.learnings_completed
                    }}
                    onStatusChange={(newStatus) => handleStatusChange(entry.id, newStatus)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}