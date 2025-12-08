import React, { useState } from "react";
import CareerCard from "../../../components/shared/CareerCard";
import CareerDetails from "../../../components/shared/CareerDetails";

// Career outcomes data
const careerOutcomes = [
  {
    id: 1,
    title: "Mobile App Developer",
    salary: "₱35,000 - ₱80,000/month",
    description: "Build native and cross-platform mobile applications for iOS and Android platforms",
    skills: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "REST APIs"],
    companies: ["Globe Telecom", "GCash", "Grab Philippines", "Shopee", "Lazada"],
    growth: "Junior Developer → Senior Developer → Lead Developer → Mobile Architect",
    demandLevel: "Very High",
    jobOpenings: "500+ openings",
    experience: "0-2 years entry level"
  },
  {
    id: 2,
    title: "UI/UX Mobile Designer",
    salary: "₱30,000 - ₱70,000/month", 
    description: "Design user interfaces and experiences specifically for mobile applications",
    skills: ["Figma", "Adobe XD", "Sketch", "User Research", "Prototyping", "Design Systems"],
    companies: ["Thinking Machines", "Kalibrr", "PayMaya", "UnionBank", "Security Bank"],
    growth: "Junior Designer → Senior Designer → Lead Designer → Design Director",
    demandLevel: "High",
    jobOpenings: "200+ openings",
    experience: "0-1 years entry level"
  },
  {
    id: 3,
    title: "Flutter Developer",
    salary: "₱40,000 - ₱90,000/month",
    description: "Specialize in Google's Flutter framework for cross-platform mobile development",
    skills: ["Flutter", "Dart", "Firebase", "State Management", "Native Integration"],
    companies: ["Accenture", "IBM Philippines", "Pointwest", "Exist Software"],
    growth: "Flutter Developer → Senior Flutter Dev → Flutter Architect → CTO",
    demandLevel: "Very High",
    jobOpenings: "300+ openings", 
    experience: "1-3 years preferred"
  }
];

export default function MobileCareers() {
  const [selectedCareer, setSelectedCareer] = useState(null);

  return (
    <section className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-400 mb-4">Career Opportunities</h2>
        <p className="text-blue-200 max-w-2xl mx-auto">
          Explore the diverse career paths available in mobile development. Click on any career to see detailed information.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {careerOutcomes.map(career => (
          <CareerCard 
            key={career.id}
            career={career}
            isSelected={selectedCareer?.id === career.id}
            onClick={() => setSelectedCareer(career)}
            themeColor="blue"
          />
        ))}
      </div>

      <CareerDetails career={selectedCareer} themeColor="blue" />
    </section>
  );
}
