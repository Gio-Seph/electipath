import React from "react";
import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";

export default function CareerDetails({ career, themeColor = "blue" }) {
  const colorClasses = {
    blue: {
      border: 'border-blue-800',
      title: 'text-blue-300',
      subtitle: 'text-blue-200',
      skillBg: 'bg-blue-800/50',
      skillText: 'text-blue-200'
    },
    cyan: {
      border: 'border-cyan-800',
      title: 'text-cyan-300',
      subtitle: 'text-cyan-200',
      skillBg: 'bg-cyan-800/50',
      skillText: 'text-cyan-200'
    },
    purple: {
      border: 'border-purple-800',
      title: 'text-purple-300',
      subtitle: 'text-purple-200',
      skillBg: 'bg-purple-800/50',
      skillText: 'text-purple-200'
    }
  };

  const colors = colorClasses[themeColor];

  if (!career) {
    return (
      <div className={`bg-slate-900/60 rounded-xl p-6 border ${colors.border} flex items-center justify-center h-64`}>
        <p className="text-slate-400">Select a career to see detailed information</p>
      </div>
    );
  }

  return (
    <motion.div 
      className={`bg-slate-900/60 rounded-xl p-6 border ${colors.border}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className={`text-2xl font-bold ${colors.title} mb-4`}>{career.title}</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h4 className={`${colors.subtitle} font-semibold mb-2 flex items-center gap-2`}>
              <MapPin size={16} /> Top Hiring Companies
            </h4>
            <ul className="space-y-1">
              {career.companies.map(company => (
                <li key={company} className="text-slate-300 text-sm">• {company}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className={`${colors.subtitle} font-semibold mb-2 flex items-center gap-2`}>
              <Clock size={16} /> Experience Level
            </h4>
            <p className="text-slate-300 text-sm">{career.experience}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className={`${colors.subtitle} font-semibold mb-2`}>Career Progression</h4>
            <p className="text-slate-300 text-sm leading-relaxed">{career.growth}</p>
          </div>
          
          <div>
            <h4 className={`${colors.subtitle} font-semibold mb-2`}>Required Skills</h4>
            <div className="flex flex-wrap gap-2">
              {career.skills.map(skill => (
                <span key={skill} className={`px-3 py-1 ${colors.skillBg} rounded-full text-xs ${colors.skillText}`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
