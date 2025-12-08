import React from "react";
import { motion } from "framer-motion";

export default function PathwayTimeline({ pathway, themeColor = "blue" }) {
  const colorClasses = {
    blue: {
      border: 'border-blue-600',
      circle: 'bg-blue-600',
      cardBorder: 'border-blue-800',
      title: 'text-blue-300',
      subtitle: 'text-blue-400',
      sectionTitle: 'text-blue-200'
    },
    cyan: {
      border: 'border-cyan-600',
      circle: 'bg-cyan-600',
      cardBorder: 'border-cyan-800',
      title: 'text-cyan-300',
      subtitle: 'text-cyan-400',
      sectionTitle: 'text-cyan-200'
    },
    purple: {
      border: 'border-purple-600',
      circle: 'bg-purple-600',
      cardBorder: 'border-purple-800',
      title: 'text-purple-300',
      subtitle: 'text-purple-400',
      sectionTitle: 'text-purple-200'
    }
  };

  const colors = colorClasses[themeColor];

  return (
    <div className="space-y-8">
      {Object.entries(pathway).map(([level, data], index) => (
        <motion.div 
          key={level}
          className={`relative pl-10 border-l-2 ${colors.border}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <div className={`absolute -left-4 w-8 h-8 ${colors.circle} rounded-full flex items-center justify-center shadow-lg`}>
            <span className="text-white text-sm font-bold">{index + 1}</span>
          </div>
          
          <div className={`bg-slate-900/60 rounded-xl p-6 border ${colors.cardBorder} shadow-lg`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className={`text-xl font-bold ${colors.title} capitalize`}>{level} Level</h4>
                <p className={`${colors.subtitle} text-sm`}>{data.level} • {data.duration}</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <h5 className={`${colors.sectionTitle} font-semibold mb-3 text-sm`}>📚 Subjects</h5>
                <ul className="space-y-2">
                  {data.subjects.map(subject => (
                    <li key={subject} className="text-slate-300 text-sm">• {subject}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className={`${colors.sectionTitle} font-semibold mb-3 text-sm`}>🚀 Projects</h5>
                <ul className="space-y-2">
                  {data.projects.map(project => (
                    <li key={project} className="text-slate-300 text-sm">• {project}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className={`${colors.sectionTitle} font-semibold mb-3 text-sm`}>💡 Skills Gained</h5>
                <ul className="space-y-2">
                  {data.skills.map(skill => (
                    <li key={skill} className="text-slate-300 text-sm">• {skill}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className={`${colors.sectionTitle} font-semibold mb-3 text-sm`}>🎯 Outcomes</h5>
                <ul className="space-y-2">
                  {data.outcomes.map(outcome => (
                    <li key={outcome} className="text-slate-300 text-sm">• {outcome}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
