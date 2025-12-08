import React, { useState, useEffect } from "react";
import { Smartphone, Palette, GitBranch } from "lucide-react";
import { useActivityTracking } from "../../../hooks/useActivityTracking";

// Activity 1: Design a Login Screen
function DesignLoginScreen() {
  const [buttonStyle, setButtonStyle] = useState("rounded");
  const [buttonColor, setButtonColor] = useState("blue");
  const [phoneSize, setPhoneSize] = useState("medium");
  
  // Track activity engagement
  const { trackInteraction, saveActivityResult, timeSpent, trackQualityMetric, isAlreadyCompleted } = useActivityTracking(
    'MobileDev',
    'Design a Login Screen'
  );
  
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Update completion status when hook detects it's already completed
  useEffect(() => {
    if (isAlreadyCompleted) {
      setIsCompleted(true);
      console.log('✅ Activity completion status loaded from backend');
    }
  }, [isAlreadyCompleted]);
  
  // Track interactions when user changes settings
  const handleStyleChange = (style) => {
    setButtonStyle(style);
    trackInteraction('style_change');
    trackQualityMetric('style_explored', true);
  };
  
  const handleColorChange = (color) => {
    setButtonColor(color);
    trackInteraction('color_change');
    trackQualityMetric('color_explored', true);
  };
  
  const handleSizeChange = (size) => {
    setPhoneSize(size);
    trackInteraction('size_change');
    trackQualityMetric('size_explored', true);
  };
  
  // Handle activity completion
  const handleComplete = async () => {
    await saveActivityResult(true); // Mark as completed
    setIsCompleted(true);
    trackQualityMetric('activity_completed', true);
  };
  
  // Auto-save progress when user interacts
  useEffect(() => {
    if (timeSpent > 30 && !isCompleted) {
      // Auto-save as progress (not completed)
      saveActivityResult(false);
    }
  }, [timeSpent, isCompleted, saveActivityResult]);
  
  const phoneSizes = {
    small: { width: "280px", height: "560px", name: "iPhone SE" },
    medium: { width: "320px", height: "640px", name: "Standard Phone" },
    large: { width: "360px", height: "720px", name: "Large Phone" }
  };
  
  const buttonColors = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    purple: "bg-purple-600",
    red: "bg-red-600"
  };
  
  const buttonStyles = {
    rounded: "rounded-lg",
    pill: "rounded-full",
    square: "rounded-none"
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-blue-400">Activity 1: Design a Login Screen</h3>
      <p className="text-slate-300 text-sm">Learn UI/UX principles by designing a mobile login screen</p>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Phone Preview */}
        <div className="bg-slate-900/60 rounded-xl border border-blue-700 p-6">
          <h4 className="text-blue-300 font-semibold mb-4">Preview</h4>
          <div className="flex justify-center items-center min-h-[400px]">
            <div 
              className="bg-white rounded-3xl shadow-2xl border-8 border-gray-800 overflow-hidden transition-all duration-300"
              style={{ width: phoneSizes[phoneSize].width, height: phoneSizes[phoneSize].height }}
            >
              {/* Phone Screen */}
              <div className="h-full bg-gradient-to-b from-blue-50 to-blue-100 p-6 flex flex-col justify-center">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
                  <p className="text-gray-600 text-sm">Sign in to continue</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">Username</label>
                    <input 
                      type="text" 
                      placeholder="Enter username"
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm"
                      disabled
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">Password</label>
                    <input 
                      type="password" 
                      placeholder="Enter password"
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm"
                      disabled
                    />
                  </div>
                  
                  <button 
                    className={`w-full py-2 text-white font-semibold text-sm ${buttonColors[buttonColor]} ${buttonStyles[buttonStyle]} transition-all`}
                    disabled
                  >
                    Login
                  </button>
                  
                  <p className="text-center text-xs text-gray-500">
                    Don't have an account? <span className="text-blue-600">Sign up</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-slate-400 text-xs mt-4">{phoneSizes[phoneSize].name}</p>
        </div>
        
        {/* Controls */}
        <div className="space-y-6">
          <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
            <h4 className="text-slate-200 font-semibold mb-3">Button Style</h4>
            <div className="grid grid-cols-3 gap-2">
              {Object.keys(buttonStyles).map(style => (
                <button
                  key={style}
                  onClick={() => handleStyleChange(style)}
                  className={`px-3 py-2 text-sm rounded border transition-colors ${
                    buttonStyle === style 
                      ? 'bg-blue-600 border-blue-500 text-white' 
                      : 'bg-slate-700 border-slate-600 text-slate-300'
                  }`}
                >
                  {style.charAt(0).toUpperCase() + style.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
            <h4 className="text-slate-200 font-semibold mb-3">Button Color</h4>
            <div className="grid grid-cols-4 gap-2">
              {Object.keys(buttonColors).map(color => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={`px-3 py-2 text-sm rounded border transition-colors ${
                    buttonColor === color 
                      ? 'bg-blue-600 border-blue-500 text-white' 
                      : 'bg-slate-700 border-slate-600 text-slate-300'
                  }`}
                >
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
            <h4 className="text-slate-200 font-semibold mb-3">Phone Size</h4>
            <div className="grid grid-cols-3 gap-2">
              {Object.keys(phoneSizes).map(size => (
                <button
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  className={`px-3 py-2 text-sm rounded border transition-colors ${
                    phoneSize === size 
                      ? 'bg-blue-600 border-blue-500 text-white' 
                      : 'bg-slate-700 border-slate-600 text-slate-300'
                  }`}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-blue-900/20 rounded-xl border border-blue-700 p-4">
            <h4 className="text-blue-300 font-semibold mb-2">💡 What You're Learning</h4>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• UI/UX design principles</li>
              <li>• Responsive design for different screen sizes</li>
              <li>• Button styling and user interaction</li>
              <li>• Mobile-first design approach</li>
            </ul>
          </div>
          
          {/* Complete Activity Button */}
          <button
            onClick={handleComplete}
            disabled={isCompleted}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
              isCompleted
                ? 'bg-green-600 text-white cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-lg'
            }`}
          >
            {isCompleted ? '✓ Activity Completed' : '✓ Mark as Complete'}
          </button>
          
          {isCompleted && (
            <div className="bg-green-900/30 border border-green-600 rounded-lg p-3 text-green-300 text-sm">
              Great job! Your activity completion has been saved.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Activity 2: Create an App Icon
function CreateAppIcon() {
  const [iconBg, setIconBg] = useState("#3b82f6");
  const [iconShape, setIconShape] = useState("circle");
  const [iconText, setIconText] = useState("EP");
  
  // Track activity engagement
  const { trackInteraction, saveActivityResult, timeSpent, trackQualityMetric, isAlreadyCompleted } = useActivityTracking(
    'MobileDev',
    'Create an App Icon'
  );
  
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Update completion status when hook detects it's already completed
  useEffect(() => {
    if (isAlreadyCompleted) {
      setIsCompleted(true);
      console.log('✅ Activity completion status loaded from backend');
    }
  }, [isAlreadyCompleted]);
  
  // Handle activity completion
  const handleComplete = async () => {
    await saveActivityResult(true); // Mark as completed
    setIsCompleted(true);
    trackQualityMetric('activity_completed', true);
  };
  
  // Auto-save progress when user interacts
  useEffect(() => {
    if (timeSpent > 30 && !isCompleted) {
      saveActivityResult(false); // Auto-save as progress
    }
  }, [timeSpent, isCompleted, saveActivityResult]);
  
  const shapes = {
    circle: "rounded-full",
    rounded: "rounded-2xl",
    square: "rounded-none"
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-blue-400">Activity 2: Create an App Icon</h3>
      <p className="text-slate-300 text-sm">Design your app icon and see how it looks on a phone</p>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Phone Home Screen Preview */}
        <div className="bg-slate-900/60 rounded-xl border border-blue-700 p-6">
          <h4 className="text-blue-300 font-semibold mb-4">Home Screen Preview</h4>
          <div className="flex justify-center">
            <div className="w-80 h-[500px] bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl border-8 border-gray-800 p-6">
              {/* App Grid */}
              <div className="grid grid-cols-4 gap-4">
                {/* Your App Icon */}
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-14 h-14 flex items-center justify-center text-white font-bold text-xl ${shapes[iconShape]} shadow-lg transition-all duration-300`}
                    style={{ backgroundColor: iconBg }}
                  >
                    {iconText}
                  </div>
                  <span className="text-white text-[10px] mt-1">ElectiPath</span>
                </div>
                
                {/* Other App Icons (placeholders) */}
                {[...Array(11)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center opacity-50">
                    <div className="w-14 h-14 bg-slate-700 rounded-2xl"></div>
                    <span className="text-white text-[10px] mt-1">App</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Icon Builder */}
        <div className="space-y-4">
          <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
            <h4 className="text-slate-200 font-semibold mb-3">Icon Text</h4>
            <input
              type="text"
              value={iconText}
              onChange={(e) => {
                setIconText(e.target.value.slice(0, 2).toUpperCase());
                trackInteraction('text_input');
                trackQualityMetric('text_customized', true);
              }}
              maxLength={2}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded"
              placeholder="EP"
            />
            <p className="text-slate-400 text-xs mt-1">Max 2 characters</p>
          </div>
          
          <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
            <h4 className="text-slate-200 font-semibold mb-3">Icon Color</h4>
            <input
              type="color"
              value={iconBg}
              onChange={(e) => {
                setIconBg(e.target.value);
                trackInteraction('color_change');
                trackQualityMetric('color_customized', true);
              }}
              className="w-full h-12 cursor-pointer rounded"
            />
          </div>
          
          <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
            <h4 className="text-slate-200 font-semibold mb-3">Icon Shape</h4>
            <div className="grid grid-cols-3 gap-2">
              {Object.keys(shapes).map(shape => (
                <button
                  key={shape}
                  onClick={() => {
                    setIconShape(shape);
                    trackInteraction('shape_change');
                    trackQualityMetric('shape_explored', true);
                  }}
                  className={`px-3 py-2 text-sm rounded border transition-colors ${
                    iconShape === shape 
                      ? 'bg-blue-600 border-blue-500 text-white' 
                      : 'bg-slate-700 border-slate-600 text-slate-300'
                  }`}
                >
                  {shape.charAt(0).toUpperCase() + shape.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-blue-900/20 rounded-xl border border-blue-700 p-4">
            <h4 className="text-blue-300 font-semibold mb-2">💡 What You're Learning</h4>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• Visual design principles</li>
              <li>• Brand identity through icons</li>
              <li>• Color psychology in design</li>
              <li>• Icon design best practices</li>
            </ul>
          </div>
          
          {/* Complete Activity Button */}
          <button
            onClick={handleComplete}
            disabled={isCompleted}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
              isCompleted
                ? 'bg-green-600 text-white cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-lg'
            }`}
          >
            {isCompleted ? '✓ Activity Completed' : '✓ Mark as Complete'}
          </button>
          
          {isCompleted && (
            <div className="bg-green-900/30 border border-green-600 rounded-lg p-3 text-green-300 text-sm">
              Great job! Your activity completion has been saved.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Activity 3: Plan an App Flow
function PlanAppFlow() {
  const [screens, setScreens] = useState([
    { id: 1, name: "Login", x: 100, y: 100 },
    { id: 2, name: "Home", x: 300, y: 100 },
    { id: 3, name: "Profile", x: 500, y: 100 }
  ]);
  const [connections, setConnections] = useState([
    { from: 1, to: 2, label: "Sign In" }
  ]);
  const [selectedScreen, setSelectedScreen] = useState(null);
  
  // Track activity engagement
  const { trackInteraction, saveActivityResult, timeSpent, trackQualityMetric, isAlreadyCompleted } = useActivityTracking(
    'MobileDev',
    'Plan an App Flow'
  );
  
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Update completion status when hook detects it's already completed
  useEffect(() => {
    if (isAlreadyCompleted) {
      setIsCompleted(true);
      console.log('✅ Activity completion status loaded from backend');
    }
  }, [isAlreadyCompleted]);
  
  // Handle activity completion
  const handleComplete = async () => {
    await saveActivityResult(true); // Mark as completed
    setIsCompleted(true);
    trackQualityMetric('activity_completed', true);
  };
  
  // Auto-save progress when user interacts
  useEffect(() => {
    if (timeSpent > 30 && !isCompleted) {
      saveActivityResult(false); // Auto-save as progress
    }
  }, [timeSpent, isCompleted, saveActivityResult]);
  
  const addConnection = (fromId, toId) => {
    if (fromId === toId) return;
    const exists = connections.find(c => c.from === fromId && c.to === toId);
    if (!exists) {
      setConnections([...connections, { from: fromId, to: toId, label: "Navigate" }]);
      trackInteraction('connection_added');
      trackQualityMetric('connections_created', connections.length + 1);
    }
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-blue-400">Activity 3: Plan an App Flow</h3>
      <p className="text-slate-300 text-sm">Design the navigation flow of your mobile app</p>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Flow Canvas */}
        <div className="md:col-span-2 bg-slate-900/60 rounded-xl border border-blue-700 p-6">
          <h4 className="text-blue-300 font-semibold mb-4">App Flow Canvas</h4>
          <div className="bg-slate-800 rounded-lg border border-slate-700 h-96 relative overflow-hidden">
            {/* Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {connections.map((conn, i) => {
                const fromScreen = screens.find(s => s.id === conn.from);
                const toScreen = screens.find(s => s.id === conn.to);
                if (!fromScreen || !toScreen) return null;
                
                return (
                  <g key={i}>
                    <line
                      x1={fromScreen.x + 40}
                      y1={fromScreen.y + 20}
                      x2={toScreen.x}
                      y2={toScreen.y + 20}
                      stroke="#3b82f6"
                      strokeWidth="2"
                      markerEnd="url(#arrowhead)"
                    />
                    <text
                      x={(fromScreen.x + toScreen.x) / 2}
                      y={(fromScreen.y + toScreen.y) / 2 - 5}
                      fill="#60a5fa"
                      fontSize="10"
                      textAnchor="middle"
                    >
                      {conn.label}
                    </text>
                  </g>
                );
              })}
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="10"
                  refX="9"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
                </marker>
              </defs>
            </svg>
            
            {/* Screens */}
            {screens.map(screen => (
              <div
                key={screen.id}
                className={`absolute px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium cursor-pointer border-2 transition-all ${
                  selectedScreen === screen.id ? 'border-yellow-400 shadow-lg' : 'border-blue-500'
                }`}
                style={{ left: screen.x, top: screen.y }}
                onClick={() => {
                  setSelectedScreen(screen.id);
                  trackInteraction('screen_selected');
                }}
              >
                {screen.name}
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-xs text-slate-400">
            💡 Click a screen to select it, then click another to create a connection
          </div>
        </div>
        
        {/* Controls */}
        <div className="space-y-4">
          <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
            <h4 className="text-slate-200 font-semibold mb-3">Available Screens</h4>
            <div className="space-y-2">
              {screens.map(screen => (
                <div 
                  key={screen.id}
                  className={`px-3 py-2 rounded border text-sm ${
                    selectedScreen === screen.id
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-slate-700 border-slate-600 text-slate-300'
                  }`}
                >
                  {screen.name}
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
            <h4 className="text-slate-200 font-semibold mb-3">Connections</h4>
            <div className="space-y-2">
              {connections.map((conn, i) => {
                const from = screens.find(s => s.id === conn.from)?.name;
                const to = screens.find(s => s.id === conn.to)?.name;
                return (
                  <div key={i} className="text-xs text-slate-300 bg-slate-700/50 p-2 rounded">
                    {from} → {to}
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="bg-blue-900/20 rounded-xl border border-blue-700 p-4">
            <h4 className="text-blue-300 font-semibold mb-2">💡 What You're Learning</h4>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• User experience design</li>
              <li>• App navigation patterns</li>
              <li>• User journey mapping</li>
              <li>• Information architecture</li>
            </ul>
          </div>
          
          {/* Complete Activity Button */}
          <button
            onClick={handleComplete}
            disabled={isCompleted}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
              isCompleted
                ? 'bg-green-600 text-white cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-lg'
            }`}
          >
            {isCompleted ? '✓ Activity Completed' : '✓ Mark as Complete'}
          </button>
          
          {isCompleted && (
            <div className="bg-green-900/30 border border-green-600 rounded-lg p-3 text-green-300 text-sm">
              Great job! Your activity completion has been saved.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Main Component with Activity Selector
export default function MobileActivities() {
  const [currentActivity, setCurrentActivity] = useState(1);
  
  const activities = [
    { id: 1, name: "Design a Login Screen", icon: <Smartphone size={20} /> },
    { id: 2, name: "Create an App Icon", icon: <Palette size={20} /> },
    { id: 3, name: "Plan an App Flow", icon: <GitBranch size={20} /> }
  ];
  
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-blue-400">Interactive Activities</h2>
        <div className="text-sm text-slate-400">
          Activity {currentActivity} of {activities.length}
        </div>
      </div>
      
      {/* Activity Selector */}
      <div className="grid md:grid-cols-3 gap-4">
        {activities.map(activity => (
          <button
            key={activity.id}
            onClick={() => setCurrentActivity(activity.id)}
            className={`p-4 rounded-xl border transition-all ${
              currentActivity === activity.id
                ? 'bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-600/20'
                : 'bg-slate-800/40 border-slate-700 hover:border-slate-600'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`${currentActivity === activity.id ? 'text-blue-400' : 'text-slate-400'}`}>
                {activity.icon}
              </div>
              <span className={`text-sm font-medium ${
                currentActivity === activity.id ? 'text-blue-300' : 'text-slate-300'
              }`}>
                {activity.name}
              </span>
            </div>
          </button>
        ))}
      </div>
      
      {/* Activity Content */}
      <div className="bg-slate-900/40 rounded-xl border border-slate-700 p-6">
        {currentActivity === 1 && <DesignLoginScreen />}
        {currentActivity === 2 && <CreateAppIcon />}
        {currentActivity === 3 && <PlanAppFlow />}
      </div>
    </section>
  );
}