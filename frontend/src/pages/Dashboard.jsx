import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  TrendingUp, 
  Target, 
  Award, 
  Activity, 
  CheckCircle, 
  Clock,
  Zap,
  Trophy,
  ArrowRight,
  Sparkles,
  BarChart3,
  Gamepad2,
  Smartphone
} from "lucide-react";

export default function Dashboard() {
  const { user, authFetch } = useAuth();
  const navigate = useNavigate();
  
  const [surveyData, setSurveyData] = useState(null);
  const [recommendationData, setRecommendationData] = useState(null);
  const [activityData, setActivityData] = useState([]);
  const [leaderboardPreview, setLeaderboardPreview] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch survey result
      const surveyRes = await authFetch(`${API_BASE_URL}/api/survey-result/me/`);
      if (surveyRes.ok) {
        setSurveyData(await surveyRes.json());
      }

      // Fetch recommendation
      const recRes = await authFetch(`${API_BASE_URL}/api/recommendation/`);
      if (recRes.ok) {
        setRecommendationData(await recRes.json());
      }

      // Fetch activity results
      const activityRes = await authFetch(`${API_BASE_URL}/api/activity-result/`);
      if (activityRes.ok) {
        const activities = await activityRes.json();
        // Filter only completed activities
        const completedActivities = activities.filter(a => a.completed === true);
        setActivityData(completedActivities);
        console.log('✅ Loaded activity data:', completedActivities);
      }

      // Fetch leaderboard preview (top 3)
      const leaderRes = await authFetch(`${API_BASE_URL}/api/leaderboard/`);
      if (leaderRes.ok) {
        const data = await leaderRes.json();
        setLeaderboardPreview(data.slice(0, 3));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const electiveInfo = {
    'MobileDev': { 
      name: 'Mobile Development', 
      icon: Smartphone, 
      color: 'emerald',
      gradient: 'from-emerald-600 to-teal-600'
    },
    'ITBA': { 
      name: 'IT Business Analytics', 
      icon: BarChart3, 
      color: 'cyan',
      gradient: 'from-cyan-600 to-blue-600'
    },
    'MMGD': { 
      name: 'Multimedia & Game Development', 
      icon: Gamepad2, 
      color: 'purple',
      gradient: 'from-purple-600 to-pink-600'
    }
  };

  const quickActions = [
    {
      title: "Take Survey",
      desc: "Discover your ideal elective",
      icon: Target,
      color: "blue",
      path: "/interest-survey",
      show: !surveyData
    },
    {
      title: "View Recommendation",
      desc: "See your personalized match",
      icon: Award,
      color: "purple",
      path: "/recommendation",
      show: surveyData && recommendationData
    },
    {
      title: "Explore Electives",
      desc: "Try interactive activities",
      icon: Activity,
      color: "cyan",
      path: "/exploration",
      show: true
    },
    {
      title: "View Results",
      desc: "Check your survey results",
      icon: TrendingUp,
      color: "emerald",
      path: "/interest-survey/result",
      show: surveyData
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pb-12">
      
      {/* Hero Section */}
      <div className="px-6 py-12 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
                <Sparkles className="w-10 h-10 text-blue-400" />
                Welcome back, {user?.first_name || user?.username}!
              </h1>
              <p className="text-slate-400 text-lg">
                Continue your personalized learning journey
              </p>
            </div>
            {surveyData && (
              <div className="bg-slate-900/80 backdrop-blur-md rounded-xl px-6 py-4 border border-green-600/30 shadow-lg shadow-green-500/10">
                <p className="text-sm text-slate-400 mb-1">Survey Completed</p>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="font-bold text-lg text-white">Level {surveyData.level}</span>
                </div>
              </div>
            )}
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900/80 backdrop-blur-md rounded-xl px-6 py-4 border border-slate-700 shadow-lg hover:border-blue-600/50 transition-colors">
              <p className="text-3xl font-bold text-white">{surveyData?.total_xp || 0}</p>
              <p className="text-sm text-slate-400">Total XP</p>
            </div>
            <div className="bg-slate-900/80 backdrop-blur-md rounded-xl px-6 py-4 border border-slate-700 shadow-lg hover:border-purple-600/50 transition-colors">
              <p className="text-3xl font-bold text-white">{surveyData?.level || 0}</p>
              <p className="text-sm text-slate-400">Current Level</p>
            </div>
            <div className="bg-slate-900/80 backdrop-blur-md rounded-xl px-6 py-4 border border-slate-700 shadow-lg hover:border-cyan-600/50 transition-colors">
              <p className="text-3xl font-bold text-white">{activityData.filter(a => a.completed).length}</p>
              <p className="text-sm text-slate-400">Activities Done</p>
            </div>
            <div className="bg-slate-900/80 backdrop-blur-md rounded-xl px-6 py-4 border border-slate-700 shadow-lg hover:border-emerald-600/50 transition-colors">
              <p className="text-3xl font-bold text-white">{surveyData ? '✓' : '○'}</p>
              <p className="text-sm text-slate-400">Survey Status</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Recommendation Card (if survey completed) */}
        {recommendationData && (
          <div className="mb-8">
            <div className={`bg-gradient-to-br ${electiveInfo[recommendationData.recommended_elective]?.gradient} rounded-2xl p-8 shadow-2xl border-2 border-white/20`}>
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="w-8 h-8 text-white" />
                    <h2 className="text-2xl font-bold text-white">Your Recommended Elective</h2>
                  </div>
                  <p className="text-3xl font-extrabold text-white mb-2">
                    {electiveInfo[recommendationData.recommended_elective]?.name}
                  </p>
                  <p className="text-white/90 mb-4">
                    {recommendationData.confidence_score}% Match • Based on survey and activity data
                  </p>
                  <button
                    onClick={() => navigate('/recommendation')}
                    className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-all"
                  >
                    View Full Analysis
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="text-5xl mb-2">
                    {React.createElement(electiveInfo[recommendationData.recommended_elective]?.icon, { 
                      className: "w-16 h-16 text-white mx-auto" 
                    })}
                  </div>
                  <p className="text-white font-semibold">Top Match</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-400" />
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.filter(action => action.show).map((action, idx) => {
              const Icon = action.icon;
              return (
                <button
                  key={idx}
                  onClick={() => navigate(action.path)}
                  className={`bg-slate-900/80 border border-slate-700 rounded-xl p-6 hover:border-${action.color}-500 hover:bg-slate-800 transition-all group text-left`}
                >
                  <div className={`w-12 h-12 bg-${action.color}-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 text-${action.color}-400`} />
                  </div>
                  <h3 className="text-white font-semibold mb-1">{action.title}</h3>
                  <p className="text-slate-400 text-sm">{action.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column - Survey Progress & Next Steps */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Survey Status */}
            <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-blue-400" />
                Interest Survey
              </h2>
              
              {surveyData ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-300 mb-1">Status: <span className="text-green-400 font-semibold">Completed</span></p>
                      <p className="text-slate-400 text-sm">Completed on {new Date(surveyData.date_completed).toLocaleDateString()}</p>
                    </div>
                    <CheckCircle className="w-12 h-12 text-green-400" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <p className="text-slate-400 text-sm mb-1">Questions Answered</p>
                      <p className="text-2xl font-bold text-white">{surveyData.questions_answered}/20</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <p className="text-slate-400 text-sm mb-1">Completion Time</p>
                      <p className="text-2xl font-bold text-white">{surveyData.completion_time || 'N/A'}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/interest-survey/result')}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    View Results
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 mb-4">You haven't completed the interest survey yet</p>
                  <button
                    onClick={() => navigate('/interest-survey')}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Take Survey Now
                  </button>
                </div>
              )}
            </div>

            {/* Activity Progress */}
            <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Activity className="w-6 h-6 text-purple-400" />
                Activity Progress
              </h2>
              
              <div className="space-y-4">
                {Object.entries(electiveInfo).map(([key, info]) => {
                  const Icon = info.icon;
                  // Count completed activities for this elective
                  const electiveActivities = activityData.filter(a => a.elective === key && a.completed === true);
                  const completedCount = electiveActivities.length;
                  const totalActivities = 3; // Each elective has 3 activities
                  const completionPercentage = (completedCount / totalActivities) * 100;
                  
                  return (
                    <div key={key} className="bg-slate-800/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Icon className={`w-5 h-5 text-${info.color}-400`} />
                          <span className="text-slate-200 font-semibold">{info.name}</span>
                        </div>
                        <span className={`text-sm font-semibold ${completedCount === totalActivities ? 'text-green-400' : 'text-slate-400'}`}>
                          {completedCount}/{totalActivities} completed
                        </span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div 
                          className={`bg-gradient-to-r ${info.gradient} h-2 rounded-full transition-all duration-500`} 
                          style={{ width: `${completionPercentage}%` }}
                        ></div>
                      </div>
                      {completedCount > 0 && (
                        <div className="mt-2 text-xs text-slate-400">
                          {electiveActivities.map((a, idx) => (
                            <span key={idx} className="inline-block mr-2">
                              ✓ {a.activity_name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => navigate('/exploration')}
                className="w-full mt-4 bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Explore Activities
              </button>
            </div>
          </div>

          {/* Right Column - Leaderboard */}
          <div className="space-y-8">
            
            {/* Leaderboard Preview */}
            <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-400" />
                Top Performers
              </h2>
              
              {leaderboardPreview.length > 0 ? (
                <div className="space-y-3">
                  {leaderboardPreview.map((player, idx) => (
                    <div 
                      key={idx}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        player.is_current_user 
                          ? 'bg-yellow-900/20 border border-yellow-600' 
                          : 'bg-slate-800/50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        idx === 0 ? 'bg-yellow-500 text-white' :
                        idx === 1 ? 'bg-slate-400 text-white' :
                        'bg-orange-600 text-white'
                      }`}>
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold text-sm">{player.username}</p>
                        <p className="text-slate-400 text-xs">⏱️ {player.completion_time_display}</p>
                      </div>
                      {player.is_current_user && (
                        <span className="text-yellow-400 text-xs font-bold">YOU</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 text-center py-4">No leaderboard data yet</p>
              )}

              <button
                onClick={() => navigate('/interest-survey/result')}
                className="w-full mt-4 bg-yellow-600 hover:bg-yellow-500 text-white py-2 rounded-lg font-semibold transition-colors text-sm"
              >
                View Full Leaderboard
              </button>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-700 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">📋 Next Steps</h2>
              <ul className="space-y-3">
                {!surveyData && (
                  <li className="flex items-start gap-2 text-slate-300 text-sm">
                    <span className="text-blue-400 mt-1">▸</span>
                    <span>Complete the interest survey to get your recommendation</span>
                  </li>
                )}
                <li className="flex items-start gap-2 text-slate-300 text-sm">
                  <span className="text-blue-400 mt-1">▸</span>
                  <span>Try activities from different electives</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300 text-sm">
                  <span className="text-blue-400 mt-1">▸</span>
                  <span>Explore career paths for each elective</span>
                </li>
                {surveyData && (
                  <li className="flex items-start gap-2 text-slate-300 text-sm">
                    <span className="text-blue-400 mt-1">▸</span>
                    <span>Review your detailed recommendation analysis</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
