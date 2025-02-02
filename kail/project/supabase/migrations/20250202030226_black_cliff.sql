-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view own ideas" ON daily_ideas;
DROP POLICY IF EXISTS "Users can create own ideas" ON daily_ideas;
DROP POLICY IF EXISTS "Users can update own ideas from today" ON daily_ideas;
DROP POLICY IF EXISTS "Users can delete own ideas from today" ON daily_ideas;

-- Recreate policies with proper checks
CREATE POLICY "enable_select_for_users"
  ON daily_ideas
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "enable_insert_for_users"
  ON daily_ideas
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id 
    AND date = CURRENT_DATE
  );

CREATE POLICY "enable_update_for_users"
  ON daily_ideas
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = user_id 
    AND date = CURRENT_DATE
  );

CREATE POLICY "enable_delete_for_users"
  ON daily_ideas
  FOR DELETE
  TO authenticated
  USING (
    auth.uid() = user_id 
    AND date = CURRENT_DATE
  );