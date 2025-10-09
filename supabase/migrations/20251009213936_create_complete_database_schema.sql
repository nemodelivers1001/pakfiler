/*
  # Complete Database Schema for GST and IRIS Application System

  ## Overview
  Creates all necessary tables, functions, and policies for the complete application system

  ## New Tables
  
  ### 1. user_profiles
  - `id` (uuid, primary key) - References auth.users.id
  - `full_name` (text) - User's full name
  - `cnic_number` (text) - National ID number
  - `date_of_birth` (date) - Date of birth
  - `occupation` (text) - User occupation
  - `mobile_number` (text) - Contact number
  - `address` (text) - Residential address
  - `account_status` (text) - Account status (active/inactive)
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. gst_applications
  - `id` (uuid, primary key) - Unique identifier
  - `user_id` (uuid) - References user_profiles.id
  - `reference_number` (text) - Unique reference number
  - Business information fields
  - Contact and location details
  - Bank account information
  - `status` (text) - Application status
  - `payment_status` (text) - Payment status
  - Timestamps

  ### 3. application_timeline
  - `id` (uuid, primary key) - Unique identifier
  - `application_id` (uuid) - References gst_applications.id
  - `status` (text) - Status at this point
  - `notes` (text) - Additional notes
  - `created_at` (timestamptz) - When status changed

  ### 4. application_documents
  - `id` (uuid, primary key) - Unique identifier
  - `application_id` (uuid) - References gst_applications.id
  - `document_type` (text) - Type of document
  - `file_name` (text) - Original file name
  - `file_url` (text) - Storage path/URL
  - `file_size` (bigint) - File size in bytes
  - Timestamps

  ### 5. iris_submissions
  - `id` (uuid, primary key) - Unique identifier
  - `user_id` (uuid) - References user_profiles.id
  - `reference_number` (text) - Unique reference number
  - `submission_type` (text) - Type: 'salary' or 'business'
  - `status` (text) - Submission status
  - `payment_status` (text) - Payment status
  - `amount` (numeric) - Service amount
  - `completion_time` (text) - Expected completion time
  - Timestamps

  ### 6. iris_salary_details
  - `id` (uuid, primary key) - Unique identifier
  - `submission_id` (uuid) - References iris_submissions.id
  - Salary-specific fields (employer, salary, tax deducted, etc.)
  - Timestamps

  ### 7. iris_additional_info
  - `id` (uuid, primary key) - Unique identifier
  - `submission_id` (uuid) - References iris_submissions.id
  - Additional information fields (property, vehicle, other income)
  - Timestamps

  ### 8. iris_business_details
  - `id` (uuid, primary key) - Unique identifier
  - `submission_id` (uuid) - References iris_submissions.id
  - `businesses` (jsonb) - Array of business information
  - Timestamps

  ## Security
  - Enable RLS on all tables
  - Users can only access their own data
  - Proper authentication checks on all policies
  - Secure triggers for automatic profile creation

  ## Important Notes
  - All tables use UUID for primary keys
  - Automatic timestamp management
  - Cascading deletes where appropriate
  - Default values set for required fields
*/

-- ============================================================================
-- USER PROFILES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text DEFAULT '',
  cnic_number text DEFAULT '',
  date_of_birth date,
  occupation text DEFAULT '',
  mobile_number text DEFAULT '',
  address text DEFAULT '',
  account_status text DEFAULT 'active' NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_user_profiles_id ON user_profiles(id);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;

CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- ============================================================================
-- GST APPLICATIONS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS gst_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  reference_number text UNIQUE NOT NULL,
  business_name text DEFAULT '',
  business_type text DEFAULT '',
  business_nature text DEFAULT '',
  registration_date date,
  ntn_number text DEFAULT '',
  cnic_number text DEFAULT '',
  owner_name text DEFAULT '',
  contact_person text DEFAULT '',
  contact_number text DEFAULT '',
  email text DEFAULT '',
  business_address text DEFAULT '',
  city text DEFAULT '',
  province text DEFAULT '',
  bank_name text DEFAULT '',
  account_title text DEFAULT '',
  account_number text DEFAULT '',
  iban text DEFAULT '',
  status text DEFAULT 'draft' NOT NULL,
  payment_status text DEFAULT 'pending' NOT NULL,
  payment_method text DEFAULT '',
  payment_reference text DEFAULT '',
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_gst_applications_user_id ON gst_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_gst_applications_reference ON gst_applications(reference_number);

