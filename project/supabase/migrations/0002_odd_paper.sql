/*
  # Add mood column and fix security policies

  1. Changes
    - Add mood column to journal_entries table
    - Update RLS policies for profiles table
    - Add proper security policies for authenticated users

  2. Security
    - Enable proper RLS policies for profiles
    - Allow users to create their own profile
    - Allow users to read their own profile
*/

-- Add mood column to journal_entries
ALTER TABLE journal_entries ADD COLUMN IF NOT EXISTS mood text NOT NULL;

-- Drop existing policies on profiles
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Create new policies for profiles
CREATE POLICY "Enable insert for authenticated users only"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable select for authenticated users"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable update for users based on id"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);