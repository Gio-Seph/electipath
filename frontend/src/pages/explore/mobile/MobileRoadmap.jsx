import React from "react";
import SubjectRoadmap from "../../../components/shared/SubjectRoadmap";

// Subject sequence roadmap
const subjectSequence = [
  {
    semester: "1st Year - 1st Semester",
    subjects: [
      { 
        code: "PROG101", 
        name: "Programming Fundamentals", 
        prerequisite: null,
        description: "Basic programming concepts using Python/JavaScript"
      },
      { 
        code: "MATH101", 
        name: "Discrete Mathematics", 
        prerequisite: null,
        description: "Logic, sets, and mathematical foundations for CS"
      }
    ]
  },
  {
    semester: "1st Year - 2nd Semester",
    subjects: [
      { 
        code: "PROG201", 
        name: "Object-Oriented Programming", 
        prerequisite: "PROG101",
        description: "OOP concepts using Java or C#"
      },
      { 
        code: "WEB101", 
        name: "Web Development Basics", 
        prerequisite: "PROG101",
        description: "HTML, CSS, JavaScript fundamentals"
      }
    ]
  },
  {
    semester: "2nd Year - 1st Semester",
    subjects: [
      { 
        code: "MOBILE301", 
        name: "Mobile App Development", 
        prerequisite: "PROG201",
        description: "React Native and Flutter development"
      },
      { 
        code: "UI201", 
        name: "UI/UX Design Principles", 
        prerequisite: "WEB101",
        description: "User interface and experience design"
      }
    ]
  },
  {
    semester: "2nd Year - 2nd Semester", 
    subjects: [
      { 
        code: "MOBILE401", 
        name: "Advanced Mobile Development", 
        prerequisite: "MOBILE301",
        description: "Native development, performance optimization"
      },
      { 
        code: "PROJ301", 
        name: "Capstone Project I", 
        prerequisite: "MOBILE301",
        description: "Start of final project development"
      }
    ]
  }
];

export default function MobileRoadmap() {
  return (
    <section className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-400 mb-4">Academic Subject Sequence</h2>
        <p className="text-blue-200 max-w-2xl mx-auto">
          The recommended sequence of subjects to master mobile development. 
          Prerequisites ensure you build a solid foundation before advancing.
        </p>
      </div>
      
      <SubjectRoadmap sequence={subjectSequence} themeColor="blue" />
      
      <div className="mt-8 p-6 bg-blue-900/20 rounded-xl border border-blue-700">
        <h3 className="text-blue-300 font-semibold mb-3">💡 Pro Tips for Success</h3>
        <ul className="space-y-2 text-slate-300 text-sm">
          <li>• Complete all prerequisites before advancing to the next level</li>
          <li>• Build personal projects alongside coursework to strengthen your portfolio</li>
          <li>• Join mobile development communities and attend tech meetups</li>
          <li>• Practice with both iOS and Android platforms for better job prospects</li>
          <li>• Stay updated with the latest mobile development trends and frameworks</li>
        </ul>
      </div>
    </section>
  );
}
