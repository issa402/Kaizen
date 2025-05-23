import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export interface Subscription {
  status: string;
  planId: string;
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd: boolean;
}

export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSubscription();
    }
  }, [user]);

  const fetchSubscription = async () => {
    try {
      // First ensure user has a subscription record
      const { data: existingSub } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (!existingSub) {
        // Create default subscription if none exists
        const { data: newSub, error: insertError } = await supabase
          .from('subscriptions')
          .insert([{
            user_id: user?.id,
            status: 'free',
            plan_id: 'free'
          }])
          .select()
          .single();

        if (insertError) throw insertError;
        if (newSub) {
          setSubscription({
            status: newSub.status,
            planId: newSub.plan_id,
            currentPeriodEnd: newSub.current_period_end ? new Date(newSub.current_period_end) : null,
            cancelAtPeriodEnd: newSub.cancel_at_period_end
          });
        }
      } else {
        setSubscription({
          status: existingSub.status,
          planId: existingSub.plan_id,
          currentPeriodEnd: existingSub.current_period_end ? new Date(existingSub.current_period_end) : null,
          cancelAtPeriodEnd: existingSub.cancel_at_period_end
        });
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const isPremium = subscription?.status === 'active' && subscription?.planId === 'premium';

  return {
    subscription,
    loading,
    isPremium
  };
}