import React from 'react';

interface Notification {
  id: string;
  type: 'feedback' | 'rescheduled' | 'supply' | 'followup';
  title: string;
  message: string;
  time: string;
  icon: string;
  borderColor: string;
}

const AlertsNotifications: React.FC = () => {
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'feedback',
      title: 'Feedback Requiring Attention',
      message: 'Patient Rahul Mehta reported mild headache after Shirodhara therapy.',
      time: '1 hour ago',
      icon: '⚠️',
      borderColor: 'border-red-400',
    },
    {
      id: '2',
      type: 'rescheduled',
      title: 'Appointment Rescheduled',
      message: 'Neha Kapoor rescheduled her appointment from yesterday to today at 4:00 PM.',
      time: '3 hours ago',
      icon: '📅',
      borderColor: 'border-yellow-400',
    },
    {
      id: '3',
      type: 'supply',
      title: 'Therapy Supply Running Low',
      message: 'Brahmi oil stock is running low. Please reorder soon.',
      time: 'Yesterday',
      icon: '📦',
      borderColor: 'border-yellow-400',
    },
    {
      id: '4',
      type: 'followup',
      title: 'Follow-up Reminder',
      message: 'Schedule follow-up for Vikram Patel after today\'s Nasya therapy.',
      time: 'Yesterday',
      icon: '👤⏰',
      borderColor: 'border-yellow-400',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 lg:mb-6 space-y-2 sm:space-y-0">
        <h2 className="text-lg lg:text-xl font-semibold text-gray-800">Alerts & Notifications</h2>
        <button className="text-ayur-green hover:text-ayur-light-green font-medium transition-colors text-sm lg:text-base">
          Mark All Read
        </button>
      </div>

      <div className="space-y-3 lg:space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 lg:p-4 rounded-lg border-l-4 ${notification.borderColor} bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-2 lg:space-x-3 flex-1">
                <span className="text-base lg:text-lg mt-1 flex-shrink-0">{notification.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-800 mb-1 text-sm lg:text-base">{notification.title}</h3>
                  <p className="text-xs lg:text-sm text-gray-600 mb-2 leading-relaxed">{notification.message}</p>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 ml-2">
                <span className="text-lg">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsNotifications;