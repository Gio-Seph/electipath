import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LeftTabLayout({ tabs, activeTab, setActiveTab, title, children }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-10">

      {/* Header */}
      <div className="bg-slate-900/80 border-b border-slate-700 shadow-xl px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg shadow hover:bg-blue-500 transition"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <h1 className="text-2xl font-bold text-blue-400">{title}</h1>
      </div>

      {/* MAIN WRAPPER */}
      <div className="max-w-[1600px] mx-auto px-6 mt-6">

        {/* GRID: sidebar 1 col, content 4 cols */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

          {/* SIDEBAR — now SLIMMER */}
          <aside className="md:col-span-1">
            <div className="bg-slate-900/80 rounded-lg shadow-xl border border-slate-700 p-3">

              <h3 className="font-semibold text-slate-200 mb-3">Sections</h3>

              <ul className="space-y-2">
                {tabs.map((t) => (
                  <li key={t.key}>
                    <button
                      onClick={() => setActiveTab(t.key)}
                      className={`w-full text-left px-3 py-2 text-sm rounded border transition ${
                        activeTab === t.key
                          ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/30"
                          : "bg-slate-800/60 hover:bg-slate-800 border-slate-600 text-slate-300"
                      }`}
                    >
                      {t.label}
                    </button>
                  </li>
                ))}
              </ul>
              
            </div>
          </aside>

          {/* CONTENT — now MORE SPACE */}
          <main className="md:col-span-4 bg-slate-900/60 rounded-xl shadow-xl p-6 border border-slate-700">
            {children}
          </main>

        </div>

      </div>
    </div>
  );
}
