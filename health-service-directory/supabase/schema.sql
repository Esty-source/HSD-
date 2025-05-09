-- Create profiles table (extends the auth.users table)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  email TEXT UNIQUE,
  phone TEXT,
  address TEXT,
  role TEXT NOT NULL DEFAULT 'patient' CHECK (role IN ('patient', 'doctor', 'admin')),
  specialty TEXT, -- For doctors
  bio TEXT, -- For doctors
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES public.profiles(id) NOT NULL,
  doctor_id UUID REFERENCES public.profiles(id) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  duration INTEGER NOT NULL DEFAULT 30, -- in minutes
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  reason TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create resources table
CREATE TABLE IF NOT EXISTS public.resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  author TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'appointment', 'message', 'system')),
  read BOOLEAN DEFAULT false,
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create pharmacies table
CREATE TABLE IF NOT EXISTS public.pharmacies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  hours TEXT,
  latitude FLOAT,
  longitude FLOAT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create health_records table
CREATE TABLE IF NOT EXISTS public.health_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES public.profiles(id) NOT NULL,
  doctor_id UUID REFERENCES public.profiles(id),
  record_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  file_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create RLS policies

-- Profiles policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Doctors can view patient profiles"
  ON public.profiles FOR SELECT
  USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'doctor'
    AND role = 'patient'
  );

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admins can update all profiles"
  ON public.profiles FOR UPDATE
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- Appointments policies
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Patients can view their own appointments"
  ON public.appointments FOR SELECT
  USING (auth.uid() = patient_id);

CREATE POLICY "Patients can create appointments"
  ON public.appointments FOR INSERT
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Patients can update their own appointments"
  ON public.appointments FOR UPDATE
  USING (auth.uid() = patient_id);

CREATE POLICY "Patients can delete their own appointments"
  ON public.appointments FOR DELETE
  USING (auth.uid() = patient_id);

CREATE POLICY "Doctors can view their own appointments"
  ON public.appointments FOR SELECT
  USING (auth.uid() = doctor_id);

CREATE POLICY "Doctors can update their own appointments"
  ON public.appointments FOR UPDATE
  USING (auth.uid() = doctor_id);

CREATE POLICY "Admins can view all appointments"
  ON public.appointments FOR SELECT
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admins can update all appointments"
  ON public.appointments FOR UPDATE
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- Resources policies
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view resources"
  ON public.resources FOR SELECT
  USING (true);

CREATE POLICY "Admins can create resources"
  ON public.resources FOR INSERT
  WITH CHECK ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admins can update resources"
  ON public.resources FOR UPDATE
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admins can delete resources"
  ON public.resources FOR DELETE
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- Notifications policies
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notifications"
  ON public.notifications FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can create notifications"
  ON public.notifications FOR INSERT
  WITH CHECK ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- Pharmacies policies
ALTER TABLE public.pharmacies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view pharmacies"
  ON public.pharmacies FOR SELECT
  USING (true);

CREATE POLICY "Admins can create pharmacies"
  ON public.pharmacies FOR INSERT
  WITH CHECK ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admins can update pharmacies"
  ON public.pharmacies FOR UPDATE
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admins can delete pharmacies"
  ON public.pharmacies FOR DELETE
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- Health records policies
ALTER TABLE public.health_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Patients can view their own health records"
  ON public.health_records FOR SELECT
  USING (auth.uid() = patient_id);

CREATE POLICY "Doctors can view patient health records"
  ON public.health_records FOR SELECT
  USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'doctor'
    AND auth.uid() = doctor_id
  );

CREATE POLICY "Doctors can create health records"
  ON public.health_records FOR INSERT
  WITH CHECK ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'doctor');

CREATE POLICY "Doctors can update health records they created"
  ON public.health_records FOR UPDATE
  USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'doctor'
    AND auth.uid() = doctor_id
  );

CREATE POLICY "Admins can view all health records"
  ON public.health_records FOR SELECT
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- Create functions and triggers

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
BEFORE UPDATE ON public.appointments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resources_updated_at
BEFORE UPDATE ON public.resources
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pharmacies_updated_at
BEFORE UPDATE ON public.pharmacies
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_health_records_updated_at
BEFORE UPDATE ON public.health_records
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Function to create a notification when an appointment is created or updated
CREATE OR REPLACE FUNCTION handle_appointment_notification()
RETURNS TRIGGER AS $$
DECLARE
  patient_name TEXT;
  doctor_name TEXT;
  notification_title TEXT;
  notification_message TEXT;
BEGIN
  -- Get patient and doctor names
  SELECT full_name INTO patient_name FROM public.profiles WHERE id = NEW.patient_id;
  SELECT full_name INTO doctor_name FROM public.profiles WHERE id = NEW.doctor_id;
  
  -- For new appointments
  IF TG_OP = 'INSERT' THEN
    -- Notify patient
    notification_title := 'New Appointment';
    notification_message := 'You have a new appointment with Dr. ' || doctor_name || ' on ' || NEW.date || ' at ' || NEW.time;
    
    INSERT INTO public.notifications (user_id, title, message, type, link)
    VALUES (NEW.patient_id, notification_title, notification_message, 'appointment', '/appointments');
    
    -- Notify doctor
    notification_title := 'New Appointment';
    notification_message := 'You have a new appointment with ' || patient_name || ' on ' || NEW.date || ' at ' || NEW.time;
    
    INSERT INTO public.notifications (user_id, title, message, type, link)
    VALUES (NEW.doctor_id, notification_title, notification_message, 'appointment', '/appointments');
  
  -- For updated appointments
  ELSIF TG_OP = 'UPDATE' AND NEW.status != OLD.status THEN
    -- Notify patient about status change
    notification_title := 'Appointment ' || NEW.status;
    notification_message := 'Your appointment with Dr. ' || doctor_name || ' on ' || NEW.date || ' at ' || NEW.time || ' has been ' || NEW.status;
    
    INSERT INTO public.notifications (user_id, title, message, type, link)
    VALUES (NEW.patient_id, notification_title, notification_message, 'appointment', '/appointments');
    
    -- Notify doctor about status change
    notification_title := 'Appointment ' || NEW.status;
    notification_message := 'Your appointment with ' || patient_name || ' on ' || NEW.date || ' at ' || NEW.time || ' has been ' || NEW.status;
    
    INSERT INTO public.notifications (user_id, title, message, type, link)
    VALUES (NEW.doctor_id, notification_title, notification_message, 'appointment', '/appointments');
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for appointment notifications
CREATE TRIGGER appointment_notification_insert
AFTER INSERT ON public.appointments
FOR EACH ROW
EXECUTE FUNCTION handle_appointment_notification();

CREATE TRIGGER appointment_notification_update
AFTER UPDATE ON public.appointments
FOR EACH ROW
EXECUTE FUNCTION handle_appointment_notification();
