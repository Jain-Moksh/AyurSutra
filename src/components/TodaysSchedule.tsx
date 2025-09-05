import React from 'react';

interface Appointment {
  id: string;
  time: string;
  patientName: string;
  therapy: string;
  status: 'completed' | 'in-progress' | 'upcoming';
}

const TodaysSchedule: React.FC = () => {
  const appointments: Appointment[] = [
    { id: '1', time: '09:00 - 09:45 AM', patientName: 'Priya Deshmukh', therapy: 'Abhyanga Therapy', status: 'completed' },
    { id: '2', time: '10:00 - 10:45 AM', patientName: 'Rahul Mehta', therapy: 'Shirodhara', status: 'completed' },
    { id: '3', time: '11:00 - 11:45 AM', patientName: 'Ananya Sharma', therapy: 'Consultation', status: 'in-progress' },
    { id: '4', time: '12:00 - 12:45 PM', patientName: 'Vikram Patel', therapy: 'Nasya', status: 'upcoming' },
    { id: '5', time: '02:00 - 02:45 PM', patientName: 'Meera Joshi', therapy: 'Udvartana', status: 'upcoming' },
    { id: '6', time: '03:00 - 03:45 PM', patientName: 'Arjun Singh', therapy: 'Pinda Sweda', status: 'upcoming' },
    { id: '7', time: '04:00 - 04:45 PM', patientName: 'Neha Kapoor', therapy: 'Consultation', status: 'upcoming' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-gray-100 text-gray-600';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'upcoming':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'Progress';
      case 'upcoming':
        return 'Upcoming';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 lg:mb-6 space-y-3 sm:space-y-0">
        <h2 className="text-lg lg:text-xl font-semibold text-gray-800">Today's Schedule</h2>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <button className="bg-ayur-green text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-ayur-light-green transition-colors flex items-center justify-center space-x-2 text-sm lg:text-base">
            <span>+</span>
            <span className="hidden sm:inline">Add Appointment</span>
            <span className="sm:hidden">Add</span>
          </button>
          <button className="border border-ayur-green text-ayur-green px-3 lg:px-4 py-2 rounded-lg hover:bg-ayur-green hover:text-white transition-colors text-sm lg:text-base">
            <span className="hidden sm:inline">View Calendar</span>
            <span className="sm:hidden">Calendar</span>
          </button>
        </div>
      </div>

      {/* Mobile: Vertical stack */}
      <div className="block md:hidden space-y-3">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className={`p-4 rounded-lg border ${
              appointment.status === 'completed' 
                ? 'bg-gray-50 border-gray-200' 
                : 'bg-green-50 border-green-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">{appointment.time}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                {getStatusText(appointment.status)}
              </span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">{appointment.patientName}</h3>
            <p className="text-sm text-gray-600">{appointment.therapy}</p>
          </div>
        ))}
      </div>

      {/* Tablet: 2 columns grid */}
      <div className="hidden md:block lg:hidden">
        <div className="grid grid-cols-2 gap-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className={`p-4 rounded-lg border ${
                appointment.status === 'completed' 
                  ? 'bg-gray-50 border-gray-200' 
                  : 'bg-green-50 border-green-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">{appointment.time}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                  {getStatusText(appointment.status)}
                </span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1 text-sm">{appointment.patientName}</h3>
              <p className="text-xs text-gray-600">{appointment.therapy}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Laptop: 3 columns grid */}
      <div className="hidden lg:block xl:hidden">
        <div className="grid grid-cols-3 gap-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className={`p-4 rounded-lg border ${
                appointment.status === 'completed' 
                  ? 'bg-gray-50 border-gray-200' 
                  : 'bg-green-50 border-green-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">{appointment.time}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                  {getStatusText(appointment.status)}
                </span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{appointment.patientName}</h3>
              <p className="text-sm text-gray-600">{appointment.therapy}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: 4 columns grid */}
      <div className="hidden xl:block">
        <div className="grid grid-cols-4 gap-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className={`p-4 rounded-lg border ${
                appointment.status === 'completed' 
                  ? 'bg-gray-50 border-gray-200' 
                  : 'bg-green-50 border-green-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">{appointment.time}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                  {getStatusText(appointment.status)}
                </span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{appointment.patientName}</h3>
              <p className="text-sm text-gray-600">{appointment.therapy}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodaysSchedule;