export interface PlanFeature {
  title: string;
  description: string;
  included: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: PlanFeature[];
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Basic',
    price: 0,
    interval: 'month',
    features: [
      { title: 'Daily Journal Entry', description: 'One journal entry per day', included: true },
      { title: 'Basic Analytics', description: 'Simple mood tracking', included: true },
      { title: 'Last 7 Days History', description: 'Access to recent entries', included: true },
      { title: 'Basic Inspiration Feed', description: 'Daily quotes and stories', included: true },
      { title: 'AI Insights', description: 'Advanced pattern analysis', included: false },
      { title: 'Unlimited History', description: 'Access all past entries', included: false },
      { title: 'Multiple Entries Per Day', description: 'Track your entire day', included: false },
      { title: 'Premium Content', description: 'Exclusive inspiration content', included: false }
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 9.99,
    interval: 'month',
    features: [
      { title: 'Daily Journal Entry', description: 'One journal entry per day', included: true },
      { title: 'Basic Analytics', description: 'Simple mood tracking', included: true },
      { title: 'Last 7 Days History', description: 'Access to recent entries', included: true },
      { title: 'Basic Inspiration Feed', description: 'Daily quotes and stories', included: true },
      { title: 'AI Insights', description: 'Advanced pattern analysis', included: true },
      { title: 'Unlimited History', description: 'Access all past entries', included: true },
      { title: 'Multiple Entries Per Day', description: 'Track your entire day', included: true },
      { title: 'Premium Content', description: 'Exclusive inspiration content', included: true }
    ]
  }
];