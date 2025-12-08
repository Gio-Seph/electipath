import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import Leaderboard from "../../components/Leaderboard";
import { useAuth } from "../../context/AuthContext";

import mmgdMale from "../../assets/mmgd_male.jpg";
import mmgdFemale from "../../assets/mmgd_female.jpg";
import itbaMale from "../../assets/itba_male.jpg";
import itbaFemale from "../../assets/itba_female.jpg";
import mobileMale from "../../assets/mobile_male.jpg";
import mobileFemale from "../../assets/mobile_female.jpg";

const electiveMeta = {
  MMGD: {
    id: "MMGD",
    name: "Multimedia & Game Development",
    title: "Creative Visionary",
    images: [mmgdMale, mmgdFemale],
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    summary:
      "You’re drawn to worlds, stories, and visuals. This path fits students who enjoy design, animation, and interactive experiences.",
  },
  ITBA: {
    id: "ITBA",
    name: "IT Business Analytics",
    title: "Strategic Analyst",
    images: [itbaMale, itbaFemale],
    gradient: "from-blue-500 via-indigo-500 to-sky-500",
    summary:
      "You like patterns, decisions, and solving problems with data. This path fits students who enjoy analysis, strategy, and insights.",
  },
  MobileDev: {
    id: "MobileDev",
    name: "Mobile Development",
    title: "Digital Builder",
    images: [mobileMale, mobileFemale],
    gradient: "from-emerald-500 via-cyan-500 to-teal-500",
    summary:
      "You enjoy building useful tools and apps that people can use every day. This path fits students who like coding and practical solutions.",
  },
};

