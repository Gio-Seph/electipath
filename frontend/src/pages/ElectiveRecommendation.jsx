import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { TrendingUp, Activity, Award, AlertCircle } from 'lucide-react';

export default function ElectiveRecommendation() {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authFetch } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchRecommendation();
  }, []);
  
  const fetchRecommendation = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
    const response = await authFetch(`${API_URL}/api/recommendation/`);
      if (response.ok) {
        const data = await response.json();
        setRecommendation(data);
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Failed to fetch recommendation');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⚙️</div>
          <p className="text-slate-300">Analyzing your data...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-200 mb-4">No Recommendation Yet</h2>
          <p className="text-slate-400 mb-6">{error}</p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/interest-survey')}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-colors"
            >
              Take Survey
            </button>
            <button
              onClick={() => navigate('/exploration')}
              className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold transition-colors"
            >
              Try Activities
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  const electiveNames = {
    'MobileDev': 'Mobile Development',
    'ITBA': 'IT Business Analytics',
    'MMGD': 'Multimedia & Game Development'
  };
  
  const electiveColors = {
    'MobileDev': { primary: 'emerald', gradient: 'from-emerald-900/40 to-slate-900/80', border: 'border-emerald-500/30', text: 'text-emerald-400', bg: 'bg-emerald-600' },
    'ITBA': { primary: 'cyan', gradient: 'from-cyan-900/40 to-slate-900/80', border: 'border-cyan-500/30', text: 'text-cyan-400', bg: 'bg-cyan-600' },
    'MMGD': { primary: 'purple', gradient: 'from-purple-900/40 to-slate-900/80', border: 'border-purple-500/30', text: 'text-purple-400', bg: 'bg-purple-600' }
  };
  
  const colors = electiveColors[recommendation.recommended_elective] || electiveColors['MobileDev'];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Main Recommendation Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-br ${colors.gradient} border-2 ${colors.border} rounded-2xl p-8 shadow-2xl`}
        >
          <div className="text-center mb-6">
            <div className="inline-block px-4 py-2 bg-green-600/20 border border-green-500 rounded-full text-green-400 text-sm font-medium mb-4">
              ✓ Recommendation Ready
            </div>
            <h1 className="text-4xl font-bold text-slate-100 mb-2">
              Your Recommended Elective
            </h1>
            <div className={`text-5xl font-extrabold ${colors.text} mb-4`}>
              {electiveNames[recommendation.recommended_elective]}
            </div>
            <div className="flex items-center justify-center gap-2 text-slate-300">
              <Award className="text-yellow-400" size={20} />
              <span className="text-2xl font-bold text-yellow-400">
                {recommendation.confidence_score}% Match
              </span>
            </div>
          </div>
          
          {/* Score Breakdown */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {Object.entries(recommendation.final_scores).map(([elective, score]) => {
              const isRecommended = elective === recommendation.recommended_elective;
              const electiveColor = electiveColors[elective];
              
              return (
                <div
                  key={elective}
                  className={`p-4 rounded-xl border transition-all ${
                    isRecommended
                      ? `${electiveColor.bg}/20 ${electiveColor.border}`
                      : 'bg-slate-800/60 border-slate-700'
                  }`}
                >
                  <h3 className="text-slate-200 font-semibold text-sm mb-2">
                    {electiveNames[elective]}
                  </h3>
                  <div className="flex items-end gap-2">
                    <span className={`text-3xl font-bold ${
                      isRecommended ? electiveColor.text : 'text-slate-400'
                    }`}>
                      {score}
                    </span>
                    <span className="text-slate-500 text-sm mb-1">/ 100</span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        isRecommended 
                          ? electiveColor.bg
                          : 'bg-slate-500'
                      } transition-all duration-500`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
        
        {/* Detailed Breakdown */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Survey Component */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/80 border border-slate-700 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="text-blue-400" size={24} />
              <div>
                <h3 className="text-lg font-bold text-slate-200">Survey Analysis</h3>
                <p className="text-sm text-slate-400">60% of final score</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {Object.entries(recommendation.breakdown.survey_scores).map(([elective, score]) => (
                <div key={elective} className="flex justify-between items-center">
                  <span className="text-slate-300 text-sm">{electiveNames[elective]}</span>
                  <span className="text-blue-400 font-semibold">{score.toFixed(1)}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
              <p className="text-xs text-blue-300">
                Based on your personality traits and interests from the survey
              </p>
            </div>
          </motion.div>
          
          {/* Activity Component */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-900/80 border border-slate-700 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Activity className="text-purple-400" size={24} />
              <div>
                <h3 className="text-lg font-bold text-slate-200">Activity Performance</h3>
                <p className="text-sm text-slate-400">40% of final score</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {Object.entries(recommendation.breakdown.activity_scores).map(([elective, score]) => (
                <div key={elective} className="flex justify-between items-center">
                  <span className="text-slate-300 text-sm">{electiveNames[elective]}</span>
                  <span className="text-purple-400 font-semibold">{score.toFixed(1)}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-purple-900/20 border border-purple-700 rounded-lg">
              <p className="text-xs text-purple-300">
                Based on completion time, engagement, and hands-on performance
              </p>
              <p className="text-xs text-purple-400 mt-1">
                Activities completed: {recommendation.activities_completed}
              </p>
            </div>
          </motion.div>
        </div>
        
        {/* Recommendation Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-900/80 border border-slate-700 rounded-xl p-6"
        >
          <h3 className="text-lg font-bold text-slate-200 mb-4">Why This Recommendation?</h3>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                1
              </div>
              <div>
                <h4 className="text-slate-200 font-semibold mb-1">Survey Alignment</h4>
                <p className="text-slate-400 text-sm">
                  Your survey responses show strong alignment with {electiveNames[recommendation.recommended_elective]} 
                  personality traits and interests.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                2
              </div>
              <div>
                <h4 className="text-slate-200 font-semibold mb-1">Activity Performance</h4>
                <p className="text-slate-400 text-sm">
                  {recommendation.activities_completed > 0 
                    ? `You showed higher engagement and efficiency when completing ${electiveNames[recommendation.recommended_elective]} activities.`
                    : 'Complete activities in the Elective Exploration page to improve recommendation accuracy.'}
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                3
              </div>
              <div>
                <h4 className="text-slate-200 font-semibold mb-1">Combined Analysis</h4>
                <p className="text-slate-400 text-sm">
                  Our algorithm combines both theoretical interest (survey) and practical aptitude (activities) 
                  for a well-rounded recommendation.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => {
              const electivePaths = {
                'MobileDev': '/explore/mobile',
                'ITBA': '/explore/analytics',
                'MMGD': '/explore/multimedia'
              };
              navigate(electivePaths[recommendation.recommended_elective] || '/exploration');
            }}
            className={`flex-1 px-6 py-3 ${colors.bg} hover:opacity-90 text-white rounded-lg font-semibold transition-opacity`}
          >
            Explore This Elective
          </button>
          <button
            onClick={() => navigate('/exploration')}
            className="px-6 py-3 border border-slate-600 hover:bg-slate-800 text-slate-300 rounded-lg font-semibold transition-colors"
          >
            Try More Activities
          </button>
        </div>
        
        {/* Disclaimer */}
        <div className="text-center text-slate-500 text-sm">
          <p>This recommendation is based on your survey responses and activity performance.</p>
          <p>You can still choose any elective that interests you.</p>
        </div>
      </div>
    </div>
  );
}
