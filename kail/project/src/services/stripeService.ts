import { loadStripe } from '@stripe/stripe-js';
import { supabase } from '../lib/supabase';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export async function createCheckoutSession(priceId: string): Promise<void> {
  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw new Error('Authentication error');
    if (!user) throw new Error('User not authenticated');

    // Call Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('create-checkout-session', {
      body: {
        priceId,
        userId: user.id,
        customerEmail: user.email,
        returnUrl: `${window.location.origin}/dashboard`,
        cancelUrl: `${window.location.origin}/pricing`,
      }
    });

    if (error) throw new Error(error.message);
    if (!data?.sessionId) throw new Error('No session ID returned');

    // Load Stripe
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to load');

    // Redirect to checkout
    const { error: redirectError } = await stripe.redirectToCheckout({ 
      sessionId: data.sessionId 
    });
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