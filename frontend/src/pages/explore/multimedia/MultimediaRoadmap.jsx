import React from "react";
import SubjectRoadmap from "../../../components/shared/SubjectRoadmap";

// Subject sequence for Multimedia
const subjectSequence = [
  {
    semester: "1st Semester",
    subjects: [
      { 
        code: "ITMM 1", 
        name: "Introduction to Multimedia", 
        description: "Introduction to multimedia concepts, digital media creation, and multimedia development tools and techniques"
      }
    ]
  },
  {
    semester: "2nd Semester",
    subjects: [
      { 
        code: "ITMM 2", 
        name: "Multimedia Course 2", 
        description: "Description to be added"
      },
      { 
        code: "ITMM 3", 
        name: "Multimedia Course 3", 
        description: "Description to be added"
      },
      { 
        code: "ITMM 4", 
        name: "Multimedia Course 4", 
        description: "Description to be added"
      },
      { 
        code: "ITMM 5", 
        name: "Multimedia Course 5", 
        description: "Description to be added"
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
          The recommended sequence of subjects for multimedia elective.
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
