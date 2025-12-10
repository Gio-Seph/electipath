import React from "react";
import SubjectRoadmap from "../../../components/shared/SubjectRoadmap";

// Subject sequence roadmap
const subjectSequence = [
  {
    semester: "1st Semester",
    subjects: [
      { 
        code: "ITMSD 1", 
        name: "Fundamentals of Mobile Design and Tools", 
        description: "Introduction to mobile design principles, UI/UX concepts, and essential mobile development tools and frameworks"
      }
    ]
  },
  {
    semester: "2nd Semester",
    subjects: [
      { 
        code: "ITMSD 2", 
        name: "Mobile Development Course 2", 
        description: "Description to be added"
      },
      { 
        code: "ITMSD 3", 
        name: "Mobile Development Course 3", 
        description: "Description to be added"
      },
      { 
        code: "ITMSD 4", 
        name: "Mobile Development Course 4", 
        description: "Description to be added"
      },
      { 
        code: "ITMSD 5", 
        name: "Mobile Development Course 5", 
        description: "Description to be added"
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
          The recommended sequence of subjects for mobile development elective.
        </p>
      </div>
      
      <SubjectRoadmap sequence={subjectSequence} themeColor="blue" />
      
      <div className="mt-8 p-6 bg-blue-900/20 rounded-xl border border-blue-700">
        <h3 className="text-blue-300 font-semibold mb-3">💡 Pro Tips for Success</h3>
        <ul className="space-y-2 text-slate-300 text-sm">
          <li>• Build personal projects alongside coursework to strengthen your portfolio</li>
          <li>• Join mobile development communities and attend tech meetups</li>
          <li>• Practice with both iOS and Android platforms for better job prospects</li>
          <li>• Stay updated with the latest mobile development trends and frameworks</li>
        </ul>
      </div>
    </section>
  );
}
