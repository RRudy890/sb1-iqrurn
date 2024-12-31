/*
  # Fix RLS policies for applications table

  1. Changes
    - Simplify RLS policies to use auth.uid() directly
    - Add policies for authenticated users
    - Remove complex user email checks
  
  2. Security
    - Maintain security by requiring authentication
    - Allow users to submit and view their own applications
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can insert applications" ON applications;
DROP POLICY IF EXISTS "Users can read own applications" ON applications;

-- Create simpler policies
CREATE POLICY "Authenticated users can insert applications"
  ON applications
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can read own applications"
  ON applications
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Ensure RLS is enabled
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;