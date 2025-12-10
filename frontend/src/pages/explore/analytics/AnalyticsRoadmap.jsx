import React from "react";
import SubjectRoadmap from "../../../components/shared/SubjectRoadmap";

// Subject sequence for Analytics
const subjectSequence = [
  {
    semester: "1st Semester",
    subjects: [
      { 
        code: "ITBAN 1", 
        name: "Fundamentals of Business Analytics", 
        description: "Introduction to business analytics principles, data analysis techniques, and analytical tools for business decision-making"
      }
    ]
  },
  {
    semester: "2nd Semester",
    subjects: [
      { 
        code: "ITBAN 2", 
        name: "Business Analytics Course 2", 
        description: "Description to be added"
      },
      { 
        code: "ITBAN 3", 
        name: "Business Analytics Course 3", 
        description: "Description to be added"
      },
      { 
        code: "ITBAN 4", 
        name: "Business Analytics Course 4", 
        description: "Description to be added"
      },
      { 
        code: "ITBAN 5", 
        name: "Business Analytics Course 5", 
        description: "Description to be added"
      }
    ]
  }
];

export default function AnalyticsRoadmap() {
  return (
    <section className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-cyan-400 mb-4">Academic Subject Sequence</h2>
        <p className="text-cyan-200 max-w-2xl mx-auto">
          The recommended sequence of subjects for business analytics elective.
        </p>
      </div>
      
      <SubjectRoadmap sequence={subjectSequence} themeColor="cyan" />
      
      <div className="mt-8 p-6 bg-cyan-900/20 rounded-xl border border-cyan-700">
        <h3 className="text-cyan-300 font-semibold mb-3">💡 Success Tips for Analytics</h3>
        <ul className="space-y-2 text-slate-300 text-sm">
          <li>• Master Excel before moving to advanced tools like Python or R</li>
          <li>• Practice with real datasets from Kaggle and government open data</li>
          <li>• Learn to tell compelling stories with your data visualizations</li>
          <li>• Understand business context - analytics without business sense is just math</li>
          <li>• Stay updated with industry trends and new analytical tools</li>
        </ul>
      </div>
    </section>
  );
}
