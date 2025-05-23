import React from 'react';
import { Link } from 'react-router-dom';
import { useSubscription } from '../hooks/useSubscription';
import { Lock } from 'lucide-react';

interface PremiumFeatureProps {
  children: React.ReactNode;
}

export function PremiumFeature({ children }: PremiumFeatureProps) {
  const { isPremium, loading } = useSubscription();

  if (loading) return null;

  if (!isPremium) {
    return (
      <div className="relative group">
        <div className="absolute inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center rounded-lg">
          <div className="text-center p-4">
            <Lock className="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">Premium Feature</p>
            <Link
              to="/pricing"
              className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Upgrade to unlock
            </Link>
          </div>
        </div>
        <div className="opacity-50 pointer-events-none">
          {children}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}