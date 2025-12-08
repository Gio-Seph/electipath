import React from "react";
import PathwayTimeline from "../../../components/shared/PathwayTimeline";

// Learning pathway for Multimedia
const learningPathway = {
  beginner: {
    duration: "Months 1-2",
    level: "Creative Foundation",
    subjects: ["Digital Art Basics", "2D Animation", "Design Principles"],
    projects: ["Character Design", "Simple Animation", "Logo Design"],
    skills: ["Photoshop", "Illustrator", "Basic animation", "Color theory"],
    outcomes: ["Create digital artwork", "Understand design principles", "Basic animation skills"]
  },
  intermediate: {
    duration: "Months 3-4",
    level: "3D & Interactive",
    subjects: ["3D Modeling", "Game Development", "Motion Graphics"],
    projects: ["3D Character Model", "Simple Game", "Animated Logo"],
    skills: ["Blender", "Unity basics", "After Effects", "3D texturing"],
    outcomes: ["Model 3D objects", "Create simple games", "Professional animations"]
  },
  advanced: {
    duration: "Months 5-6",
    level: "Professional Production",
    subjects: ["Advanced Game Dev", "VR/AR Development", "Portfolio Creation"],
    projects: ["Complete Game", "VR Experience", "Professional Portfolio"],
    skills: ["Advanced Unity", "C# programming", "VR development", "Project management"],
    outcomes: ["Publish games", "Create VR experiences", "Industry-ready portfolio"]
  }
};

export default function MultimediaPathway() {
  return (
    <section className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-purple-400 mb-4">Multimedia Development Learning Path</h2>
        <p className="text-purple-200 max-w-2xl mx-auto">
          A creative 6-month journey from digital art basics to professional game development. 
          Master both artistic and technical skills to create engaging interactive experiences.
        </p>
      </div>
      
      <PathwayTimeline pathway={learningPathway} themeColor="purple" />
    </section>
  );
}
