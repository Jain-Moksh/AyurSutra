import React, { useState } from 'react';

interface Appointment {
  id: string;
  doctor: string;
  date: string;
  time: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  type: string;
}

interface PatientAppointmentsProps {
  onBookNew?: () => void;
}

const PatientAppointments: React.FC<PatientAppointmentsProps> = ({ onBookNew }) => {
  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
      doctor: 'Dr. Rajesh Sharma',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'Upcoming',
      type: 'Follow-up Consultation'
    },
    {
      id: '2',
      doctor: 'Dr. Priya Patel',
      date: '2024-01-10',
      time: '2:30 PM',
      status: 'Completed',
      type: 'Initial Consultation'
    },
    {
      id: '3',
      doctor: 'Dr. Rajesh Sharma',
      date: '2024-01-05',
      time: '11:15 AM',
      status: 'Completed',
      type: 'Therapy Session'
    },
    {
      id: '4',
      doctor: 'Dr. Priya Patel',
      date: '2024-01-03',
      time: '3:00 PM',
      status: 'Cancelled',
      type: 'Follow-up'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const upcomingAppointments = appointments.filter(apt => apt.status === 'Upcoming');
  const pastAppointments = appointments.filter(apt => apt.status !== 'Upcoming');

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-ayur-green rounded-full flex items-center justify-center">
            <span className="text-white text-lg">📅</span>
          </div>
          <div>
            <h2 className="text-lg lg:text-xl font-bold text-gray-800">My Appointments</h2>
            <p className="text-sm text-gray-600">Manage your upcoming and past appointments</p>
          </div>
        </div>
        <button 
          onClick={onBookNew}
          className="bg-ayur-green text-white px-4 py-2 rounded-lg hover:bg-ayur-light-green transition-colors duration-300 font-medium"
        >
          Book New
        </button>
      </div>

      {/* Upcoming Appointments */}
      <div className="mb-6">
        <h3 className="text-md font-semibold text-gray-700 mb-3 flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
          Upcoming Appointments
        </h3>
        <div className="space-y-3">
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-800">{appointment.doctor}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{appointment.type}</p>
                    <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Reschedule
                    </button>
                    <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">📅</div>
              <p>No upcoming appointments</p>
            </div>
          )}
        </div>
      </div>

      {/* Past Appointments */}
      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-3 flex items-center">
          <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
          Past Appointments
        </h3>
        <div className="space-y-3">
          {pastAppointments.map((appointment) => (
            <div key={appointment.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-gray-800">{appointment.doctor}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{appointment.type}</p>
                  <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-ayur-green hover:text-ayur-light-green text-sm font-medium">
                    View Details
                  </button>
                  {appointment.status === 'Completed' && (
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Book Follow-up
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientAppointments;
