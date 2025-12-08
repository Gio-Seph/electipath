import React from "react";
import { Gamepad2, Palette, Film, Sparkles, Trophy, Rocket } from "lucide-react";

export default function MultimediaIntro() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-purple-400 drop-shadow mb-3">
          Introduction to Multimedia & Game Development
        </h2>
        <p className="text-purple-200 text-lg leading-relaxed">
          Explore sprite movement, animation timing, and collision logic — 
          the building blocks of engaging games and interactive experiences that captivate millions of users worldwide.
        </p>
      </div>

      <div className="aspect-video rounded-xl overflow-hidden shadow-xl shadow-purple-900/50 border border-purple-900">
        <iframe
          src="https://www.youtube.com/embed/5qap5aO4i9A"
          className="w-full h-full"
          allowFullScreen
        />
      </div>
      
      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 p-4 rounded-lg border border-purple-800">
          <h3 className="text-purple-300 font-semibold mb-2">🎮 Creative Expression</h3>
          <p className="text-slate-300 text-sm">Bring your imagination to life through games and interactive media</p>
        </div>
        <div className="bg-slate-900/60 p-4 rounded-lg border border-purple-800">
          <h3 className="text-purple-300 font-semibold mb-2">🚀 Growing Industry</h3>
          <p className="text-slate-300 text-sm">Gaming industry is one of the fastest-growing entertainment sectors</p>
        </div>
        <div className="bg-slate-900/60 p-4 rounded-lg border border-purple-800">
          <h3 className="text-purple-300 font-semibold mb-2">💰 Competitive Pay</h3>
          <p className="text-slate-300 text-sm">Game developers earn excellent salaries with creative fulfillment</p>
        </div>
      </div>

      {/* What You'll Learn Section */}
      <div className="bg-gradient-to-br from-purple-900/40 to-slate-900/60 border border-purple-700 rounded-xl p-6">
        <h3 className="text-2xl font-bold text-purple-300 mb-4 flex items-center gap-2">
          <Sparkles size={28} />
          What You'll Learn
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">1</div>
              <div>
                <h4 className="text-purple-200 font-semibold">Game Design Fundamentals</h4>
                <p className="text-slate-400 text-sm">Master game mechanics, level design, player psychology, and what makes games fun and engaging.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">2</div>
              <div>
                <h4 className="text-purple-200 font-semibold">2D & 3D Graphics</h4>
                <p className="text-slate-400 text-sm">Create stunning visuals using Unity, Unreal Engine, Blender, and industry-standard 3D modeling tools.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">3</div>
              <div>
                <h4 className="text-purple-200 font-semibold">Animation & VFX</h4>
                <p className="text-slate-400 text-sm">Bring characters to life with smooth animations, particle effects, and cinematic sequences.</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">4</div>
              <div>
                <h4 className="text-purple-200 font-semibold">Game Programming</h4>
                <p className="text-slate-400 text-sm">Code game logic, AI behavior, physics systems, and multiplayer networking using C# and C++.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">5</div>
              <div>
                <h4 className="text-purple-200 font-semibold">Audio Design</h4>
                <p className="text-slate-400 text-sm">Create immersive soundscapes with music composition, sound effects, and spatial audio.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">6</div>
              <div>
                <h4 className="text-purple-200 font-semibold">Video Production</h4>
                <p className="text-slate-400 text-sm">Master video editing, color grading, motion graphics using Adobe Premiere and After Effects.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Industry Insights */}
      <div className="bg-gradient-to-br from-slate-900/80 to-purple-900/40 border border-purple-700 rounded-xl p-6">
        <h3 className="text-2xl font-bold text-purple-300 mb-4 flex items-center gap-2">
          <Trophy size={28} />
          Industry Insights
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-purple-200 font-semibold mb-3 flex items-center gap-2">
              <Gamepad2 size={20} />
              Market Demand
            </h4>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">▸</span>
                <span>Global gaming market worth $282 billion (2024)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">▸</span>
                <span>3.2 billion gamers worldwide - largest entertainment industry</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">▸</span>
                <span>Philippines has a thriving game development community</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">▸</span>
                <span>Mobile gaming dominates with 50% market share</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-purple-200 font-semibold mb-3 flex items-center gap-2">
              <Palette size={20} />
              Career Opportunities
            </h4>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">▸</span>
                <span>Game Developer / Programmer</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">▸</span>
                <span>3D Artist / Animator / Character Designer</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">▸</span>
                <span>Video Editor / Motion Graphics Designer</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">▸</span>
                <span>Indie Game Developer / Content Creator</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Technologies You'll Use */}
      <div className="bg-slate-900/60 border border-purple-700 rounded-xl p-6">
        <h3 className="text-2xl font-bold text-purple-300 mb-4 flex items-center gap-2">
          <Rocket size={28} />
          Technologies & Tools
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Unity', icon: '🎮', desc: 'Game engine' },
            { name: 'Unreal Engine', icon: '🎯', desc: 'AAA game development' },
            { name: 'Blender', icon: '🎨', desc: '3D modeling' },
            { name: 'Photoshop', icon: '🖼️', desc: 'Image editing' },
            { name: 'After Effects', icon: '✨', desc: 'Motion graphics' },
            { name: 'Premiere Pro', icon: '🎬', desc: 'Video editing' },
            { name: 'Maya', icon: '🎭', desc: '3D animation' },
            { name: 'Godot', icon: '🚀', desc: 'Open-source engine' }
          ].map((tech, idx) => (
            <div key={idx} className="bg-purple-900/20 border border-purple-700 rounded-lg p-3 text-center hover:bg-purple-900/30 transition-colors">
              <div className="text-3xl mb-2">{tech.icon}</div>
              <h4 className="text-purple-200 font-semibold text-sm">{tech.name}</h4>
              <p className="text-slate-400 text-xs mt-1">{tech.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Real-World Applications */}
      <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-700 rounded-xl p-6">
        <h3 className="text-2xl font-bold text-purple-300 mb-4">
          🎮 What You Can Create
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-slate-900/60 p-4 rounded-lg border border-purple-600">
            <h4 className="text-purple-200 font-semibold mb-2">🎯 Mobile Games</h4>
            <p className="text-slate-400 text-sm">Casual games, puzzle games, action games for iOS and Android platforms</p>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-lg border border-purple-600">
            <h4 className="text-purple-200 font-semibold mb-2">🖥️ PC/Console Games</h4>
            <p className="text-slate-400 text-sm">AAA titles, indie games, VR experiences for Steam, PlayStation, Xbox</p>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-lg border border-purple-600">
            <h4 className="text-purple-200 font-semibold mb-2">🎬 Animated Films</h4>
            <p className="text-slate-400 text-sm">Short films, commercials, explainer videos, and animated series</p>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-lg border border-purple-600">
            <h4 className="text-purple-200 font-semibold mb-2">🏢 Architectural Viz</h4>
            <p className="text-slate-400 text-sm">3D building walkthroughs, interior design visualization, virtual tours</p>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-lg border border-purple-600">
            <h4 className="text-purple-200 font-semibold mb-2">📱 AR/VR Apps</h4>
            <p className="text-slate-400 text-sm">Augmented reality filters, virtual reality training simulations</p>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-lg border border-purple-600">
            <h4 className="text-purple-200 font-semibold mb-2">🎨 Digital Art</h4>
            <p className="text-slate-400 text-sm">Character design, concept art, NFT art, and digital illustrations</p>
          </div>
        </div>
      </div>

      {/* Why Choose Multimedia */}
      <div className="bg-purple-900/20 border border-purple-700 rounded-xl p-6">
        <h3 className="text-2xl font-bold text-purple-300 mb-4">🌟 Why Choose Multimedia & Game Development?</h3>
        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-2xl shrink-0">🎨</div>
            <div>
              <h4 className="text-purple-200 font-semibold mb-1">Turn Passion into Career</h4>
              <p className="text-slate-300 text-sm">If you love games, art, or storytelling, this is your chance to do what you love professionally.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-2xl shrink-0">💎</div>
            <div>
              <h4 className="text-purple-200 font-semibold mb-1">Build Your Own Games</h4>
              <p className="text-slate-300 text-sm">Many indie developers create successful games solo or in small teams. Your game could be the next big hit!</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-2xl shrink-0">🌍</div>
            <div>
              <h4 className="text-purple-200 font-semibold mb-1">Global Opportunities</h4>
              <p className="text-slate-300 text-sm">Work for international game studios, create content for YouTube/Twitch, or freelance for clients worldwide.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
