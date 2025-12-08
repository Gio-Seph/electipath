import React from "react";
import SubjectRoadmap from "../../../components/shared/SubjectRoadmap";

// Subject sequence for Analytics
const subjectSequence = [
  {
    semester: "1st Year - 1st Semester",
    subjects: [
      { 
        code: "MATH101", 
        name: "Statistics and Probability", 
        prerequisite: null,
        description: "Foundation in statistical concepts and probability theory"
      },
      { 
        code: "PROG101", 
        name: "Programming Fundamentals", 
        prerequisite: null,
        description: "Basic programming using Python for data manipulation"
      }
    ]
  },
  {
    semester: "1st Year - 2nd Semester",
    subjects: [
      { 
        code: "DATA201", 
        name: "Database Management Systems", 
        prerequisite: "PROG101",
        description: "SQL, database design, and data modeling"
      },
      { 
        code: "STAT201", 
        name: "Applied Statistics", 
        prerequisite: "MATH101",
        description: "Hypothesis testing, regression, and statistical inference"
      }
    ]
  },
  {
    semester: "2nd Year - 1st Semester",
    subjects: [
      { 
        code: "ANALYTICS301", 
        name: "Business Analytics", 
        prerequisite: "DATA201",
        description: "Business intelligence, KPIs, and analytics frameworks"
      },
      { 
        code: "VIZ301", 
        name: "Data Visualization", 
        prerequisite: "STAT201",
        description: "Tableau, Power BI, and visual storytelling"
      }
    ]
  },
  {
    semester: "2nd Year - 2nd Semester",
    subjects: [
      { 
        code: "ML401", 
        name: "Machine Learning Fundamentals", 
        prerequisite: "ANALYTICS301",
        description: "Predictive modeling and ML algorithms"
      },
      { 
        code: "CAPSTONE401", 
        name: "Analytics Capstone Project", 
        prerequisite: "VIZ301",
        description: "End-to-end analytics project with real business data"
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
          The structured academic pathway to master business analytics. 
          Build from mathematical foundations to advanced machine learning.
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
