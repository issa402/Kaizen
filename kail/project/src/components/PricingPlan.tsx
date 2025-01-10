import React from 'react';
import { Check, X } from 'lucide-react';

interface PlanFeature {
  title: string;
  included: boolean;
}

interface PricingPlanProps {
  id: string;
  name: string;
  price: number;
  stripeId: string;
  features: PlanFeature[];
  isPremium: boolean;
  loading: boolean;
  onSubscribe: (planId: string, stripeId: string) => void;
}

export function PricingPlan({
  id,
  name,
  price,
  stripeId,
  features,
  isPremium,
  loading,
  onSubscribe
}: PricingPlanProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 ${
        id === 'premium' ? 'border-indigo-500' : 'border-transparent'
      }`}
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{name}</h2>
        <div className="mb-6">
          <span className="text-4xl font-bold">${price}</span>
          <span className="text-gray-600">/month</span>
        </div>

        <button
          onClick={() => onSubscribe(id, stripeId)}
          disabled={loading || (isPremium && id === 'premium')}
          className={`w-full py-3 px-6 rounded-lg font-medium ${
            id === 'premium'
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
          } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading
            ? 'Processing...'
            : isPremium && id === 'premium'
            ? 'Current Plan'
            : id === 'free'
            ? 'Current Plan'
            : 'Subscribe Now'}
        </button>
      </div>

      <div className="p-6 bg-gray-50 space-y-4">
        <h3 className="font-semibold text-gray-900 mb-4">Features</h3>
        {features.map((feature) => (
          <div key={feature.title} className="flex items-start gap-3">
            {feature.included ? (
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
            ) : (
              <X className="w-5 h-5 text-gray-400 flex-shrink-0" />
            )}
            <span className={feature.included ? 'text-gray-900' : 'text-gray-500'}>
              {feature.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}