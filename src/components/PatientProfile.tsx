import React, { useState } from 'react';

interface PatientData {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  emergencyContact: string;
  bloodGroup: string;
  allergies: string;
  medicalConditions: string;
}

const PatientProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [patientData, setPatientData] = useState<PatientData>({
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43210',
    dateOfBirth: '1985-06-15',
    gender: 'Female',
    address: '123 Green Park, New Delhi, 110016',
    emergencyContact: '+91 98765 43211 (Raj Sharma)',
    bloodGroup: 'B+',
    allergies: 'None known',
    medicalConditions: 'None currently'
  });

  const [formData, setFormData] = useState<PatientData>(patientData);

  const handleInputChange = (field: keyof PatientData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setPatientData(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(patientData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-ayur-green rounded-full flex items-center justify-center">
            <span className="text-white text-lg">👤</span>
          </div>
          <div>
            <h2 className="text-lg lg:text-xl font-bold text-gray-800">My Profile</h2>
            <p className="text-sm text-gray-600">Manage your personal information</p>
          </div>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="bg-ayur-green text-white px-4 py-2 rounded-lg hover:bg-ayur-light-green transition-colors duration-300 font-medium"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div>
          <h3 className="text-md font-semibold text-gray-700 mb-4 flex items-center">
            <span className="w-2 h-2 bg-ayur-green rounded-full mr-2"></span>
            Personal Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayur-green focus:border-transparent"
                />
              ) : (
                <p className="text-gray-800">{patientData.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayur-green focus:border-transparent"
                />
              ) : (
                <p className="text-gray-800">{patientData.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayur-green focus:border-transparent"
                />
              ) : (
                <p className="text-gray-800">{patientData.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Date of Birth</label>
              {isEditing ? (
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayur-green focus:border-transparent"
                />
              ) : (
                <p className="text-gray-800">{patientData.dateOfBirth}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
              {isEditing ? (
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayur-green focus:border-transparent"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p className="text-gray-800">{patientData.gender}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
              {isEditing ? (
                <textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayur-green focus:border-transparent"
                />
              ) : (
                <p className="text-gray-800">{patientData.address}</p>
              )}
            </div>
          </div>
        </div>

        {/* Medical Information */}
        <div>
          <h3 className="text-md font-semibold text-gray-700 mb-4 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Medical Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Emergency Contact</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayur-green focus:border-transparent"
                />
              ) : (
                <p className="text-gray-800">{patientData.emergencyContact}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Blood Group</label>
              {isEditing ? (
                <select
                  value={formData.bloodGroup}
                  onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayur-green focus:border-transparent"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              ) : (
                <p className="text-gray-800">{patientData.bloodGroup}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Allergies</label>
              {isEditing ? (
                <textarea
                  value={formData.allergies}
                  onChange={(e) => handleInputChange('allergies', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayur-green focus:border-transparent"
                  placeholder="List any known allergies..."
                />
              ) : (
                <p className="text-gray-800">{patientData.allergies}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Medical Conditions</label>
              {isEditing ? (
                <textarea
                  value={formData.medicalConditions}
                  onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayur-green focus:border-transparent"
                  placeholder="List any current medical conditions..."
                />
              ) : (
                <p className="text-gray-800">{patientData.medicalConditions}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Save/Cancel buttons */}
      {isEditing && (
        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-ayur-green text-white rounded-lg hover:bg-ayur-light-green transition-colors duration-300"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default PatientProfile;