ALTER TABLE gst_applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own applications" ON gst_applications;
DROP POLICY IF EXISTS "Users can insert own applications" ON gst_applications;
DROP POLICY IF EXISTS "Users can update own applications" ON gst_applications;

CREATE POLICY "Users can view own applications"
  ON gst_applications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own applications"
  ON gst_applications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own applications"
  ON gst_applications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- APPLICATION TIMELINE TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS application_timeline (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES gst_applications(id) ON DELETE CASCADE NOT NULL,
  status text NOT NULL,
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_timeline_application_id ON application_timeline(application_id);

ALTER TABLE application_timeline ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own timeline" ON application_timeline;
DROP POLICY IF EXISTS "Users can insert own timeline" ON application_timeline;

CREATE POLICY "Users can view own timeline"
  ON application_timeline FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM gst_applications
      WHERE gst_applications.id = application_timeline.application_id
      AND gst_applications.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own timeline"
  ON application_timeline FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM gst_applications
      WHERE gst_applications.id = application_timeline.application_id
      AND gst_applications.user_id = auth.uid()
    )
  );

-- ============================================================================
-- APPLICATION DOCUMENTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS application_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES gst_applications(id) ON DELETE CASCADE NOT NULL,
  document_type text NOT NULL,
  file_name text NOT NULL,
  file_url text NOT NULL,
  file_size bigint DEFAULT 0,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_documents_application_id ON application_documents(application_id);

ALTER TABLE application_documents ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own documents" ON application_documents;
DROP POLICY IF EXISTS "Users can insert own documents" ON application_documents;
DROP POLICY IF EXISTS "Users can delete own documents" ON application_documents;

CREATE POLICY "Users can view own documents"
  ON application_documents FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM gst_applications
      WHERE gst_applications.id = application_documents.application_id
      AND gst_applications.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own documents"
  ON application_documents FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM gst_applications
      WHERE gst_applications.id = application_documents.application_id
      AND gst_applications.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own documents"
  ON application_documents FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM gst_applications
      WHERE gst_applications.id = application_documents.application_id
      AND gst_applications.user_id = auth.uid()
    )
  );

-- ============================================================================
-- IRIS SUBMISSIONS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS iris_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  reference_number text UNIQUE NOT NULL,
  submission_type text NOT NULL CHECK (submission_type IN ('salary', 'business')),
  status text DEFAULT 'pending' NOT NULL,
  payment_status text DEFAULT 'unpaid' NOT NULL,
  amount numeric(10,2) DEFAULT 0,
  completion_time text DEFAULT '',
  submitted_at timestamptz DEFAULT now() NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_iris_submissions_user_id ON iris_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_iris_submissions_reference ON iris_submissions(reference_number);

ALTER TABLE iris_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own submissions" ON iris_submissions;
DROP POLICY IF EXISTS "Users can insert own submissions" ON iris_submissions;
DROP POLICY IF EXISTS "Users can update own submissions" ON iris_submissions;

CREATE POLICY "Users can view own submissions"
  ON iris_submissions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own submissions"
  ON iris_submissions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own submissions"
  ON iris_submissions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- IRIS SALARY DETAILS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS iris_salary_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid REFERENCES iris_submissions(id) ON DELETE CASCADE NOT NULL,
  employer_name text DEFAULT '',
  employer_ntn text DEFAULT '',
  monthly_salary numeric(12,2) DEFAULT 0,
  tax_deducted numeric(12,2) DEFAULT 0,
  employment_start_date date,
  employment_type text DEFAULT '',
  salary_account_bank text DEFAULT '',
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_salary_details_submission_id ON iris_salary_details(submission_id);

