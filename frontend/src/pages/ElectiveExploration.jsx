import { useNavigate } from "react-router-dom";
import { Gamepad2, BarChart3, Smartphone, ArrowRight, Sparkles, TrendingUp, Zap } from "lucide-react";

export default function ElectiveExploration() {
  const navigate = useNavigate();

  const electives = [
    {
      title: "Multimedia & Game Development",
      shortTitle: "MMGD",
      desc: "Focuses on creativity, animation, 3D design, and interactive media. Ideal for students passionate about visual storytelling and game creation.",
      icon: "🎮",
      IconComponent: Gamepad2,
      gradient: "from-purple-600 via-pink-600 to-purple-700",
      borderColor: "border-purple-500",
      glowColor: "shadow-purple-500/50",
      hoverGlow: "hover:shadow-purple-500/70",
      path: "/explore/multimedia",
      features: ["Game Design", "3D Modeling", "Animation", "VFX"],
      bgPattern: "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"
    },
    {
      title: "IT Business Analytics",
      shortTitle: "ITBA",
      desc: "Emphasizes data analysis, AI, and business intelligence to make informed decisions. Perfect for those who love data-driven problem-solving.",
      icon: "📊",
      IconComponent: BarChart3,
      gradient: "from-cyan-600 via-blue-600 to-indigo-700",
      borderColor: "border-cyan-500",
      glowColor: "shadow-cyan-500/50",
      hoverGlow: "hover:shadow-cyan-500/70",
      path: "/explore/analytics",
      features: ["Data Analysis", "Machine Learning", "BI Tools", "SQL"],
      bgPattern: "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"
    },
    {
      title: "IT Mobile Development",
      shortTitle: "Mobile Dev",
      desc: "Centers on mobile app design and development using modern frameworks. Great for innovators building solutions for real-world needs.",
      icon: "📱",
      IconComponent: Smartphone,
      gradient: "from-emerald-600 via-teal-600 to-green-700",
      borderColor: "border-emerald-500",
      glowColor: "shadow-emerald-500/50",
      hoverGlow: "hover:shadow-emerald-500/70",
      path: "/explore/mobile",
      features: ["React Native", "Flutter", "iOS/Android", "UI/UX"],
      bgPattern: "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-semibold">Choose Your Path</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 mb-4">
            Explore IT Electives
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Discover your passion and build your future in technology. Each elective offers unique opportunities and career paths.
          </p>
        </div>

        {/* Elective Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {electives.map((item, index) => {
            const Icon = item.IconComponent;
            return (
              <div
                key={index}
                onClick={() => navigate(item.path)}
                className={`group cursor-pointer relative bg-slate-900/80 backdrop-blur-sm border-2 ${item.borderColor} rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 shadow-2xl ${item.glowColor} ${item.hoverGlow}`}
              >
                {/* Background Pattern */}
                <div className={`absolute inset-0 ${item.bgPattern} opacity-50`}></div>
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                {/* Content */}
                <div className="relative p-8">
                  {/* Icon Section */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-4 bg-gradient-to-br ${item.gradient} rounded-2xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-4xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                      {item.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all duration-300">
                    {item.title}
                  </h2>
                  
                  {/* Short Title Badge */}
                  <div className={`inline-block px-3 py-1 bg-gradient-to-r ${item.gradient} rounded-full text-xs font-bold text-white mb-4`}>
                    {item.shortTitle}
                  </div>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {item.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${item.gradient}`}></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className={`flex items-center justify-between p-4 bg-slate-800/50 border border-slate-700 rounded-xl group-hover:bg-gradient-to-r group-hover:${item.gradient} group-hover:border-transparent transition-all duration-300`}>
                    <span className="text-sm font-semibold text-slate-300 group-hover:text-white">
                      Explore Path
                    </span>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-white transform group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <TrendingUp className="w-6 h-6 text-blue-400" />
              <h3 className="text-2xl font-bold text-white">Not Sure Yet?</h3>
            </div>
            <p className="text-slate-400 mb-6">
              Take our interactive interest survey to discover which elective matches your skills and passions best.
            </p>
            <button
              onClick={() => navigate("/interest-survey")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/25"
            >
              <Zap className="w-5 h-5" />
              Take Interest Survey
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
