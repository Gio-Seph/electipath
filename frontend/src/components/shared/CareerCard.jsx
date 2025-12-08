import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users } from "lucide-react";

export default function CareerCard({ career, isSelected, onClick, themeColor = "blue" }) {
  const colorClasses = {
    blue: {
      selected: 'border-blue-400 bg-blue-900/20 shadow-lg shadow-blue-500/20',
      unselected: 'border-blue-800 bg-slate-900/60',
      title: 'text-blue-300',
      jobOpenings: 'text-blue-300',
      skillBg: 'bg-blue-800/50',
      skillText: 'text-blue-200',
      demandHigh: 'bg-green-600 text-green-100',
      demandNormal: 'bg-blue-600 text-blue-100'
    },
    cyan: {
      selected: 'border-cyan-400 bg-cyan-900/20 shadow-lg shadow-cyan-500/20',
      unselected: 'border-blue-800 bg-slate-900/60',
      title: 'text-cyan-300',
      jobOpenings: 'text-cyan-300',
      skillBg: 'bg-cyan-800/50',
      skillText: 'text-cyan-200',
      demandHigh: 'bg-green-600 text-green-100',
      demandNormal: 'bg-cyan-600 text-cyan-100'
    },
    purple: {
      selected: 'border-purple-400 bg-purple-900/20 shadow-lg shadow-purple-500/20',
      unselected: 'border-blue-800 bg-slate-900/60',
      title: 'text-purple-300',
      jobOpenings: 'text-purple-300',
      skillBg: 'bg-purple-800/50',
      skillText: 'text-purple-200',
      demandHigh: 'bg-green-600 text-green-100',
      demandNormal: 'bg-purple-600 text-purple-100'
    }
  };

  const colors = colorClasses[themeColor];

  return (
    <motion.div 
      className={`p-6 rounded-xl border cursor-pointer transition-all ${
        isSelected ? colors.selected : colors.unselected
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className={`text-xl font-bold ${colors.title}`}>{career.title}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          career.demandLevel === 'Very High' 
            ? colors.demandHigh
            : colors.demandNormal
        }`}>
          {career.demandLevel} Demand
        </span>
      </div>
      
      <p className="text-slate-300 text-sm mb-4 leading-relaxed">{career.description}</p>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-slate-400 text-xs flex items-center gap-1">
            <TrendingUp size={12} /> Salary Range:
          </span>
          <span className="text-green-400 font-semibold text-sm">{career.salary}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-slate-400 text-xs flex items-center gap-1">
            <Users size={12} /> Job Openings:
          </span>
          <span className={`text-sm ${colors.jobOpenings}`}>{career.jobOpenings}</span>
        </div>
        
        <div>
          <span className="text-slate-400 text-xs mb-2 block">Key Skills:</span>
          <div className="flex flex-wrap gap-1">
            {career.skills.slice(0, 4).map(skill => (
              <span key={skill} className={`px-2 py-1 ${colors.skillBg} rounded text-xs ${colors.skillText}`}>
                {skill}
              </span>
            ))}
            {career.skills.length > 4 && (
              <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">
                +{career.skills.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
