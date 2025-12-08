import React from "react";
import PathwayTimeline from "../../../components/shared/PathwayTimeline";

// Learning pathway data
const learningPathway = {
  beginner: {
    duration: "Months 1-2",
    level: "Foundation",
    subjects: ["Mobile UI Basics", "State Management", "Navigation Patterns"],
    projects: ["Calculator App", "Todo List App", "Weather App"],
    skills: ["React Native basics", "Component lifecycle", "Basic styling", "Simple navigation"],
    outcomes: ["Build simple apps", "Understand mobile UI patterns", "Handle user input"]
  },
  intermediate: {
    duration: "Months 3-4",
    level: "Development", 
    subjects: ["Advanced UI Components", "Database Integration", "User Authentication"],
    projects: ["Social Media App", "E-commerce App", "Chat Application"],
    skills: ["Redux/Context API", "Firebase integration", "Push notifications", "Camera/Gallery access"],
    outcomes: ["Create complex apps", "Implement real-time features", "Handle user accounts"]
  },
  advanced: {
    duration: "Months 5-6",
    level: "Professional",
    subjects: ["Performance Optimization", "Testing & Debugging", "App Store Deployment"],
    projects: ["Full-stack Mobile App", "Published App", "Professional Portfolio"],
    skills: ["App Store optimization", "Performance profiling", "Automated testing", "CI/CD pipelines"],
    outcomes: ["Deploy to app stores", "Optimize app performance", "Professional development workflow"]
  }
};

export default function MobilePathway() {
  return (
    <section className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-400 mb-4">Mobile Development Learning Path</h2>
        <p className="text-blue-200 max-w-2xl mx-auto">
          A structured 6-month journey from beginner to professional mobile developer. 
          Each level builds upon the previous with hands-on projects and real-world skills.
        </p>
      </div>
      
      <PathwayTimeline pathway={learningPathway} themeColor="blue" />
    </section>
  );
}
