/*
  # Fix column names to match application code

  1. Changes
    - Rename business_competency to businessCompetency
    - Add missing columns
    - Update column types
  
  2. Security
    - Maintain existing RLS policies
*/

-- Rename columns to match application code
ALTER TABLE applications 
  RENAME COLUMN business_competency TO "businessCompetency";

-- Update types definition
ALTER TABLE applications
  ALTER COLUMN "businessCompetency" TYPE text,
  ALTER COLUMN "businessCompetency" SET NOT NULL;