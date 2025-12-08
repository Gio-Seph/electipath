// src/pages/explore/MultimediaPage.jsx
import React, { useState } from "react";
import LeftTabLayout from "../../components/LeftTabLayout";

// Import tab components
import MultimediaIntro from "./multimedia/MultimediaIntro";
import MultimediaActivities from "./multimedia/MultimediaActivities";
import MultimediaPathway from "./multimedia/MultimediaPathway";
import MultimediaCareers from "./multimedia/MultimediaCareers";
import MultimediaRoadmap from "./multimedia/MultimediaRoadmap";

const tabs = [
  { key: "intro", label: "Introduction" },
  { key: "activities", label: "Activities" },
  { key: "pathway", label: "Learning Path" },
  { key: "careers", label: "Career Outcomes" },
  { key: "roadmap", label: "Subject Sequence" }
];

export default function MultimediaPage() {
  const [activeTab, setActiveTab] = useState("intro");

  const renderTabContent = () => {
    switch (activeTab) {
      case "intro":
        return <MultimediaIntro />;
      case "activities":
        return <MultimediaActivities />;
      case "pathway":
        return <MultimediaPathway />;
      case "careers":
        return <MultimediaCareers />;
      case "roadmap":
        return <MultimediaRoadmap />;
      default:
        return <MultimediaPathway />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <LeftTabLayout
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        title="Multimedia & Game Development Pathway"
      >
        {renderTabContent()}
      </LeftTabLayout>
    </div>
  );
}