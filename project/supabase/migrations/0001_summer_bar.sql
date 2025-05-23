/*
  # Initial Schema Setup for Kaizen Method Journal

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key) - References auth.users
      - `username` (text)
      - `created_at` (timestamp)
    - `journal_entries`
      - `id` (uuid, primary key)
      - `user_id` (uuid) - References profiles
      - `entry_number` (bigint)
      - `date` (date)
      - `spiritual_goals` (text)
      - `mental_goals` (text)
      - `physical_goals` (text)
      - `learnings` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  username text UNIQUE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create journal entries table
CREATE TABLE journal_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  entry_number bigint NOT NULL,
  date date DEFAULT CURRENT_DATE,
  spiritual_goals text,
  mental_goals text,
  physical_goals text,
  learnings text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, entry_number)
);

ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own entries"
  ON journal_entries
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own entries"
  ON journal_entries
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own entries"
  ON journal_entries
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to auto-increment entry number per user
CREATE OR REPLACE FUNCTION generate_entry_number()
RETURNS TRIGGER AS $$
BEGIN
  SELECT COALESCE(MAX(entry_number), 0) + 1
  INTO NEW.entry_number
  FROM journal_entries
  WHERE user_id = NEW.user_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_entry_number
  BEFORE INSERT ON journal_entries
  FOR EACH ROW
  EXECUTE FUNCTION generate_entry_number();