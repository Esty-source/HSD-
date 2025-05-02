import { CalendarIcon, UserGroupIcon, ClipboardDocumentListIcon, VideoCameraIcon, DocumentTextIcon, ChartBarIcon, ArrowTrendingUpIcon, CurrencyDollarIcon, ClockIcon, CheckCircleIcon, XMarkIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import { CalendarIcon as CalendarIconSolid, UserGroupIcon as UserGroupIconSolid, ClipboardDocumentListIcon as ClipboardDocumentListIconSolid, ChartBarIcon as ChartBarIconSolid } from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function OverviewSection({ onTabChange }) {
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [selectedStat, setSelectedStat] = useState(null);
  
  function handleViewSchedule() {
    onTabChange('appointments');
  }

  function handleViewPatients() {
    onTabChange('patients');
  }

  function handleViewRecords() {
    onTabChange('records');
  }

  function handleViewSessions() {
    onTabChange('telemedicine');
  }

  function handleViewPrescriptions() {
    onTabChange('prescriptions');
  }

  function handleViewAnalytics() {
    setShowPerformanceModal(true);
  }
  
  function closePerformanceModal() {
    setShowPerformanceModal(false);
  }
  
  function handleStatCardClick(statType) {
    setSelectedStat(statType);
    setShowStatsModal(true);
  }
  
  function closeStatsModal() {
    setShowStatsModal(false);
    setSelectedStat(null);
  }

  // Mock data for performance analytics
  const performanceData = {
    patientSatisfaction: {
      current: 95,
      previous: 92,
      change: 3,
      trend: 'up'
    },
    appointmentCompletion: {
      current: 88,
      previous: 85,
      change: 3,
      trend: 'up'
    },
    followUpRate: {
      current: 76,
      previous: 72,
      change: 4,
      trend: 'up'
    },
    responseTime: {
      current: 4.2,
      previous: 4.5,
      change: 0.3,
      trend: 'down',
      unit: 'hours'
    },
    patientRetention: {
      current: 92,
      previous: 89,
      change: 3,
      trend: 'up'
    },
    revenuePerPatient: {
      current: 45000,
      previous: 42000,
      change: 7.1,
      trend: 'up',
      unit: 'FCFA'
    },
    monthlyStats: [
      { month: 'Jan', patients: 18, satisfaction: 91 },
      { month: 'Feb', patients: 22, satisfaction: 89 },
      { month: 'Mar', patients: 20, satisfaction: 90 },
      { month: 'Apr', patients: 25, satisfaction: 92 },
      { month: 'May', patients: 28, satisfaction: 93 },
      { month: 'Jun', patients: 30, satisfaction: 95 }
    ],
    patientDemographics: [
      { age: '0-18', percentage: 15 },
      { age: '19-35', percentage: 35 },
      { age: '36-50', percentage: 30 },
      { age: '51-65', percentage: 15 },
      { age: '65+', percentage: 5 }
    ],
    topConditions: [
      { condition: 'Hypertension', count: 42 },
      { condition: 'Diabetes', count: 38 },
      { condition: 'Respiratory Issues', count: 27 },
      { condition: 'Joint Pain', count: 24 },
      { condition: 'Gastrointestinal', count: 19 }
    ]
  };
  
  return (
    <div>
      <div className="w-full space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            onClick={() => handleStatCardClick('appointments')}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Appointments Today</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center">
                <CalendarIconSolid className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-xs font-medium text-green-500">+2 from yesterday</span>
            </div>
          </div>
          
          <div 
            onClick={() => handleStatCardClick('patients')}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">128</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center">
                <UserGroupIconSolid className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-xs font-medium text-green-500">+5 this month</span>
            </div>
          </div>
          
          <div 
            onClick={() => handleStatCardClick('sessions')}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Upcoming Sessions</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">2</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center">
                <VideoCameraIcon className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-xs font-medium text-green-500">+3 this week</span>
            </div>
          </div>
          
          <div 
            onClick={() => handleStatCardClick('satisfaction')}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Patient Satisfaction</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">95%</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center">
                <ChartBarIconSolid className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-xs font-medium text-green-500">+1% this month</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Appointments */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Today's Appointments</h3>
                <button 
                  onClick={handleViewSchedule}
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  View All
                </button>
              </div>
            </div>
            
            <div className="divide-y divide-gray-100">
              <div className="p-5 hover:bg-gray-50 transition-colors duration-150">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 font-medium">AM</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">Amadou Mbaye</p>
                    <p className="text-sm text-gray-500 truncate">10:30 AM - Check-up</p>
                  </div>
                  <div className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-100 text-green-800">
                    Confirmed
                  </div>
                </div>
              </div>
              
              <div className="p-5 hover:bg-gray-50 transition-colors duration-150">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 font-medium">FD</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">Fatou Diallo</p>
                    <p className="text-sm text-gray-500 truncate">2:00 PM - Consultation</p>
                  </div>
                  <div className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
                    Pending
                  </div>
                </div>
              </div>
              
              <div className="p-5 hover:bg-gray-50 transition-colors duration-150">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 font-medium">MS</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">Moussa Sow</p>
                    <p className="text-sm text-gray-500 truncate">4:30 PM - Follow-up</p>
                  </div>
                  <div className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-100 text-green-800">
                    Confirmed
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Performance Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden col-span-1 lg:col-span-2">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Performance Overview</h3>
                <button 
                  onClick={handleViewAnalytics}
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  View Details
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Patient Satisfaction */}
                <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Patient Satisfaction</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{performanceData.patientSatisfaction.current}%</p>
                    </div>
                    <div className={`flex items-center ${performanceData.patientSatisfaction.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {performanceData.patientSatisfaction.trend === 'up' ? (
                        <ArrowUpIcon className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4 mr-1" />
                      )}
                      <span className="text-xs font-medium">{performanceData.patientSatisfaction.change}%</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${performanceData.patientSatisfaction.current}%` }}></div>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-gray-500">Based on patient feedback surveys</p>
                </div>
                
                {/* Appointment Completion */}
                <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Appointment Completion</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{performanceData.appointmentCompletion.current}%</p>
                    </div>
                    <div className={`flex items-center ${performanceData.appointmentCompletion.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {performanceData.appointmentCompletion.trend === 'up' ? (
                        <ArrowUpIcon className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4 mr-1" />
                      )}
                      <span className="text-xs font-medium">{performanceData.appointmentCompletion.change}%</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${performanceData.appointmentCompletion.current}%` }}></div>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-gray-500">Percentage of scheduled appointments completed</p>
                </div>
                
                {/* Follow-up Rate */}
                <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Follow-up Rate</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{performanceData.followUpRate.current}%</p>
                    </div>
                    <div className={`flex items-center ${performanceData.followUpRate.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {performanceData.followUpRate.trend === 'up' ? (
                        <ArrowUpIcon className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4 mr-1" />
                      )}
                      <span className="text-xs font-medium">{performanceData.followUpRate.change}%</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${performanceData.followUpRate.current}%` }}></div>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-gray-500">Patients who schedule follow-up appointments</p>
                </div>
                
                {/* Response Time */}
                <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Avg. Response Time</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{performanceData.responseTime.current} hrs</p>
                    </div>
                    <div className={`flex items-center ${performanceData.responseTime.trend === 'down' ? 'text-green-500' : 'text-red-500'}`}>
                      {performanceData.responseTime.trend === 'down' ? (
                        <ArrowDownIcon className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowUpIcon className="h-4 w-4 mr-1" />
                      )}
                      <span className="text-xs font-medium">{performanceData.responseTime.change} hrs</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${(performanceData.responseTime.current / 8) * 100}%` }}></div>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-gray-500">Average time to respond to patient inquiries</p>
                </div>
                
                {/* Patient Retention */}
                <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Patient Retention</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{performanceData.patientRetention.current}%</p>
                    </div>
                    <div className={`flex items-center ${performanceData.patientRetention.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {performanceData.patientRetention.trend === 'up' ? (
                        <ArrowUpIcon className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4 mr-1" />
                      )}
                      <span className="text-xs font-medium">{performanceData.patientRetention.change}%</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${performanceData.patientRetention.current}%` }}></div>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-gray-500">Patients who return within 12 months</p>
                </div>
                
                {/* Revenue Per Patient */}
                <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Revenue Per Patient</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{performanceData.revenuePerPatient.current.toLocaleString()} FCFA</p>
                    </div>
                    <div className={`flex items-center ${performanceData.revenuePerPatient.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {performanceData.revenuePerPatient.trend === 'up' ? (
                        <ArrowUpIcon className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4 mr-1" />
                      )}
                      <span className="text-xs font-medium">{performanceData.revenuePerPatient.change}%</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(performanceData.revenuePerPatient.current / 50000) * 100}%` }}></div>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-gray-500">Average revenue generated per patient</p>
                </div>
              </div>
              
              {/* Monthly Trends */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Trends</h3>
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="h-64 relative">
                    {/* Graph Grid Lines */}
                    <div className="absolute inset-0 flex flex-col justify-between">
                      {[0, 1, 2, 3, 4].map((_, i) => (
                        <div key={i} className="w-full h-px bg-gray-200" />
                      ))}
                    </div>
                    
                    {/* Y-axis Labels */}
                    <div className="absolute left-0 inset-y-0 flex flex-col justify-between items-start pr-2">
                      <span className="text-xs text-gray-500">100%</span>
                      <span className="text-xs text-gray-500">75%</span>
                      <span className="text-xs text-gray-500">50%</span>
                      <span className="text-xs text-gray-500">25%</span>
                      <span className="text-xs text-gray-500">0%</span>
                    </div>
                    
                    {/* Graph Content */}
                    <div className="absolute inset-0 pl-8 flex items-end">
                      {/* Patient Count Line */}
                      <svg className="absolute inset-0 overflow-visible" style={{ paddingBottom: '20px' }}>
                        <polyline
                          points={
                            performanceData.monthlyStats
                              .map((stat, i) => {
                                const x = (i / (performanceData.monthlyStats.length - 1)) * 100;
                                const y = 100 - ((stat.patients / 30) * 100);
                                return `${x}% ${y}%`;
                              })
                              .join(' ')
                          }
                          fill="none"
                          stroke="#6366F1"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {performanceData.monthlyStats.map((stat, i) => {
                          const x = (i / (performanceData.monthlyStats.length - 1)) * 100;
                          const y = 100 - ((stat.patients / 30) * 100);
                          return (
                            <circle
                              key={i}
                              cx={`${x}%`}
                              cy={`${y}%`}
                              r="4"
                              fill="#6366F1"
                              stroke="white"
                              strokeWidth="1"
                            />
                          );
                        })}
                      </svg>
                      
                      {/* Satisfaction Line */}
                      <svg className="absolute inset-0 overflow-visible" style={{ paddingBottom: '20px' }}>
                        <polyline
                          points={
                            performanceData.monthlyStats
                              .map((stat, i) => {
                                const x = (i / (performanceData.monthlyStats.length - 1)) * 100;
                                const y = 100 - stat.satisfaction;
                                return `${x}% ${y}%`;
                              })
                              .join(' ')
                          }
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {performanceData.monthlyStats.map((stat, i) => {
                          const x = (i / (performanceData.monthlyStats.length - 1)) * 100;
                          const y = 100 - stat.satisfaction;
                          return (
                            <circle
                              key={i}
                              cx={`${x}%`}
                              cy={`${y}%`}
                              r="4"
                              fill="#10B981"
                              stroke="white"
                              strokeWidth="1"
                            />
                          );
                        })}
                      </svg>
                    </div>
                    
                    {/* X-axis Labels */}
                    <div className="absolute bottom-0 inset-x-0 flex justify-between items-center pt-2" style={{ paddingLeft: '30px' }}>
                      {performanceData.monthlyStats.map((stat, i) => (
                        <span key={i} className="text-xs font-medium text-gray-500">{stat.month}</span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Legend */}
                  <div className="flex justify-center mt-6 space-x-8">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div>
                      <span className="text-xs text-gray-600">Patient Count</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-xs text-gray-600">Satisfaction %</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Patient Demographics */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Patient Demographics</h3>
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="space-y-4">
                    {performanceData.patientDemographics.map((demo, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{demo.age}</span>
                        <div className="flex-1 mx-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-indigo-500 h-2 rounded-full" 
                              style={{ width: `${demo.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{demo.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top Conditions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Conditions Treated</h3>
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="space-y-4">
                    {performanceData.topConditions.map((condition, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{condition.condition}</span>
                        <div className="flex-1 mx-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${(condition.count / 45) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{condition.count} patients</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Analytics Modal */}
      {/* Stats Detail Modal */}
      {showStatsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl w-full relative z-50 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {selectedStat === 'appointments' && 'Today\'s Appointments'}
                {selectedStat === 'patients' && 'Patient Statistics'}
                {selectedStat === 'sessions' && 'Upcoming Telemedicine Sessions'}
                {selectedStat === 'satisfaction' && 'Patient Satisfaction Details'}
              </h2>
              <button
                onClick={closeStatsModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            {selectedStat === 'appointments' && (
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-blue-800">Summary</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Today</span>
                  </div>
                  <p className="text-blue-700">You have 3 appointments scheduled for today.</p>
                </div>
                
                <div className="divide-y divide-gray-200">
                  <div className="py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">John Doe</h4>
                        <p className="text-sm text-gray-600">09:00 AM - Regular Checkup</p>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Confirmed</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">Patient has history of hypertension</p>
                  </div>
                  
                  <div className="py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">Emily Davis</h4>
                        <p className="text-sm text-gray-600">11:15 AM - Annual Physical</p>
                      </div>
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Pending</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">First visit to the clinic</p>
                  </div>
                  
                  <div className="py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">Olivia Martin</h4>
                        <p className="text-sm text-gray-600">02:30 PM - Vaccination</p>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Confirmed</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">COVID-19 booster shot</p>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={handleViewSchedule}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                  >
                    View Full Schedule
                  </button>
                </div>
              </div>
            )}
            
            {selectedStat === 'patients' && (
              <div className="space-y-6">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-indigo-800">Patient Growth</h3>
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Last 6 Months</span>
                  </div>
                  <p className="text-indigo-700">Your patient base has grown by 12% in the last 6 months.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Patient Demographics</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 w-20">0-18:</span>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                      </div>
                      <span className="text-sm text-gray-600 ml-2">15%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 w-20">19-35:</span>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '35%' }}></div>
                      </div>
                      <span className="text-sm text-gray-600 ml-2">35%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 w-20">36-50:</span>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                      <span className="text-sm text-gray-600 ml-2">30%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 w-20">51-65:</span>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                      </div>
                      <span className="text-sm text-gray-600 ml-2">15%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 w-20">65+:</span>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '5%' }}></div>
                      </div>
                      <span className="text-sm text-gray-600 ml-2">5%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Top Conditions</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-800">Hypertension</span>
                      <span className="text-sm font-medium text-gray-900">42 patients</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-800">Diabetes</span>
                      <span className="text-sm font-medium text-gray-900">38 patients</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-800">Respiratory Issues</span>
                      <span className="text-sm font-medium text-gray-900">27 patients</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-800">Joint Pain</span>
                      <span className="text-sm font-medium text-gray-900">24 patients</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-800">Gastrointestinal</span>
                      <span className="text-sm font-medium text-gray-900">19 patients</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={handleViewPatients}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                  >
                    View All Patients
                  </button>
                </div>
              </div>
            )}
            
            {selectedStat === 'sessions' && (
              <div className="space-y-6">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-purple-800">Telemedicine Overview</h3>
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">This Week</span>
                  </div>
                  <p className="text-purple-700">You have 2 upcoming telemedicine sessions scheduled this week.</p>
                </div>
                
                <div className="divide-y divide-gray-200">
                  <div className="py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">Jane Smith</h4>
                        <p className="text-sm text-gray-600">Tomorrow, 10:30 AM - Follow-up</p>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Confirmed</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">Follow-up for diabetes management</p>
                    <div className="mt-3 flex items-center text-sm text-gray-600">
                      <span className="mr-3">📱 +237 676 234 567</span>
                      <span>📧 jane.smith@example.com</span>
                    </div>
                  </div>
                  
                  <div className="py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">Daniel Brown</h4>
                        <p className="text-sm text-gray-600">May 4, 09:45 AM - Consultation</p>
                      </div>
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Pending</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">New patient consultation</p>
                    <div className="mt-3 flex items-center text-sm text-gray-600">
                      <span className="mr-3">📱 +237 678 456 789</span>
                      <span>📧 daniel.brown@example.com</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={handleViewSessions}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                  >
                    View All Sessions
                  </button>
                </div>
              </div>
            )}
            
            {selectedStat === 'satisfaction' && (
              <div className="space-y-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-green-800">Satisfaction Score</h3>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Last 6 Months</span>
                  </div>
                  <p className="text-green-700">Your patient satisfaction score has increased from 92% to 95% in the last 6 months.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Monthly Satisfaction Trend</h3>
                  <div className="h-48 w-full">
                    <div className="flex h-full items-end">
                      {performanceData.monthlyStats.map((stat, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div 
                            className="w-full max-w-[30px] bg-indigo-600 rounded-t" 
                            style={{ height: `${stat.satisfaction}%` }}
                          ></div>
                          <span className="text-xs text-gray-600 mt-1">{stat.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Key Performance Indicators</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-700">Appointment Completion Rate</span>
                        <span className="text-sm font-medium text-gray-900">88%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '88%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-700">Follow-up Rate</span>
                        <span className="text-sm font-medium text-gray-900">76%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '76%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-700">Patient Retention</span>
                        <span className="text-sm font-medium text-gray-900">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-700">Average Response Time</span>
                        <span className="text-sm font-medium text-gray-900">4.2 hours</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '84%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={handleViewAnalytics}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                  >
                    View Full Analytics
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {showPerformanceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">Performance Analytics Dashboard</h2>
              <button 
                onClick={closePerformanceModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Executive Summary */}
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                <h3 className="text-lg font-semibold text-indigo-800 mb-2">Executive Summary</h3>
                <p className="text-sm text-indigo-700">
                  Your practice is performing well with a 95% patient satisfaction rate, which is 3% higher than last quarter.
                  Revenue per patient has increased by 7.1%, and patient retention remains strong at 92%.
                  Areas for improvement include follow-up rate (76%) and response time (4.2 hours).
                </p>
              </div>

              {/* Key Performance Indicators */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Performance Indicators</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Patient Satisfaction */}
                  <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Patient Satisfaction</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{performanceData.patientSatisfaction.current}%</p>
                      </div>
                      <div className={`flex items-center ${performanceData.patientSatisfaction.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {performanceData.patientSatisfaction.trend === 'up' ? (
                          <ArrowUpIcon className="h-4 w-4 mr-1" />
                        ) : (
                          <ArrowDownIcon className="h-4 w-4 mr-1" />
                        )}
                        <span className="text-xs font-medium">{performanceData.patientSatisfaction.change}%</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${performanceData.patientSatisfaction.current}%` }}></div>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-gray-500">Based on patient feedback surveys</p>
                    <div className="mt-3 text-xs text-gray-700 bg-gray-50 p-2 rounded">
                      <p className="font-semibold">Insight:</p>
                      <p>Your satisfaction score is in the top 10% of practitioners in your specialty.</p>
                    </div>
                  </div>
                  
                  {/* Appointment Completion */}
                  <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Appointment Completion</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{performanceData.appointmentCompletion.current}%</p>
                      </div>
                      <div className={`flex items-center ${performanceData.appointmentCompletion.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {performanceData.appointmentCompletion.trend === 'up' ? (
                          <ArrowUpIcon className="h-4 w-4 mr-1" />
                        ) : (
                          <ArrowDownIcon className="h-4 w-4 mr-1" />
                        )}
                        <span className="text-xs font-medium">{performanceData.appointmentCompletion.change}%</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${performanceData.appointmentCompletion.current}%` }}></div>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-gray-500">Percentage of scheduled appointments completed</p>
                    <div className="mt-3 text-xs text-gray-700 bg-gray-50 p-2 rounded">
                      <p className="font-semibold">Insight:</p>
                      <p>Most cancellations occur within 24 hours of appointment time.</p>
                    </div>
                  </div>
                  
                  {/* Follow-up Rate */}
                  <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Follow-up Rate</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{performanceData.followUpRate.current}%</p>
                      </div>
                      <div className={`flex items-center ${performanceData.followUpRate.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {performanceData.followUpRate.trend === 'up' ? (
                          <ArrowUpIcon className="h-4 w-4 mr-1" />
                        ) : (
                          <ArrowDownIcon className="h-4 w-4 mr-1" />
                        )}
                        <span className="text-xs font-medium">{performanceData.followUpRate.change}%</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${performanceData.followUpRate.current}%` }}></div>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-gray-500">Patients who schedule follow-up appointments</p>
                    <div className="mt-3 text-xs text-gray-700 bg-gray-50 p-2 rounded">
                      <p className="font-semibold">Insight:</p>
                      <p>Implementing automated reminders could improve this metric by 15-20%.</p>
                    </div>
                  </div>
                  
                  {/* Response Time */}
                  <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Avg. Response Time</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{performanceData.responseTime.current} hrs</p>
                      </div>
                      <div className={`flex items-center ${performanceData.responseTime.trend === 'down' ? 'text-green-500' : 'text-red-500'}`}>
                        {performanceData.responseTime.trend === 'down' ? (
                          <ArrowDownIcon className="h-4 w-4 mr-1" />
                        ) : (
                          <ArrowUpIcon className="h-4 w-4 mr-1" />
                        )}
                        <span className="text-xs font-medium">{performanceData.responseTime.change} hrs</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${(performanceData.responseTime.current / 8) * 100}%` }}></div>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-gray-500">Average time to respond to patient inquiries</p>
                    <div className="mt-3 text-xs text-gray-700 bg-gray-50 p-2 rounded">
                      <p className="font-semibold">Insight:</p>
                      <p>Industry benchmark is 3.5 hours. Consider delegating initial responses.</p>
                    </div>
                  </div>
                  
                  {/* Patient Retention */}
                  <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Patient Retention</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{performanceData.patientRetention.current}%</p>
                      </div>
                      <div className={`flex items-center ${performanceData.patientRetention.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {performanceData.patientRetention.trend === 'up' ? (
                          <ArrowUpIcon className="h-4 w-4 mr-1" />
                        ) : (
                          <ArrowDownIcon className="h-4 w-4 mr-1" />
                        )}
                        <span className="text-xs font-medium">{performanceData.patientRetention.change}%</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${performanceData.patientRetention.current}%` }}></div>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-gray-500">Patients who return within 12 months</p>
                    <div className="mt-3 text-xs text-gray-700 bg-gray-50 p-2 rounded">
                      <p className="font-semibold">Insight:</p>
                      <p>Your retention rate is excellent, 8% above regional average.</p>
                    </div>
                  </div>
                  
                  {/* Revenue Per Patient */}
                  <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Revenue Per Patient</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{performanceData.revenuePerPatient.current.toLocaleString()} FCFA</p>
                      </div>
                      <div className={`flex items-center ${performanceData.revenuePerPatient.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {performanceData.revenuePerPatient.trend === 'up' ? (
                          <ArrowUpIcon className="h-4 w-4 mr-1" />
                        ) : (
                          <ArrowDownIcon className="h-4 w-4 mr-1" />
                        )}
                        <span className="text-xs font-medium">{performanceData.revenuePerPatient.change}%</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(performanceData.revenuePerPatient.current / 50000) * 100}%` }}></div>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-gray-500">Average revenue generated per patient</p>
                    <div className="mt-3 text-xs text-gray-700 bg-gray-50 p-2 rounded">
                      <p className="font-semibold">Insight:</p>
                      <p>Adding specialized services could increase this by 15-20%.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Monthly Trends Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Performance Trends</h3>
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="h-80 flex items-end justify-between space-x-2">
                    {performanceData.monthlyStats.map((stat, index) => (
                      <div key={index} className="flex flex-col items-center space-y-2">
                        <div className="flex space-x-1">
                          <div 
                            className="w-12 bg-indigo-500 rounded-t-md" 
                            style={{ height: `${(stat.patients / 30) * 100}%` }}
                          ></div>
                          <div 
                            className="w-12 bg-green-500 rounded-t-md" 
                            style={{ height: `${(stat.satisfaction / 100) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-500">{stat.month}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div>
                      <span className="text-xs text-gray-600">Patient Count</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-xs text-gray-600">Satisfaction %</span>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-700 bg-gray-50 p-3 rounded">
                    <p className="font-semibold mb-1">Trend Analysis:</p>
                    <p>Your patient count has increased steadily over the past 6 months, with a 66% growth from January to June. 
                    Patient satisfaction has remained consistently high, with a slight improvement in the most recent months.</p>
                  </div>
                </div>
              </div>

              {/* Patient Demographics */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Patient Demographics Analysis</h3>
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="space-y-4">
                    {performanceData.patientDemographics.map((demo, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{demo.age}</span>
                        <div className="flex-1 mx-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-indigo-500 h-2 rounded-full" 
                              style={{ width: `${demo.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{demo.percentage}%</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-sm text-gray-700 bg-gray-50 p-3 rounded">
                    <p className="font-semibold mb-1">Demographic Insights:</p>
                    <p>Your practice serves a diverse age range with a concentration in the 19-50 age groups (65%). 
                    Consider targeted health programs for these primary demographics, such as preventive care for the 19-35 group 
                    and chronic condition management for the 36-50 group.</p>
                  </div>
                </div>
              </div>

              {/* Top Conditions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Conditions & Treatment Analysis</h3>
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="space-y-4">
                    {performanceData.topConditions.map((condition, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{condition.condition}</span>
                        <div className="flex-1 mx-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${(condition.count / 45) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{condition.count} patients</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-sm text-gray-700 bg-gray-50 p-3 rounded">
                    <p className="font-semibold mb-1">Treatment Pattern Analysis:</p>
                    <p>Hypertension and diabetes represent 53% of your most common conditions treated. 
                    Consider developing specialized care protocols for these conditions to improve outcomes 
                    and potentially increase revenue through comprehensive management programs.</p>
                  </div>
                </div>
              </div>
              
              {/* Recommendations */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Strategic Recommendations</h3>
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-green-500 mr-2">
                        <CheckCircleIcon />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">Implement Follow-up System</p>
                        <p className="text-sm text-gray-700">Consider implementing an automated follow-up reminder system to improve your follow-up rate. 
                        This could increase patient retention and health outcomes, particularly for chronic conditions.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-green-500 mr-2">
                        <CheckCircleIcon />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">Maintain Patient Satisfaction</p>
                        <p className="text-sm text-gray-700">Your patient satisfaction is excellent at 95%. Continue collecting detailed feedback 
                        and consider implementing a patient loyalty program to maintain this high level of satisfaction.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-green-500 mr-2">
                        <CheckCircleIcon />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">Develop Specialized Services</p>
                        <p className="text-sm text-gray-700">Consider offering specialized services for hypertension and diabetes management 
                        to better serve your most common patient needs. This could include nutrition counseling, medication management programs, 
                        and regular monitoring services.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-green-500 mr-2">
                        <CheckCircleIcon />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">Improve Response Time</p>
                        <p className="text-sm text-gray-700">Your current response time of 4.2 hours is above the industry benchmark of 3.5 hours. 
                        Consider implementing a triage system for patient inquiries or delegating initial responses to support staff to improve this metric.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-green-500 mr-2">
                        <CheckCircleIcon />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">Target Marketing to Key Demographics</p>
                        <p className="text-sm text-gray-700">With 65% of your patients in the 19-50 age range, consider targeted marketing campaigns 
                        and services specifically designed for these demographics to further strengthen your patient base.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}