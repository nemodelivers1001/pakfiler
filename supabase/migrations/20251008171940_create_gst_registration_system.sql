/*
  # GST Registration System Database Schema

  ## Overview
  Complete database schema for GST registration application system with user authentication,
  application tracking, document management, and payment processing.

  ## New Tables

  ### 1. `gst_applications`
  Stores all GST registration applications
  - `id` (uuid, primary key) - Unique application identifier
  - `user_id` (uuid, foreign key) - References auth.users
  - `reference_number` (text, unique) - Auto-generated application reference (GST-XXXXXXXX-XXXX)
  - `status` (text) - Application status: pending_payment, payment_verified, processing, completed, rejected
  - `business_name` (text) - Registered business name
  - `business_type` (text) - Type: Proprietorship, Partnership, Company/NPO, etc.
  - `business_nature` (text) - Nature of business
  - `start_date` (date) - Business start date
  - `description` (text) - Business activity description
  - `consumer_number` (text) - Gas/Electricity consumer number
  - `business_address` (text) - Complete business address
  - `service_fee` (numeric) - Fee amount for the service
  - `payment_status` (text) - Payment status: pending, completed, failed
  - `payment_method` (text) - Method used for payment
  - `payment_reference` (text) - Payment transaction reference
  - `submitted_at` (timestamptz) - When application was submitted
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `application_documents`
  Stores uploaded documents for applications
  - `id` (uuid, primary key) - Unique document identifier
  - `application_id` (uuid, foreign key) - References gst_applications
  - `document_type` (text) - Type of document
  - `file_name` (text) - Original file name
  - `file_url` (text) - Storage URL for the document
  - `file_size` (integer) - File size in bytes
  - `uploaded_at` (timestamptz) - Upload timestamp
  - `created_at` (timestamptz) - Record creation timestamp

  ### 3. `application_timeline`
  Tracks status changes for applications
  - `id` (uuid, primary key) - Unique timeline entry identifier
  - `application_id` (uuid, foreign key) - References gst_applications
  - `status` (text) - Status at this point
  - `notes` (text) - Additional notes about the status change
  - `created_at` (timestamptz) - When status change occurred

  ## Security
  - Enable RLS on all tables
  - Users can only view and modify their own applications
  - Authenticated users required for all operations
  - Policies ensure data isolation between users

  ## Indexes
  - Reference number lookup optimization
  - User application queries optimization
  - Status-based filtering optimization
*/

-- Create gst_applications table
CREATE TABLE IF NOT EXISTS gst_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  reference_number text UNIQUE NOT NULL,
  status text DEFAULT 'pending_payment' NOT NULL,
  business_name text NOT NULL,
  business_type text NOT NULL,
  business_nature text NOT NULL,
  start_date date NOT NULL,
  description text,
  consumer_number text,
  business_address text NOT NULL,
  service_fee numeric(10,2) DEFAULT 9000.00 NOT NULL,
  payment_status text DEFAULT 'pending' NOT NULL,
  payment_method text,
  payment_reference text,
  submitted_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create application_documents table
CREATE TABLE IF NOT EXISTS application_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES gst_applications(id) ON DELETE CASCADE NOT NULL,
  document_type text NOT NULL,
  file_name text NOT NULL,
  file_url text NOT NULL,
  file_size integer,
  uploaded_at timestamptz DEFAULT now() NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Create application_timeline table
CREATE TABLE IF NOT EXISTS application_timeline (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES gst_applications(id) ON DELETE CASCADE NOT NULL,
  status text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_gst_applications_user_id ON gst_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_gst_applications_reference_number ON gst_applications(reference_number);
CREATE INDEX IF NOT EXISTS idx_gst_applications_status ON gst_applications(status);
CREATE INDEX IF NOT EXISTS idx_application_documents_application_id ON application_documents(application_id);
CREATE INDEX IF NOT EXISTS idx_application_timeline_application_id ON application_timeline(application_id);

-- Enable Row Level Security
ALTER TABLE gst_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_timeline ENABLE ROW LEVEL SECURITY;

-- Policies for gst_applications
CREATE POLICY "Users can view own applications"
  ON gst_applications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own applications"
  ON gst_applications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own applications"
  ON gst_applications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for application_documents
CREATE POLICY "Users can view own application documents"
  ON application_documents FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM gst_applications
      WHERE gst_applications.id = application_documents.application_id
      AND gst_applications.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can upload documents to own applications"
  ON application_documents FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM gst_applications
      WHERE gst_applications.id = application_documents.application_id
      AND gst_applications.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own application documents"
  ON application_documents FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM gst_applications
      WHERE gst_applications.id = application_documents.application_id
      AND gst_applications.user_id = auth.uid()
    )
  );

-- Policies for application_timeline
CREATE POLICY "Users can view own application timeline"
  ON application_timeline FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM gst_applications
      WHERE gst_applications.id = application_timeline.application_id
      AND gst_applications.user_id = auth.uid()
    )
  );

CREATE POLICY "System can create timeline entries"
  ON application_timeline FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM gst_applications
      WHERE gst_applications.id = application_timeline.application_id
      AND gst_applications.user_id = auth.uid()
    )
  );

-- Function to generate unique reference number
CREATE OR REPLACE FUNCTION generate_reference_number()
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
  ref_number text;
  is_unique boolean := false;
BEGIN
  WHILE NOT is_unique LOOP
    ref_number := 'GST-' || 
                  LPAD(FLOOR(RANDOM() * 100000000)::text, 8, '0') || '-' ||
                  UPPER(SUBSTRING(MD5(RANDOM()::text) FROM 1 FOR 4));
    
    SELECT NOT EXISTS (
      SELECT 1 FROM gst_applications WHERE reference_number = ref_number
    ) INTO is_unique;
  END LOOP;
  
  RETURN ref_number;
END;
$$;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_gst_applications_updated_at
  BEFORE UPDATE ON gst_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();