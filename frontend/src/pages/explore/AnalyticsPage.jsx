// src/pages/explore/AnalyticsPage.jsx
import React, { useState } from "react";
import LeftTabLayout from "../../components/LeftTabLayout";

// Import tab components
import AnalyticsIntro from "./analytics/AnalyticsIntro";
import AnalyticsActivities from "./analytics/AnalyticsActivities";
import AnalyticsPathway from "./analytics/AnalyticsPathway";
import AnalyticsCareers from "./analytics/AnalyticsCareers";
import AnalyticsRoadmap from "./analytics/AnalyticsRoadmap";

const tabs = [
  { key: "intro", label: "Introduction" },
  { key: "activities", label: "Activities" },
  { key: "pathway", label: "Learning Path" },
  { key: "careers", label: "Career Outcomes" },
  { key: "roadmap", label: "Subject Sequence" }
];

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("intro");

  const renderTabContent = () => {
    switch (activeTab) {
      case "intro":
        return <AnalyticsIntro />;
      case "activities":
        return <AnalyticsActivities />;
      case "pathway":
        return <AnalyticsPathway />;
      case "careers":
        return <AnalyticsCareers />;
      case "roadmap":
        return <AnalyticsRoadmap />;
      default:
        return <AnalyticsPathway />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <LeftTabLayout
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        title="IT Business Analytics Pathway"
      >
        {renderTabContent()}
      </LeftTabLayout>
    </div>
  );
}