import { loadStripe } from '@stripe/stripe-js';
import { supabase } from '../lib/supabase';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export async function createCheckoutSession(priceId: string): Promise<void> {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw new Error('Authentication error');
    if (!user) throw new Error('User not authenticated');

    // Call the Stripe checkout function directly
    const response = await fetch('https://bhrtzvhujqfwoznxidqu.functions.supabase.co/stripe-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        priceId,
        userId: user.id,
        customerEmail: user.email,
        returnUrl: `${window.location.origin}/dashboard`,
        cancelUrl: `${window.location.origin}/pricing`
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create checkout session');
    }

    const { sessionId } = await response.json();
    if (!sessionId) throw new Error('No session ID returned');

    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to load');

    const { error: redirectError } = await stripe.redirectToCheckout({ sessionId });
    if (redirectError) throw redirectError;

  } catch (error) {
    console.error('Payment error:', error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred during payment processing'
    );
  }
}