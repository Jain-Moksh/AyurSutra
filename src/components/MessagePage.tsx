import React, { useState } from 'react';

interface Notification {
  id: string;
  title: string;
  description: string;
  status: 'urgent' | 'upcoming' | 'completed';
  time: string;
  type: 'procedure' | 'appointment' | 'medication' | 'followup';
  patient?: {
    name: string;
    age: number;
  };
  instructions?: string[];
}

const MessagePage: React.FC = () => {
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [filterType, setFilterType] = useState('All Types');
  const [filterStatus, setFilterStatus] = useState('All Status');
  const [filterTime, setFilterTime] = useState('Last 7 Days');
  const [searchQuery, setSearchQuery] = useState('');

  const notifications: Notification[] = [
    {
      id: '1',
      title: 'Abhyanga Pre-Procedure',
      description: 'Pre-procedure instructions for Abhyanga therapy for patient Anita Sharma',
      status: 'urgent',
      time: 'Today, 10:30 AM',
      type: 'procedure',
      patient: { name: 'Anita Sharma', age: 45 },
      instructions: [
        'Avoid heavy meals for at least 2 hours before the procedure',
        'Drink warm water throughout the day before the therapy',
        'Avoid cold beverages and foods on the day of therapy',
        'Wear loose, comfortable clothing that can be easily removed',
        'Arrive 15 minutes before the scheduled appointment time',
        'Inform the therapist about any discomfort or health concerns'
      ]
    },
    {
      id: '2',
      title: 'Shirodhara Appointment',
      description: 'Appointment reminder for Shirodhara therapy for patient Rahul Patel',
      status: 'upcoming',
      time: 'Tomorrow, 2:00 PM',
      type: 'appointment',
      patient: { name: 'Rahul Patel', age: 38 }
    },
    {
      id: '3',
      title: 'Nasya Post-Procedure',
      description: 'Post-procedure care instructions for Nasya therapy for patient Meera Joshi',
      status: 'upcoming',
      time: 'Tomorrow, 5:30 PM',
      type: 'procedure',
      patient: { name: 'Meera Joshi', age: 52 }
    },
    {
      id: '4',
      title: 'Virechana Pre-Procedure',
      description: 'Pre-procedure instructions for Virechana therapy for patient Suresh Kumar',
      status: 'completed',
      time: 'Yesterday, 9:00 AM',
      type: 'procedure',
      patient: { name: 'Suresh Kumar', age: 41 }
    },
    {
      id: '5',
      title: 'Basti Post-Procedure',
      description: 'Post-procedure care instructions for Basti therapy for patient Priya Desai',
      status: 'completed',
      time: '2 days ago',
      type: 'procedure',
      patient: { name: 'Priya Desai', age: 35 }
    },
    {
      id: '6',
      title: 'Medication Reminder',
      description: 'Reminder to take Triphala churna for patient Vikram Singh',
      status: 'upcoming',
      time: 'In 2 days',
      type: 'medication',
      patient: { name: 'Vikram Singh', age: 48 }
    },
    {
      id: '7',
      title: 'Follow-up Appointment',
      description: 'Follow-up appointment reminder for patient Deepa Reddy',
      status: 'upcoming',
      time: 'In 3 days',
      type: 'followup',
      patient: { name: 'Deepa Reddy', age: 29 }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'upcoming': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'urgent': return '🔴';
      case 'upcoming': return '🔔';
      case 'completed': return '✅';
      default: return '🔔';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesType = filterType === 'All Types' || notification.type === filterType.toLowerCase();
    const matchesStatus = filterStatus === 'All Status' || notification.status === filterStatus.toLowerCase();
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  const handleNotificationSelect = (notification: Notification) => {
    setSelectedNotification(notification);
  };

  return (
    <div className="flex flex-col lg:flex-row h-full bg-ayur-cream">
      {/* Left Panel - Notifications List */}
      <div className="w-full lg:w-1/2 xl:w-2/5 bg-white border-r border-gray-200 flex flex-col min-h-0">
        {/* Header */}
        <div className="p-4 lg:p-6 border-b border-gray-200">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">
            Notifications & Reminders
          </h2>
          
          {/* Filters */}
          <div className="space-y-3 lg:space-y-0 lg:flex lg:space-x-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full lg:w-auto px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ayur-green"
            >
              <option value="All Types">All Types</option>
              <option value="procedure">Procedure</option>
              <option value="appointment">Appointment</option>
              <option value="medication">Medication</option>
              <option value="followup">Follow-up</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full lg:w-auto px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ayur-green"
            >
              <option value="All Status">All Status</option>
              <option value="urgent">Urgent</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
            </select>
            
            <select
              value={filterTime}
              onChange={(e) => setFilterTime(e.target.value)}
              className="w-full lg:w-auto px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ayur-green"
            >
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="All Time">All Time</option>
            </select>
          </div>
          
          {/* Search */}
          <div className="mt-3 relative">
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ayur-green"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              🔍
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleNotificationSelect(notification)}
              className={`p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                selectedNotification?.id === notification.id ? 'bg-ayur-light-green bg-opacity-10 border-l-4 border-ayur-green' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <span className="text-lg">{getStatusIcon(notification.status)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm lg:text-base font-semibold text-gray-900 truncate">
                    {notification.title}
                  </h3>
                  <p className="text-xs lg:text-sm text-gray-600 mt-1 line-clamp-2">
                    {notification.description}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(notification.status)}`}>
                      {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                    </span>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Notification Details */}
      <div className="w-full lg:w-1/2 xl:w-3/5 bg-white flex flex-col min-h-0">
        {selectedNotification ? (
          <>
            {/* Header */}
            <div className="p-4 lg:p-6 border-b border-gray-200">
              <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-3">
                {selectedNotification.title} Instructions
              </h2>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-2 lg:space-y-0">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">📅</span>
                  <span className="text-sm text-gray-600">{selectedNotification.time}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedNotification.status)}`}>
                    {selectedNotification.status.charAt(0).toUpperCase() + selectedNotification.status.slice(1)}
                  </span>
                </div>
              </div>
              {selectedNotification.patient && (
                <div className="mt-3">
                  <span className="text-sm text-gray-600">
                    Patient: <span className="font-semibold">{selectedNotification.patient.name}, {selectedNotification.patient.age} years</span>
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
              {selectedNotification.instructions && (
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-gray-500">📄</span>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Pre-Procedure Instructions
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Please ensure the patient follows these instructions before the {selectedNotification.title.split(' ')[0]} therapy:
                  </p>
                  <ul className="space-y-2">
                    {selectedNotification.instructions.map((instruction, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="text-green-500 mt-0.5">✅</span>
                        <span className="text-sm text-gray-700">{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {!selectedNotification.instructions && (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-4xl mb-4">📋</div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    {selectedNotification.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedNotification.description}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="p-4 lg:p-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <button className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center space-x-2">
                  <span>🕐</span>
                  <span>Reschedule</span>
                </button>
                <button className="flex-1 sm:flex-none px-4 py-2 bg-ayur-green text-white rounded-lg hover:bg-ayur-light-green transition-colors duration-200 flex items-center justify-center space-x-2">
                  <span>✅</span>
                  <span>Mark as Sent</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-gray-400 text-6xl mb-4">🔔</div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Select a notification
              </h3>
              <p className="text-sm text-gray-500">
                Choose a notification from the list to view details
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagePage;
