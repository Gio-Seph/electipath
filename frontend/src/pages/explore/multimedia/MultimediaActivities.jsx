import React, { useState, useRef, useEffect } from "react";
import { User, Layers, Image } from "lucide-react";
import { useActivityTracking } from "../../../hooks/useActivityTracking";

// Activity 1: Design a Game Character
function DesignGameCharacter() {
  const [bodyColor, setBodyColor] = useState("#3b82f6");
  const [hairStyle, setHairStyle] = useState("short");
  const [accessory, setAccessory] = useState("none");
  const [expression, setExpression] = useState("happy");
  const [isAnimating, setIsAnimating] = useState(false);
  
  const canvasRef = useRef(null);
  
  // Track activity engagement
  const { trackInteraction, saveActivityResult, timeSpent, trackQualityMetric, isAlreadyCompleted } = useActivityTracking(
    'MMGD',
    'Design a Game Character'
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
    trackQualityMetric('character_designed', true);
  };
  
  // Auto-save progress when user interacts
  useEffect(() => {
    if (timeSpent > 30 && !isCompleted) {
      saveActivityResult(false); // Auto-save as progress
    }
  }, [timeSpent, isCompleted, saveActivityResult]);
  
  useEffect(() => {
    drawCharacter();
  }, [bodyColor, hairStyle, accessory, expression, isAnimating]);
  
  const drawCharacter = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    canvas.width = 200;
    canvas.height = 300;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Animation offset
    const bounce = isAnimating ? Math.sin(Date.now() / 200) * 5 : 0;
    
    // Body
    ctx.fillStyle = bodyColor;
    ctx.fillRect(75, 120 + bounce, 50, 80);
    
    // Head
    ctx.beginPath();
    ctx.arc(100, 80 + bounce, 30, 0, Math.PI * 2);
    ctx.fillStyle = "#fbbf24";
    ctx.fill();
    
    // Hair
    ctx.fillStyle = "#1f2937";
    if (hairStyle === "short") {
      ctx.fillRect(70, 50 + bounce, 60, 15);
    } else if (hairStyle === "long") {
      ctx.fillRect(70, 50 + bounce, 60, 40);
    } else if (hairStyle === "spiky") {
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        ctx.moveTo(75 + i * 12, 65 + bounce);
        ctx.lineTo(80 + i * 12, 45 + bounce);
        ctx.lineTo(85 + i * 12, 65 + bounce);
      }
      ctx.fill();
    }
    
    // Face
    ctx.fillStyle = "#000";
    // Eyes
    if (expression === "happy") {
      ctx.beginPath();
      ctx.arc(90, 75 + bounce, 3, 0, Math.PI * 2);
      ctx.arc(110, 75 + bounce, 3, 0, Math.PI * 2);
      ctx.fill();
      // Smile
      ctx.beginPath();
      ctx.arc(100, 85 + bounce, 10, 0, Math.PI);
      ctx.stroke();
    } else if (expression === "surprised") {
      ctx.beginPath();
      ctx.arc(90, 75 + bounce, 4, 0, Math.PI * 2);
      ctx.arc(110, 75 + bounce, 4, 0, Math.PI * 2);
      ctx.fill();
      // O mouth
      ctx.beginPath();
      ctx.arc(100, 90 + bounce, 5, 0, Math.PI * 2);
      ctx.stroke();
    } else if (expression === "cool") {
      // Sunglasses
      ctx.fillRect(85, 72 + bounce, 12, 6);
      ctx.fillRect(103, 72 + bounce, 12, 6);
      ctx.strokeRect(85, 72 + bounce, 30, 6);
    }
    
    // Accessory
    if (accessory === "hat") {
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(75, 45 + bounce, 50, 10);
      ctx.fillRect(85, 35 + bounce, 30, 10);
    } else if (accessory === "crown") {
      ctx.fillStyle = "#fbbf24";
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(75 + i * 12, 55 + bounce);
        ctx.lineTo(80 + i * 12, 40 + bounce);
        ctx.lineTo(85 + i * 12, 55 + bounce);
        ctx.fill();
      }
    }
    
    // Arms
    ctx.fillStyle = bodyColor;
    ctx.fillRect(55, 130 + bounce, 20, 50);
    ctx.fillRect(125, 130 + bounce, 20, 50);
    
    // Legs
    ctx.fillRect(80, 200 + bounce, 15, 60);
    ctx.fillRect(105, 200 + bounce, 15, 60);
  };
  
  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(drawCharacter, 50);
      return () => clearInterval(interval);
    }
  }, [isAnimating]);
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-purple-400">Activity 1: Design a Game Character</h3>
      <p className="text-slate-300 text-sm">Create your own game character with customizable features</p>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Character Preview */}
        <div className="bg-slate-900/60 rounded-xl border border-purple-700 p-6">
          <h4 className="text-purple-300 font-semibold mb-4">Your Character</h4>
          <div className="flex justify-center bg-slate-800 rounded-lg p-6">
            <canvas ref={canvasRef} className="border border-slate-700 rounded" />
          </div>
          <div className="mt-4 flex justify-center gap-3">
            <button
              onClick={() => {
                setIsAnimating(!isAnimating);
                trackInteraction('animation_toggled');
                trackQualityMetric('animation_explored', true);
              }}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium"
            >
              {isAnimating ? "Stop Animation" : "Animate Character"}
            </button>
          </div>
        </div>
        
        {/* Customization Controls */}
        <div className="space-y-4">
          <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
            <h4 className="text-slate-200 font-semibold mb-3">Body Color</h4>
            <input
              type="color"
              value={bodyColor}
              onChange={(e) => {
                setBodyColor(e.target.value);
                trackInteraction('color_changed');
                trackQualityMetric('color_customized', true);
              }}
              className="w-full h-12 cursor-pointer rounded"
            />
          </div>
          
          <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
            <h4 className="text-slate-200 font-semibold mb-3">Hair Style</h4>
            <div className="grid grid-cols-3 gap-2">
              {['short', 'long', 'spiky'].map(style => (
                <button
                  key={style}
                  onClick={() => {
                    setHairStyle(style);
                    trackInteraction('hairstyle_changed');
                    trackQualityMetric('hairstyle_explored', true);
                  }}
                  className={`px-3 py-2 text-sm rounded border transition-colors ${
                    hairStyle === style 
                      ? 'bg-purple-600 border-purple-500 text-white' 
                      : 'bg-slate-700 border-slate-600 text-slate-300'
                  }`}
                >
                  {style.charAt(0).toUpperCase() + style.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
            <h4 className="text-slate-200 font-semibold mb-3">Accessory</h4>
            <div className="grid grid-cols-3 gap-2">
              {['none', 'hat', 'crown'].map(acc => (
                <button
                  key={acc}
                  onClick={() => {
                    setAccessory(acc);
                    trackInteraction('accessory_changed');
                    trackQualityMetric('accessory_explored', true);
                  }}
                  className={`px-3 py-2 text-sm rounded border transition-colors ${
                    accessory === acc 
                      ? 'bg-purple-600 border-purple-500 text-white' 
                      : 'bg-slate-700 border-slate-600 text-slate-300'
                  }`}
                >
                  {acc.charAt(0).toUpperCase() + acc.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
            <h4 className="text-slate-200 font-semibold mb-3">Expression</h4>
            <div className="grid grid-cols-3 gap-2">
              {['happy', 'surprised', 'cool'].map(exp => (
                <button
                  key={exp}
                  onClick={() => {
                    setExpression(exp);
                    trackInteraction('expression_changed');
                    trackQualityMetric('expression_explored', true);
                  }}
                  className={`px-3 py-2 text-sm rounded border transition-colors ${
                    expression === exp 
                      ? 'bg-purple-600 border-purple-500 text-white' 
                      : 'bg-slate-700 border-slate-600 text-slate-300'
                  }`}
                >
                  {exp.charAt(0).toUpperCase() + exp.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-purple-900/20 rounded-xl border border-purple-700 p-4">
            <h4 className="text-purple-300 font-semibold mb-2">💡 What You're Learning</h4>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• Character design fundamentals</li>
              <li>• Visual creativity and expression</li>
              <li>• Animation basics</li>
              <li>• Game asset creation</li>
            </ul>
          </div>
          
          {/* Complete Activity Button */}
          <button
            onClick={handleComplete}
            disabled={isCompleted}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
              isCompleted
                ? 'bg-green-600 text-white cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg'
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

// Activity 2: Create a Game Level
function CreateGameLevel() {
  const [grid, setGrid] = useState(Array(10).fill().map(() => Array(15).fill(null)));
  const [selectedTool, setSelectedTool] = useState("platform");
  const [isPlayMode, setIsPlayMode] = useState(false);
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 8 });
  
  // Track activity engagement
  const { trackInteraction, saveActivityResult, timeSpent, trackQualityMetric, isAlreadyCompleted } = useActivityTracking(
    'MMGD',
    'Create a Game Level'
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
    const levelElements = grid.flat().filter(cell => cell !== null).length;
    trackQualityMetric('level_elements_placed', levelElements);
  };
  
  // Auto-save progress when user interacts
  useEffect(() => {
    if (timeSpent > 30 && !isCompleted) {
      saveActivityResult(false); // Auto-save as progress
    }
  }, [timeSpent, isCompleted, saveActivityResult]);
  
  const tools = {
    platform: { name: "Platform", color: "#8b5cf6", icon: "▬" },
    obstacle: { name: "Obstacle", color: "#ef4444", icon: "▲" },
    goal: { name: "Goal", color: "#10b981", icon: "★" },
    erase: { name: "Erase", color: "#64748b", icon: "✕" }
  };
  
  const handleCellClick = (row, col) => {
    if (isPlayMode) return;
    trackInteraction('cell_clicked');
    trackQualityMetric('level_edited', true);
    
    const newGrid = grid.map(r => [...r]);
    if (selectedTool === "erase") {
      newGrid[row][col] = null;
    } else {
      newGrid[row][col] = selectedTool;
    }
    setGrid(newGrid);
  };
  
  const resetLevel = () => {
    setGrid(Array(10).fill().map(() => Array(15).fill(null)));
    setPlayerPos({ x: 0, y: 8 });
    setIsPlayMode(false);
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-purple-400">Activity 2: Create a Game Level</h3>
      <p className="text-slate-300 text-sm">Design a platformer level with obstacles and goals</p>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Level Editor */}
        <div className="md:col-span-2 bg-slate-900/60 rounded-xl border border-purple-700 p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-purple-300 font-semibold">Level Editor</h4>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsPlayMode(!isPlayMode);
                  trackInteraction('play_mode_toggled');
                }}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  isPlayMode ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-300'
                }`}
              >
                {isPlayMode ? "🎮 Play Mode" : "✏️ Edit Mode"}
              </button>
              <button
                onClick={resetLevel}
                className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-sm"
              >
                Reset
              </button>
            </div>
          </div>
          
          <div className="bg-sky-200 rounded-lg p-2 inline-block">
            <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(15, 24px)` }}>
              {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    className={`w-6 h-6 border border-sky-300 cursor-pointer transition-colors ${
                      playerPos.x === colIndex && playerPos.y === rowIndex && isPlayMode
                        ? 'bg-yellow-400'
                        : ''
                    }`}
                    style={{
                      backgroundColor: cell && !isPlayMode ? tools[cell]?.color : 
                                      cell ? tools[cell]?.color : 'transparent'
                    }}
                  >
                    {playerPos.x === colIndex && playerPos.y === rowIndex && isPlayMode ? (
                      <span className="text-xs">😊</span>
                    ) : cell ? (
                      <span className="text-white text-xs">{tools[cell]?.icon}</span>
                    ) : null}
                  </div>
                ))
              )}
            </div>
          </div>
          
          <p className="text-slate-400 text-xs mt-2">
            {isPlayMode ? "🎮 Use arrow keys to move (coming soon)" : "✏️ Click cells to place objects"}
          </p>
        </div>
        
        {/* Tools */}
        <div className="space-y-4">
          <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
            <h4 className="text-slate-200 font-semibold mb-3">Tools</h4>
            <div className="space-y-2">
              {Object.entries(tools).map(([key, tool]) => (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedTool(key);
                    trackInteraction('tool_selected');
                    trackQualityMetric('tool_used', key);
                  }}
                  disabled={isPlayMode}
                  className={`w-full text-left px-3 py-2 rounded border transition-colors disabled:opacity-50 ${
                    selectedTool === key 
                      ? 'bg-purple-600 border-purple-500 text-white' 
                      : 'bg-slate-700 border-slate-600 text-slate-300'
                  }`}
                >
                  <span className="mr-2">{tool.icon}</span>
                  {tool.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-purple-900/20 rounded-xl border border-purple-700 p-4">
            <h4 className="text-purple-300 font-semibold mb-2">💡 What You're Learning</h4>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• Game level design</li>
              <li>• Spatial thinking</li>
              <li>• Gameplay mechanics</li>
              <li>• Player experience</li>
            </ul>
          </div>
          
          {/* Complete Activity Button */}
          <button
            onClick={handleComplete}
            disabled={isCompleted}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
              isCompleted
                ? 'bg-green-600 text-white cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg'
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

// Activity 3: Edit a Photo
function EditPhoto() {
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [blur, setBlur] = useState(0);
  const [showComparison, setShowComparison] = useState(false);
  
  const canvasRef = useRef(null);
  
  // Track activity engagement
  const { trackInteraction, saveActivityResult, timeSpent, trackQualityMetric, isAlreadyCompleted } = useActivityTracking(
    'MMGD',
    'Edit a Photo'
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
    trackQualityMetric('photo_edited', true);
  };
  
  // Auto-save progress when user interacts
  useEffect(() => {
    if (timeSpent > 30 && !isCompleted) {
      saveActivityResult(false); // Auto-save as progress
    }
  }, [timeSpent, isCompleted, saveActivityResult]);
  
  useEffect(() => {
    drawImage();
  }, [brightness, contrast, saturation, blur]);
  
  const drawImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    canvas.width = 400;
    canvas.height = 300;
    
    // Create a sample image (gradient with shapes)
    const gradient = ctx.createLinearGradient(0, 0, 400, 300);
    gradient.addColorStop(0, '#3b82f6');
    gradient.addColorStop(1, '#8b5cf6');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 300);
    
    // Add some shapes
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(100, 100, 50, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#10b981';
    ctx.fillRect(250, 150, 100, 100);
    
    // Apply filters
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px)`;
    ctx.drawImage(canvas, 0, 0);
    ctx.filter = 'none';
  };
  
  const resetFilters = () => {
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setBlur(0);
    trackInteraction('filters_reset');
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-purple-400">Activity 3: Edit a Photo</h3>
      <p className="text-slate-300 text-sm">Apply filters and effects to enhance images</p>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Image Preview */}
        <div className="bg-slate-900/60 rounded-xl border border-purple-700 p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-purple-300 font-semibold">Preview</h4>
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="text-xs text-purple-400 hover:text-purple-300"
            >
              {showComparison ? "Hide" : "Show"} Original
            </button>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-4 flex justify-center">
            <canvas ref={canvasRef} className="max-w-full rounded" />
          </div>
          
          <div className="mt-4 flex gap-2">
            <button
              onClick={resetFilters}
              className="flex-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm"
            >
              Reset All
            </button>
            <button
              className="flex-1 px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded text-sm"
            >
              Export Image
            </button>
          </div>
        </div>
        
        {/* Filter Controls */}
        <div className="space-y-4">
          <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
            <h4 className="text-slate-200 font-semibold mb-3">Brightness</h4>
            <input
              type="range"
              min="0"
              max="200"
              value={brightness}
              onChange={(e) => {
                setBrightness(e.target.value);
                trackInteraction('brightness_changed');
                trackQualityMetric('brightness_adjusted', true);
              }}
              className="w-full"
            />
            <p className="text-slate-400 text-xs mt-1">{brightness}%</p>
          </div>
          
          <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
            <h4 className="text-slate-200 font-semibold mb-3">Contrast</h4>
            <input
              type="range"
              min="0"
              max="200"
              value={contrast}
              onChange={(e) => {
                setContrast(e.target.value);
                trackInteraction('contrast_changed');
                trackQualityMetric('contrast_adjusted', true);
              }}
              className="w-full"
            />
            <p className="text-slate-400 text-xs mt-1">{contrast}%</p>
          </div>
          
          <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
            <h4 className="text-slate-200 font-semibold mb-3">Saturation</h4>
            <input
              type="range"
              min="0"
              max="200"
              value={saturation}
              onChange={(e) => {
                setSaturation(e.target.value);
                trackInteraction('saturation_changed');
                trackQualityMetric('saturation_adjusted', true);
              }}
              className="w-full"
            />
            <p className="text-slate-400 text-xs mt-1">{saturation}%</p>
          </div>
          
          <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
            <h4 className="text-slate-200 font-semibold mb-3">Blur</h4>
            <input
              type="range"
              min="0"
              max="10"
              value={blur}
              onChange={(e) => setBlur(e.target.value)}
              className="w-full"
            />
            <p className="text-slate-400 text-xs mt-1">{blur}px</p>
          </div>
          
          <div className="bg-purple-900/20 rounded-xl border border-purple-700 p-4">
            <h4 className="text-purple-300 font-semibold mb-2">💡 What You're Learning</h4>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• Image editing techniques</li>
              <li>• Visual aesthetics</li>
              <li>• Color correction</li>
              <li>• Photo enhancement</li>
            </ul>
          </div>
          
          {/* Complete Activity Button */}
          <button
            onClick={handleComplete}
            disabled={isCompleted}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
              isCompleted
                ? 'bg-green-600 text-white cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg'
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

// Main Component
export default function MultimediaActivities() {
  const [currentActivity, setCurrentActivity] = useState(1);
  
  const activities = [
    { id: 1, name: "Design a Game Character", icon: <User size={20} /> },
    { id: 2, name: "Create a Game Level", icon: <Layers size={20} /> },
    { id: 3, name: "Edit a Photo", icon: <Image size={20} /> }
  ];
  
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-purple-400">Interactive Activities</h2>
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
                ? 'bg-purple-600/20 border-purple-500 shadow-lg shadow-purple-600/20'
                : 'bg-slate-800/40 border-slate-700 hover:border-slate-600'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`${currentActivity === activity.id ? 'text-purple-400' : 'text-slate-400'}`}>
                {activity.icon}
              </div>
              <span className={`text-sm font-medium ${
                currentActivity === activity.id ? 'text-purple-300' : 'text-slate-300'
              }`}>
                {activity.name}
              </span>
            </div>
          </button>
        ))}
      </div>
      
      {/* Activity Content */}
      <div className="bg-slate-900/40 rounded-xl border border-slate-700 p-6">
        {currentActivity === 1 && <DesignGameCharacter />}
        {currentActivity === 2 && <CreateGameLevel />}
        {currentActivity === 3 && <EditPhoto />}
      </div>
    </section>
  );
}