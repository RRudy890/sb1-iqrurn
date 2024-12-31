/*
  # Add form submission rules and tracking

  1. New Tables
    - `submission_tracking`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `last_submission` (timestamptz)
      - `next_allowed_submission` (timestamptz)
      - `submission_count` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on new table
    - Add policies for authenticated users
*/

-- Create submission tracking table
CREATE TABLE submission_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  last_submission timestamptz,
  next_allowed_submission timestamptz,
  submission_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE submission_tracking ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own submission tracking"
  ON submission_tracking
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert submission tracking"
  ON submission_tracking
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "System can update submission tracking"
  ON submission_tracking
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to update submission tracking
CREATE OR REPLACE FUNCTION update_submission_tracking()
RETURNS TRIGGER AS $$
BEGIN
  -- Update or create submission tracking record
  INSERT INTO submission_tracking (user_id, last_submission, next_allowed_submission, submission_count)
  VALUES (
    auth.uid(),
    now(),
    now() + INTERVAL '60 days',
    1
  )
  ON CONFLICT (user_id) DO UPDATE
  SET 
    last_submission = now(),
    next_allowed_submission = now() + INTERVAL '60 days',
    submission_count = submission_tracking.submission_count + 1,
    updated_at = now();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for applications table
CREATE TRIGGER update_submission_tracking_on_application
  AFTER INSERT ON applications
  FOR EACH ROW
  EXECUTE FUNCTION update_submission_tracking();

-- Add unique constraint to prevent multiple tracking records per user
ALTER TABLE submission_tracking
  ADD CONSTRAINT unique_user_tracking UNIQUE (user_id);