import React from "react";
import PathwayTimeline from "../../../components/shared/PathwayTimeline";

// Learning pathway for Analytics
const learningPathway = {
  beginner: {
    duration: "Months 1-2",
    level: "Foundation",
    subjects: ["Data Fundamentals", "Excel Mastery", "Basic Statistics"],
    projects: ["Sales Dashboard", "Survey Analysis", "Trend Report"],
    skills: ["Excel formulas", "Basic charts", "Descriptive statistics", "Data cleaning"],
    outcomes: ["Create basic reports", "Understand data types", "Perform simple analysis"]
  },
  intermediate: {
    duration: "Months 3-4",
    level: "Analysis",
    subjects: ["SQL Database Queries", "Statistical Analysis", "Data Visualization"],
    projects: ["Customer Segmentation", "A/B Testing Analysis", "Interactive Dashboard"],
    skills: ["SQL joins", "Hypothesis testing", "Tableau/Power BI", "Python basics"],
    outcomes: ["Query databases", "Perform statistical tests", "Create interactive visualizations"]
  },
  advanced: {
    duration: "Months 5-6",
    level: "Professional",
    subjects: ["Advanced Analytics", "Machine Learning Basics", "Business Intelligence"],
    projects: ["Predictive Model", "Executive Dashboard", "Data Pipeline"],
    skills: ["Regression analysis", "ML algorithms", "ETL processes", "Business storytelling"],
    outcomes: ["Build predictive models", "Design BI solutions", "Present to executives"]
  }
};

export default function AnalyticsPathway() {
  return (
    <section className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-cyan-400 mb-4">Analytics Learning Path</h2>
        <p className="text-cyan-200 max-w-2xl mx-auto">
          A comprehensive 6-month journey from data novice to analytics professional. 
          Master statistical analysis, visualization, and business intelligence.
        </p>
      </div>
      
      <PathwayTimeline pathway={learningPathway} themeColor="cyan" />
    </section>
  );
}
