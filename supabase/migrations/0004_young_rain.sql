/*
  # Fix RLS policies for applications and storage

  1. Changes
    - Update applications table RLS policies to allow authenticated users to insert
    - Update storage bucket policies to allow authenticated users to upload files
    - Add policies for public access to uploaded files
  
  2. Security
    - Ensure only authenticated users can submit applications
    - Allow public access to uploaded files
    - Maintain user data privacy
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can insert applications" ON applications;
DROP POLICY IF EXISTS "Enable insert access for all users" ON applications;
DROP POLICY IF EXISTS "Users can read own applications" ON applications;
DROP POLICY IF EXISTS "Enable read access for application owners" ON applications;

-- Applications table policies
CREATE POLICY "Authenticated users can insert applications"
  ON applications
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read own applications"
  ON applications
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (
    SELECT auth.uid() 
    FROM auth.users 
    WHERE email = applications.email
  ));

-- Storage policies for videos bucket
DROP POLICY IF EXISTS "Anyone can upload videos" ON storage.objects;
CREATE POLICY "Authenticated users can upload videos"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'videos');

CREATE POLICY "Public can read videos"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'videos');

-- Storage policies for documents bucket
CREATE POLICY "Authenticated users can upload documents"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'documents');

CREATE POLICY "Public can read documents"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'documents');