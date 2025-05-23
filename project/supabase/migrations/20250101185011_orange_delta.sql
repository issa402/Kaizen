-- Drop existing subscription policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view own subscription" ON subscriptions;
DROP POLICY IF EXISTS "Users can insert own subscription" ON subscriptions;
DROP POLICY IF EXISTS "Users can update own subscription" ON subscriptions;

-- Recreate subscription policies with proper names
CREATE POLICY "subscription_select_policy"
  ON subscriptions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "subscription_insert_policy"
  ON subscriptions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "subscription_update_policy"
  ON subscriptions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Add missing policy for goal_history
CREATE POLICY "goal_history_update_policy"
  ON goal_history
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM long_term_goals 
    WHERE id = goal_history.goal_id 
    AND user_id = auth.uid()
  ));