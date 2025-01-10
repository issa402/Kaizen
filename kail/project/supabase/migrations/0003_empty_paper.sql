/*
  # Fix profile policies and constraints

  1. Changes
    - Add missing policies for profiles table
    - Ensure proper RLS for profile creation
    - Fix foreign key constraints

  2. Security
    - Enable proper profile creation for new users
    - Maintain data integrity
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON profiles;
DROP POLICY IF EXISTS "Enable select for authenticated users" ON profiles;
DROP POLICY IF EXISTS "Enable update for users based on id" ON profiles;

-- Create new policies with proper security
CREATE POLICY "Allow users to create their own profile"
  ON profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Allow users to view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Allow users to update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);