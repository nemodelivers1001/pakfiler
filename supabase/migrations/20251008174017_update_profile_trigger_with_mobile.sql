/*
  # Update Profile Creation Trigger

  ## Overview
  Updates the automatic profile creation trigger to also save mobile number
  from user metadata when a new user signs up.

  ## Changes
  - Updates the handle_new_user() function to save mobile_number from metadata
*/

-- Update the function to include mobile number
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, mobile_number, created_at, updated_at)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'mobile_number', ''),
    now(),
    now()
  );
  RETURN NEW;
END;
$$;