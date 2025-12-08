import React, { useState } from "react";
import { Star } from "lucide-react";
import Navbar from "../components/Navbar";

const electives = {
  "Multimedia and Game Development": [
    "Design",
    "Animation",
    "Game Design",
    "Video Editing",
  ],
  "Mobile Development": ["Programming", "App Design", "UI/UX", "Problem Solving"],
  "IT Business Analytics": [
    "Data Analysis",
    "AI/ML",
    "Business Intelligence",
    "Decision Making",
  ],
};

export default function ElectiveSurvey() {
  const [step, setStep] = useState(0);
  const [ratings, setRatings] = useState({});

  const electiveNames = Object.keys(electives);

  const handleRating = (category, item, value) => {
    setRatings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [item]: value,
      },
    }));
  };

  const getRecommendation = () => {
    let scores = {};
    for (const elective in ratings) {
      const items = Object.values(ratings[elective] || {});
      if (items.length > 0) {
        scores[elective] = items.reduce((a, b) => a + b, 0) / items.length;
      }
    }

    const bestElective = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
    if (!bestElective)
      return "Please rate your interests to see a recommendation.";

    return `🎯 Based on your interests, we recommend: **${bestElective[0]}**`;
  };

  const progress = ((step + 1) / electiveNames.length) * 100;

  return (
    <div>
      <Navbar />
    <div className="max-w-3xl mx-auto p-6">
      {/* Header with progress */}
      <div className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white p-4 rounded-xl mb-6">
        <h2 className="text-xl font-bold">Elective Interest Assessment</h2>
        <p className="text-sm">Step {step + 1} of {electiveNames.length}</p>
        <div className="w-full bg-white/30 h-2 mt-3 rounded-full overflow-hidden">
          <div
            className="bg-white h-2 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Step Content */}
      {step < electiveNames.length ? (
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="font-bold text-lg mb-4">{electiveNames[step]}</h3>
          <p className="text-gray-600 mb-6">
            Rate your interest in the following areas (1 = not interested, 5 = very interested)
          </p>
          {electives[electiveNames[step]].map((item) => (
            <div key={item} className="flex justify-between items-center mb-4">
              <span>{item}</span>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((val) => (
                  <Star
                    key={val}
                    size={22}
                    className={`cursor-pointer ${
                      ratings[electiveNames[step]]?.[item] >= val
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                    onClick={() =>
                      handleRating(electiveNames[step], item, val)
                    }
                  />
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-between mt-6">
            <button
              className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
              disabled={step === 0}
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              onClick={() => setStep(step + 1)}
            >
              {step === electiveNames.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      ) : (
        // Final Recommendation
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold mb-4">Your Recommended Elective</h3>
          <p className="text-lg">{getRecommendation()}</p>
          <button
            className="mt-6 px-6 py-2 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700"
            onClick={() => setStep(0)}
          >
            Retake Survey
          </button>
        </div>
      )}
    </div>
    </div>
  );
}