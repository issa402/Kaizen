/*
  # Add Daily Ideas Feature
  
  1. New Tables
    - `daily_ideas`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `content` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `date` (date)
  
  2. Security
    - Enable RLS
    - Add policies for CRUD operations
*/

CREATE TABLE daily_ideas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  date date DEFAULT CURRENT_DATE,
  CONSTRAINT same_day_edit CHECK (date = CURRENT_DATE)
);

ALTER TABLE daily_ideas ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own ideas"
  ON daily_ideas
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own ideas"
  ON daily_ideas
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id AND date = CURRENT_DATE);

CREATE POLICY "Users can update own ideas from today"
  ON daily_ideas
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id AND date = CURRENT_DATE);

CREATE POLICY "Users can delete own ideas from today"
  ON daily_ideas
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id AND date = CURRENT_DATE);

-- Update trigger
CREATE OR REPLACE FUNCTION update_daily_ideas_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_daily_ideas_timestamp
  BEFORE UPDATE ON daily_ideas
  FOR EACH ROW
  EXECUTE FUNCTION update_daily_ideas_updated_at();