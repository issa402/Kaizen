/*
  # Fix goal history policies and ensure unique subscription policies

  1. Changes
    - Add goal history insert policy if it doesn't exist
    - Add subscription policies only if they don't exist
    - Add default subscriptions for existing users
*/

-- Add goal history insert policy if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'goal_history_insert_policy'
    AND tablename = 'goal_history'
  ) THEN
    CREATE POLICY "goal_history_insert_policy"
      ON goal_history
      FOR INSERT
      TO authenticated
      WITH CHECK (EXISTS (
        SELECT 1 FROM long_term_goals 
        WHERE id = goal_history.goal_id 
        AND user_id = auth.uid()
      ));
  END IF;
END $$;

-- Add subscription policies if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'subscription_select_policy'
    AND tablename = 'subscriptions'
  ) THEN
    CREATE POLICY "subscription_select_policy"
      ON subscriptions
      FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'subscription_insert_policy'
    AND tablename = 'subscriptions'
  ) THEN
    CREATE POLICY "subscription_insert_policy"
      ON subscriptions
      FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'subscription_update_policy'
    AND tablename = 'subscriptions'
  ) THEN
    CREATE POLICY "subscription_update_policy"
      ON subscriptions
      FOR UPDATE
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- Create default subscriptions for existing users
INSERT INTO subscriptions (user_id, status, plan_id)
SELECT id, 'free', 'free'
FROM profiles p
WHERE NOT EXISTS (
  SELECT 1 FROM subscriptions s WHERE s.user_id = p.id
);