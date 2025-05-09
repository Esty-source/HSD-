-- Check all existing tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check structure of appointments table
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'appointments';

-- Check structure of profiles table
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'profiles';

-- Create correct policy for appointments based on actual column names
CREATE POLICY "Users can view their appointments"
  ON public.appointments FOR SELECT
  USING (auth.uid() = patient_id OR auth.uid() = doctor_id);

-- Create policies for other tables
-- Resources policies
CREATE POLICY "Anyone can view resources"
  ON public.resources FOR SELECT
  USING (true);

-- Notifications policies
CREATE POLICY "Users can view their own notifications"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

-- Pharmacies policies
CREATE POLICY "Anyone can view pharmacies"
  ON public.pharmacies FOR SELECT
  USING (true);

-- Health records policies
CREATE POLICY "Patients can view their own health records"
  ON public.health_records FOR SELECT
  USING (auth.uid() = patient_id);

CREATE POLICY "Doctors can view their patients' health records"
  ON public.health_records FOR SELECT
  USING (auth.uid() = doctor_id);

-- Telemedicine policies
CREATE POLICY "Users can view their telemedicine sessions"
  ON public.telemedicine FOR SELECT
  USING (auth.uid() = patient_id OR auth.uid() = doctor_id);
