import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config/api';

export default function Leaderboard({ isVisible, onClose }) {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { authFetch } = useAuth();

  useEffect(() => {
    if (isVisible) {
      fetchLeaderboard();
    }
  }, [isVisible]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const response = await authFetch(`${API_BASE_URL}/api/leaderboard/`);
      if (response.ok) {
        const data = await response.json();
        setLeaderboardData(data);
      } else {
        console.error('Failed to fetch leaderboard:', response.status);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return '🏆';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '⚡';
    }
  };

  const getElectiveColor = (elective) => {
    if (elective?.includes('Mobile')) return 'text-blue-400';
    if (elective?.includes('Analytics')) return 'text-cyan-400';
    if (elective?.includes('Multimedia')) return 'text-purple-400';
    return 'text-slate-400';
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 h-full w-80 bg-slate-900/95 backdrop-blur-sm border-l border-yellow-600 p-4 z-50 overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-yellow-400 font-bold text-lg flex items-center gap-2">
            ⚡ Fastest Completions
          </h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors text-xl"
          >
            ✕
          </button>
        </div>
        
        {loading ? (
          <div className="text-center text-slate-400 py-8">
            <div className="animate-spin text-2xl mb-2">⚡</div>
            Loading leaderboard...
          </div>
        ) : leaderboardData.length === 0 ? (
          <div className="text-center text-slate-400 py-8">
            <div className="text-4xl mb-2">🏃‍♂️</div>
            <p>No completions yet!</p>
            <p className="text-sm mt-1">Be the first to finish the survey.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {leaderboardData.map((player, index) => (
              <motion.div 
                key={player.rank}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  player.is_current_user 
                    ? 'bg-yellow-900/30 border-yellow-600 shadow-lg shadow-yellow-600/20' 
                    : 'bg-slate-800/60 border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getRankIcon(player.rank)}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-200 font-medium">
                          #{player.rank} {player.username}
                        </span>
                        {player.is_current_user && (
                          <span className="bg-yellow-600 text-yellow-100 text-xs px-2 py-1 rounded-full">
                            You
                          </span>
                        )}
                      </div>
                      <div className="text-lg font-bold text-green-400">
                        ⏱️ {player.completion_time_display}
                      </div>
                    </div>
                  </div>
                </div>
                
                {player.selected_elective && (
                  <div className={`text-xs ${getElectiveColor(player.selected_elective)} mt-2`}>
                    📚 {player.selected_elective}
                  </div>
                )}
                
                <div className="text-xs text-slate-500 mt-1">
                  Completed {new Date(player.date_completed).toLocaleDateString()}
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        <div className="mt-6 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
          <div className="text-xs text-slate-400 text-center">
            <p className="mb-1">⚡ Complete surveys quickly to rank higher</p>
            <p>🏆 Compete for the fastest completion time</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
