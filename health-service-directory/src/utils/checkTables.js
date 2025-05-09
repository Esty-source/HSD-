import { supabase } from '../lib/supabase';

// Function to check existing tables in Supabase
async function checkExistingTables() {
  try {
    console.log('Checking existing tables in Supabase...');
    
    // Check profiles table
    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('count(*)')
      .limit(1);
    
    console.log('Profiles table:', profilesError ? 'Not found' : 'Exists', 
      profilesError ? profilesError.message : `(${profilesData[0]?.count || 0} rows)`);
    
    // Check doctors table
    const { data: doctorsData, error: doctorsError } = await supabase
      .from('doctors')
      .select('count(*)')
      .limit(1);
    
    console.log('Doctors table:', doctorsError ? 'Not found' : 'Exists', 
      doctorsError ? doctorsError.message : `(${doctorsData[0]?.count || 0} rows)`);
    
    // Check patients table
    const { data: patientsData, error: patientsError } = await supabase
      .from('patients')
      .select('count(*)')
      .limit(1);
    
    console.log('Patients table:', patientsError ? 'Not found' : 'Exists', 
      patientsError ? patientsError.message : `(${patientsData[0]?.count || 0} rows)`);
    
    // Check appointments table
    const { data: appointmentsData, error: appointmentsError } = await supabase
      .from('appointments')
      .select('count(*)')
      .limit(1);
    
    console.log('Appointments table:', appointmentsError ? 'Not found' : 'Exists', 
      appointmentsError ? appointmentsError.message : `(${appointmentsData[0]?.count || 0} rows)`);
    
    // Check telemedicine table
    const { data: telemedicineData, error: telemedicineError } = await supabase
      .from('telemedicine')
      .select('count(*)')
      .limit(1);
    
    console.log('Telemedicine table:', telemedicineError ? 'Not found' : 'Exists', 
      telemedicineError ? telemedicineError.message : `(${telemedicineData[0]?.count || 0} rows)`);
    
    // Check resources table
    const { data: resourcesData, error: resourcesError } = await supabase
      .from('resources')
      .select('count(*)')
      .limit(1);
    
    console.log('Resources table:', resourcesError ? 'Not found' : 'Exists', 
      resourcesError ? resourcesError.message : `(${resourcesData[0]?.count || 0} rows)`);
    
    // Check pharmacies table
    const { data: pharmaciesData, error: pharmaciesError } = await supabase
      .from('pharmacies')
      .select('count(*)')
      .limit(1);
    
    console.log('Pharmacies table:', pharmaciesError ? 'Not found' : 'Exists', 
      pharmaciesError ? pharmaciesError.message : `(${pharmaciesData[0]?.count || 0} rows)`);
    
  } catch (error) {
    console.error('Error checking tables:', error);
  }
}

// Run the check
checkExistingTables();
