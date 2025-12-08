import React, { useState } from "react";
import CareerCard from "../../../components/shared/CareerCard";
import CareerDetails from "../../../components/shared/CareerDetails";

// Career outcomes for Multimedia
const careerOutcomes = [
  {
    id: 1,
    title: "Game Developer",
    salary: "₱40,000 - ₱90,000/month",
    description: "Create engaging games for mobile, PC, and console platforms using modern game engines",
    skills: ["Unity", "C#", "Unreal Engine", "3D Modeling", "Game Design", "Animation"],
    companies: ["Secret 6", "Altitude Games", "Anino Games", "GameOps", "Synergy88"],
    growth: "Junior Developer → Game Developer → Lead Developer → Game Director",
    demandLevel: "High",
    jobOpenings: "150+ openings",
    experience: "0-2 years entry level"
  },
  {
    id: 2,
    title: "3D Artist & Animator",
    salary: "₱35,000 - ₱80,000/month",
    description: "Design and animate 3D models, characters, and environments for games, films, and VR",
    skills: ["Blender", "Maya", "3ds Max", "ZBrush", "Substance Painter", "After Effects"],
    companies: ["Toei Animation", "Toon City", "Top Peg Animation", "Synergy88", "Secret 6"],
    growth: "3D Artist → Senior Artist → Art Director → Creative Director",
    demandLevel: "Very High",
    jobOpenings: "300+ openings",
    experience: "Portfolio required"
  },
  {
    id: 3,
    title: "UI/UX Designer (Games)",
    salary: "₱32,000 - ₱75,000/month",
    description: "Design intuitive and engaging user interfaces specifically for games and interactive media",
    skills: ["Figma", "Adobe Creative Suite", "UI Animation", "User Research", "Prototyping"],
    companies: ["Altitude Games", "Anino Games", "Secret 6", "Thinking Machines", "Kalibrr"],
    growth: "UI Designer → Senior Designer → Lead Designer → Creative Director",
    demandLevel: "High",
    jobOpenings: "200+ openings",
    experience: "0-1 years entry level"
  }
];

export default function MultimediaCareers() {
  const [selectedCareer, setSelectedCareer] = useState(null);

  return (
    <section className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-purple-400 mb-4">Creative Career Opportunities</h2>
        <p className="text-purple-200 max-w-2xl mx-auto">
          Discover exciting career paths in the multimedia and gaming industry. Click on any career to explore detailed information.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {careerOutcomes.map(career => (
          <CareerCard 
            key={career.id}
            career={career}
            isSelected={selectedCareer?.id === career.id}
            onClick={() => setSelectedCareer(career)}
            themeColor="purple"
          />
        ))}
      </div>

      <CareerDetails career={selectedCareer} themeColor="purple" />
    </section>
  );
}
