/*
  # IRIS Profile System

  Creates the database structure for IRIS profile updates including salary and business income tracking.

  ## New Tables
  
  1. `iris_submissions`
    - `id` (uuid, primary key)
    - `user_id` (uuid, references auth.users)
    - `submission_type` (text) - 'salary' or 'business'
    - `status` (text) - 'pending', 'in_progress', 'completed', 'rejected'
    - `payment_status` (text) - 'unpaid', 'paid'
    - `amount` (integer) - service fee amount
    - `completion_time` (text) - estimated completion time
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)

  2. `iris_salary_details`
    - `id` (uuid, primary key)
    - `submission_id` (uuid, references iris_submissions)
    - `email` (text)
    - `mobile` (text)
    - `present_address` (text)
    - `fbr_iris_registration_id` (text)
    - `fbr_iris_pin` (text)
    - `fbr_iris_password` (text)
    - `bank_name` (text)
    - `iban` (text)
    - `employer_name` (text)
    - `monthly_salary` (numeric)
    - `tax_deducted` (numeric)
    - `created_at` (timestamptz)

  3. `iris_additional_info`
    - `id` (uuid, primary key)
    - `submission_id` (uuid, references iris_submissions)
    - `has_property` (boolean)
    - `property_details` (text)
    - `has_vehicle` (boolean)
    - `vehicle_details` (text)
    - `has_other_income` (boolean)
    - `other_income_details` (text)
    - `created_at` (timestamptz)

  ## Security
  
  - Enable RLS on all tables
  - Users can only access their own submissions
  - Authenticated users can create new submissions
  - Users can view and update their own submission details
*/

-- Create iris_submissions table
CREATE TABLE IF NOT EXISTS iris_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  submission_type text NOT NULL CHECK (submission_type IN ('salary', 'business')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'rejected')),
  payment_status text NOT NULL DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid')),
  amount integer NOT NULL,
  completion_time text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create iris_salary_details table
CREATE TABLE IF NOT EXISTS iris_salary_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid REFERENCES iris_submissions(id) ON DELETE CASCADE NOT NULL,
  email text NOT NULL,
  mobile text NOT NULL,
  present_address text NOT NULL,
  fbr_iris_registration_id text NOT NULL,
  fbr_iris_pin text NOT NULL,
  fbr_iris_password text NOT NULL,
  bank_name text NOT NULL,
  iban text NOT NULL,
  employer_name text,
  monthly_salary numeric,
  tax_deducted numeric,
  created_at timestamptz DEFAULT now()
);

-- Create iris_additional_info table
CREATE TABLE IF NOT EXISTS iris_additional_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid REFERENCES iris_submissions(id) ON DELETE CASCADE NOT NULL,
  has_property boolean DEFAULT false,
  property_details text,
  has_vehicle boolean DEFAULT false,
  vehicle_details text,
  has_other_income boolean DEFAULT false,
  other_income_details text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE iris_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE iris_salary_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE iris_additional_info ENABLE ROW LEVEL SECURITY;

-- RLS Policies for iris_submissions
CREATE POLICY "Users can view own submissions"
  ON iris_submissions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own submissions"
  ON iris_submissions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own submissions"
  ON iris_submissions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for iris_salary_details
CREATE POLICY "Users can view own salary details"
  ON iris_salary_details FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM iris_submissions
      WHERE iris_submissions.id = iris_salary_details.submission_id
      AND iris_submissions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own salary details"
  ON iris_salary_details FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM iris_submissions
      WHERE iris_submissions.id = iris_salary_details.submission_id
      AND iris_submissions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own salary details"
  ON iris_salary_details FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM iris_submissions
      WHERE iris_submissions.id = iris_salary_details.submission_id
      AND iris_submissions.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM iris_submissions
      WHERE iris_submissions.id = iris_salary_details.submission_id
      AND iris_submissions.user_id = auth.uid()
    )
  );

-- RLS Policies for iris_additional_info
CREATE POLICY "Users can view own additional info"
  ON iris_additional_info FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM iris_submissions
      WHERE iris_submissions.id = iris_additional_info.submission_id
      AND iris_submissions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own additional info"
  ON iris_additional_info FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM iris_submissions
      WHERE iris_submissions.id = iris_additional_info.submission_id
      AND iris_submissions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own additional info"
  ON iris_additional_info FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM iris_submissions
      WHERE iris_submissions.id = iris_additional_info.submission_id
      AND iris_submissions.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM iris_submissions
      WHERE iris_submissions.id = iris_additional_info.submission_id
      AND iris_submissions.user_id = auth.uid()
    )
  );

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_iris_submissions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_iris_submissions_updated_at
  BEFORE UPDATE ON iris_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_iris_submissions_updated_at();
