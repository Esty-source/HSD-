import { useState, useEffect } from 'react';
import { XMarkIcon, CalendarIcon, ClockIcon, MapPinIcon, UserIcon, VideoCameraIcon } from '@heroicons/react/24/outline';

export default function BookAppointmentModal({ isOpen, onClose, onBookAppointment }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    doctorId: '',
    specialty: '',
    appointmentType: 'in-person',
    date: '',
    timeSlot: '',
    reason: '',
    symptoms: '',
    notes: ''
  });
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock data for doctors
  const doctors = [
    { id: 1, name: 'Dr. Sarah Wilson', specialty: 'Cardiologist', rating: 4.8, image: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Dermatologist', rating: 4.9, image: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 3, name: 'Dr. Emily Brown', specialty: 'General Practitioner', rating: 4.7, image: 'https://randomuser.me/api/portraits/women/68.jpg' },
    { id: 4, name: 'Dr. James Rodriguez', specialty: 'Orthopedic Surgeon', rating: 4.6, image: 'https://randomuser.me/api/portraits/men/46.jpg' },
    { id: 5, name: 'Dr. Lisa Wang', specialty: 'Pediatrician', rating: 4.9, image: 'https://randomuser.me/api/portraits/women/79.jpg' },
  ];

  // List of specialties
  const specialties = [
    'General Practitioner',
    'Cardiologist',
    'Dermatologist',
    'Orthopedic Surgeon',
    'Pediatrician',
    'Neurologist',
    'Gynecologist',
    'Ophthalmologist',
    'Dentist',
    'Psychiatrist'
  ];

  // Generate available dates (next 14 days)
  useEffect(() => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
        });
      }
    }
    
    setAvailableDates(dates);
  }, []);

  // Filter doctors based on specialty
  useEffect(() => {
    if (formData.specialty) {
      const filtered = doctors.filter(doctor => 
        doctor.specialty === formData.specialty
      );
      setAvailableDoctors(filtered);
    } else {
      setAvailableDoctors(doctors);
    }
  }, [formData.specialty]);

  // Generate time slots based on selected date
  useEffect(() => {
    if (formData.date) {
      // In a real app, this would be an API call to get available time slots
      // for the selected doctor and date
      const slots = [];
      const startHour = 8; // 8 AM
      const endHour = 17; // 5 PM
      
      for (let hour = startHour; hour < endHour; hour++) {
        // Add slots at :00 and :30
        slots.push({
          value: `${hour}:00`,
          label: `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`
        });
        slots.push({
          value: `${hour}:30`,
          label: `${hour > 12 ? hour - 12 : hour}:30 ${hour >= 12 ? 'PM' : 'AM'}`
        });
      }
      
      // Randomly remove some slots to simulate unavailability
      const availableSlots = slots.filter(() => Math.random() > 0.3);
      setAvailableTimeSlots(availableSlots);
    }
  }, [formData.date, formData.doctorId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear any error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};
    
    if (currentStep === 1) {
      if (!formData.specialty) {
        newErrors.specialty = 'Please select a specialty';
      }
      if (!formData.doctorId) {
        newErrors.doctorId = 'Please select a doctor';
      }
      if (!formData.appointmentType) {
        newErrors.appointmentType = 'Please select appointment type';
      }
    } else if (currentStep === 2) {
      if (!formData.date) {
        newErrors.date = 'Please select a date';
      }
      if (!formData.timeSlot) {
        newErrors.timeSlot = 'Please select a time slot';
      }
    } else if (currentStep === 3) {
      if (!formData.reason) {
        newErrors.reason = 'Please provide a reason for your visit';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    if (validateStep(step)) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        const selectedDoctor = doctors.find(d => d.id === parseInt(formData.doctorId));
        const appointmentDetails = {
          ...formData,
          doctor: selectedDoctor ? selectedDoctor.name : '',
          specialty: formData.specialty,
          date: formData.date,
          time: availableTimeSlots.find(t => t.value === formData.timeSlot)?.label || formData.timeSlot,
          location: formData.appointmentType === 'in-person' ? 'Health Service Center' : 'Video Call',
          status: 'upcoming',
          type: formData.appointmentType === 'in-person' ? 'In-person' : 'Telemedicine',
          id: Math.floor(Math.random() * 1000) + 10 // Generate random ID
        };
        
        onBookAppointment(appointmentDetails);
        setIsLoading(false);
        onClose();
        
        // Reset form
        setFormData({
          doctorId: '',
          specialty: '',
          appointmentType: 'in-person',
          date: '',
          timeSlot: '',
          reason: '',
          symptoms: '',
          notes: ''
        });
        setStep(1);
      }, 1500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto my-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Book an Appointment</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
            disabled={isLoading}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                  step >= i ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 text-gray-500'
                }`}>
                  {i}
                </div>
                <span className={`text-xs mt-1 ${step >= i ? 'text-blue-600' : 'text-gray-500'}`}>
                  {i === 1 ? 'Doctor' : i === 2 ? 'Schedule' : i === 3 ? 'Details' : 'Confirm'}
                </span>
              </div>
            ))}
          </div>
          <div className="relative mt-2">
            <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full"></div>
            <div 
              className="absolute top-0 left-0 h-1 bg-blue-600 transition-all duration-300" 
              style={{ width: `${(step - 1) * 33.33}%` }}
            ></div>
          </div>
        </div>
        
        {/* Content Container with Scrolling */}
        <div className="overflow-y-auto pr-2">
          {/* Step 1: Select Doctor */}
          {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Specialty
              </label>
              <select
                name="specialty"
                value={formData.specialty}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg ${errors.specialty ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select Specialty</option>
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
              {errors.specialty && <p className="mt-1 text-sm text-red-600">{errors.specialty}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Doctor
              </label>
              <div className="grid grid-cols-1 gap-3">
                {availableDoctors.map((doctor) => (
                  <label
                    key={doctor.id}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.doctorId === doctor.id.toString() 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="doctorId"
                      value={doctor.id}
                      checked={formData.doctorId === doctor.id.toString()}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-3">
                      <img src={doctor.image} alt={doctor.name} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <h4 className="font-medium text-gray-900">{doctor.name}</h4>
                        <p className="text-sm text-gray-500">{doctor.specialty}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-yellow-400">★</span>
                          <span className="text-sm text-gray-600 ml-1">{doctor.rating}</span>
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
                {availableDoctors.length === 0 && formData.specialty && (
                  <p className="text-gray-500 py-4 text-center">No doctors available for this specialty. Please select another specialty.</p>
                )}
                {availableDoctors.length === 0 && !formData.specialty && (
                  <p className="text-gray-500 py-4 text-center">Please select a specialty to see available doctors.</p>
                )}
              </div>
              {errors.doctorId && <p className="mt-1 text-sm text-red-600">{errors.doctorId}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Appointment Type
              </label>
              <div className="flex space-x-4">
                <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                  formData.appointmentType === 'in-person' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}>
                  <input
                    type="radio"
                    name="appointmentType"
                    value="in-person"
                    checked={formData.appointmentType === 'in-person'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <MapPinIcon className="h-5 w-5 text-blue-500 mr-2" />
                  <span>In-person Visit</span>
                </label>
                
                <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                  formData.appointmentType === 'telemedicine' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}>
                  <input
                    type="radio"
                    name="appointmentType"
                    value="telemedicine"
                    checked={formData.appointmentType === 'telemedicine'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <VideoCameraIcon className="h-5 w-5 text-blue-500 mr-2" />
                  <span>Telemedicine</span>
                </label>
              </div>
              {errors.appointmentType && <p className="mt-1 text-sm text-red-600">{errors.appointmentType}</p>}
            </div>
          </div>
        )}
        
          {/* Step 2: Select Date & Time */}
          {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Date
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {availableDates.map((date) => (
                  <label
                    key={date.value}
                    className={`flex flex-col items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.date === date.value 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="date"
                      value={date.value}
                      checked={formData.date === date.value}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <CalendarIcon className="h-5 w-5 text-blue-500 mb-1" />
                    <span className="text-sm font-medium">{date.label}</span>
                  </label>
                ))}
              </div>
              {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Time
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {availableTimeSlots.map((slot) => (
                  <label
                    key={slot.value}
                    className={`flex flex-col items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.timeSlot === slot.value 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="timeSlot"
                      value={slot.value}
                      checked={formData.timeSlot === slot.value}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <ClockIcon className="h-5 w-5 text-blue-500 mb-1" />
                    <span className="text-sm font-medium">{slot.label}</span>
                  </label>
                ))}
                {formData.date && availableTimeSlots.length === 0 && (
                  <p className="col-span-4 text-gray-500 py-4 text-center">No available time slots for this date. Please select another date.</p>
                )}
                {!formData.date && (
                  <p className="col-span-4 text-gray-500 py-4 text-center">Please select a date to see available time slots.</p>
                )}
              </div>
              {errors.timeSlot && <p className="mt-1 text-sm text-red-600">{errors.timeSlot}</p>}
            </div>
          </div>
        )}
        
          {/* Step 3: Visit Details */}
          {step === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason for Visit
              </label>
              <select
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg ${errors.reason ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select Reason</option>
                <option value="routine-checkup">Routine Check-up</option>
                <option value="follow-up">Follow-up Visit</option>
                <option value="new-symptoms">New Symptoms</option>
                <option value="chronic-condition">Chronic Condition Management</option>
                <option value="prescription-refill">Prescription Refill</option>
                <option value="consultation">Consultation</option>
                <option value="other">Other</option>
              </select>
              {errors.reason && <p className="mt-1 text-sm text-red-600">{errors.reason}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Symptoms (if any)
              </label>
              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleInputChange}
                rows={3}
                placeholder="Describe your symptoms..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={2}
                placeholder="Any additional information..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        )}
        
          {/* Step 4: Confirmation */}
          {step === 4 && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Appointment Summary</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Doctor</p>
                  <p className="font-medium">
                    {doctors.find(d => d.id === parseInt(formData.doctorId))?.name || 'Not selected'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Specialty</p>
                  <p className="font-medium">{formData.specialty || 'Not selected'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">
                    {formData.date 
                      ? new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
                      : 'Not selected'
                    }
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium">
                    {availableTimeSlots.find(t => t.value === formData.timeSlot)?.label || 'Not selected'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="font-medium">
                    {formData.appointmentType === 'in-person' ? 'In-person Visit' : 'Telemedicine'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Reason</p>
                  <p className="font-medium">{formData.reason || 'Not provided'}</p>
                </div>
              </div>
              
              {formData.symptoms && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Symptoms</p>
                  <p className="text-sm">{formData.symptoms}</p>
                </div>
              )}
              
              {formData.notes && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Additional Notes</p>
                  <p className="text-sm">{formData.notes}</p>
                </div>
              )}
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">Important Information</h4>
              <ul className="list-disc list-inside text-sm text-yellow-800 space-y-1">
                <li>Please arrive 15 minutes before your appointment time.</li>
                <li>Bring your ID and insurance card.</li>
                <li>You can cancel or reschedule up to 24 hours before your appointment.</li>
                {formData.appointmentType === 'telemedicine' && (
                  <li>For telemedicine appointments, you'll receive a link 30 minutes before your scheduled time.</li>
                )}
              </ul>
            </div>
          </div>
        )}
        </div>
        
        {/* Navigation Buttons - Fixed at Bottom */}
        <div className="mt-6 pt-4 flex justify-between border-t border-gray-200 sticky bottom-0 bg-white">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              disabled={isLoading}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              Back
            </button>
          ) : (
            <div></div>
          )}
          
          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Confirm Appointment'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
