import React, { useState } from 'react';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email: string;
  lastVisit: string;
  status: 'Active' | 'Inactive' | 'New';
  conditions: string[];
  avatar: string;
}

const PatientsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: '1',
      name: 'Priya Sharma',
      age: 35,
      gender: 'Female',
      phone: '+91 98765 43210',
      email: 'priya.sharma@email.com',
      lastVisit: '2024-01-15',
      status: 'Active',
      conditions: ['Stress', 'Insomnia'],
      avatar: '👩'
    },
    {
      id: '2',
      name: 'Rajesh Kumar',
      age: 42,
      gender: 'Male',
      phone: '+91 87654 32109',
      email: 'rajesh.kumar@email.com',
      lastVisit: '2024-01-12',
      status: 'Active',
      conditions: ['Diabetes', 'Hypertension'],
      avatar: '👨'
    },
    {
      id: '3',
      name: 'Sunita Patel',
      age: 28,
      gender: 'Female',
      phone: '+91 76543 21098',
      email: 'sunita.patel@email.com',
      lastVisit: '2024-01-10',
      status: 'New',
      conditions: ['Digestive Issues'],
      avatar: '👩'
    },
    {
      id: '4',
      name: 'Amit Singh',
      age: 55,
      gender: 'Male',
      phone: '+91 65432 10987',
      email: 'amit.singh@email.com',
      lastVisit: '2024-01-08',
      status: 'Inactive',
      conditions: ['Arthritis', 'Back Pain'],
      avatar: '👨'
    },
    {
      id: '5',
      name: 'Kavita Joshi',
      age: 38,
      gender: 'Female',
      phone: '+91 54321 09876',
      email: 'kavita.joshi@email.com',
      lastVisit: '2024-01-05',
      status: 'Active',
      conditions: ['Anxiety', 'Migraine'],
      avatar: '👩'
    }
  ]);

  const [newPatient, setNewPatient] = useState<Partial<Patient>>({
    name: '',
    age: 0,
    gender: 'Male',
    phone: '',
    email: '',
    conditions: [],
    status: 'New'
  });

  const statusOptions = ['All', 'Active', 'Inactive', 'New'];
  const conditionOptions = ['Stress', 'Insomnia', 'Diabetes', 'Hypertension', 'Digestive Issues', 'Arthritis', 'Back Pain', 'Anxiety', 'Migraine'];

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'New':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleAddPatient = () => {
    if (newPatient.name && newPatient.age && newPatient.phone && newPatient.email) {
      const patient: Patient = {
        id: (patients.length + 1).toString(),
        name: newPatient.name,
        age: newPatient.age,
        gender: newPatient.gender || 'Male',
        phone: newPatient.phone,
        email: newPatient.email,
        lastVisit: new Date().toISOString().split('T')[0],
        status: newPatient.status || 'New',
        conditions: newPatient.conditions || [],
        avatar: newPatient.gender === 'Female' ? '👩' : '👨'
      };
      setPatients([...patients, patient]);
      setNewPatient({
        name: '',
        age: 0,
        gender: 'Male',
        phone: '',
        email: '',
        conditions: [],
        status: 'New'
      });
      setShowAddModal(false);
    }
  };

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowEditModal(true);
  };

  const handleDeletePatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedPatient) {
      setPatients(patients.filter(p => p.id !== selectedPatient.id));
      setShowDeleteModal(false);
      setSelectedPatient(null);
    }
  };

  const handleConditionToggle = (condition: string) => {
    setNewPatient(prev => ({
      ...prev,
      conditions: prev.conditions?.includes(condition)
        ? prev.conditions.filter(c => c !== condition)
        : [...(prev.conditions || []), condition]
    }));
  };

  const stats = {
    total: patients.length,
    active: patients.filter(p => p.status === 'Active').length,
    new: patients.filter(p => p.status === 'New').length,
    inactive: patients.filter(p => p.status === 'Inactive').length
  };

  return (
    <div className="h-full bg-ayur-cream min-h-0 overflow-y-auto">
      <div className="p-4 lg:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
              Patient Management
            </h1>
            <p className="text-gray-600">Manage your patient records and information</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 sm:mt-0 bg-ayur-green text-white px-4 py-2 rounded-lg hover:bg-ayur-light-green transition-colors font-medium"
          >
            + Add New Patient
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <div className="text-2xl">👥</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Patients</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <div className="text-2xl">✅</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New Patients</p>
                <p className="text-2xl font-bold text-blue-600">{stats.new}</p>
              </div>
              <div className="text-2xl">🆕</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Inactive</p>
                <p className="text-2xl font-bold text-gray-600">{stats.inactive}</p>
              </div>
              <div className="text-2xl">⏸️</div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search patients by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
              />
            </div>
            <div className="sm:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Patients List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Patients ({filteredPatients.length})
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredPatients.map((patient) => (
              <div key={patient.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{patient.avatar}</div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{patient.name}</h3>
                      <p className="text-sm text-gray-600">
                        {patient.age} years • {patient.gender}
                      </p>
                      <p className="text-sm text-gray-500">{patient.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(patient.status)}`}>
                        {patient.status}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditPatient(patient)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePatient(patient)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                {patient.conditions.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {patient.conditions.map((condition) => (
                      <span
                        key={condition}
                        className="px-2 py-1 bg-ayur-cream text-ayur-green text-xs rounded-full"
                      >
                        {condition}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Add Patient Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Patient</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input
                      type="number"
                      value={newPatient.age}
                      onChange={(e) => setNewPatient({...newPatient, age: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      value={newPatient.gender}
                      onChange={(e) => setNewPatient({...newPatient, gender: e.target.value as 'Male' | 'Female' | 'Other'})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={newPatient.email}
                    onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Conditions</label>
                  <div className="grid grid-cols-2 gap-2">
                    {conditionOptions.map((condition) => (
                      <label key={condition} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={newPatient.conditions?.includes(condition)}
                          onChange={() => handleConditionToggle(condition)}
                          className="w-4 h-4 text-ayur-green border-gray-300 rounded focus:ring-ayur-green"
                        />
                        <span className="text-sm text-gray-700">{condition}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPatient}
                  className="px-4 py-2 bg-ayur-green text-white rounded-lg hover:bg-ayur-light-green"
                >
                  Add Patient
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && selectedPatient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Delete Patient</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete {selectedPatient.name}? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientsPage;


