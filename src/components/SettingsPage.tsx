import React, { useState } from 'react';

interface DoctorProfile {
  name: string;
  email: string;
  phone: string;
  specialization: string;
  experience: number;
  qualification: string;
  bio: string;
  photo: string;
}

interface ClinicSettings {
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  website: string;
  workingHours: {
    monday: { start: string; end: string; isOpen: boolean };
    tuesday: { start: string; end: string; isOpen: boolean };
    wednesday: { start: string; end: string; isOpen: boolean };
    thursday: { start: string; end: string; isOpen: boolean };
    friday: { start: string; end: string; isOpen: boolean };
    saturday: { start: string; end: string; isOpen: boolean };
    sunday: { start: string; end: string; isOpen: boolean };
  };
  consultationFee: number;
  followUpFee: number;
}

interface NotificationPreferences {
  emailNotifications: boolean;
  smsNotifications: boolean;
  appointmentReminders: boolean;
  patientUpdates: boolean;
  systemAlerts: boolean;
  marketingEmails: boolean;
}

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'clinic' | 'notifications' | 'preferences'>('profile');
  
  const [doctorProfile, setDoctorProfile] = useState<DoctorProfile>({
    name: 'Dr. Rajesh Sharma',
    email: 'rajesh.sharma@ayursutra.com',
    phone: '+91 98765 43210',
    specialization: 'Panchakarma Specialist',
    experience: 15,
    qualification: 'BAMS, MD (Ayurveda)',
    bio: 'Experienced Ayurvedic practitioner specializing in Panchakarma therapies with over 15 years of clinical experience.',
    photo: '👨‍⚕️'
  });

  const [clinicSettings, setClinicSettings] = useState<ClinicSettings>({
    name: 'AyurSutra Wellness Center',
    address: '123 Wellness Street, Health District',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    phone: '+91 22 1234 5678',
    email: 'info@ayursutra.com',
    website: 'www.ayursutra.com',
    workingHours: {
      monday: { start: '09:00', end: '18:00', isOpen: true },
      tuesday: { start: '09:00', end: '18:00', isOpen: true },
      wednesday: { start: '09:00', end: '18:00', isOpen: true },
      thursday: { start: '09:00', end: '18:00', isOpen: true },
      friday: { start: '09:00', end: '18:00', isOpen: true },
      saturday: { start: '09:00', end: '14:00', isOpen: true },
      sunday: { start: '09:00', end: '14:00', isOpen: false }
    },
    consultationFee: 1500,
    followUpFee: 1000
  });

  const [notifications, setNotifications] = useState<NotificationPreferences>({
    emailNotifications: true,
    smsNotifications: true,
    appointmentReminders: true,
    patientUpdates: true,
    systemAlerts: true,
    marketingEmails: false
  });

  const [preferences, setPreferences] = useState({
    language: 'English',
    theme: 'Light',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    currency: 'INR'
  });

  const handleProfileUpdate = () => {
    alert('Profile updated successfully!');
  };

  const handleClinicUpdate = () => {
    alert('Clinic settings updated successfully!');
  };

  const handleNotificationUpdate = () => {
    alert('Notification preferences updated successfully!');
  };

  const handlePreferenceUpdate = () => {
    alert('Preferences updated successfully!');
  };

  const handleWorkingHoursChange = (day: string, field: string, value: any) => {
    setClinicSettings(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: {
          ...prev.workingHours[day as keyof typeof prev.workingHours],
          [field]: value
        }
      }
    }));
  };

  const tabs = [
    { id: 'profile', name: 'Doctor Profile', icon: '👨‍⚕️' },
    { id: 'clinic', name: 'Clinic Settings', icon: '🏥' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'preferences', name: 'Preferences', icon: '⚙️' }
  ];

  return (
    <div className="h-full bg-ayur-cream min-h-0 overflow-y-auto">
      <div className="p-4 lg:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            Settings
          </h1>
          <p className="text-gray-600">Manage your profile, clinic settings, and preferences</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-wrap border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-ayur-green border-b-2 border-ayur-green bg-ayur-cream'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Doctor Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">Doctor Profile</h2>
                
                {/* Profile Photo */}
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 bg-ayur-green rounded-full flex items-center justify-center text-4xl text-white">
                    {doctorProfile.photo}
                  </div>
                  <div>
                    <button className="bg-ayur-green text-white px-4 py-2 rounded-lg hover:bg-ayur-light-green transition-colors">
                      Change Photo
                    </button>
                    <p className="text-sm text-gray-500 mt-1">JPG, PNG up to 2MB</p>
                  </div>
                </div>

                {/* Profile Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={doctorProfile.name}
                      onChange={(e) => setDoctorProfile({...doctorProfile, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={doctorProfile.email}
                      onChange={(e) => setDoctorProfile({...doctorProfile, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={doctorProfile.phone}
                      onChange={(e) => setDoctorProfile({...doctorProfile, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                    <input
                      type="text"
                      value={doctorProfile.specialization}
                      onChange={(e) => setDoctorProfile({...doctorProfile, specialization: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
                    <input
                      type="number"
                      value={doctorProfile.experience}
                      onChange={(e) => setDoctorProfile({...doctorProfile, experience: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                    <input
                      type="text"
                      value={doctorProfile.qualification}
                      onChange={(e) => setDoctorProfile({...doctorProfile, qualification: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    value={doctorProfile.bio}
                    onChange={(e) => setDoctorProfile({...doctorProfile, bio: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
                  />
                </div>
                <button
                  onClick={handleProfileUpdate}
                  className="bg-ayur-green text-white px-6 py-2 rounded-lg hover:bg-ayur-light-green transition-colors"
                >
                  Update Profile
                </button>
              </div>
            )}

            {/* Clinic Settings Tab */}
            {activeTab === 'clinic' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">Clinic Settings</h2>
                
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Name</label>
                    <input
                      type="text"
                      value={clinicSettings.name}
                      onChange={(e) => setClinicSettings({...clinicSettings, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={clinicSettings.phone}
                      onChange={(e) => setClinicSettings({...clinicSettings, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={clinicSettings.email}
                      onChange={(e) => setClinicSettings({...clinicSettings, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    <input
                      type="url"
                      value={clinicSettings.website}
                      onChange={(e) => setClinicSettings({...clinicSettings, website: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    value={clinicSettings.address}
                    onChange={(e) => setClinicSettings({...clinicSettings, address: e.target.value})}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      value={clinicSettings.city}
                      onChange={(e) => setClinicSettings({...clinicSettings, city: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      value={clinicSettings.state}
                      onChange={(e) => setClinicSettings({...clinicSettings, state: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                    <input
                      type="text"
                      value={clinicSettings.pincode}
                      onChange={(e) => setClinicSettings({...clinicSettings, pincode: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
                    />
                  </div>
                </div>

                {/* Working Hours */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Working Hours</h3>
                  <div className="space-y-3">
                    {Object.entries(clinicSettings.workingHours).map(([day, hours]) => (
                      <div key={day} className="flex items-center space-x-4">
                        <div className="w-20">
                          <span className="text-sm font-medium text-gray-700 capitalize">{day}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={hours.isOpen}
                            onChange={(e) => handleWorkingHoursChange(day, 'isOpen', e.target.checked)}
                            className="w-4 h-4 text-ayur-green border-gray-300 rounded focus:ring-ayur-green"
                          />
                          <span className="text-sm text-gray-600">Open</span>
                        </div>
                        {hours.isOpen && (
                          <div className="flex items-center space-x-2">
                            <input
                              type="time"
                              value={hours.start}
                              onChange={(e) => handleWorkingHoursChange(day, 'start', e.target.value)}
                              className="px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                            <span className="text-gray-500">to</span>
                            <input
                              type="time"
                              value={hours.end}
                              onChange={(e) => handleWorkingHoursChange(day, 'end', e.target.value)}
                              className="px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fees */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee (₹)</label>
                    <input
                      type="number"
                      value={clinicSettings.consultationFee}
                      onChange={(e) => setClinicSettings({...clinicSettings, consultationFee: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Fee (₹)</label>
                    <input
                      type="number"
                      value={clinicSettings.followUpFee}
                      onChange={(e) => setClinicSettings({...clinicSettings, followUpFee: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
                    />
                  </div>
                </div>
                <button
                  onClick={handleClinicUpdate}
                  className="bg-ayur-green text-white px-6 py-2 rounded-lg hover:bg-ayur-light-green transition-colors"
                >
                  Update Clinic Settings
                </button>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">Notification Preferences</h2>
                
                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {key === 'emailNotifications' && 'Receive notifications via email'}
                          {key === 'smsNotifications' && 'Receive notifications via SMS'}
                          {key === 'appointmentReminders' && 'Get reminded about upcoming appointments'}
                          {key === 'patientUpdates' && 'Get notified about patient updates'}
                          {key === 'systemAlerts' && 'Receive system alerts and updates'}
                          {key === 'marketingEmails' && 'Receive promotional emails and offers'}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => setNotifications({...notifications, [key]: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ayur-green/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ayur-green"></div>
                      </label>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleNotificationUpdate}
                  className="bg-ayur-green text-white px-6 py-2 rounded-lg hover:bg-ayur-light-green transition-colors"
                >
                  Update Notifications
                </button>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">Preferences</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                    <select
                      value={preferences.language}
                      onChange={(e) => setPreferences({...preferences, language: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
                    >
                      <option value="English">English</option>
                      <option value="हिंदी">हिंदी</option>
                      <option value="मराठी">मराठी</option>
                      <option value="Gujarati">Gujarati</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                    <select
                      value={preferences.theme}
                      onChange={(e) => setPreferences({...preferences, theme: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
                    >
                      <option value="Light">Light</option>
                      <option value="Dark">Dark</option>
                      <option value="Auto">Auto</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                    <select
                      value={preferences.timezone}
                      onChange={(e) => setPreferences({...preferences, timezone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
                    >
                      <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                      <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                      <option value="America/New_York">America/New_York (EST)</option>
                      <option value="Europe/London">Europe/London (GMT)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
                    <select
                      value={preferences.dateFormat}
                      onChange={(e) => setPreferences({...preferences, dateFormat: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                    <select
                      value={preferences.currency}
                      onChange={(e) => setPreferences({...preferences, currency: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
                    >
                      <option value="INR">INR (₹)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={handlePreferenceUpdate}
                  className="bg-ayur-green text-white px-6 py-2 rounded-lg hover:bg-ayur-light-green transition-colors"
                >
                  Update Preferences
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;


