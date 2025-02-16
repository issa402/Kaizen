import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../hooks/useSubscription';
import { usePayment } from '../hooks/usePayment';
import { PricingPlan } from '../components/PricingPlan';

const SUBSCRIPTION_PLANS = [
  {
    id: 'free',
    name: 'Basic',
    price: 0,
    stripeId: '',
    features: [
      { title: 'Daily Journal Entry', included: true },
      { title: 'Basic Analytics', included: true },
      { title: 'Last 7 Days History', included: true },
      { title: 'Basic Inspiration Feed', included: true },
      { title: 'Long-term Goals', included: true },
      { title: 'Multiple Entries Per Day', included: false },
      { title: 'Unlimited History Access', included: false },
      { title: 'Premium Content', included: false }
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 4.99,
    stripeId: import.meta.env.VITE_STRIPE_PREMIUM_PRICE_ID,
    features: [
      { title: 'Daily Journal Entry', included: true },
      { title: 'Basic Analytics', included: true },
      { title: 'Last 7 Days History', included: true },
      { title: 'Basic Inspiration Feed', included: true },
      { title: 'Long-term Goals', included: true },
      { title: 'Multiple Entries Per Day', included: true },
      { title: 'Unlimited History Access', included: true },
      { title: 'Premium Content', included: true }
    ]
  }
];

export default function Pricing() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isPremium } = useSubscription();
  const { processPayment, loading, error, clearError } = usePayment();

  const handleSubscribe = async (planId: string, stripeId: string) => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (planId === 'free') {
      navigate('/dashboard');
      return;
    }

    try {
      await processPayment(stripeId);
    } catch (err) {
      console.error('Subscription error:', err);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CreditCard className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Choose Your Plan</h1>
          </div>
          <p className="text-xl text-gray-600">
            Unlock premium features to enhance your journaling experience
          </p>
        </div>

        {error && (
          <div className="max-w-md mx-auto mb-8">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <span className="block sm:inline">{error}</span>
              <button
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                onClick={clearError}
              >
                <span className="sr-only">Dismiss</span>
                <span className="text-2xl">&times;</span>
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <PricingPlan
              key={plan.id}
              {...plan}
              isPremium={isPremium}
              loading={loading}
              onSubscribe={handleSubscribe}
            />
          ))}
        </div>
      </div>
    </div>
  );
}