export default function ResultScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { authFetch, user } = useAuth();
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showRetakeConfirm, setShowRetakeConfirm] = useState(false);
  const [isRetaking, setIsRetaking] = useState(false);

  const result = location.state?.result; // "MMGD", "ITBA", or "MobileDev"
  const answers = location.state?.answers || [];

  const elective = result ? electiveMeta[result] : null;

  // Pick gender-specific avatar based on user's gender
  const chosenAvatar = useMemo(() => {
    if (!elective || !elective.images?.length) return null;
    const userGender = user?.gender || 'male';
    const genderIndex = userGender === 'female' ? 1 : 0;
    return elective.images[genderIndex];
  }, [elective, user]);

  // Confetti on mount when we have a result
  useEffect(() => {
    if (!elective) return;

    const shoot = () => {
      confetti({
        particleCount: 90,
        spread: 70,
        angle: 90,
        origin: { x: 0.5, y: 0.25 },
      });
    };

    // small bursts
    shoot();
    const t1 = setTimeout(shoot, 500);
    const t2 = setTimeout(shoot, 1000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [elective]);

  // Function to handle survey retake
  const handleRetakeSurvey = async () => {
    setIsRetaking(true);
    try {

      const response = await authFetch(`${API_BASE_URL}/api/survey-result/me/`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Successfully deleted, navigate to survey start
        navigate("/interest-survey", { 
          replace: true,
          state: { message: "Previous result cleared. You can now retake the survey!" }
        });
      } else {
        console.error("Failed to delete survey result");
        alert("Failed to reset survey. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting survey result:", error);
      alert("Error occurred while resetting survey. Please try again.");
    } finally {
      setIsRetaking(false);
      setShowRetakeConfirm(false);
    }
  };

  // If there is no result (user refreshed or direct URL)
  if (!elective) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 text-slate-50">
        <div className="max-w-md w-full bg-slate-900/80 border border-slate-700 rounded-2xl p-6 text-center shadow-xl">
          <h2 className="text-xl font-bold mb-2">No Result Found</h2>
          <p className="text-sm text-slate-300 mb-4">
            It looks like there&apos;s no survey result data. Please complete
            the interest survey first.
          </p>
          <button
            onClick={() => navigate("/interest-survey")}
            className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-sm font-semibold"
          >
            Go to Avatar Preview
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-10 text-slate-50 relative overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none absolute -top-20 left-0 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 bg-purple-500/25 blur-3xl rounded-full" />

      <div className="w-full max-w-4xl relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={elective.id}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-slate-900/80 border border-slate-700 rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center"
          >
            {/* Left: Avatar + glow */}
            <div className="relative w-full md:w-1/2 flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className={`relative rounded-3xl p-1.5 bg-gradient-to-br ${elective.gradient} shadow-[0_0_40px_rgba(59,130,246,0.5)]`}
              >
                <motion.img
                  src={chosenAvatar}
                  alt={elective.name}
                  className="w-40 h-40 md:w-52 md:h-52 rounded-3xl object-cover border border-white/60 shadow-xl"
                  initial={{ scale: 0.9, rotate: -2 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 80, damping: 15 }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-3 text-center"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Avatar Path
                </p>
                <p className="text-sm font-semibold text-slate-100">
                  {elective.name}
                </p>
              </motion.div>
            </div>

            {/* Right: Text + buttons */}
            <div className="w-full md:w-1/2 space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-2xl md:text-3xl font-extrabold tracking-wide text-center md:text-left"
              >
                CHARACTER UNLOCKED!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
                className="text-sm text-slate-300 text-center md:text-left"
              >
                Based on your interest survey, the path most aligned with you is:
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                className="mt-1"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-blue-300 mb-1">
                  Elective Match
                </p>
                <h3 className="text-xl font-bold">
                  {elective.title} · {elective.name}
                </h3>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-sm text-slate-300 leading-relaxed"
              >
                {elective.summary}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42 }}
                className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-300"
              >
                <div className="bg-slate-800/70 rounded-xl p-3 border border-slate-700">
                  <p className="font-semibold text-xs mb-1">What this suggests</p>
                  <p className="text-[11px]">
                    Your answers show patterns that match the strengths and
                    activities emphasized in this elective.
                  </p>
                </div>
                <div className="bg-slate-800/70 rounded-xl p-3 border border-slate-700">
                  <p className="font-semibold text-xs mb-1">Reminder</p>
                  <p className="text-[11px]">
                    This result is a guide based on your interests. You can still
                    explore other electives and discuss with your adviser.
                  </p>
                </div>
              </motion.div>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 flex flex-col sm:flex-row gap-3"
              >
                <button
                  onClick={() => navigate("/exploration")}
                  className="flex-1 px-4 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-sm font-semibold shadow-lg"
                >
                  Explore Electives
                </button>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex-1 px-4 py-2.5 rounded-full border border-slate-600 hover:bg-slate-800 text-sm font-semibold"
                >
                  Back to Dashboard
                </button>
              </motion.div>

              <div className="mt-2 text-[10px] text-slate-500 text-center md:text-left">
                This recommendation is generated from your survey responses and
                is not a final decision. Use it as support for your own choice.
              </div>
            </div>
          </motion.div>

          {/* LEADERBOARD SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 bg-slate-900/80 border border-yellow-600/30 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-yellow-400 flex items-center gap-2">
                  ⚡ Speed Leaderboard
                </h3>
                <p className="text-sm text-slate-400">
                  See the fastest survey completions
                </p>
              </div>
              <div className="text-right text-sm">
                <p className="text-yellow-400 font-semibold">Your Time</p>
                <p className="text-slate-300">⏱️ Survey completed</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowLeaderboard(true)}
                className="flex-1 bg-yellow-600 hover:bg-yellow-500 px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                ⚡ View Speed Rankings
              </button>
              <button
                onClick={() => setShowRetakeConfirm(true)}
                className="px-4 py-3 rounded-lg border border-slate-600 hover:bg-slate-800 text-sm font-medium transition-colors"
                disabled={isRetaking}
              >
                {isRetaking ? "Resetting..." : "Try to Beat Your Time"}
              </button>
            </div>

            <div className="mt-4 p-3 bg-yellow-900/20 rounded-lg border border-yellow-700/30">
              <p className="text-xs text-yellow-200 text-center">
                ⚡ Complete surveys faster to climb the speed rankings!
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* LEADERBOARD PANEL */}
      <Leaderboard 
        isVisible={showLeaderboard} 
        onClose={() => setShowLeaderboard(false)} 
      />

      {/* RETAKE CONFIRMATION MODAL */}
      {showRetakeConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full"
          >
            <div className="text-center">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-bold text-slate-200 mb-2">
                Retake Survey?
              </h3>
              <p className="text-slate-400 mb-6">
                This will delete your current result and recommendation. You'll start fresh with a new survey.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowRetakeConfirm(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-slate-600 hover:bg-slate-800 text-slate-300 transition-colors"
                  disabled={isRetaking}
                >
                  Cancel
                </button>
                <button
                  onClick={handleRetakeSurvey}
                  className="flex-1 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors disabled:opacity-50"
                  disabled={isRetaking}
                >
                  {isRetaking ? "Resetting..." : "Yes, Retake"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
