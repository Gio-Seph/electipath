import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { surveyQuestions } from "./surveyQuestions";
import { calculateScores } from "./scoring";
import { useAuth } from "../../context/AuthContext";

const XP_PER_QUESTION = 20;
const XP_PER_LEVEL = 100;
const MAX_LEVEL = 4;
const TOTAL_XP = surveyQuestions.length * XP_PER_QUESTION;

export default function SurveyScreen() {
  const navigate = useNavigate();
  const { authFetch } = useAuth(); // <-- AUTO REFRESH TOKEN HERE

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(
    Array(surveyQuestions.length).fill(null)
  );
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [startTime] = useState(Date.now()); // Track survey start time

  const [xpPopup, setXpPopup] = useState(null);
  const [levelUpPopup, setLevelUpPopup] = useState(null);
  const [comboPopup, setComboPopup] = useState(null);
  const [comboCount, setComboCount] = useState(0);
  const [lastAnswerTime, setLastAnswerTime] = useState(null);

  const currentQuestion = surveyQuestions[currentIndex];
  const answeredCount = answers.filter((a) => a !== null).length;

  // Compute level based on 100 XP per level (4 levels total)
  const computeLevel = (currentXp) => {
    const calculatedLevel = Math.floor(currentXp / XP_PER_LEVEL) + 1;
    return Math.min(calculatedLevel, MAX_LEVEL);
  };

  // Get current level XP (XP within current level)
  const getCurrentLevelXP = (currentXp) => {
    return currentXp % XP_PER_LEVEL;
  };

  // Get XP needed for next level
  const getXPForNextLevel = () => {
    if (level >= MAX_LEVEL) return XP_PER_LEVEL;
    return XP_PER_LEVEL;
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      angle: 90,
      origin: { x: 0.5, y: 0.3 },
    });
  };

  const handleAnswer = (value) => {
    if (answers[currentIndex] !== null) return;

    const updated = [...answers];
    updated[currentIndex] = value;
    setAnswers(updated);

    const newXp = xp + XP_PER_QUESTION;
    setXp(newXp);

    const xpKey = Date.now();
    setXpPopup({ amount: XP_PER_QUESTION, key: xpKey });
    setTimeout(() => setXpPopup(null), 700);

    const newLevel = computeLevel(newXp);
    if (newLevel > level) {
      setLevel(newLevel);
      const lvlKey = Date.now();
      setLevelUpPopup({ level: newLevel, key: lvlKey });
      triggerConfetti();
      setTimeout(() => setLevelUpPopup(null), 1200);
    }

    const now = Date.now();
    let newCombo = 1;
    if (lastAnswerTime && now - lastAnswerTime < 4000) {
      newCombo = comboCount + 1;
    }
    setComboCount(newCombo);
    setLastAnswerTime(now);

    if (newCombo >= 3) {
      const comboKey = Date.now();
      setComboPopup({ combo: newCombo, key: comboKey });
      setTimeout(() => setComboPopup(null), 800);
    }

    if (currentIndex < surveyQuestions.length - 1) {
      setTimeout(() => setCurrentIndex((prev) => prev + 1), 250);
    } else {
      handleFinish(updated);
    }
  };

  // SAVE RESULT TO BACKEND USING AUTO-REFRESHING FETCH
  const handleFinish = async (finalAnswers) => {
    const filled = finalAnswers.map((a) => a ?? 3);
    const result = calculateScores(filled);
    
    // Calculate completion time in seconds
    const completionTimeMs = Date.now() - startTime;
    const completionTimeSeconds = Math.floor(completionTimeMs / 1000);

    const payload = {
      selected_elective: result.recommended,
      trait_scores: result.traitScores,
      elective_scores: result.electiveScores,
      total_xp: xp,
      level: level,
      completion_time: `00:${Math.floor(completionTimeSeconds / 60).toString().padStart(2, '0')}:${(completionTimeSeconds % 60).toString().padStart(2, '0')}`, // Format as HH:MM:SS
      questions_answered: filled.filter(a => a !== null).length,
    };

    try {

      const res = await authFetch(`${API_BASE_URL}/api/survey-result/`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error("Failed to save survey:", await res.text());
      }
    } catch (err) {
      console.error("Save error:", err);
    }

    navigate("/interest-survey/result", { 
      state: { 
        result: result.recommended, 
        answers: filled, 
        traitScores: result.traitScores, 
        electiveScores: result.electiveScores,
        finalXP: xp,
        finalLevel: level
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-8 text-slate-50">
      <div className="w-full max-w-4xl space-y-6 relative">

        {/* POPUPS */}
        <div className="pointer-events-none absolute inset-0">
          {/* XP popup */}
          <AnimatePresence>
            {xpPopup && (
              <motion.div
                key={xpPopup.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: -10 }}
                exit={{ opacity: 0, y: -30 }}
                className="absolute right-6 top-10 text-emerald-300 font-semibold"
              >
                +{xpPopup.amount} XP
              </motion.div>
            )}
          </AnimatePresence>

          {/* Level up popup */}
          <AnimatePresence>
            {levelUpPopup && (
              <motion.div
                key={levelUpPopup.key}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1.1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute left-1/2 -translate-x-1/2 top-8 px-4 py-2 rounded-full bg-yellow-400 text-black font-bold shadow-xl"
              >
                LEVEL {levelUpPopup.level} UP! ⚔️
              </motion.div>
            )}
          </AnimatePresence>

          {/* Combo popup */}
          <AnimatePresence>
            {comboPopup && (
              <motion.div
                key={comboPopup.key}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute left-1/2 bottom-20 px-3 py-1 rounded-full bg-purple-600 text-xs font-semibold shadow-lg"
              >
                Combo x{comboPopup.combo}! 🔥
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* HEADER */}
        <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/interest-survey")}
                className="px-3 py-2 rounded-lg border border-slate-600 hover:bg-slate-800 text-slate-300 transition-colors flex items-center gap-2"
              >
                ← Back
              </button>
              <div>
                <h1 className="text-xl md:text-2xl font-bold">Interest Quest: Survey</h1>
                <p className="text-xs text-slate-300">
                  Question {currentIndex + 1} of {surveyQuestions.length}
                </p>
              </div>
            </div>

            <div className="text-right text-xs">
              <p className="font-semibold text-yellow-400">Level {level}/{MAX_LEVEL}</p>
              <p className="text-slate-400">XP: {getCurrentLevelXP(xp)} / {XP_PER_LEVEL}</p>
            </div>
          </div>
        </div>

        {/* XP BAR */}
        <div className="bg-slate-900/40 border border-slate-700 rounded-xl p-4 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-300">Level {level} Progress</span>
            <span className="text-sm text-slate-400">
              {getCurrentLevelXP(xp)}/{XP_PER_LEVEL} XP ({Math.round((getCurrentLevelXP(xp) / XP_PER_LEVEL) * 100)}%)
            </span>
          </div>
          <div className="relative h-4 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-600">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 shadow-lg"
              animate={{ width: `${(getCurrentLevelXP(xp) / XP_PER_LEVEL) * 100}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>
          <div className="mt-2 text-xs text-slate-500 text-center">
            Total XP: {xp} | Questions: {answeredCount}/{surveyQuestions.length}
          </div>
        </div>

        {/* QUESTION CARD */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-2 border-blue-500/30 rounded-2xl shadow-2xl p-8 backdrop-blur-sm"
          >
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {currentIndex + 1}
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-blue-500 to-transparent"></div>
              </div>
              
              <p className="text-lg text-slate-100 mb-2 leading-relaxed">
                {currentQuestion.text}
              </p>

              <p className="text-sm text-blue-300 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                Rate from 1 (Strongly Disagree) to 5 (Strongly Agree)
              </p>
            </div>

            <div className="grid grid-cols-5 gap-4 mb-6">
              {[1, 2, 3, 4, 5].map((val) => (
                <motion.button
                  key={val}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(val)}
                  className={`h-16 rounded-xl font-bold text-lg border-2 transition-all duration-200 ${
                    answers[currentIndex] === val
                      ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-slate-800/60 border-slate-600 text-slate-300 hover:bg-blue-600/20 hover:border-blue-500'
                  }`}
                >
                  {val}
                </motion.button>
              ))}
            </div>

            <div className="flex justify-between items-center text-sm">
              <div className="text-slate-400">
                <span className="text-red-400">1</span> = Strongly Disagree • 
                <span className="text-yellow-400"> 3</span> = Neutral • 
                <span className="text-green-400"> 5</span> = Strongly Agree
              </div>
              <div className="text-slate-300 font-medium">
                {answeredCount} / {surveyQuestions.length} completed
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* FOOTER BUTTONS */}
        <div className="flex justify-between text-xs">
          <button
            onClick={() => navigate("/interest-survey")}
            className="px-3 py-1 rounded-full border border-slate-600 hover:bg-slate-800"
          >
            ◀ Back to Avatar Preview
          </button>

          <button
            onClick={() =>
              answeredCount === surveyQuestions.length && handleFinish(answers)
            }
            disabled={answeredCount !== surveyQuestions.length}
            className="px-3 py-1 rounded-full border border-emerald-500 text-emerald-300 hover:bg-emerald-600/10 disabled:opacity-40"
          >
            Finish Now
          </button>
        </div>
      </div>
    </div>
  );
}
