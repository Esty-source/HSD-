import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CalendarIcon, 
  ClipboardIcon, 
  BellIcon, 
  ChartBarIcon, 
  CreditCardIcon, 
  HeartIcon, 
  UserIcon,
  ArrowTrendingUpIcon,
  ArrowRightIcon,
  ClockIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { CalendarIcon as CalendarIconSolid } from '@heroicons/react/24/solid';

export default function OverviewSection({ setActiveTab }) {
  const navigate = useNavigate();
  
  // Mock data for demonstration
  const currentDate = new Date();
  const nextAppointmentDate = new Date();
  nextAppointmentDate.setDate(currentDate.getDate() + 3);
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };
  
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [showMedicationModal, setShowMedicationModal] = useState(false);
  const [showAddMedicationModal, setShowAddMedicationModal] = useState(false);
  const [showMetricsModal, setShowMetricsModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    content: '',
    actionText: ''
  });
  
  // Medication state
  const [medications, setMedications] = useState([
    { id: 1, name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', status: 'Active', refills: 2, instructions: 'Take with food in the morning', prescribedBy: 'Dr. Wilson', startDate: '2025-01-15', endDate: '2025-07-15' },
    { id: 2, name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', status: 'Active', refills: 3, instructions: 'Take with meals, morning and evening', prescribedBy: 'Dr. Wilson', startDate: '2025-02-10', endDate: '2025-08-10' },
    { id: 3, name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily', status: 'Active', refills: 1, instructions: 'Take in the evening', prescribedBy: 'Dr. Wilson', startDate: '2025-03-05', endDate: '2025-09-05' }
  ]);
  
  // Appointment state
  const [appointmentForm, setAppointmentForm] = useState({
    date: new Date(nextAppointmentDate).toISOString().split('T')[0],
    time: '09:00',
    reason: 'Regular check-up',
    notes: ''
  });
  
  // Available time slots
  const availableTimeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];
  
  // Available doctors
  const availableDoctors = [
    { id: 1, name: 'Dr. Rebecca Wilson', specialty: 'Primary Care', avatar: 'RW' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Cardiology', avatar: 'MC' },
    { id: 3, name: 'Dr. Sarah Johnson', specialty: 'Dermatology', avatar: 'SJ' },
    { id: 4, name: 'Dr. James Rodriguez', specialty: 'Orthopedics', avatar: 'JR' }
  ];
  
  // Health metrics state
  const [healthMetrics, setHealthMetrics] = useState({
    weight: 165,
    height: 70,
    bloodPressure: {
      systolic: 122,
      diastolic: 78
    },
    heartRate: 72,
    bloodSugar: 95,
    cholesterol: {
      total: 180,
      hdl: 60,
      ldl: 100
    },
    sleep: 7.5,
    steps: 8500,
    lastUpdated: '2025-04-20'
  });
  
  // Metrics form state
  const [metricsForm, setMetricsForm] = useState({
    weight: 165,
    bloodPressureSystolic: 122,
    bloodPressureDiastolic: 78,
    heartRate: 72,
    bloodSugar: 95,
    sleep: 7.5,
    steps: 8500
  });
  
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [medicationForm, setMedicationForm] = useState({
    name: '',
    dosage: '',
    frequency: '',
    instructions: '',
    refills: 0
  });

  // Handle button clicks
  const handleButtonClick = (title, content, actionText = 'Close') => {
    setModalContent({
      title,
      content,
      actionText
    });
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
  };
  
  // Close medication modal
  const closeMedicationModal = () => {
    setShowMedicationModal(false);
    setSelectedMedication(null);
  };
  
  // Close add medication modal
  const closeAddMedicationModal = () => {
    setShowAddMedicationModal(false);
    setMedicationForm({
      name: '',
      dosage: '',
      frequency: '',
      instructions: '',
      refills: 0
    });
  };
  
  // Close metrics modal
  const closeMetricsModal = () => {
    setShowMetricsModal(false);
  };
  
  // Close reschedule modal
  const closeRescheduleModal = () => {
    setShowRescheduleModal(false);
  };
  
  // Close payment modal
  const closePaymentModal = () => {
    setShowPaymentModal(false);
  };
  
  // Handle payment submission
  const handlePaymentSubmission = () => {
    // Here you would typically process the payment
    closePaymentModal();
    
    // Show confirmation
    handleButtonClick(
      'Payment Successful', 
      'Your payment of 175,000 FCFA has been processed successfully. A receipt has been sent to your email.', 
      'OK'
    );
  };
  
  // Handle appointment form change
  const handleAppointmentFormChange = (e) => {
    const { name, value } = e.target;
    setAppointmentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle appointment reschedule
  const handleRescheduleAppointment = () => {
    // Here you would typically make an API call to update the appointment
    // For now, we'll just close the modal
    closeRescheduleModal();
    
    // Show confirmation
    handleButtonClick(
      'Appointment Rescheduled', 
      `Your appointment with Dr. Rebecca Wilson has been rescheduled to ${new Date(appointmentForm.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at ${appointmentForm.time}.`, 
      'OK'
    );
  };
  
  // Handle metrics form change
  const handleMetricsFormChange = (e) => {
    const { name, value } = e.target;
    setMetricsForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Save metrics changes
  const handleSaveMetrics = () => {
    // Update health metrics
    setHealthMetrics({
      weight: parseFloat(metricsForm.weight),
      height: healthMetrics.height, // Height doesn't change often
      bloodPressure: {
        systolic: parseInt(metricsForm.bloodPressureSystolic),
        diastolic: parseInt(metricsForm.bloodPressureDiastolic)
      },
      heartRate: parseInt(metricsForm.heartRate),
      bloodSugar: parseInt(metricsForm.bloodSugar),
      cholesterol: healthMetrics.cholesterol, // Cholesterol requires lab tests
      sleep: parseFloat(metricsForm.sleep),
      steps: parseInt(metricsForm.steps),
      lastUpdated: new Date().toISOString().split('T')[0]
    });
    
    closeMetricsModal();
  };
  
  // Handle medication form change
  const handleMedicationFormChange = (e) => {
    const { name, value } = e.target;
    setMedicationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Open edit medication form
  const handleEditMedication = (medication) => {
    setSelectedMedication(medication);
    setMedicationForm({
      name: medication.name,
      dosage: medication.dosage,
      frequency: medication.frequency,
      instructions: medication.instructions,
      refills: medication.refills
    });
    setShowMedicationModal(true);
  };
  
  // Save medication changes
  const handleSaveMedication = () => {
    // Update existing medication
    setMedications(prev => prev.map(med => 
      med.id === selectedMedication.id ? 
      { ...med, ...medicationForm } : 
      med
    ));
    closeMedicationModal();
  };
  
  // Add new medication
  const handleAddMedication = () => {
    // Add new medication
    const newMedication = {
      id: medications.length + 1,
      ...medicationForm,
      status: 'Active',
      prescribedBy: 'Dr. Wilson',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().split('T')[0]
    };
    setMedications(prev => [...prev, newMedication]);
    closeAddMedicationModal();
  };
  
  // Handle medication status change
  const toggleMedicationStatus = (id) => {
    setMedications(prev => prev.map(med => 
      med.id === id ? 
      { ...med, status: med.status === 'Active' ? 'Inactive' : 'Active' } : 
      med
    ));
  };
  
  // Handle add new medication
  const handleAddNewMedication = () => {
    setMedicationForm({
      name: '',
      dosage: '',
      frequency: 'Once daily',
      instructions: '',
      refills: 0
    });
    setShowAddMedicationModal(true);
  };
  

  
  return (
    <div className="w-full">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 mb-8 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, John!</h2>
            <p className="text-blue-100">Your health dashboard is up to date. Here's your summary.</p>
          </div>
          <div className="hidden md:flex h-24 w-24 bg-white/10 rounded-full items-center justify-center backdrop-blur-sm">
            <UserIcon className="h-12 w-12 text-white" />
          </div>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Upcoming Appointments</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">2</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
              <CalendarIconSolid className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Medications</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">3</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center">
              <ClipboardIcon className="h-6 w-6 text-purple-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Notifications</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">3</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center">
              <BellIcon className="h-6 w-6 text-red-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Health Score</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">85<span className="text-sm text-green-500 ml-1">↑2</span></p>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
              <HeartIcon className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Next Appointment Card */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Next Appointment</h3>
              <CalendarIcon className="h-5 w-5 text-blue-500" />
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-start mb-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <span className="text-sm font-medium text-blue-600">DR</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Dr. Rebecca Wilson</h4>
                <p className="text-sm text-gray-500">Cardiologist</p>
              </div>
            </div>
            
            <div className="flex items-center text-gray-600 mb-1">
              <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
              <span>{formatDate(nextAppointmentDate)}</span>
            </div>
            <div className="flex items-center text-gray-600 mb-6">
              <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
              <span>{formatTime(nextAppointmentDate)}</span>
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => handleButtonClick('Appointment Confirmed', 'Your appointment with Dr. Rebecca Wilson has been confirmed for ' + formatDate(nextAppointmentDate) + ' at ' + formatTime(nextAppointmentDate) + '.', 'OK')}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
              >
                Confirm
              </button>
              <button 
                onClick={() => setShowRescheduleModal(true)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium"
              >
                Reschedule
              </button>
            </div>
          </div>
        </div>
        
        {/* Health Metrics */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="bg-green-50 px-6 py-4 border-b border-green-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Health Metrics</h3>
              <ChartBarIcon className="h-5 w-5 text-green-500" />
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Blood Pressure</span>
                  <span className="text-sm font-medium text-gray-800">120/80 mmHg</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Heart Rate</span>
                  <span className="text-sm font-medium text-gray-800">72 bpm</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Weight</span>
                  <span className="text-sm font-medium text-gray-800">68 kg</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Sleep</span>
                  <span className="text-sm font-medium text-gray-800">7.5 hrs</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setShowMetricsModal(true)}
              className="mt-6 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium flex items-center justify-center"
            >
              <span>Update Metrics</span>
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Recent Notifications */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="bg-red-50 px-6 py-4 border-b border-red-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Recent Notifications</h3>
              <BellIcon className="h-5 w-5 text-red-500" />
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start pb-4 border-b border-gray-100">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <CalendarIcon className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Appointment Reminder</p>
                  <p className="text-xs text-gray-500 mt-1">Your appointment with Dr. Wilson is in 3 days</p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start pb-4 border-b border-gray-100">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <ClipboardIcon className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Lab Results Available</p>
                  <p className="text-xs text-gray-500 mt-1">Your recent blood test results are now available</p>
                  <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <CreditCardIcon className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Payment Processed</p>
                  <p className="text-xs text-gray-500 mt-1">Your payment of 75,000 FCFA has been processed</p>
                  <p className="text-xs text-gray-400 mt-1">2 days ago</p>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setActiveTab('notifications')}
              className="mt-6 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium flex items-center justify-center"
            >
              <span>View All Notifications</span>
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Additional Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Medications */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="bg-purple-50 px-6 py-4 border-b border-purple-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Current Medications</h3>
              <ClipboardIcon className="h-5 w-5 text-purple-500" />
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Lisinopril</p>
                  <p className="text-xs text-gray-500 mt-1">10mg, Once daily</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Metformin</p>
                  <p className="text-xs text-gray-500 mt-1">500mg, Twice daily</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Atorvastatin</p>
                  <p className="text-xs text-gray-500 mt-1">20mg, Once daily</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
              </div>
            </div>
            
            <button 
              onClick={() => setShowMedicationModal(true)}
              className="mt-6 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm font-medium flex items-center justify-center"
            >
              <span>Manage Medications</span>
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Payment Summary */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Payment Summary</h3>
              <CreditCardIcon className="h-5 w-5 text-indigo-500" />
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-500">Total Balance</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">175,000 FCFA</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Next Payment</p>
                <p className="text-sm font-medium text-gray-900 mt-1">May 15, 2025</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Dr. Wilson Consultation</p>
                  <p className="text-xs text-gray-500 mt-1">April 10, 2025</p>
                </div>
                <span className="font-medium text-gray-900">75,000 FCFA</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Lab Tests</p>
                  <p className="text-xs text-gray-500 mt-1">April 15, 2025</p>
                </div>
                <span className="font-medium text-gray-900">100,000 FCFA</span>
              </div>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button 
                onClick={() => setShowPaymentModal(true)}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm font-medium"
              >
                Make Payment
              </button>
              <button 
                onClick={() => setActiveTab('payments')}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium"
              >
                Payment History
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Regular Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">{modalContent.title}</h3>
              <button 
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="mb-8">
              <p className="text-gray-600">{modalContent.content}</p>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                {modalContent.actionText}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Reschedule Appointment Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full transform transition-all my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Reschedule Appointment</h3>
              <button 
                onClick={closeRescheduleModal}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="mb-6">
              <div className="bg-blue-50 p-4 rounded-xl mb-6">
                <h4 className="text-md font-semibold mb-2 text-blue-800">Current Appointment</h4>
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-blue-600">RW</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Dr. Rebecca Wilson</p>
                    <p className="text-sm text-gray-600">Primary Care Physician</p>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <CalendarIcon className="h-4 w-4 mr-1 text-blue-500" />
                      <span>{formatDate(nextAppointmentDate)}</span>
                      <span className="mx-2">•</span>
                      <ClockIcon className="h-4 w-4 mr-1 text-blue-500" />
                      <span>{formatTime(nextAppointmentDate)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Date</label>
                  <input 
                    type="date" 
                    name="date" 
                    value={appointmentForm.date} 
                    onChange={handleAppointmentFormChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Time</label>
                  <select 
                    name="time" 
                    value={appointmentForm.time} 
                    onChange={handleAppointmentFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {availableTimeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit</label>
                <select 
                  name="reason" 
                  value={appointmentForm.reason} 
                  onChange={handleAppointmentFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Regular check-up">Regular check-up</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Consultation">Consultation</option>
                  <option value="Prescription renewal">Prescription renewal</option>
                  <option value="Lab results review">Lab results review</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                <textarea 
                  name="notes" 
                  value={appointmentForm.notes} 
                  onChange={handleAppointmentFormChange}
                  rows="3"
                  placeholder="Any additional information for your doctor"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-xl mb-6">
                <h4 className="text-md font-semibold mb-2 text-yellow-800">Available Doctors</h4>
                <div className="space-y-3">
                  {availableDoctors.map(doctor => (
                    <div key={doctor.id} className="flex items-center p-2 rounded-lg hover:bg-yellow-100 cursor-pointer">
                      <input 
                        type="radio" 
                        id={`doctor-${doctor.id}`} 
                        name="doctor" 
                        value={doctor.id} 
                        checked={doctor.id === 1} // Default to Dr. Wilson
                        onChange={() => {}}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor={`doctor-${doctor.id}`} className="ml-3 flex items-center cursor-pointer">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <span className="text-xs font-medium text-blue-600">{doctor.avatar}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{doctor.name}</p>
                          <p className="text-xs text-gray-500">{doctor.specialty}</p>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-600 mb-2"><span className="font-medium">Cancellation Policy:</span> Please reschedule at least 24 hours in advance to avoid a cancellation fee.</p>
                <p className="text-sm text-gray-600"><span className="font-medium">Insurance:</span> Your insurance will be automatically applied to this appointment.</p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeRescheduleModal}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleRescheduleAppointment}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full transform transition-all my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Make Payment</h3>
              <button 
                onClick={closePaymentModal}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="mb-6">
              {/* Payment Summary */}
              <div className="bg-blue-50 p-4 rounded-xl mb-6">
                <h4 className="text-md font-semibold mb-3 text-blue-800">Payment Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Dr. Wilson Consultation</span>
                    <span className="text-sm font-medium">75,000 FCFA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Lab Tests</span>
                    <span className="text-sm font-medium">100,000 FCFA</span>
                  </div>
                  <div className="border-t border-blue-200 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-900">Total Amount</span>
                      <span className="text-sm font-bold text-gray-900">175,000 FCFA</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Payment Method */}
              <div className="mb-6">
                <h4 className="text-md font-semibold mb-3 text-gray-900">Payment Method</h4>
                <div className="space-y-3">
                  <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input 
                      type="radio" 
                      id="payment-mtn" 
                      name="payment-method" 
                      value="mtn" 
                      checked={true}
                      className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300"
                    />
                    <label htmlFor="payment-mtn" className="ml-3 flex items-center cursor-pointer">
                      <div className="h-8 w-8 bg-yellow-500 rounded-md flex items-center justify-center mr-3">
                        <span className="text-xs font-bold text-white">MTN</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">MTN Mobile Money</p>
                        <p className="text-xs text-gray-500">Pay directly with your MTN Mobile Money account</p>
                      </div>
                    </label>
                  </div>
                  
                  <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input 
                      type="radio" 
                      id="payment-orange" 
                      name="payment-method" 
                      value="orange" 
                      className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300"
                    />
                    <label htmlFor="payment-orange" className="ml-3 flex items-center cursor-pointer">
                      <div className="h-8 w-8 bg-orange-500 rounded-md flex items-center justify-center mr-3">
                        <span className="text-xs font-bold text-white">OM</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Orange Money</p>
                        <p className="text-xs text-gray-500">Pay directly with your Orange Money account</p>
                      </div>
                    </label>
                  </div>
                  
                  <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input 
                      type="radio" 
                      id="payment-card" 
                      name="payment-method" 
                      value="card" 
                      className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300"
                    />
                    <label htmlFor="payment-card" className="ml-3 flex items-center cursor-pointer">
                      <div className="h-8 w-8 bg-blue-500 rounded-md flex items-center justify-center mr-3">
                        <span className="text-xs font-bold text-white">CARD</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Credit/Debit Card</p>
                        <p className="text-xs text-gray-500">Pay with Visa, Mastercard or other cards</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Phone Number Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="e.g. 677123456" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-xs text-gray-500 mt-1">We'll send a payment confirmation code to this number</p>
              </div>
              
              {/* Terms and Conditions */}
              <div className="mb-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="text-gray-600">I agree to the <span className="text-indigo-600">Terms of Service</span> and <span className="text-indigo-600">Privacy Policy</span></label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-600 mb-2"><span className="font-medium">Secure Payment:</span> All transactions are encrypted and secure.</p>
                <p className="text-sm text-gray-600"><span className="font-medium">Need Help?</span> Contact our support team at support@healthconnect.cm</p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={closePaymentModal}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handlePaymentSubmission}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Pay 175,000 FCFA
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Health Metrics Modal */}
      {showMetricsModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full transform transition-all my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Update Health Metrics</h3>
              <button 
                onClick={closeMetricsModal}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Weight */}
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h4 className="text-lg font-semibold mb-4 text-blue-800">Weight</h4>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Weight (lbs)</label>
                    <input 
                      type="number" 
                      name="weight" 
                      value={metricsForm.weight} 
                      onChange={handleMetricsFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="mb-1"><span className="font-medium">Last recorded:</span> {healthMetrics.weight} lbs</p>
                    <p><span className="font-medium">BMI:</span> {(healthMetrics.weight / (healthMetrics.height * healthMetrics.height) * 703).toFixed(1)}</p>
                  </div>
                </div>
                
                {/* Blood Pressure */}
                <div className="bg-red-50 p-4 rounded-xl">
                  <h4 className="text-lg font-semibold mb-4 text-red-800">Blood Pressure</h4>
                  <div className="flex space-x-4 mb-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Systolic</label>
                      <input 
                        type="number" 
                        name="bloodPressureSystolic" 
                        value={metricsForm.bloodPressureSystolic} 
                        onChange={handleMetricsFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Diastolic</label>
                      <input 
                        type="number" 
                        name="bloodPressureDiastolic" 
                        value={metricsForm.bloodPressureDiastolic} 
                        onChange={handleMetricsFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="mb-1"><span className="font-medium">Last recorded:</span> {healthMetrics.bloodPressure.systolic}/{healthMetrics.bloodPressure.diastolic} mmHg</p>
                    <p><span className="font-medium">Category:</span> {healthMetrics.bloodPressure.systolic < 120 && healthMetrics.bloodPressure.diastolic < 80 ? 'Normal' : 'Elevated'}</p>
                  </div>
                </div>
                
                {/* Heart Rate */}
                <div className="bg-purple-50 p-4 rounded-xl">
                  <h4 className="text-lg font-semibold mb-4 text-purple-800">Heart Rate</h4>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Resting Heart Rate (bpm)</label>
                    <input 
                      type="number" 
                      name="heartRate" 
                      value={metricsForm.heartRate} 
                      onChange={handleMetricsFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="mb-1"><span className="font-medium">Last recorded:</span> {healthMetrics.heartRate} bpm</p>
                    <p><span className="font-medium">Category:</span> {healthMetrics.heartRate < 60 ? 'Low' : healthMetrics.heartRate > 100 ? 'High' : 'Normal'}</p>
                  </div>
                </div>
                
                {/* Blood Sugar */}
                <div className="bg-orange-50 p-4 rounded-xl">
                  <h4 className="text-lg font-semibold mb-4 text-orange-800">Blood Sugar</h4>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fasting Blood Sugar (mg/dL)</label>
                    <input 
                      type="number" 
                      name="bloodSugar" 
                      value={metricsForm.bloodSugar} 
                      onChange={handleMetricsFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="mb-1"><span className="font-medium">Last recorded:</span> {healthMetrics.bloodSugar} mg/dL</p>
                    <p><span className="font-medium">Category:</span> {healthMetrics.bloodSugar < 100 ? 'Normal' : healthMetrics.bloodSugar < 126 ? 'Prediabetic' : 'Diabetic'}</p>
                  </div>
                </div>
                
                {/* Sleep */}
                <div className="bg-indigo-50 p-4 rounded-xl">
                  <h4 className="text-lg font-semibold mb-4 text-indigo-800">Sleep</h4>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Average Sleep (hours)</label>
                    <input 
                      type="number" 
                      name="sleep" 
                      value={metricsForm.sleep} 
                      onChange={handleMetricsFormChange}
                      step="0.1"
                      min="0"
                      max="24"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="mb-1"><span className="font-medium">Last recorded:</span> {healthMetrics.sleep} hours</p>
                    <p><span className="font-medium">Category:</span> {healthMetrics.sleep < 7 ? 'Insufficient' : healthMetrics.sleep > 9 ? 'Excessive' : 'Optimal'}</p>
                  </div>
                </div>
                
                {/* Physical Activity */}
                <div className="bg-green-50 p-4 rounded-xl">
                  <h4 className="text-lg font-semibold mb-4 text-green-800">Physical Activity</h4>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Daily Steps</label>
                    <input 
                      type="number" 
                      name="steps" 
                      value={metricsForm.steps} 
                      onChange={handleMetricsFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="mb-1"><span className="font-medium">Last recorded:</span> {healthMetrics.steps} steps</p>
                    <p><span className="font-medium">Category:</span> {healthMetrics.steps < 5000 ? 'Sedentary' : healthMetrics.steps < 7500 ? 'Low Active' : healthMetrics.steps < 10000 ? 'Somewhat Active' : 'Active'}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-lg font-semibold mb-4 text-gray-900">Health Insights</h4>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-600 mb-2"><span className="font-medium">Overall Health Score:</span> 82/100 (Good)</p>
                <p className="text-sm text-gray-600 mb-2"><span className="font-medium">Areas of Improvement:</span> Increase daily steps, maintain consistent sleep schedule</p>
                <p className="text-sm text-gray-600"><span className="font-medium">Next Check-up:</span> Schedule a follow-up with Dr. Wilson in 3 months</p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeMetricsModal}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveMetrics}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Medication Modal */}
      {showAddMedicationModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full transform transition-all my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Add New Medication</h3>
              <button 
                onClick={closeAddMedicationModal}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Medication Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={medicationForm.name} 
                    onChange={handleMedicationFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                  <input 
                    type="text" 
                    name="dosage" 
                    value={medicationForm.dosage} 
                    onChange={handleMedicationFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                  <select 
                    name="frequency" 
                    value={medicationForm.frequency} 
                    onChange={handleMedicationFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select frequency</option>
                    <option value="Once daily">Once daily</option>
                    <option value="Twice daily">Twice daily</option>
                    <option value="Three times daily">Three times daily</option>
                    <option value="Four times daily">Four times daily</option>
                    <option value="As needed">As needed</option>
                    <option value="Weekly">Weekly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Refills</label>
                  <input 
                    type="number" 
                    name="refills" 
                    value={medicationForm.refills} 
                    onChange={handleMedicationFormChange}
                    min="0"
                    max="12"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
                <textarea 
                  name="instructions" 
                  value={medicationForm.instructions} 
                  onChange={handleMedicationFormChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={closeAddMedicationModal}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddMedication}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Medication
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Medications Modal */}
      {showMedicationModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full transform transition-all my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {selectedMedication ? 'Edit Medication' : 'Manage Medications'}
              </h3>
              <button 
                onClick={closeMedicationModal}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            {selectedMedication ? (
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-4 text-gray-900">Edit Medication</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Medication Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={medicationForm.name} 
                      onChange={handleMedicationFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                    <input 
                      type="text" 
                      name="dosage" 
                      value={medicationForm.dosage} 
                      onChange={handleMedicationFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                    <select 
                      name="frequency" 
                      value={medicationForm.frequency} 
                      onChange={handleMedicationFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select frequency</option>
                      <option value="Once daily">Once daily</option>
                      <option value="Twice daily">Twice daily</option>
                      <option value="Three times daily">Three times daily</option>
                      <option value="Four times daily">Four times daily</option>
                      <option value="As needed">As needed</option>
                      <option value="Weekly">Weekly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Refills</label>
                    <input 
                      type="number" 
                      name="refills" 
                      value={medicationForm.refills} 
                      onChange={handleMedicationFormChange}
                      min="0"
                      max="12"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
                  <textarea 
                    name="instructions" 
                    value={medicationForm.instructions} 
                    onChange={handleMedicationFormChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={closeMedicationModal}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveMedication}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">Current Medications</h4>
                    <button
                      onClick={handleAddNewMedication}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center"
                    >
                      <span className="mr-1">+</span> Add Medication
                    </button>
                  </div>
                  
                  <div className="overflow-hidden rounded-xl border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medication</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosage</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Refills</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {medications.map((medication) => (
                          <tr key={medication.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{medication.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{medication.dosage}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{medication.frequency}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{medication.refills}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${medication.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                {medication.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button 
                                onClick={() => handleEditMedication(medication)}
                                className="text-blue-600 hover:text-blue-900 mr-3"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => toggleMedicationStatus(medication.id)}
                                className={`${medication.status === 'Active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                              >
                                {medication.status === 'Active' ? 'Deactivate' : 'Activate'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-lg font-semibold mb-4 text-gray-900">Medication Details</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2"><span className="font-medium">Prescription Renewal:</span> Contact your doctor 2 weeks before your medication runs out.</p>
                    <p className="text-sm text-gray-600 mb-2"><span className="font-medium">Side Effects:</span> Report any unusual symptoms to your healthcare provider immediately.</p>
                    <p className="text-sm text-gray-600"><span className="font-medium">Pharmacy Contact:</span> HealthPlus Pharmacy - (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <button
                    onClick={closeMedicationModal}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}