/*
  # Job Categories Schema

  1. New Tables
    - job_categories: Stores different security job positions
    - job_requirements: Stores specific requirements for each job category
    - psira_grades: Reference table for PSIRA grades
    - license_types: Reference table for driver's license types
    
  2. Security
    - RLS policies for reading job data
    - References to applications table
*/

-- Create reference tables
CREATE TABLE psira_grades (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE license_types (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create job categories table
CREATE TABLE job_categories (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text,
  min_psira_grade text REFERENCES psira_grades(id),
  requires_drivers_license boolean DEFAULT false,
  requires_business_competency boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE psira_grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE license_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_categories ENABLE ROW LEVEL SECURITY;

-- Create policies for reading data
CREATE POLICY "Allow public read access to psira_grades"
  ON psira_grades
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to license_types"
  ON license_types
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to job_categories"
  ON job_categories
  FOR SELECT
  TO anon
  USING (true);

-- Insert initial data
INSERT INTO psira_grades (id, name, description) VALUES
  ('A', 'Grade A', 'Top level security officer qualification'),
  ('B', 'Grade B', 'Advanced security officer qualification'),
  ('C', 'Grade C', 'Intermediate security officer qualification'),
  ('D', 'Grade D', 'Basic security officer qualification'),
  ('E', 'Grade E', 'Entry level security officer qualification');

INSERT INTO license_types (id, name, description) VALUES
  ('A', 'Code A', 'Motorcycle'),
  ('A1', 'Code A1', 'Light motorcycle'),
  ('B', 'Code B', 'Light motor vehicle'),
  ('C', 'Code C', 'Heavy motor vehicle'),
  ('C1', 'Code C1', 'Light heavy motor vehicle'),
  ('EC', 'Code EC', 'Extra heavy motor vehicle'),
  ('NONE', 'No License', 'No driver''s license required');

INSERT INTO job_categories (id, name, description, min_psira_grade, requires_drivers_license, requires_business_competency) VALUES
  ('unarmed-guard', 'Unarmed Guard', 'Basic security guard duties without firearms', 'D', true, false),
  ('armed-guard', 'Armed Guard', 'Armed security guard for enhanced protection', 'C', true, false),
  ('armed-response', 'Armed Response Officer', 'Rapid response to security incidents', 'C', true, true),
  ('control-room', 'Control Room Operator', 'Monitoring and coordinating security operations', 'C', false, true),
  ('cash-transit', 'Cash-in-Transit Officer', 'Secure transportation of valuable items', 'B', true, true),
  ('close-protection', 'Close Protection Officer', 'Personal security and VIP protection', 'A', true, true),
  ('k9-handler', 'K9 Handler', 'Security operations with trained dogs', 'C', true, false),
  ('drone-operator', 'Drone Operator', 'Aerial surveillance and monitoring', 'C', false, true),
  ('cctv-tech', 'CCTV Technician', 'Installation and maintenance of surveillance systems', 'C', true, true),
  ('alarm-tech', 'Alarm Technician', 'Installation and maintenance of alarm systems', 'C', true, true),
  ('cctv-alarm-tech', 'CCTV and Alarm Technician', 'Comprehensive security system specialist', 'B', true, true),
  ('operations-manager', 'Operations Manager', 'Management of security operations', 'A', true, true),
  ('control-room-manager', 'Control Room Manager', 'Management of control room operations', 'B', false, true);

-- Add foreign key to applications table for job category
ALTER TABLE applications
ADD CONSTRAINT fk_job_category
FOREIGN KEY (position)
REFERENCES job_categories(id);