// src/pages/explore/MobilePage.jsx
import React, { useState } from "react";
import LeftTabLayout from "../../components/LeftTabLayout";

// Import tab components
import MobileIntro from "./mobile/MobileIntro";
import MobileActivities from "./mobile/MobileActivities";
import MobilePathway from "./mobile/MobilePathway";
import MobileCareers from "./mobile/MobileCareers";
import MobileRoadmap from "./mobile/MobileRoadmap";

const tabs = [
  { key: "intro", label: "Introduction" },
  { key: "activities", label: "Activities" },
  { key: "pathway", label: "Learning Path" },
  { key: "careers", label: "Career Outcomes" },
  { key: "roadmap", label: "Subject Sequence" }
];

export default function MobilePage() {
  const [activeTab, setActiveTab] = useState("intro");

  const renderTabContent = () => {
    switch (activeTab) {
      case "intro":
        return <MobileIntro />;
      case "activities":
        return <MobileActivities />;
      case "pathway":
        return <MobilePathway />;
      case "careers":
        return <MobileCareers />;
      case "roadmap":
        return <MobileRoadmap />;
      default:
        return <MobilePathway />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <LeftTabLayout 
        tabs={tabs} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        title="Mobile Development Pathway"
      >
        {renderTabContent()}
      </LeftTabLayout>
    </div>
  );
}