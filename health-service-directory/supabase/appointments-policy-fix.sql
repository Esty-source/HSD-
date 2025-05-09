-- First, let's check the actual structure of your appointments table
SELECT column_name 
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'appointments';

-- Then create the policy based on the actual column names
-- Option 1: If the column is named 'patient' instead of 'patient_id'
CREATE POLICY "Users can view their appointments option 1"
  ON public.appointments FOR SELECT
  USING (auth.uid() = patient OR auth.uid() = doctor);

-- Option 2: If the columns have different names entirely
CREATE POLICY "Users can view their appointments option 2"
  ON public.appointments FOR SELECT
  USING (
    -- Replace these with your actual column names
    auth.uid() IN (patient, doctor)
  );
