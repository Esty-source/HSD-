import { useState, useEffect } from 'react';
import { 
  ChartBarIcon, 
  UsersIcon, 
  UserIcon, 
  ClipboardDocumentListIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CalendarIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

export default function AnalyticsSection() {
  const [timeRange, setTimeRange] = useState('week');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    totalPatients: 0,
    totalAppointments: 0,
    userGrowth: 0,
    doctorGrowth: 0,
    patientGrowth: 0,
    appointmentGrowth: 0
  });

  // Mock data for charts
  const [chartData, setChartData] = useState({
    userActivity: [],
    appointmentsByDay: [],
    doctorPerformance: [],
    patientDistribution: []
  });

  useEffect(() => {
    // Simulate data loading
    setLoading(true);
    setTimeout(() => {
      // Generate mock data based on time range
      const multiplier = timeRange === 'week' ? 1 : timeRange === 'month' ? 4 : 12;
      
      setStats({
        totalUsers: 1250 + Math.floor(Math.random() * 200),
        totalDoctors: 85 + Math.floor(Math.random() * 15),
        totalPatients: 1150 + Math.floor(Math.random() * 180),
        totalAppointments: 3200 * multiplier + Math.floor(Math.random() * 500),
        userGrowth: 5.2 + (Math.random() * 2 - 1),
        doctorGrowth: 3.8 + (Math.random() * 2 - 1),
        patientGrowth: 7.5 + (Math.random() * 2 - 1),
        appointmentGrowth: 12.3 + (Math.random() * 3 - 1.5)
      });

      // Generate user activity data
      const days = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 90;
      const userActivity = Array.from({ length: days }, (_, i) => ({
        day: i + 1,
        logins: 50 + Math.floor(Math.random() * 100),
        searches: 120 + Math.floor(Math.random() * 200),
        appointments: 30 + Math.floor(Math.random() * 50)
      }));

      // Generate appointments by day
      const appointmentsByDay = Array.from({ length: 7 }, (_, i) => ({
        day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
        count: 50 + Math.floor(Math.random() * 100)
      }));

      // Generate doctor performance data
      const doctorPerformance = [
        { name: 'Dr. Sarah Johnson', appointments: 85 + Math.floor(Math.random() * 20), rating: 4.8, specialty: 'Cardiology' },
        { name: 'Dr. Michael Chen', appointments: 72 + Math.floor(Math.random() * 20), rating: 4.7, specialty: 'Pediatrics' },
        { name: 'Dr. Emily Wilson', appointments: 68 + Math.floor(Math.random() * 20), rating: 4.9, specialty: 'Neurology' },
        { name: 'Dr. David Kim', appointments: 63 + Math.floor(Math.random() * 20), rating: 4.6, specialty: 'Orthopedics' },
        { name: 'Dr. Lisa Brown', appointments: 59 + Math.floor(Math.random() * 20), rating: 4.5, specialty: 'Dermatology' }
      ];

      // Generate patient distribution data
      const patientDistribution = [
        { age: '0-18', count: 220 + Math.floor(Math.random() * 50) },
        { age: '19-35', count: 380 + Math.floor(Math.random() * 70) },
        { age: '36-50', count: 290 + Math.floor(Math.random() * 60) },
        { age: '51-65', count: 180 + Math.floor(Math.random() * 40) },
        { age: '65+', count: 80 + Math.floor(Math.random() * 30) }
      ];

      setChartData({
        userActivity,
        appointmentsByDay,
        doctorPerformance,
        patientDistribution
      });

      setLoading(false);
    }, 800);
  }, [timeRange]);

  const renderGrowthIndicator = (value) => {
    const isPositive = value >= 0;
    return (
      <div className={`flex items-center text-sm font-medium ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
        {isPositive ? (
          <ArrowUpIcon className="h-4 w-4 mr-1" />
        ) : (
          <ArrowDownIcon className="h-4 w-4 mr-1" />
        )}
        <span>{Math.abs(value).toFixed(1)}%</span>
      </div>
    );
  };

  // Calculate max value for chart scaling
  const getMaxValue = (data, key) => {
    return Math.max(...data.map(item => item[key]));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with title and time range selector */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center">
          <ChartBarIcon className="h-7 w-7 text-indigo-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        </div>
        
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              timeRange === 'week'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              timeRange === 'month'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setTimeRange('quarter')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              timeRange === 'quarter'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Quarter
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
          {/* Key metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Users */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalUsers.toLocaleString()}</p>
                  <div className="mt-1">{renderGrowthIndicator(stats.userGrowth)}</div>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <UsersIcon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: `${Math.min(100, Math.abs(stats.userGrowth) * 5)}%` }}></div>
              </div>
            </div>

            {/* Total Doctors */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Doctors</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalDoctors.toLocaleString()}</p>
                  <div className="mt-1">{renderGrowthIndicator(stats.doctorGrowth)}</div>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <UserIcon className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full rounded-full" style={{ width: `${Math.min(100, Math.abs(stats.doctorGrowth) * 5)}%` }}></div>
              </div>
            </div>

            {/* Total Patients */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Patients</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalPatients.toLocaleString()}</p>
                  <div className="mt-1">{renderGrowthIndicator(stats.patientGrowth)}</div>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <UserGroupIcon className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full" style={{ width: `${Math.min(100, Math.abs(stats.patientGrowth) * 5)}%` }}></div>
              </div>
            </div>

            {/* Total Appointments */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Appointments</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalAppointments.toLocaleString()}</p>
                  <div className="mt-1">{renderGrowthIndicator(stats.appointmentGrowth)}</div>
                </div>
                <div className="bg-amber-100 p-3 rounded-lg">
                  <ClipboardDocumentListIcon className="h-6 w-6 text-amber-600" />
                </div>
              </div>
              <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: `${Math.min(100, Math.abs(stats.appointmentGrowth) * 5)}%` }}></div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Appointments by Day Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 text-indigo-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Appointments by Day</h3>
                </div>
                <div className="text-sm text-gray-500">
                  {timeRange === 'week' ? 'This Week' : timeRange === 'month' ? 'This Month' : 'This Quarter'}
                </div>
              </div>
              
              <div className="h-64 relative">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between">
                  {[0, 1, 2, 3, 4].map((_, i) => (
                    <div key={i} className="border-t border-gray-100 w-full h-0" />
                  ))}
                </div>
                
                {/* Y-axis labels */}
                <div className="absolute left-0 inset-y-0 flex flex-col justify-between text-xs text-gray-500 pr-2">
                  {[0, 25, 50, 75, 100].map((val, i) => (
                    <div key={i} className="-mt-1 -translate-y-1/2">{val}</div>
                  ))}
                </div>
                
                {/* Chart bars */}
                <div className="absolute inset-0 pl-6 flex items-end justify-between space-x-2">
                  {chartData.appointmentsByDay.map((day, index) => {
                    const maxCount = Math.max(...chartData.appointmentsByDay.map(d => d.count));
                    const height = (day.count / maxCount) * 100;
                    return (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div 
                          className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg transition-all duration-500 hover:from-indigo-700 hover:to-indigo-500 shadow-md group relative"
                          style={{ height: `${Math.max(height, 1)}%` }}
                        >
                          <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 transition-opacity">
                            {day.count}
                          </div>
                        </div>
                        <div className="text-xs font-medium text-gray-600 mt-2">{day.day}</div>
                        <div className="text-xs font-semibold text-gray-800">{day.count}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Patient Age Distribution */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <UserGroupIcon className="h-5 w-5 text-purple-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Patient Age Distribution</h3>
                </div>
                <div className="text-sm text-gray-500">
                  Total: {chartData.patientDistribution.reduce((sum, item) => sum + item.count, 0)} patients
                </div>
              </div>
              
              <div className="h-64 relative">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between">
                  {[0, 1, 2, 3, 4].map((_, i) => (
                    <div key={i} className="border-t border-gray-100 w-full h-0" />
                  ))}
                </div>
                
                {/* Y-axis labels */}
                <div className="absolute left-0 inset-y-0 flex flex-col justify-between text-xs text-gray-500 pr-2">
                  {[0, 25, 50, 75, 100].map((val, i) => (
                    <div key={i} className="-mt-1 -translate-y-1/2">{val}</div>
                  ))}
                </div>
                
                {/* Chart bars */}
                <div className="absolute inset-0 pl-6 flex items-end justify-between space-x-2">
                  {chartData.patientDistribution.map((age, index) => {
                    const maxCount = Math.max(...chartData.patientDistribution.map(d => d.count));
                    const height = (age.count / maxCount) * 100;
                    return (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div 
                          className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg transition-all duration-500 hover:from-purple-700 hover:to-purple-500 shadow-md group relative"
                          style={{ height: `${Math.max(height, 1)}%` }}
                        >
                          <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 transition-opacity">
                            {age.count}
                          </div>
                        </div>
                        <div className="text-xs font-medium text-gray-600 mt-2">{age.age}</div>
                        <div className="text-xs font-semibold text-gray-800">{age.count}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Top Performing Doctors */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center mb-6">
                <AcademicCapIcon className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Top Performing Doctors</h3>
              </div>
              
              <div className="space-y-4">
                {chartData.doctorPerformance.map((doctor, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                        {doctor.name.split(' ')[1][0]}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{doctor.name}</p>
                        <div className="flex items-center">
                          <span className="text-xs text-gray-500 mr-2">{doctor.specialty}</span>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg 
                                key={i} 
                                className={`h-3 w-3 ${i < Math.floor(doctor.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span className="text-xs text-gray-500 ml-1">{doctor.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                        {doctor.appointments} appointments
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* User Activity Trends */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center mb-6">
                <ClockIcon className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity Trends</h3>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <UsersIcon className="h-4 w-4 text-blue-600" />
                      </div>
                      <p className="text-sm font-medium text-gray-700">Logins</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {chartData.userActivity.slice(-7).reduce((sum, day) => sum + day.logins, 0).toLocaleString()} 
                      <span className="text-xs text-gray-500 ml-1">last 7 days</span>
                    </p>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                        <MagnifyingGlassIcon className="h-4 w-4 text-emerald-600" />
                      </div>
                      <p className="text-sm font-medium text-gray-700">Searches</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {chartData.userActivity.slice(-7).reduce((sum, day) => sum + day.searches, 0).toLocaleString()}
                      <span className="text-xs text-gray-500 ml-1">last 7 days</span>
                    </p>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                        <CalendarIcon className="h-4 w-4 text-purple-600" />
                      </div>
                      <p className="text-sm font-medium text-gray-700">Appointments</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {chartData.userActivity.slice(-7).reduce((sum, day) => sum + day.appointments, 0).toLocaleString()}
                      <span className="text-xs text-gray-500 ml-1">last 7 days</span>
                    </p>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Footer */}
      <div className="text-xs text-center text-gray-500 mt-8">
        Data last updated: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
}
