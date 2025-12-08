import React, { useState } from "react";
import CareerCard from "../../../components/shared/CareerCard";
import CareerDetails from "../../../components/shared/CareerDetails";

// Career outcomes data for Analytics
const careerOutcomes = [
  {
    id: 1,
    title: "Data Analyst",
    salary: "₱30,000 - ₱65,000/month",
    description: "Transform raw data into actionable insights through statistical analysis and visualization",
    skills: ["SQL", "Python", "Excel", "Tableau", "Power BI", "Statistics"],
    companies: ["Accenture", "IBM Philippines", "Ayala Corporation", "SM Group", "Jollibee Foods"],
    growth: "Junior Analyst → Senior Analyst → Lead Analyst → Analytics Manager",
    demandLevel: "Very High",
    jobOpenings: "800+ openings",
    experience: "0-2 years entry level"
  },
  {
    id: 2,
    title: "Business Intelligence Developer",
    salary: "₱40,000 - ₱85,000/month",
    description: "Design and develop BI solutions, dashboards, and data warehouses for business decision-making",
    skills: ["SQL Server", "Power BI", "Tableau", "ETL", "Data Warehousing", "SSRS"],
    companies: ["Globe Telecom", "BDO", "Metrobank", "Ayala Land", "PLDT"],
    growth: "BI Developer → Senior BI Developer → BI Architect → Data Engineering Manager",
    demandLevel: "High",
    jobOpenings: "400+ openings",
    experience: "1-3 years preferred"
  },
  {
    id: 3,
    title: "Data Visualization Specialist",
    salary: "₱35,000 - ₱75,000/month",
    description: "Create compelling visual stories from complex datasets using advanced visualization tools",
    skills: ["Tableau", "Power BI", "D3.js", "Python", "R", "Design Principles"],
    companies: ["Thinking Machines", "Kalibrr", "Voyager Innovations", "UnionBank", "Security Bank"],
    growth: "Visualization Analyst → Senior Specialist → Lead Designer → Head of Analytics",
    demandLevel: "High",
    jobOpenings: "250+ openings",
    experience: "0-2 years entry level"
  }
];

export default function AnalyticsCareers() {
  const [selectedCareer, setSelectedCareer] = useState(null);

  return (
    <section className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-cyan-400 mb-4">Analytics Career Opportunities</h2>
        <p className="text-cyan-200 max-w-2xl mx-auto">
          Discover lucrative career paths in the data-driven business world. Click on any career to explore detailed information.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {careerOutcomes.map(career => (
          <CareerCard 
            key={career.id}
            career={career}
            isSelected={selectedCareer?.id === career.id}
            onClick={() => setSelectedCareer(career)}
            themeColor="cyan"
          />
        ))}
      </div>

      <CareerDetails career={selectedCareer} themeColor="cyan" />
    </section>
  );
}
