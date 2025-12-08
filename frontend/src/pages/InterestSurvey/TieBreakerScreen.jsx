// src/pages/InterestSurvey/TieBreakerScreen.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { tieBreaker } from "./tiebreaker";
import { calculateScores } from "./scoring";
import { useAuth } from "../../context/AuthContext";
import API_BASE_URL from "../../config/api";

export default function TieBreakerScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { authFetch } = useAuth();
  const answers = location.state?.answers;

  if (!answers) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>No survey data found.</p>
          <button
            onClick={() => navigate("/interest-survey")}
            className="mt-3 px-4 py-2 rounded bg-blue-600 text-white"
          >
            Back to start
          </button>
        </div>
      </div>
    );
  }

  // Helper function to get CSRF token from cookies
  const getCsrfToken = () => {
    const name = "csrftoken";
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const [key, value] = cookie.trim().split("=");
      if (key === name) {
        return value;
      }
    }
    return null;
  };

  const handleChoice = async (electiveKey) => {
    const result = calculateScores(answers, electiveKey);
    const recommendedElective = result.recommended;
    
    // Save result to backend using authFetch
    try {
      const response = await authFetch(`${API_BASE_URL}/api/survey-result/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selected_elective: recommendedElective,
          trait_scores: result.traitScores,
          elective_scores: result.electiveScores,
          total_xp: 400, // Max XP for completing survey
          level: 3, // Max level for completing survey
          completion_time: "00:05:00", // Estimated time for tiebreaker
          questions_answered: answers.length,
        }),
      });

      if (!response.ok) {
        console.error("Failed to save survey result:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error saving survey result:", error);
    }

    // Navigate to result page with state
    navigate("/interest-survey/result", { 
      state: { 
        result: recommendedElective,
        answers: answers,
        traitScores: result.traitScores,
        electiveScores: result.electiveScores,
        finalXP: 400,
        finalLevel: 3
      } 
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow p-6 text-center">
        <h2 className="text-2xl font-bold mb-3">Bonus Question 🎯</h2>
        <p className="text-slate-600 mb-6">{tieBreaker.text}</p>

        <div className="flex flex-col gap-3">
          {Object.entries(tieBreaker.options).map(([key, label]) => (
            <button
              key={key}
              onClick={() => handleChoice(key)}
              className="px-4 py-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
