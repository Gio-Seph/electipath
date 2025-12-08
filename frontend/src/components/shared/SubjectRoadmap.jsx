import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function SubjectRoadmap({ sequence, themeColor = "blue" }) {
  const colorClasses = {
    blue: {
      title: 'text-blue-300',
      circle: 'bg-blue-600',
      cardBorder: 'border-blue-800',
      cardHover: 'hover:border-blue-600',
      codeText: 'text-blue-400',
      codeBg: 'bg-blue-900/30',
      subjectTitle: 'text-blue-200',
      chevron: 'text-blue-600'
    },
    cyan: {
      title: 'text-cyan-300',
      circle: 'bg-cyan-600',
      cardBorder: 'border-cyan-800',
      cardHover: 'hover:border-cyan-600',
      codeText: 'text-cyan-400',
      codeBg: 'bg-cyan-900/30',
      subjectTitle: 'text-cyan-200',
      chevron: 'text-cyan-600'
    },
    purple: {
      title: 'text-purple-300',
      circle: 'bg-purple-600',
      cardBorder: 'border-purple-800',
      cardHover: 'hover:border-purple-600',
      codeText: 'text-purple-400',
      codeBg: 'bg-purple-900/30',
      subjectTitle: 'text-purple-200',
      chevron: 'text-purple-600'
    }
  };

  const colors = colorClasses[themeColor];

  return (
    <div className="space-y-8">
      {sequence.map((sem, index) => (
        <motion.div 
          key={sem.semester}
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <h3 className={`text-xl font-bold ${colors.title} mb-6 flex items-center gap-2`}>
            <div className={`w-8 h-8 ${colors.circle} rounded-full flex items-center justify-center text-white text-sm font-bold`}>
              {index + 1}
            </div>
            {sem.semester}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 ml-10">
            {sem.subjects.map(subject => (
              <div key={subject.code} className={`bg-slate-900/60 rounded-lg p-5 border ${colors.cardBorder} ${colors.cardHover} transition-colors`}>
                <div className="flex justify-between items-start mb-3">
                  <span className={`${colors.codeText} font-mono text-sm font-bold ${colors.codeBg} px-2 py-1 rounded`}>
                    {subject.code}
                  </span>
                  {subject.prerequisite && (
                    <span className="text-slate-400 text-xs bg-slate-800 px-2 py-1 rounded">
                      Requires: {subject.prerequisite}
                    </span>
                  )}
                </div>
                <h4 className={`${colors.subjectTitle} font-semibold mb-2`}>{subject.name}</h4>
                <p className="text-slate-300 text-sm">{subject.description}</p>
              </div>
            ))}
          </div>
          
          {index < sequence.length - 1 && (
            <div className="flex justify-center mt-8">
              <ChevronDown className={colors.chevron} size={32} />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
