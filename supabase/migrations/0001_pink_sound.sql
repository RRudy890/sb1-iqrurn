/*
  # Initial Schema Setup for Security Recruiter

  1. New Tables
    - applications
      - Core application information
      - File storage references
      - Application status tracking
    
  2. Storage
    - videos bucket for introduction videos
    - documents bucket for CVs/resumes
    
  3. Security
    - RLS policies for application submissions
    - Storage bucket policies
*/

-- Create applications table
CREATE TABLE applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  street text NOT NULL,
  suburb text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  psira_grade text NOT NULL,
  psira_expiry date NOT NULL,
  drivers_license text NOT NULL,
  business_competency text NOT NULL,
  position text NOT NULL,
  video_url text,
  cv_url text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting applications
CREATE POLICY "Anyone can insert applications"
  ON applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy for users to read their own applications
CREATE POLICY "Users can read own applications"
  ON applications
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (
    SELECT auth.uid() 
    FROM auth.users 
    WHERE email = applications.email
  ));

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('videos', 'videos', true);

INSERT INTO storage.buckets (id, name, public) 
VALUES ('documents', 'documents', true);

-- Set up storage policies
CREATE POLICY "Anyone can upload videos"
  ON storage.objects
  FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'videos');

CREATE POLICY "Anyone can upload documents"
  ON storage.objects
  FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'documents');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update updated_at
CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();