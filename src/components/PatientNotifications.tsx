import React, { useState } from 'react';

interface Notification {
  id: string;
  type: 'appointment' | 'prescription' | 'followup' | 'reminder';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
}

const PatientNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'appointment',
      title: 'Appointment Reminder',
      message: 'Your appointment with Dr. Rajesh Sharma is scheduled for tomorrow at 10:00 AM',
      time: '2 hours ago',
      isRead: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'prescription',
      title: 'New Prescription Available',
      message: 'Your prescription for Ashwagandha tablets has been updated. Please check your medication schedule.',
      time: '1 day ago',
      isRead: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'followup',
      title: 'Follow-up Required',
      message: 'Dr. Priya Patel has requested a follow-up consultation. Please book an appointment.',
      time: '2 days ago',
      isRead: true,
      priority: 'medium'
    },
    {
      id: '4',
      type: 'reminder',
      title: 'Therapy Session Reminder',
      message: 'Don\'t forget your Abhyanga massage session today at 3:00 PM',
      time: '3 days ago',
      isRead: true,
      priority: 'low'
    },
    {
      id: '5',
      type: 'prescription',
      title: 'Medication Refill',
      message: 'Your Brahmi capsules are running low. Please contact the pharmacy for refill.',
      time: '4 days ago',
      isRead: true,
      priority: 'low'
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return '📅';
      case 'prescription':
        return '💊';
      case 'followup':
        return '🔄';
      case 'reminder':
        return '⏰';
      default:
        return '🔔';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-ayur-green rounded-full flex items-center justify-center">
            <span className="text-white text-lg">🔔</span>
          </div>
          <div>
            <h2 className="text-lg lg:text-xl font-bold text-gray-800">Notifications</h2>
            <p className="text-sm text-gray-600">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
            </p>
          </div>
        </div>
        {unreadCount > 0 && (
          <button 
            onClick={markAllAsRead}
            className="text-ayur-green hover:text-ayur-light-green text-sm font-medium"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`border-l-4 rounded-lg p-4 hover:shadow-md transition-all duration-300 ${
                notification.isRead 
                  ? 'bg-gray-50 border-l-gray-300' 
                  : `${getPriorityColor(notification.priority)} border-l-4`
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-sm font-semibold ${
                      notification.isRead ? 'text-gray-600' : 'text-gray-800'
                    }`}>
                      {notification.title}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{notification.time}</span>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-ayur-green rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <p className={`text-sm mt-1 ${
                    notification.isRead ? 'text-gray-500' : 'text-gray-700'
                  }`}>
                    {notification.message}
                  </p>
                  {!notification.isRead && (
                    <button 
                      onClick={() => markAsRead(notification.id)}
                      className="text-ayur-green hover:text-ayur-light-green text-xs font-medium mt-2"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">🔔</div>
            <p>No notifications yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientNotifications;