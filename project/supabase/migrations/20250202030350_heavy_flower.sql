/*
  # Add Time Tracking Feature

  1. New Tables
    - `time_tracking`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `activity` (text)
      - `start_time` (timestamptz)
      - `end_time` (timestamptz)
      - `status` (text) - 'planned' | 'in_progress' | 'completed'
      - `date` (date)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for CRUD operations
*/

CREATE TABLE time_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  activity text NOT NULL,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'planned' CHECK (status IN ('planned', 'in_progress', 'completed')),
  date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE time_tracking ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "enable_select_for_users"
  ON time_tracking
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "enable_insert_for_users"
  ON time_tracking
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "enable_update_for_users"
  ON time_tracking
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "enable_delete_for_users"
  ON time_tracking
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Update trigger
CREATE OR REPLACE FUNCTION update_time_tracking_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_time_tracking_timestamp
  BEFORE UPDATE ON time_tracking
  FOR EACH ROW
  EXECUTE FUNCTION update_time_tracking_updated_at();