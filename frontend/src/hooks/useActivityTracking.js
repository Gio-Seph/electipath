import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import API_BASE_URL from '../config/api';

export function useActivityTracking(elective, activityName) {
  const [startTime] = useState(Date.now());
  const [interactions, setInteractions] = useState(0);
  const [qualityIndicators, setQualityIndicators] = useState({});
  const [isAlreadyCompleted, setIsAlreadyCompleted] = useState(false);
  const { authFetch } = useAuth();
  const savedRef = useRef(false);
  const attemptRef = useRef(1);
  const firstAttemptTimeRef = useRef(null);
  const previousCompletionTimeRef = useRef(null);
  
  // Check if activity is already completed on mount
  useEffect(() => {
    const checkCompletion = async () => {
      try {
        const response = await authFetch(`${API_BASE_URL}/api/activity-result/`);
        if (response.ok) {
          const activities = await response.json();
          const existingActivity = activities.find(
            a => a.elective === elective && a.activity_name === activityName && a.completed === true
          );
          if (existingActivity) {
            setIsAlreadyCompleted(true);
            savedRef.current = true;
            console.log(`✅ Activity "${activityName}" was already completed`);
          }
        }
      } catch (error) {
        console.error('Error checking activity completion:', error);
      }
    };
    
    checkCompletion();
  }, [elective, activityName, authFetch]);
  
  // Track interactions
  const trackInteraction = (type = 'general') => {
    setInteractions(prev => prev + 1);
    
    // Track specific interaction types for quality analysis
    setQualityIndicators(prev => ({
      ...prev,
      [type]: (prev[type] || 0) + 1,
      total: (prev.total || 0) + 1
    }));
  };
  
  // Track quality indicators (activity-specific metrics)
  const trackQualityMetric = (metric, value) => {
    setQualityIndicators(prev => ({
      ...prev,
      [metric]: value
    }));
  };
  
  // Calculate engagement score based on interactions
  const calculateEngagement = () => {
    const timeSpent = (Date.now() - startTime) / 1000; // seconds
    const interactionRate = interactions / (timeSpent / 60); // interactions per minute
    
    // Engagement formula:
    // - More interactions = higher engagement
    // - Optimal time spent (not too fast, not too slow)
    const timeScore = Math.min(100, (timeSpent / 60) * 20); // 5 min = 100 points
    const interactionScore = Math.min(100, interactionRate * 10);
    
    return Math.min(100, (timeScore + interactionScore) / 2);
  };
  
  // Calculate time efficiency score
  const calculateTimeEfficiency = (timeSpent) => {
    const timeMinutes = timeSpent / 60;
    
    // Optimal time: 3-7 minutes = 100 points
    // Too fast (< 1 min) or too slow (> 15 min) = lower score
    if (timeMinutes < 1) return 50; // Too rushed
    if (timeMinutes >= 1 && timeMinutes <= 3) return 70 + (timeMinutes - 1) * 10; // Building up
    if (timeMinutes > 3 && timeMinutes <= 7) return 100; // Optimal
    if (timeMinutes > 7 && timeMinutes <= 10) return 100 - (timeMinutes - 7) * 5; // Slightly slow
    if (timeMinutes > 10 && timeMinutes <= 15) return 85 - (timeMinutes - 10) * 3; // Slow
    return Math.max(40, 70 - (timeMinutes - 15) * 2); // Very slow
  };
  
  // Save activity result
  const saveActivityResult = async (isCompleted = true) => {
    if (savedRef.current && isCompleted) return; // Prevent duplicate saves for completed
    
    const completionTime = (Date.now() - startTime) / 1000;
    const engagementScore = calculateEngagement();
    const timeEfficiency = calculateTimeEfficiency(completionTime);
    const interactionRate = completionTime > 0 ? interactions / (completionTime / 60) : 0;
    
    // Track first attempt time
    if (firstAttemptTimeRef.current === null) {
      firstAttemptTimeRef.current = completionTime;
    }
    
    // Calculate improvement rate if this is a retry
    let improvementRate = 0;
    if (previousCompletionTimeRef.current && completionTime < previousCompletionTimeRef.current) {
      improvementRate = ((previousCompletionTimeRef.current - completionTime) / previousCompletionTimeRef.current) * 100;
    }
    
    try {
      const response = await authFetch(`${API_BASE_URL}/api/activity-result/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          elective,
          activity_name: activityName,
          completion_time_seconds: completionTime,
          engagement_score: engagementScore,
          total_interactions: interactions,
          interaction_rate: interactionRate,
          time_efficiency: timeEfficiency,
          quality_indicators: qualityIndicators,
          attempts: attemptRef.current,
          first_attempt_time: firstAttemptTimeRef.current,
          last_attempt_time: completionTime,
          improvement_rate: improvementRate,
          completed: isCompleted
        })
      });
      
      // Check if response is OK
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(`Failed to save activity: ${errorData.detail || response.statusText}`);
      }
      
      const responseData = await response.json();
      console.log('Activity save response:', responseData);
      
      if (isCompleted) {
        savedRef.current = true;
        previousCompletionTimeRef.current = completionTime; // Store for next attempt
        attemptRef.current += 1; // Increment for next attempt
        console.log(`✅ Activity completed: ${activityName} - ${engagementScore.toFixed(1)}% engagement, ${timeEfficiency.toFixed(1)}% efficiency`);
        console.log(`📊 Performance Score: ${responseData.performance_score?.toFixed(1) || 'N/A'}`);
      } else {
        // For progress saves, store completion time for improvement calculation
        previousCompletionTimeRef.current = completionTime;
        console.log(`🔄 Activity progress saved: ${activityName}`);
      }
    } catch (error) {
      console.error('❌ Error saving activity:', error);
      console.error('Activity details:', {
        elective,
        activityName,
        isCompleted,
        completionTime: (Date.now() - startTime) / 1000
      });
      // Don't mark as saved if there was an error
      if (isCompleted) {
        savedRef.current = false; // Allow retry
      }
    }
  };
  
  // Increment attempt (when user revisits activity)
  const incrementAttempt = () => {
    attemptRef.current += 1;
  };
  
  // Auto-save progress periodically (every 30 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!savedRef.current) {
        saveActivityResult(false); // Save as progress, not completed
      }
    }, 30000); // Every 30 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  return {
    trackInteraction,
    trackQualityMetric,
    saveActivityResult,
    incrementAttempt,
    timeSpent: Math.floor((Date.now() - startTime) / 1000),
    interactions,
    qualityIndicators,
    isAlreadyCompleted
  };
}

