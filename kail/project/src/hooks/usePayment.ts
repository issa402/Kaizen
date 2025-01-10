import { useState } from 'react';
import { createCheckoutSession } from '../services/stripeService';

export function usePayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processPayment = async (priceId: string) => {
    setLoading(true);
    setError(null);

    try {
      await createCheckoutSession(priceId);
    } catch (err) {
      setError(
        err instanceof Error 
          ? err.message 
          : 'Failed to process payment. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    processPayment,
    loading,
    error,
    clearError: () => setError(null)
  };
}