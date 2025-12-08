import React from "react";
import { Smartphone, Code, Users, TrendingUp, Zap, Globe } from "lucide-react";

export default function MobileIntro() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-blue-400 drop-shadow mb-3">
          Introduction to Mobile Development
        </h2>
        <p className="text-blue-200 text-lg leading-relaxed">
          Learn UI state management, behavior, and interaction logic used in modern mobile applications. 
          Build real-world apps that millions of users can download and use daily.
        </p>
      </div>

      <div className="aspect-video rounded-xl overflow-hidden shadow-[0_0_25px_#3b82f6] border border-blue-800">
        <iframe 
          className="w-full h-full" 
          src="https://www.youtube.com/embed/G_xOiQWFDhU?si=0BpQ14zLqweXd2DV" 
          allowFullScreen 
        />
      </div>
      
      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 p-4 rounded-lg border border-blue-800">
          <h3 className="text-blue-300 font-semibold mb-2">📱 Cross-Platform</h3>
          <p className="text-slate-300 text-sm">Build once, deploy to both iOS and Android</p>
        </div>
        <div className="bg-slate-900/60 p-4 rounded-lg border border-blue-800">
          <h3 className="text-blue-300 font-semibold mb-2">🚀 High Demand</h3>
          <p className="text-slate-300 text-sm">Mobile developers are in very high demand</p>
        </div>
        <div className="bg-slate-900/60 p-4 rounded-lg border border-blue-800">
          <h3 className="text-blue-300 font-semibold mb-2">💰 Great Salary</h3>
          <p className="text-slate-300 text-sm">Competitive salaries starting at ₱35,000+</p>
        </div>
      </div>

      {/* What You'll Learn Section */}
      <div className="bg-gradient-to-br from-blue-900/40 to-slate-900/60 border border-blue-700 rounded-xl p-6">
        <h3 className="text-2xl font-bold text-blue-300 mb-4 flex items-center gap-2">
          <Code size={28} />
          What You'll Learn
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">1</div>
              <div>
                <h4 className="text-blue-200 font-semibold">Mobile UI/UX Design</h4>
                <p className="text-slate-400 text-sm">Create intuitive and beautiful user interfaces that users love. Learn design patterns, navigation flows, and responsive layouts.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">2</div>
              <div>
                <h4 className="text-blue-200 font-semibold">React Native & Flutter</h4>
                <p className="text-slate-400 text-sm">Master cross-platform frameworks to build apps for iOS and Android simultaneously, saving time and resources.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">3</div>
              <div>
                <h4 className="text-blue-200 font-semibold">State Management</h4>
                <p className="text-slate-400 text-sm">Handle complex app states, user data, and real-time updates efficiently using Redux, MobX, or Provider patterns.</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">4</div>
              <div>
                <h4 className="text-blue-200 font-semibold">API Integration</h4>
                <p className="text-slate-400 text-sm">Connect your apps to backend services, databases, and third-party APIs for dynamic content and features.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">5</div>
              <div>
                <h4 className="text-blue-200 font-semibold">App Deployment</h4>
                <p className="text-slate-400 text-sm">Learn to publish apps on Google Play Store and Apple App Store, including app signing and version management.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">6</div>
              <div>
                <h4 className="text-blue-200 font-semibold">Performance Optimization</h4>
                <p className="text-slate-400 text-sm">Optimize app performance, reduce loading times, and create smooth animations for the best user experience.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Industry Insights */}
      <div className="bg-gradient-to-br from-slate-900/80 to-blue-900/40 border border-blue-700 rounded-xl p-6">
        <h3 className="text-2xl font-bold text-blue-300 mb-4 flex items-center gap-2">
          <TrendingUp size={28} />
          Industry Insights
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-blue-200 font-semibold mb-3 flex items-center gap-2">
              <Globe size={20} />
              Market Demand
            </h4>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">▸</span>
                <span>Over 6.8 billion smartphone users worldwide (2023)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">▸</span>
                <span>Mobile apps generated $420+ billion in revenue globally</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">▸</span>
                <span>Philippines has 76+ million mobile internet users</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">▸</span>
                <span>Mobile-first approach is now standard for all businesses</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-blue-200 font-semibold mb-3 flex items-center gap-2">
              <Users size={20} />
              Career Opportunities
            </h4>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">▸</span>
                <span>Mobile App Developer (iOS/Android/Cross-platform)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">▸</span>
                <span>UI/UX Designer for Mobile Applications</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">▸</span>
                <span>Mobile Solutions Architect</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">▸</span>
                <span>Freelance App Developer (work from anywhere!)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Technologies You'll Use */}
      <div className="bg-slate-900/60 border border-blue-700 rounded-xl p-6">
        <h3 className="text-2xl font-bold text-blue-300 mb-4 flex items-center gap-2">
          <Zap size={28} />
          Technologies & Tools
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'React Native', icon: '⚛️', desc: 'Cross-platform framework' },
            { name: 'Flutter', icon: '🎯', desc: 'Google\'s UI toolkit' },
            { name: 'Swift', icon: '🍎', desc: 'iOS development' },
            { name: 'Kotlin', icon: '🤖', desc: 'Android development' },
            { name: 'Firebase', icon: '🔥', desc: 'Backend services' },
            { name: 'REST APIs', icon: '🌐', desc: 'Data communication' },
            { name: 'Git', icon: '📦', desc: 'Version control' },
            { name: 'Figma', icon: '🎨', desc: 'UI design tool' }
          ].map((tech, idx) => (
            <div key={idx} className="bg-blue-900/20 border border-blue-700 rounded-lg p-3 text-center hover:bg-blue-900/30 transition-colors">
              <div className="text-3xl mb-2">{tech.icon}</div>
              <h4 className="text-blue-200 font-semibold text-sm">{tech.name}</h4>
              <p className="text-slate-400 text-xs mt-1">{tech.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Real-World Applications */}
      <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-700 rounded-xl p-6">
        <h3 className="text-2xl font-bold text-blue-300 mb-4">
          📱 Real-World Applications You Can Build
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-slate-900/60 p-4 rounded-lg border border-blue-600">
            <h4 className="text-blue-200 font-semibold mb-2">🛒 E-Commerce Apps</h4>
            <p className="text-slate-400 text-sm">Shopping apps like Shopee, Lazada with product catalogs, cart, and payment integration</p>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-lg border border-blue-600">
            <h4 className="text-blue-200 font-semibold mb-2">💬 Social Media</h4>
            <p className="text-slate-400 text-sm">Chat apps, social networks with real-time messaging and media sharing</p>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-lg border border-blue-600">
            <h4 className="text-blue-200 font-semibold mb-2">🏥 Health & Fitness</h4>
            <p className="text-slate-400 text-sm">Workout trackers, meal planners, and health monitoring applications</p>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-lg border border-blue-600">
            <h4 className="text-blue-200 font-semibold mb-2">🎓 Education</h4>
            <p className="text-slate-400 text-sm">Learning platforms, quiz apps, and interactive educational tools</p>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-lg border border-blue-600">
            <h4 className="text-blue-200 font-semibold mb-2">🚗 Transportation</h4>
            <p className="text-slate-400 text-sm">Ride-sharing apps like Grab, delivery services, and navigation tools</p>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-lg border border-blue-600">
            <h4 className="text-blue-200 font-semibold mb-2">💰 FinTech</h4>
            <p className="text-slate-400 text-sm">Banking apps, digital wallets like GCash, and investment platforms</p>
          </div>
        </div>
      </div>

      {/* Why Choose Mobile Development */}
      <div className="bg-blue-900/20 border border-blue-700 rounded-xl p-6">
        <h3 className="text-2xl font-bold text-blue-300 mb-4">🌟 Why Choose Mobile Development?</h3>
        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-2xl shrink-0">💼</div>
            <div>
              <h4 className="text-blue-200 font-semibold mb-1">High Employability</h4>
              <p className="text-slate-300 text-sm">Every company needs mobile apps. From startups to corporations, mobile developers are always in demand.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-2xl shrink-0">🌍</div>
            <div>
              <h4 className="text-blue-200 font-semibold mb-1">Work Remotely</h4>
              <p className="text-slate-300 text-sm">Mobile development is perfect for remote work. Many developers work for international companies from home.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-2xl shrink-0">🚀</div>
            <div>
              <h4 className="text-blue-200 font-semibold mb-1">Build Your Own Startup</h4>
              <p className="text-slate-300 text-sm">Create your own app and potentially reach millions of users. Many successful startups began with a single mobile app.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
