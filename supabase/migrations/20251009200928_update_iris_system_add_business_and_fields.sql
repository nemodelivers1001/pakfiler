-- Update IRIS System: Add business details and missing fields
--
-- 1. Add missing columns to iris_submissions
--    - reference_number (unique identifier for tracking)
--    - submitted_at (when the submission was completed)
--
-- 2. Create iris_business_details table
--    - For storing business-specific information
--
-- 3. Security
--    - Enable RLS and policies for new table

-- Add missing columns to iris_submissions
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'iris_submissions' AND column_name = 'reference_number'
  ) THEN
    ALTER TABLE iris_submissions ADD COLUMN reference_number text UNIQUE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'iris_submissions' AND column_name = 'submitted_at'
  ) THEN
    ALTER TABLE iris_submissions ADD COLUMN submitted_at timestamptz;
  END IF;
END $$;

-- Create iris_business_details table
CREATE TABLE IF NOT EXISTS iris_business_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid REFERENCES iris_submissions(id) ON DELETE CASCADE NOT NULL,
  businesses jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_iris_submissions_reference ON iris_submissions(reference_number);
CREATE INDEX IF NOT EXISTS idx_iris_business_details_submission ON iris_business_details(submission_id);

-- Enable RLS
ALTER TABLE iris_business_details ENABLE ROW LEVEL SECURITY;

-- RLS Policies for iris_business_details
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

CREATE POLICY "Users can create own business details"
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

CREATE POLICY "Users can delete own business details"
  ON iris_business_details FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM iris_submissions
      WHERE iris_submissions.id = iris_business_details.submission_id
      AND iris_submissions.user_id = auth.uid()
    )
  );
