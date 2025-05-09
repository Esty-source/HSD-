import { supabase } from './supabase';

/**
 * Database service for handling all Supabase database operations
 */
export const DatabaseService = {
  /**
   * Profiles
   */
  profiles: {
    // Get a user profile by ID
    async getById(userId) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      return data;
    },
    
    // Update a user profile
    async update(userId, updates) {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId);
      
      if (error) throw error;
      return data;
    },
    
    // Get all profiles (admin only)
    async getAll(role = null) {
      let query = supabase.from('profiles').select('*');
      
      if (role) {
        query = query.eq('role', role);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    }
  },
  
  /**
   * Doctors
   */
  doctors: {
    // Get all doctors
    async getAll() {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id,
          full_name,
          email,
          avatar_url,
          specialty,
          bio,
          address,
          phone,
          created_at
        `)
        .eq('role', 'doctor');
      
      if (error) throw error;
      return data;
    },
    
    // Get a doctor by ID
    async getById(doctorId) {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id,
          full_name,
          email,
          avatar_url,
          specialty,
          bio,
          address,
          phone,
          created_at
        `)
        .eq('id', doctorId)
        .eq('role', 'doctor')
        .single();
      
      if (error) throw error;
      return data;
    },
    
    // Search doctors by name or specialty
    async search(query) {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id,
          full_name,
          email,
          avatar_url,
          specialty,
          bio,
          address,
          phone,
          created_at
        `)
        .eq('role', 'doctor')
        .or(`full_name.ilike.%${query}%,specialty.ilike.%${query}%`);
      
      if (error) throw error;
      return data;
    }
  },
  
  /**
   * Appointments
   */
  appointments: {
    // Get all appointments for a user (patient or doctor)
    async getByUserId(userId, role) {
      const fieldToCheck = role === 'doctor' ? 'doctor_id' : 'patient_id';
      
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          doctor:doctor_id(id, full_name, specialty, avatar_url),
          patient:patient_id(id, full_name, avatar_url)
        `)
        .eq(fieldToCheck, userId);
      
      if (error) throw error;
      return data;
    },
    
    // Create a new appointment
    async create(appointmentData) {
      const { data, error } = await supabase
        .from('appointments')
        .insert([appointmentData])
        .select();
      
      if (error) throw error;
      return data[0];
    },
    
    // Update an appointment
    async update(appointmentId, updates) {
      const { data, error } = await supabase
        .from('appointments')
        .update(updates)
        .eq('id', appointmentId)
        .select();
      
      if (error) throw error;
      return data[0];
    },
    
    // Delete an appointment
    async delete(appointmentId) {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', appointmentId);
      
      if (error) throw error;
      return true;
    }
  },
  
  /**
   * Resources
   */
  resources: {
    // Get all resources
    async getAll(category = null) {
      let query = supabase.from('resources').select('*');
      
      if (category && category !== 'all') {
        query = query.eq('category', category);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    
    // Get a resource by ID
    async getById(resourceId) {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('id', resourceId)
        .single();
      
      if (error) throw error;
      return data;
    },
    
    // Create a new resource (admin only)
    async create(resourceData) {
      const { data, error } = await supabase
        .from('resources')
        .insert([resourceData])
        .select();
      
      if (error) throw error;
      return data[0];
    },
    
    // Update a resource (admin only)
    async update(resourceId, updates) {
      const { data, error } = await supabase
        .from('resources')
        .update(updates)
        .eq('id', resourceId)
        .select();
      
      if (error) throw error;
      return data[0];
    },
    
    // Delete a resource (admin only)
    async delete(resourceId) {
      const { error } = await supabase
        .from('resources')
        .delete()
        .eq('id', resourceId);
      
      if (error) throw error;
      return true;
    },
    
    // Search resources
    async search(query) {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  },
  
  /**
   * Notifications
   */
  notifications: {
    // Get all notifications for a user
    async getByUserId(userId) {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    
    // Create a new notification
    async create(notificationData) {
      const { data, error } = await supabase
        .from('notifications')
        .insert([notificationData])
        .select();
      
      if (error) throw error;
      return data[0];
    },
    
    // Mark a notification as read
    async markAsRead(notificationId) {
      const { data, error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId)
        .select();
      
      if (error) throw error;
      return data[0];
    },
    
    // Mark all notifications as read for a user
    async markAllAsRead(userId) {
      const { data, error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', userId)
        .eq('read', false);
      
      if (error) throw error;
      return true;
    },
    
    // Delete a notification
    async delete(notificationId) {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId);
      
      if (error) throw error;
      return true;
    }
  },
  
  /**
   * Pharmacies
   */
  pharmacies: {
    // Get all pharmacies
    async getAll() {
      const { data, error } = await supabase
        .from('pharmacies')
        .select('*');
      
      if (error) throw error;
      return data;
    },
    
    // Get a pharmacy by ID
    async getById(pharmacyId) {
      const { data, error } = await supabase
        .from('pharmacies')
        .select('*')
        .eq('id', pharmacyId)
        .single();
      
      if (error) throw error;
      return data;
    },
    
    // Search pharmacies
    async search(query) {
      const { data, error } = await supabase
        .from('pharmacies')
        .select('*')
        .or(`name.ilike.%${query}%,address.ilike.%${query}%`);
      
      if (error) throw error;
      return data;
    }
  }
};

export default DatabaseService;
