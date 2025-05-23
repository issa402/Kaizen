/*
  # Add long-term goals tracking
  
  1. New Tables
    - `long_term_goals`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `goal` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. New Tables
    - `goal_history`
      - `id` (uuid, primary key)
      - `goal_id` (uuid, references long_term_goals)
      - `previous_goal` (text)
      - `created_at` (timestamptz)

  3. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

CREATE TABLE long_term_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  goal text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

CREATE TABLE goal_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id uuid REFERENCES long_term_goals(id) ON DELETE CASCADE NOT NULL,
  previous_goal text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE long_term_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE goal_history ENABLE ROW LEVEL SECURITY;

-- Policies for long_term_goals
CREATE POLICY "Users can view own goals"
  ON long_term_goals
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own goals"
  ON long_term_goals
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own goals"
  ON long_term_goals
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for goal_history
CREATE POLICY "Users can view own goal history"
  ON goal_history
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM long_term_goals 
    WHERE id = goal_history.goal_id 
    AND user_id = auth.uid()
  ));

-- Trigger to track goal history
CREATE OR REPLACE FUNCTION track_goal_history()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.goal IS DISTINCT FROM NEW.goal THEN
    INSERT INTO goal_history (goal_id, previous_goal)
    VALUES (OLD.id, OLD.goal);
  END IF;
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER track_goal_changes
  BEFORE UPDATE ON long_term_goals
  FOR EACH ROW
  EXECUTE FUNCTION track_goal_history();