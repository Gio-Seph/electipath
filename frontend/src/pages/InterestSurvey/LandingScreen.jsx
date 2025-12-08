import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import mmgdMale from "../../assets/mmgd_male.jpg";
import mmgdFemale from "../../assets/mmgd_female.jpg";
import itbaMale from "../../assets/itba_male.jpg";
import itbaFemale from "../../assets/itba_female.jpg";
import mobileMale from "../../assets/mobile_male.jpg";
import mobileFemale from "../../assets/mobile_female.jpg";

const electives = [
  {
    id: "MMGD",
    title: "Multimedia & Game Development",
    gradient: "from-purple-500 to-pink-500",
    images: [mmgdMale, mmgdFemale],
  },
  {
    id: "ITBA",
    title: "IT Business Analytics",
    gradient: "from-blue-500 to-indigo-500",
    images: [itbaMale, itbaFemale],
  },
  {
    id: "MobileDev",
    title: "Mobile Development",
    gradient: "from-cyan-500 to-emerald-500",
    images: [mobileMale, mobileFemale],
  },
];

const dialogueSequence = [
  "Welcome, traveler. Before you stand three paths in your IT journey.",
  "Each path is embodied by an avatar that represents your chosen journey.",
  "The path of Multimedia & Game Development calls to those drawn to creativity and visual storytelling.",
  "The path of IT Business Analytics awaits minds who see patterns in data and strategy in every decision.",
  "The path of Mobile Development suits builders who craft tools people can carry and use every day.",
  "After your survey, one of these avatars will be bound to you — the one that echoes your interests the most.",
  "Are you ready to discover which character you will unlock based on your interests?",
];

const activeElectiveByLine = [null, null, 0, 1, 2, null, null];

