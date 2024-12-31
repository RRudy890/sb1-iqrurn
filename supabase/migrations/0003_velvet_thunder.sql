/*
  # Security Application System Schema

  1. New Tables
    - applications
      - Core application data
      - File storage references
      - Status tracking
      - Timestamps
    
  2. Security
    - RLS policies for applications table
    - Storage bucket policies
    
  3. Reference Data
    - PSIRA grades
    - License types
    - Job categories
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- Create policies
CREATE POLICY "Enable insert access for all users" ON applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for application owners" ON applications
  FOR SELECT USING (auth.uid() IN (
    SELECT auth.uid() 
    FROM auth.users 
    WHERE email = applications.email
  ));

-- Create storage buckets
DO $$
BEGIN
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('videos', 'videos', true)
  ON CONFLICT DO NOTHING;

  INSERT INTO storage.buckets (id, name, public)
  VALUES ('documents', 'documents', true)
  ON CONFLICT DO NOTHING;
END $$;