ALTER TABLE iris_salary_details ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own salary details" ON iris_salary_details;
DROP POLICY IF EXISTS "Users can insert own salary details" ON iris_salary_details;
DROP POLICY IF EXISTS "Users can update own salary details" ON iris_salary_details;

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

CREATE POLICY "Users can insert own salary details"
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

-- ============================================================================
-- IRIS ADDITIONAL INFO TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS iris_additional_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid REFERENCES iris_submissions(id) ON DELETE CASCADE NOT NULL,
  property_ownership boolean DEFAULT false,
  property_details text DEFAULT '',
  vehicle_ownership boolean DEFAULT false,
  vehicle_details text DEFAULT '',
  other_income boolean DEFAULT false,
  other_income_details text DEFAULT '',
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_additional_info_submission_id ON iris_additional_info(submission_id);

ALTER TABLE iris_additional_info ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own additional info" ON iris_additional_info;
DROP POLICY IF EXISTS "Users can insert own additional info" ON iris_additional_info;
DROP POLICY IF EXISTS "Users can update own additional info" ON iris_additional_info;

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

CREATE POLICY "Users can insert own additional info"
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

-- ============================================================================
-- IRIS BUSINESS DETAILS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS iris_business_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid REFERENCES iris_submissions(id) ON DELETE CASCADE NOT NULL,
  businesses jsonb DEFAULT '[]'::jsonb NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_business_details_submission_id ON iris_business_details(submission_id);

ALTER TABLE iris_business_details ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own business details" ON iris_business_details;
DROP POLICY IF EXISTS "Users can insert own business details" ON iris_business_details;
DROP POLICY IF EXISTS "Users can update own business details" ON iris_business_details;

CREATE POLICY "Users can view own business details"
  ON iris_business_details FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM iris_submissions
      WHERE iris_submissions.id = iris_business_details.submission_id
      AND iris_submissions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own business details"
  ON iris_business_details FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM iris_submissions
      WHERE iris_submissions.id = iris_business_details.submission_id
      AND iris_submissions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own business details"
  ON iris_business_details FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM iris_submissions
      WHERE iris_submissions.id = iris_business_details.submission_id
      AND iris_submissions.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM iris_submissions
      WHERE iris_submissions.id = iris_business_details.submission_id
      AND iris_submissions.user_id = auth.uid()
    )
  );

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Update timestamp functions
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_gst_applications_updated_at ON gst_applications;
CREATE TRIGGER update_gst_applications_updated_at
  BEFORE UPDATE ON gst_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_application_documents_updated_at ON application_documents;
CREATE TRIGGER update_application_documents_updated_at
  BEFORE UPDATE ON application_documents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_iris_submissions_updated_at ON iris_submissions;
CREATE TRIGGER update_iris_submissions_updated_at
  BEFORE UPDATE ON iris_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_iris_salary_details_updated_at ON iris_salary_details;
CREATE TRIGGER update_iris_salary_details_updated_at
  BEFORE UPDATE ON iris_salary_details
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_iris_additional_info_updated_at ON iris_additional_info;
CREATE TRIGGER update_iris_additional_info_updated_at
  BEFORE UPDATE ON iris_additional_info
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_iris_business_details_updated_at ON iris_business_details;
CREATE TRIGGER update_iris_business_details_updated_at
  BEFORE UPDATE ON iris_business_details
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Auto-create profile function
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, mobile_number)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'mobile_number', '')
  );
  RETURN NEW;
EXCEPTION
  WHEN others THEN
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Generate reference number function
CREATE OR REPLACE FUNCTION generate_reference_number()
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
  ref_number text;
BEGIN
  ref_number := 'GST-' || to_char(now(), 'YYYYMMDD') || '-' || upper(substring(md5(random()::text) from 1 for 6));
  RETURN ref_number;
END;
$$;