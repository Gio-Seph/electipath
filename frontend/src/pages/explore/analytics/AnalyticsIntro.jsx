import React from "react";
import { BarChart3, TrendingUp, Database, Brain, Target, Briefcase } from "lucide-react";

export default function AnalyticsIntro() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-cyan-400 drop-shadow mb-3">
          Introduction to IT Business Analytics
        </h2>
        <p className="text-cyan-200 text-lg leading-relaxed">
          Transform raw data into strategic business insights. Learn to identify patterns, predict trends, 
          and drive data-driven decision making that impacts business success.
        </p>
      </div>

      <div className="aspect-video rounded-xl overflow-hidden shadow-[0_0_25px_#06b6d4] border border-cyan-800">
        <iframe 
          className="w-full h-full" 
          src="https://www.youtube.com/embed/diaZdX1s5L4?si=LotjM9iY4kUV85wX" 
          allowFullScreen 
        />
      </div>
      
      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 p-4 rounded-lg border border-cyan-800">
          <h3 className="text-cyan-300 font-semibold mb-2">📊 Data-Driven</h3>
          <p className="text-slate-300 text-sm">Make strategic decisions based on solid data analysis</p>
        </div>
        <div className="bg-slate-900/60 p-4 rounded-lg border border-cyan-800">
          <h3 className="text-cyan-300 font-semibold mb-2">🚀 High Growth</h3>
          <p className="text-slate-300 text-sm">Analytics is one of the fastest-growing tech fields</p>
        </div>
        <div className="bg-slate-900/60 p-4 rounded-lg border border-cyan-800">
          <h3 className="text-cyan-300 font-semibold mb-2">💼 Business Impact</h3>
          <p className="text-slate-300 text-sm">Directly influence company strategy and growth</p>
        </div>
      </div>

      {/* What You'll Learn Section */}
      <div className="bg-gradient-to-br from-cyan-900/40 to-slate-900/60 border border-cyan-700 rounded-xl p-6">
        <h3 className="text-2xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
          <Brain size={28} />
          What You'll Learn
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">1</div>
              <div>
                <h4 className="text-cyan-200 font-semibold">Data Collection & Cleaning</h4>
                <p className="text-slate-400 text-sm">Master techniques to gather, validate, and prepare data from multiple sources for analysis.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">2</div>
              <div>
                <h4 className="text-cyan-200 font-semibold">Statistical Analysis</h4>
                <p className="text-slate-400 text-sm">Apply statistical methods to identify trends, correlations, and patterns in business data.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">3</div>
              <div>
                <h4 className="text-cyan-200 font-semibold">Data Visualization</h4>
                <p className="text-slate-400 text-sm">Create compelling charts, dashboards, and reports using Power BI, Tableau, and Python libraries.</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">4</div>
              <div>
                <h4 className="text-cyan-200 font-semibold">Predictive Analytics & AI</h4>
                <p className="text-slate-400 text-sm">Build machine learning models to forecast sales, customer behavior, and market trends.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">5</div>
              <div>
                <h4 className="text-cyan-200 font-semibold">Business Intelligence</h4>
                <p className="text-slate-400 text-sm">Design and implement BI solutions that provide real-time insights for decision-makers.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">6</div>
              <div>
                <h4 className="text-cyan-200 font-semibold">SQL & Database Management</h4>
                <p className="text-slate-400 text-sm">Query and manage large datasets efficiently using SQL and NoSQL databases.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Industry Insights */}
      <div className="bg-gradient-to-br from-slate-900/80 to-cyan-900/40 border border-cyan-700 rounded-xl p-6">
        <h3 className="text-2xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
          <TrendingUp size={28} />
          Industry Insights
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-cyan-200 font-semibold mb-3 flex items-center gap-2">
              <Database size={20} />
              Market Demand
            </h4>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">▸</span>
                <span>Data analytics market projected to reach $655 billion by 2029</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">▸</span>
                <span>97% of organizations are investing in big data and AI</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">▸</span>
                <span>Data analyst roles increased by 650% in the last decade</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">▸</span>
                <span>Philippines is a growing hub for data analytics outsourcing</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-cyan-200 font-semibold mb-3 flex items-center gap-2">
              <Briefcase size={20} />
              Career Opportunities
            </h4>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">▸</span>
                <span>Data Analyst / Business Intelligence Analyst</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">▸</span>
                <span>Data Scientist / Machine Learning Engineer</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">▸</span>
                <span>Business Analytics Consultant</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">▸</span>
                <span>Market Research Analyst / Financial Analyst</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Technologies You'll Use */}
      <div className="bg-slate-900/60 border border-cyan-700 rounded-xl p-6">
        <h3 className="text-2xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
          <Target size={28} />
          Technologies & Tools
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Python', icon: '🐍', desc: 'Data analysis language' },
            { name: 'Power BI', icon: '📊', desc: 'Microsoft BI tool' },
            { name: 'Tableau', icon: '📈', desc: 'Data visualization' },
            { name: 'SQL', icon: '🗄️', desc: 'Database queries' },
            { name: 'Excel', icon: '📑', desc: 'Spreadsheet analysis' },
            { name: 'R Programming', icon: '📉', desc: 'Statistical computing' },
            { name: 'TensorFlow', icon: '🤖', desc: 'Machine learning' },
            { name: 'Apache Spark', icon: '⚡', desc: 'Big data processing' }
          ].map((tech, idx) => (
            <div key={idx} className="bg-cyan-900/20 border border-cyan-700 rounded-lg p-3 text-center hover:bg-cyan-900/30 transition-colors">
              <div className="text-3xl mb-2">{tech.icon}</div>
              <h4 className="text-cyan-200 font-semibold text-sm">{tech.name}</h4>
              <p className="text-slate-400 text-xs mt-1">{tech.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Real-World Applications */}
      <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-700 rounded-xl p-6">
        <h3 className="text-2xl font-bold text-cyan-300 mb-4">
          📊 Real-World Analytics Applications
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-slate-900/60 p-4 rounded-lg border border-cyan-600">
            <h4 className="text-cyan-200 font-semibold mb-2">🛍️ Retail Analytics</h4>
            <p className="text-slate-400 text-sm">Sales forecasting, inventory optimization, customer segmentation, and pricing strategies</p>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-lg border border-cyan-600">
            <h4 className="text-cyan-200 font-semibold mb-2">💰 Financial Analysis</h4>
            <p className="text-slate-400 text-sm">Risk assessment, fraud detection, investment analysis, and credit scoring models</p>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-lg border border-cyan-600">
            <h4 className="text-cyan-200 font-semibold mb-2">📱 Marketing Analytics</h4>
            <p className="text-slate-400 text-sm">Campaign performance, customer lifetime value, A/B testing, and ROI measurement</p>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-lg border border-cyan-600">
            <h4 className="text-cyan-200 font-semibold mb-2">🏥 Healthcare Analytics</h4>
            <p className="text-slate-400 text-sm">Patient outcomes analysis, resource allocation, and disease prediction models</p>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-lg border border-cyan-600">
            <h4 className="text-cyan-200 font-semibold mb-2">🚚 Supply Chain</h4>
            <p className="text-slate-400 text-sm">Logistics optimization, demand forecasting, and supplier performance tracking</p>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-lg border border-cyan-600">
            <h4 className="text-cyan-200 font-semibold mb-2">👥 HR Analytics</h4>
            <p className="text-slate-400 text-sm">Employee retention, performance analysis, and workforce planning</p>
          </div>
        </div>
      </div>

      {/* Why Choose Analytics */}
      <div className="bg-cyan-900/20 border border-cyan-700 rounded-xl p-6">
        <h3 className="text-2xl font-bold text-cyan-300 mb-4">🌟 Why Choose Business Analytics?</h3>
        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center text-2xl shrink-0">🎯</div>
            <div>
              <h4 className="text-cyan-200 font-semibold mb-1">Be a Strategic Decision-Maker</h4>
              <p className="text-slate-300 text-sm">Your insights will directly influence company strategy, product development, and business growth.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center text-2xl shrink-0">💎</div>
            <div>
              <h4 className="text-cyan-200 font-semibold mb-1">High-Value Skillset</h4>
              <p className="text-slate-300 text-sm">Data literacy is one of the most sought-after skills. Companies pay premium salaries for analytics expertise.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center text-2xl shrink-0">🌐</div>
            <div>
              <h4 className="text-cyan-200 font-semibold mb-1">Industry-Agnostic</h4>
              <p className="text-slate-300 text-sm">Every industry needs data analysts - from tech to healthcare, finance to retail. Your skills are universally applicable.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