export default function LandingScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [showRetakeMessage, setShowRetakeMessage] = useState(!!location.state?.message);
  const retakeMessage = location.state?.message;
  
  // Get user gender (default to male if not set)
  const userGender = user?.gender || 'male';
  const genderIndex = userGender === 'female' ? 1 : 0;

  // -----------------------------
  // ✅ AUTO-REDIRECT IF SURVEY EXISTS
  // -----------------------------
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) return;
  
    fetch(`${API_BASE_URL}/api/survey-result/me/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(async (res) => {
      if (res.status === 200) {
        const data = await res.json();
        navigate("/interest-survey/result", { 
          state: { 
            result: data.selected_elective,
            answers: data.answers || [],
            traitScores: data.trait_scores || {},
            electiveScores: data.elective_scores || {}
          } 
        });
      }
    })
      .catch(() => {});
  }, []);
  
  

  // -----------------------------
  // NORMAL LANDING PAGE LOGIC
  // -----------------------------
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [variantIndex, setVariantIndex] = useState([0, 0, 0]);
  const [typewriterInterval, setTypewriterInterval] = useState(null);

  const currentText = dialogueSequence[dialogueIndex];
  const activeElective = activeElectiveByLine[dialogueIndex];

  // Typewriter effect
  useEffect(() => {
    setTypedText("");
    setIsTyping(true);

    let i = 0;
    const id = setInterval(() => {
      i++;
      setTypedText(currentText.slice(0, i));
      if (i >= currentText.length) {
        clearInterval(id);
        setIsTyping(false);
        setTypewriterInterval(null);
      }
    }, 25);

    setTypewriterInterval(id);
    return () => clearInterval(id);
  }, [currentText]);

  const handleNextDialogue = () => {
    // If currently typing, finish typing immediately
    if (isTyping && typewriterInterval) {
      clearInterval(typewriterInterval);
      setTypedText(currentText);
      setIsTyping(false);
      setTypewriterInterval(null);
      return;
    }

    // If not typing, go to next dialogue
    if (dialogueIndex < dialogueSequence.length - 1) {
      setDialogueIndex((prev) => prev + 1);
    }
  };

  const handleDialogueClick = () => {
    handleNextDialogue();
  };

  const handleRotateCharacter = (idx) => {
    setVariantIndex((prev) => {
      const c = [...prev];
      c[idx] = c[idx] === 0 ? 1 : 0;
      return c;
    });
  };

  const canStartSurvey =
    dialogueIndex === dialogueSequence.length - 1 && !isTyping;

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 flex flex-col items-center justify-center px-4 py-10 text-slate-50">
      <div className="w-full max-w-6xl space-y-8 relative">
        
        {/* Retake Success Message */}
        {retakeMessage && showRetakeMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-green-900/30 border border-green-600 rounded-xl p-4 text-center relative"
          >
            <button
              onClick={() => setShowRetakeMessage(false)}
              className="absolute top-2 right-2 text-green-400 hover:text-green-300 transition-colors"
            >
              ✕
            </button>
            <div className="flex items-center justify-center gap-2 text-green-400">
              <span className="text-xl">✅</span>
              <span className="font-medium">{retakeMessage}</span>
            </div>
          </motion.div>
        )}
        
        {/* Title */}
        <div className="text-center space-y-2 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
            ElectiPath: Avatar Preview
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base">
            These are the avatars of the three elective paths. After your survey, one will be unlocked for you.
          </p>
        </div>

        {/* Avatar Grid */}
        <div className="grid md:grid-cols-3 gap-6 relative z-10">
          {electives.map((el, idx) => {
            // Show gender-specific avatar instead of rotating
            const currentImg = el.images[genderIndex];
            const isActive = activeElective === idx;

  return (
              <motion.div
                key={el.id}
                className={`relative bg-slate-900/60 rounded-2xl border p-4 flex flex-col items-center shadow-lg ${
                  isActive
                    ? "border-blue-400 shadow-blue-400/30"
                    : "border-slate-700"
                }`}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div
                  className={`w-full rounded-xl bg-gradient-to-r ${el.gradient} p-3 flex items-center justify-center mb-3`}
                >
                  <motion.img
                    key={variantIndex[idx]}
                    src={currentImg}
                    alt={el.title}
                    className="w-28 h-28 md:w-32 md:h-32 rounded-2xl object-cover border border-white/60 shadow-xl"
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <h2 className="font-semibold text-lg text-slate-50 text-center">
                  {el.title}
                </h2>

                <p className="text-[11px] text-slate-400 mt-2 text-center">
                  Your avatar for this path
                </p>

                {isActive && (
                  <motion.span
                    className="absolute -top-3 right-3 text-[10px] px-2 py-1 rounded-full bg-blue-500 text-white shadow"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Focused path
                  </motion.span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Narrator */}
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            className="bg-slate-900/80 border border-slate-700 rounded-2xl shadow-xl p-4 md:p-5 flex gap-3 items-start cursor-pointer hover:bg-slate-900/90 transition-colors"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleDialogueClick}
          >
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg shrink-0">
              ✨
      </div>

            <div className="flex-1">
              <p className="text-sm md:text-base text-slate-100 min-h-[3rem] leading-relaxed">
                {typedText}
                {isTyping && (
                  <span className="inline-block w-2 h-4 bg-slate-100 ml-1 animate-pulse" />
                )}
              </p>

              <div className="mt-3 flex justify-between items-center text-[11px] md:text-xs text-slate-400">
                <span>
                  Narrator · Line {dialogueIndex + 1} of {dialogueSequence.length}
                  {isTyping && <span className="ml-2 text-blue-400">💡 Click anywhere to skip typing</span>}
                </span>

      <button
                  onClick={handleNextDialogue}
                  disabled={dialogueIndex >= dialogueSequence.length - 1}
                  className="px-3 py-1 rounded-full border border-slate-500 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-default transition-colors"
      >
                  {dialogueIndex >= dialogueSequence.length - 1
                    ? "Ready"
                    : isTyping
                    ? "Click to Skip ⏩"
                    : "Next ▶"}
      </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Start Survey Button */}
        <div className="flex justify-center pt-2 relative z-10">
          {canStartSurvey && (
            <motion.button
              onClick={() => navigate("/interest-survey/survey")}
              className="px-8 py-3 rounded-full bg-blue-500 text-white font-semibold shadow-lg hover:bg-blue-600 hover:shadow-blue-500/40 flex items-center gap-2"
            >
              Start Survey 🎮
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
