import React from "react";
import SubjectRoadmap from "../../../components/shared/SubjectRoadmap";

// Subject sequence for Multimedia
const subjectSequence = [
  {
    semester: "1st Year - 1st Semester",
    subjects: [
      { 
        code: "ART101", 
        name: "Digital Art Fundamentals", 
        prerequisite: null,
        description: "Basic digital art techniques using Photoshop and Illustrator"
      },
      { 
        code: "DESIGN101", 
        name: "Design Principles", 
        prerequisite: null,
        description: "Color theory, composition, and visual design fundamentals"
      }
    ]
  },
  {
    semester: "1st Year - 2nd Semester",
    subjects: [
      { 
        code: "ANIM201", 
        name: "2D Animation", 
        prerequisite: "ART101",
        description: "Traditional and digital 2D animation techniques"
      },
      { 
        code: "PROG101", 
        name: "Programming for Creatives", 
        prerequisite: null,
        description: "Basic programming concepts for multimedia applications"
      }
    ]
  },
  {
    semester: "2nd Year - 1st Semester",
    subjects: [
      { 
        code: "3D301", 
        name: "3D Modeling & Animation", 
        prerequisite: "ANIM201",
        description: "3D modeling, rigging, and animation using Blender/Maya"
      },
      { 
        code: "GAME301", 
        name: "Game Development Fundamentals", 
        prerequisite: "PROG101",
        description: "Unity game engine and C# programming for games"
      }
    ]
  },
  {
    semester: "2nd Year - 2nd Semester",
    subjects: [
      { 
        code: "GAME401", 
        name: "Advanced Game Development", 
        prerequisite: "GAME301",
        description: "Advanced Unity features, multiplayer, and optimization"
      },
      { 
        code: "PORTFOLIO401", 
        name: "Portfolio & Capstone", 
        prerequisite: "3D301",
        description: "Professional portfolio development and final project"
      }
    ]
  }
];

export default function MultimediaRoadmap() {
  return (
    <section className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-purple-400 mb-4">Academic Subject Sequence</h2>
        <p className="text-purple-200 max-w-2xl mx-auto">
          The structured academic pathway to master multimedia and game development. 
          Build from artistic foundations to advanced interactive systems.
        </p>
      </div>
      
      <SubjectRoadmap sequence={subjectSequence} themeColor="purple" />
      
      <div className="mt-8 p-6 bg-purple-900/20 rounded-xl border border-purple-700">
        <h3 className="text-purple-300 font-semibold mb-3">💡 Success Tips for Multimedia</h3>
        <ul className="space-y-2 text-slate-300 text-sm">
          <li>• Build a strong portfolio showcasing both technical and artistic skills</li>
          <li>• Practice regularly with game jams and personal projects</li>
          <li>• Learn multiple tools - don't limit yourself to just one software</li>
          <li>• Study games you love and analyze what makes them engaging</li>
          <li>• Join game development communities and get feedback on your work</li>
        </ul>
      </div>
    </section>
  );
}
