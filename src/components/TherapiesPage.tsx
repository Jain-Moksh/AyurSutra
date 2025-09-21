import React, { useState } from 'react';

interface Therapy {
  id: string;
  name: string;
  type: string;
  duration: number; // in minutes
  cost: number;
  description: string;
  category: string;
  tags: string[];
  isActive: boolean;
}

const TherapiesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTherapy, setSelectedTherapy] = useState<Therapy | null>(null);
  const [therapies, setTherapies] = useState<Therapy[]>([
    {
      id: '1',
      name: 'Abhyanga (Oil Massage)',
      type: 'Panchakarma',
      duration: 60,
      cost: 2500,
      description: 'A form of Ayurvedic medicine that involves massage of the body with large amounts of warm oil. The oil is often pre-medicated with herbs for specific conditions.',
      category: 'Panchakarma',
      tags: ['Massage', 'Oil Therapy', 'Relaxation'],
      isActive: true
    },
    {
      id: '2',
      name: 'Shirodhara',
      type: 'Panchakarma',
      duration: 45,
      cost: 3000,
      description: 'A therapeutic procedure where medicated oil is poured in a continuous stream on the forehead. This treatment is highly effective for stress, anxiety, and neurological conditions.',
      category: 'Panchakarma',
      tags: ['Stress Relief', 'Neurological', 'Meditation'],
      isActive: true
    },
    {
      id: '3',
      name: 'Nasya',
      type: 'Panchakarma',
      duration: 30,
      cost: 1500,
      description: 'Nasal administration of medicated oils or herbal preparations. This therapy is beneficial for sinus problems, headaches, and respiratory issues.',
      category: 'Panchakarma',
      tags: ['Nasal', 'Respiratory', 'Headache'],
      isActive: true
    },
    {
      id: '4',
      name: 'Udvartana',
      type: 'Panchakarma',
      duration: 50,
      cost: 2000,
      description: 'A therapeutic massage using herbal powders. This treatment helps in weight management, improves circulation, and enhances skin texture.',
      category: 'Panchakarma',
      tags: ['Weight Management', 'Circulation', 'Skin Care'],
      isActive: true
    },
    {
      id: '5',
      name: 'Pinda Sweda',
      type: 'Panchakarma',
      duration: 40,
      cost: 2200,
      description: 'A fomentation therapy using medicated boluses. This treatment is effective for joint pain, muscle stiffness, and rheumatic conditions.',
      category: 'Panchakarma',
      tags: ['Joint Pain', 'Muscle Stiffness', 'Rheumatic'],
      isActive: true
    },
    {
      id: '6',
      name: 'Yoga Therapy',
      type: 'Therapeutic',
      duration: 60,
      cost: 1800,
      description: 'Personalized yoga sessions designed to address specific health conditions and improve overall well-being.',
      category: 'Therapeutic',
      tags: ['Yoga', 'Exercise', 'Wellness'],
      isActive: true
    },
    {
      id: '7',
      name: 'Herbal Consultation',
      type: 'Consultation',
      duration: 30,
      cost: 1200,
      description: 'Comprehensive consultation for herbal medicine prescriptions and dietary recommendations.',
      category: 'Consultation',
      tags: ['Herbs', 'Diet', 'Consultation'],
      isActive: true
    }
  ]);

  const [newTherapy, setNewTherapy] = useState<Partial<Therapy>>({
    name: '',
    type: '',
    duration: 0,
    cost: 0,
    description: '',
    category: '',
    tags: [],
    isActive: true
  });

  const categories = ['All', 'Panchakarma', 'Therapeutic', 'Consultation', 'Wellness'];
  const therapyTypes = ['Panchakarma', 'Therapeutic', 'Consultation', 'Wellness', 'Rehabilitation'];
  const availableTags = [
    'Massage', 'Oil Therapy', 'Relaxation', 'Stress Relief', 'Neurological', 'Meditation',
    'Nasal', 'Respiratory', 'Headache', 'Weight Management', 'Circulation', 'Skin Care',
    'Joint Pain', 'Muscle Stiffness', 'Rheumatic', 'Yoga', 'Exercise', 'Wellness',
    'Herbs', 'Diet', 'Consultation', 'Detox', 'Immune System', 'Digestive'
  ];

  const filteredTherapies = therapies.filter(therapy => {
    const matchesSearch = therapy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         therapy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         therapy.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'All' || therapy.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddTherapy = () => {
    if (newTherapy.name && newTherapy.type && newTherapy.duration && newTherapy.cost && newTherapy.category) {
      const therapy: Therapy = {
        id: (therapies.length + 1).toString(),
        name: newTherapy.name,
        type: newTherapy.type,
        duration: newTherapy.duration,
        cost: newTherapy.cost,
        description: newTherapy.description || '',
        category: newTherapy.category,
        tags: newTherapy.tags || [],
        isActive: newTherapy.isActive !== false
      };
      setTherapies([...therapies, therapy]);
      setNewTherapy({
        name: '',
        type: '',
        duration: 0,
        cost: 0,
        description: '',
        category: '',
        tags: [],
        isActive: true
      });
      setShowAddModal(false);
    }
  };

  const handleEditTherapy = (therapy: Therapy) => {
    setSelectedTherapy(therapy);
    setShowEditModal(true);
  };

  const handleDeleteTherapy = (therapy: Therapy) => {
    setSelectedTherapy(therapy);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedTherapy) {
      setTherapies(therapies.filter(t => t.id !== selectedTherapy.id));
      setShowDeleteModal(false);
      setSelectedTherapy(null);
    }
  };

  const handleTagToggle = (tag: string) => {
    setNewTherapy(prev => ({
      ...prev,
      tags: prev.tags?.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...(prev.tags || []), tag]
    }));
  };

  const stats = {
    total: therapies.length,
    active: therapies.filter(t => t.isActive).length,
    categories: Array.from(new Set(therapies.map(t => t.category))).length,
    avgCost: Math.round(therapies.reduce((sum, t) => sum + t.cost, 0) / therapies.length)
  };

  return (
    <div className="h-full bg-ayur-cream min-h-0 overflow-y-auto">
      <div className="p-4 lg:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
              Therapy Management
            </h1>
            <p className="text-gray-600">Manage your therapy offerings and treatments</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 sm:mt-0 bg-ayur-green text-white px-4 py-2 rounded-lg hover:bg-ayur-light-green transition-colors font-medium"
          >
            + Add New Therapy
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Therapies</p>
                <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <div className="text-2xl">🌿</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Therapies</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <div className="text-2xl">✅</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-blue-600">{stats.categories}</p>
              </div>
              <div className="text-2xl">📂</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Cost</p>
                <p className="text-2xl font-bold text-purple-600">₹{stats.avgCost}</p>
              </div>
              <div className="text-2xl">💰</div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search therapies by name, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
              />
            </div>
            <div className="sm:w-48">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Therapies List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Therapies ({filteredTherapies.length})
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredTherapies.map((therapy) => (
              <div key={therapy.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-800">{therapy.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        therapy.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {therapy.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{therapy.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                      <span><strong>Type:</strong> {therapy.type}</span>
                      <span><strong>Duration:</strong> {therapy.duration} min</span>
                      <span><strong>Cost:</strong> ₹{therapy.cost.toLocaleString()}</span>
                      <span><strong>Category:</strong> {therapy.category}</span>
                    </div>
                    {therapy.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {therapy.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-ayur-cream text-ayur-green text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEditTherapy(therapy)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTherapy(therapy)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Therapy Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Therapy</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={newTherapy.name}
                      onChange={(e) => setNewTherapy({...newTherapy, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={newTherapy.type}
                      onChange={(e) => setNewTherapy({...newTherapy, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
                    >
                      <option value="">Select type...</option>
                      {therapyTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (min)</label>
                    <input
                      type="number"
                      value={newTherapy.duration}
                      onChange={(e) => setNewTherapy({...newTherapy, duration: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cost (₹)</label>
                    <input
                      type="number"
                      value={newTherapy.cost}
                      onChange={(e) => setNewTherapy({...newTherapy, cost: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={newTherapy.category}
                      onChange={(e) => setNewTherapy({...newTherapy, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
                    >
                      <option value="">Select category...</option>
                      {categories.filter(c => c !== 'All').map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newTherapy.description}
                    onChange={(e) => setNewTherapy({...newTherapy, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                    {availableTags.map((tag) => (
                      <label key={tag} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={newTherapy.tags?.includes(tag)}
                          onChange={() => handleTagToggle(tag)}
                          className="w-4 h-4 text-ayur-green border-gray-300 rounded focus:ring-ayur-green"
                        />
                        <span className="text-sm text-gray-700">{tag}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={newTherapy.isActive}
                    onChange={(e) => setNewTherapy({...newTherapy, isActive: e.target.checked})}
                    className="w-4 h-4 text-ayur-green border-gray-300 rounded focus:ring-ayur-green"
                  />
                  <label htmlFor="isActive" className="text-sm text-gray-700">Active</label>
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
                  onClick={handleAddTherapy}
                  className="px-4 py-2 bg-ayur-green text-white rounded-lg hover:bg-ayur-light-green"
                >
                  Add Therapy
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && selectedTherapy && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Delete Therapy</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{selectedTherapy.name}"? This action cannot be undone.
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

export default TherapiesPage;
