import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { tieBreaker } from "./tiebreaker";
import { calculateScores } from "./scoring";
import { useAuth } from "../../context/AuthContext";

export default function TieBreakerScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { authFetch } = useAuth();
  const answers = location.state?.answers;
  const completionTime = location.state?.completionTime || "00:05:00";
  const finalXP = location.state?.finalXP || 400;
  const finalLevel = location.state?.finalLevel || 3;

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

  const handleChoice = async (electiveKey) => {
    const result = calculateScores(answers, electiveKey);
    const recommendedElective = result.recommended;
    
    // Validate that we have a recommendation
    if (!recommendedElective) {
      console.error("No recommendation generated from scoring");
      alert("Unable to generate recommendation. Please try again.");
      return;
    }
    
    // Save result to backend using authFetch
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const payload = {
        selected_elective: recommendedElective,
        trait_scores: result.traitScores,
        elective_scores: result.electiveScores,
        total_xp: finalXP,
        level: finalLevel,
        completion_time: completionTime,
        questions_answered: answers.length,
      };
      
      console.log("Saving survey result:", payload);
      
      const response = await authFetch(`${API_URL}/api/survey-result/`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to save survey result:", errorText);
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
        finalXP: finalXP,
        finalLevel: finalLevel
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
