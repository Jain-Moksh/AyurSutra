import React, { useState } from 'react';

interface TherapyGoal {
  id: string;
  name: string;
  progress: number;
  description: string;
  targetDate: string;
}

interface VisitHistory {
  id: string;
  date: string;
  doctor: string;
  therapy: string;
  notes: string;
  rating: number;
}

interface ImprovementRating {
  category: string;
  rating: number;
  maxRating: number;
  previousRating?: number;
}

const PatientProgressTrackingPage: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState('Pain Level');
  const [selectedPeriod, setSelectedPeriod] = useState('Month');
  const [symptoms, setSymptoms] = useState('');
  const [sideEffects, setSideEffects] = useState<string[]>([]);
  const [improvements, setImprovements] = useState<ImprovementRating[]>([
    { category: 'Energy', rating: 4, maxRating: 5, previousRating: 2 },
    { category: 'Digestion', rating: 3, maxRating: 5, previousRating: 1 },
    { category: 'Mental Clarity', rating: 4, maxRating: 5, previousRating: 3 },
    { category: 'Sleep Quality', rating: 3, maxRating: 5, previousRating: 2 },
    { category: 'Overall Wellness', rating: 4, maxRating: 5, previousRating: 2 }
  ]);
  const [additionalNotes, setAdditionalNotes] = useState('');

  const metrics = ['Pain Level', 'Mobility', 'Sleep Quality', 'Energy', 'Stress Level'];
  const periods = ['Week', 'Month', 'Quarter', 'Year'];

  const therapyGoals: TherapyGoal[] = [
    {
      id: '1',
      name: 'Stress Reduction',
      progress: 85,
      description: 'Significant improvement in stress levels through Shirodhara therapy and meditation practices.',
      targetDate: '2024-03-15'
    },
    {
      id: '2',
      name: 'Circulation Improvement',
      progress: 65,
      description: 'Moderate improvement in blood circulation through Abhyanga massage therapy.',
      targetDate: '2024-04-01'
    },
    {
      id: '3',
      name: 'Sleep Quality',
      progress: 35,
      description: 'Limited improvement in sleep quality. Recommended to increase Brahmi intake and evening oil massage.',
      targetDate: '2024-05-01'
    },
    {
      id: '4',
      name: 'Overall Wellness',
      progress: 95,
      description: 'Excellent progress in overall wellness. Patient reports significant improvement in energy levels.',
      targetDate: '2024-02-28'
    }
  ];

  const visitHistory: VisitHistory[] = [
    {
      id: '1',
      date: '2024-01-15',
      doctor: 'Dr. Rajesh Sharma',
      therapy: 'Shirodhara',
      notes: 'Patient showed good response to treatment. Stress levels decreased significantly.',
      rating: 5
    },
    {
      id: '2',
      date: '2024-01-10',
      doctor: 'Dr. Priya Patel',
      therapy: 'Abhyanga Massage',
      notes: 'Initial consultation completed. Patient reported improved circulation.',
      rating: 4
    },
    {
      id: '3',
      date: '2024-01-05',
      doctor: 'Dr. Rajesh Sharma',
      therapy: 'Nasya',
      notes: 'Nasal therapy for sinus issues. Patient experienced mild improvement.',
      rating: 3
    }
  ];

  const sideEffectOptions = [
    'Headache',
    'Fatigue',
    'Skin Irritation',
    'Nausea',
    'Dizziness',
    'Mild Discomfort',
    'Other'
  ];

  const handleSideEffectChange = (effect: string) => {
    setSideEffects(prev => 
      prev.includes(effect) 
        ? prev.filter(e => e !== effect)
        : [...prev, effect]
    );
  };

  const handleImprovementChange = (category: string, rating: number) => {
    setImprovements(prev => 
      prev.map(imp => 
        imp.category === category 
          ? { ...imp, rating }
          : imp
      )
    );
  };

  const handleSubmitFeedback = () => {
    const feedback = {
      symptoms,
      sideEffects,
      improvements,
      additionalNotes,
      timestamp: new Date().toISOString()
    };
    
    alert('Feedback submitted successfully! Your doctor will review this information.');
    console.log('Patient feedback submitted:', feedback);
    
    // Reset form
    setSymptoms('');
    setSideEffects([]);
    setAdditionalNotes('');
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    if (progress >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getProgressTextColor = (progress: number) => {
    if (progress >= 80) return 'text-green-700';
    if (progress >= 60) return 'text-yellow-700';
    if (progress >= 40) return 'text-orange-700';
    return 'text-red-700';
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600';
    if (rating >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="h-full bg-ayur-cream min-h-0 overflow-y-auto">
      <div className="p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
              My Progress Tracking
            </h1>
            <p className="text-gray-600">Monitor your health journey and therapy progress</p>
          </div>
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm lg:text-base">
              📊 Share Report
            </button>
            <button className="px-4 py-2 bg-ayur-green text-white rounded-lg hover:bg-ayur-light-green transition-colors text-sm lg:text-base">
              📥 Download Report
            </button>
          </div>
        </div>

        {/* Progress Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Visits</p>
                <p className="text-2xl font-bold text-gray-800">{visitHistory.length}</p>
              </div>
              <div className="text-2xl">🏥</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Goals</p>
                <p className="text-2xl font-bold text-gray-800">{therapyGoals.length}</p>
              </div>
              <div className="text-2xl">🎯</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Rating</p>
                <p className="text-2xl font-bold text-gray-800">
                  {(visitHistory.reduce((sum, visit) => sum + visit.rating, 0) / visitHistory.length).toFixed(1)}
                </p>
              </div>
              <div className="text-2xl">⭐</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overall Progress</p>
                <p className="text-2xl font-bold text-gray-800">
                  {Math.round(therapyGoals.reduce((sum, goal) => sum + goal.progress, 0) / therapyGoals.length)}%
                </p>
              </div>
              <div className="text-2xl">📈</div>
            </div>
          </div>
        </div>

        {/* Progress Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
          <h2 className="text-lg lg:text-xl font-semibold text-gray-800 mb-4">
            Progress Overview
          </h2>
          
          {/* Metrics and Period Selectors */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
            <div className="flex flex-wrap gap-2">
              {metrics.map((metric) => (
                <button
                  key={metric}
                  onClick={() => setSelectedMetric(metric)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedMetric === metric
                      ? 'bg-ayur-green text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {metric}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-600">Period:</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green text-sm"
              >
                {periods.map((period) => (
                  <option key={period} value={period}>
                    {period}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="bg-green-50 rounded-lg p-6 h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {selectedMetric} Progress
              </h3>
              <p className="text-sm text-gray-600">
                Chart showing {selectedMetric.toLowerCase()} over {selectedPeriod.toLowerCase()}
              </p>
              <div className="mt-4 flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((point) => (
                  <div
                    key={point}
                    className="w-3 h-3 bg-green-500 rounded-full"
                    style={{
                      transform: `translateY(${Math.sin(point * 0.5) * 15}px)`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Therapy Goals Progress */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
          <h2 className="text-lg lg:text-xl font-semibold text-gray-800 mb-6">
            My Therapy Goals
          </h2>
          
          <div className="space-y-6">
            {therapyGoals.map((goal) => (
              <div key={goal.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-800">{goal.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-semibold ${getProgressTextColor(goal.progress)}`}>
                      {goal.progress}%
                    </span>
                    <span className="text-xs text-gray-500">
                      Target: {new Date(goal.targetDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(goal.progress)}`}
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                
                <p className="text-sm text-gray-600 leading-relaxed">
                  {goal.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Visit History */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
          <h2 className="text-lg lg:text-xl font-semibold text-gray-800 mb-6">
            Visit History
          </h2>
          
          <div className="space-y-4">
            {visitHistory.map((visit) => (
              <div key={visit.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-gray-800">{visit.therapy}</h3>
                    <p className="text-sm text-gray-600">{visit.doctor}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">{visit.date}</p>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-gray-600">Rating:</span>
                      <span className={`text-sm font-medium ${getRatingColor(visit.rating)}`}>
                        {visit.rating}/5 ⭐
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{visit.notes}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Patient Feedback Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
          <h2 className="text-lg lg:text-xl font-semibold text-gray-800 mb-6">
            Share Your Experience
          </h2>
          
          <div className="space-y-6">
            {/* Symptoms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe any symptoms you've experienced...
              </label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green text-sm"
                placeholder="Please describe any symptoms or changes you've noticed..."
              />
            </div>

            {/* Side Effects */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Side Effects (if any)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {sideEffectOptions.map((effect) => (
                  <label key={effect} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sideEffects.includes(effect)}
                      onChange={() => handleSideEffectChange(effect)}
                      className="w-4 h-4 text-ayur-green border-gray-300 rounded focus:ring-ayur-green"
                    />
                    <span className="text-sm text-gray-700">{effect}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Improvements Noticed */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Rate Your Improvements
              </label>
              <div className="space-y-4">
                {improvements.map((improvement) => (
                  <div key={improvement.category} className="flex items-center justify-between">
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-700">
                        {improvement.category}
                      </span>
                      {improvement.previousRating && (
                        <span className="text-xs text-gray-500 ml-2">
                          (Previous: {improvement.previousRating}/5)
                        </span>
                      )}
                    </div>
                    <div className="flex space-x-1">
                      {Array.from({ length: improvement.maxRating }, (_, i) => (
                        <button
                          key={i}
                          onClick={() => handleImprovementChange(improvement.category, i + 1)}
                          className={`w-6 h-6 rounded-full border-2 transition-colors ${
                            i < improvement.rating
                              ? 'bg-green-500 border-green-500'
                              : 'bg-white border-gray-300 hover:border-green-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Any other observations or feedback...
              </label>
              <textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green text-sm"
                placeholder="Any additional observations or feedback..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSubmitFeedback}
                className="px-6 py-3 bg-ayur-green text-white rounded-lg hover:bg-ayur-light-green transition-colors font-medium text-sm lg:text-base"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProgressTrackingPage;



