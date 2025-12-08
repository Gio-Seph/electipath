import React, { useState, useEffect } from "react";
import { BarChart3, TrendingDown, PieChart } from "lucide-react";
import { useActivityTracking } from "../../../hooks/useActivityTracking";

// Activity 1: Read the Sales Report
function ReadSalesReport() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  // Track activity engagement
  const { trackInteraction, saveActivityResult, timeSpent, trackQualityMetric, isAlreadyCompleted } = useActivityTracking(
    'ITBA',
    'Read the Sales Report'
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
    trackQualityMetric('questions_answered', currentQuestion + 1);
  };
  
  // Auto-save progress when user interacts
  useEffect(() => {
    if (timeSpent > 30 && !isCompleted) {
      saveActivityResult(false); // Auto-save as progress
    }
  }, [timeSpent, isCompleted, saveActivityResult]);
  
  const salesData = [
    { month: "Jan", sales: 45000, color: "#3b82f6" },
    { month: "Feb", sales: 52000, color: "#3b82f6" },
    { month: "Mar", sales: 48000, color: "#3b82f6" },
    { month: "Apr", sales: 61000, color: "#10b981" },
    { month: "May", sales: 58000, color: "#3b82f6" },
    { month: "Jun", sales: 67000, color: "#10b981" }
  ];
  
  const maxSales = Math.max(...salesData.map(d => d.sales));
  
  const questions = [
    {
      question: "Which month had the highest sales?",
      options: ["March", "April", "June", "February"],
      correct: 2,
      explanation: "June had the highest sales at ₱67,000, showing strong Q2 performance."
    },
    {
      question: "What is the overall trend from January to June?",
      options: ["Declining", "Stable", "Growing", "Fluctuating"],
      correct: 2,
      explanation: "Sales show an overall upward trend, growing from ₱45,000 to ₱67,000."
    },
    {
      question: "What was the approximate total sales for Q1 (Jan-Mar)?",
      options: ["₱120,000", "₱145,000", "₱160,000", "₱180,000"],
      correct: 1,
      explanation: "Q1 total: ₱45,000 + ₱52,000 + ₱48,000 = ₱145,000"
    }
  ];
  
  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
    trackInteraction('answer_selected');
    const isCorrect = index === q.correct;
    trackQualityMetric(`question_${currentQuestion}_correct`, isCorrect);
    if (isCorrect) {
      trackQualityMetric('correct_answers', (trackQualityMetric.correct_answers || 0) + 1);
    }
  };
  
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      trackInteraction('next_question');
    }
  };
  
  const q = questions[currentQuestion];
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-cyan-400">Activity 1: Read the Sales Report</h3>
      <p className="text-slate-300 text-sm">Analyze the sales dashboard and answer questions</p>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-slate-900/60 rounded-xl border border-cyan-700 p-6">
          <h4 className="text-cyan-300 font-semibold mb-4 flex items-center gap-2">
            <BarChart3 size={20} /> Sales Dashboard
          </h4>
          
          <div className="bg-white rounded-lg p-4">
            <h5 className="text-gray-800 font-semibold mb-4">Monthly Sales Report</h5>
            <div className="flex items-end justify-between h-48 gap-2">
              {salesData.map((data, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex items-end justify-center h-40">
                    <div
                      className="w-full rounded-t transition-all duration-500 hover:opacity-80 cursor-pointer"
                      style={{
                        height: `${(data.sales / maxSales) * 100}%`,
                        backgroundColor: data.color
                      }}
                      title={`₱${data.sales.toLocaleString()}`}
                    />
                  </div>
                  <span className="text-xs text-gray-600 mt-2">{data.month}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
              <div className="bg-blue-50 p-2 rounded">
                <p className="text-gray-600">Average</p>
                <p className="font-bold text-gray-800">₱55,167</p>
              </div>
              <div className="bg-green-50 p-2 rounded">
                <p className="text-gray-600">Highest</p>
                <p className="font-bold text-gray-800">₱67,000</p>
              </div>
              <div className="bg-purple-50 p-2 rounded">
                <p className="text-gray-600">Growth</p>
                <p className="font-bold text-gray-800">+48.9%</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Questions */}
        <div className="space-y-4">
          <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-slate-200 font-semibold">Question {currentQuestion + 1}/{questions.length}</h4>
              <span className="text-xs text-cyan-400">Data Literacy</span>
            </div>
            
            <p className="text-slate-100 mb-4">{q.question}</p>
            
            <div className="space-y-2">
              {q.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={showFeedback}
                  className={`w-full text-left px-4 py-2 rounded-lg border transition-all ${
                    showFeedback && i === q.correct
                      ? 'bg-green-600 border-green-500 text-white'
                      : showFeedback && i === selectedAnswer && i !== q.correct
                      ? 'bg-red-600 border-red-500 text-white'
                      : selectedAnswer === i
                      ? 'bg-cyan-600 border-cyan-500 text-white'
                      : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            
            {showFeedback && (
              <div className={`mt-4 p-3 rounded-lg ${
                selectedAnswer === q.correct ? 'bg-green-900/30 border border-green-600' : 'bg-red-900/30 border border-red-600'
              }`}>
                <p className={`text-sm ${selectedAnswer === q.correct ? 'text-green-300' : 'text-red-300'}`}>
                  {selectedAnswer === q.correct ? '✅ Correct!' : '❌ Incorrect'}
                </p>
                <p className="text-slate-300 text-xs mt-1">{q.explanation}</p>
                
                {currentQuestion < questions.length - 1 && (
                  <button
                    onClick={nextQuestion}
                    className="mt-3 w-full bg-cyan-600 hover:bg-cyan-500 text-white py-2 rounded-lg text-sm font-medium"
                  >
                    Next Question →
                  </button>
                )}
              </div>
            )}
          </div>
          
          <div className="bg-cyan-900/20 rounded-xl border border-cyan-700 p-4">
            <h4 className="text-cyan-300 font-semibold mb-2">💡 What You're Learning</h4>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• Reading business dashboards</li>
              <li>• Interpreting data trends</li>
              <li>• Business metrics analysis</li>
              <li>• Data-driven decision making</li>
            </ul>
          </div>
          
          {/* Complete Activity Button */}
          <button
            onClick={handleComplete}
            disabled={isCompleted}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
              isCompleted
                ? 'bg-green-600 text-white cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700 shadow-lg'
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

// Activity 2: Find the Problem
function FindTheProblem() {
  const [currentView, setCurrentView] = useState("overview");
  const [foundIssues, setFoundIssues] = useState([]);
  const [gameComplete, setGameComplete] = useState(false);
  
  // Track activity engagement
  const { trackInteraction, saveActivityResult, timeSpent, trackQualityMetric, isAlreadyCompleted } = useActivityTracking(
    'ITBA',
    'Find the Problem'
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
    trackQualityMetric('issues_found', foundIssues.length);
  };
  
  // Auto-save progress when user interacts
  useEffect(() => {
    if (timeSpent > 30 && !isCompleted) {
      saveActivityResult(false); // Auto-save as progress
    }
  }, [timeSpent, isCompleted, saveActivityResult]);
  
  const issues = {
    overview: { id: "low-conversion", name: "Low Conversion Rate", found: false },
    products: { id: "stock-out", name: "Product Stock Issues", found: false },
    regions: { id: "region-drop", name: "Regional Sales Drop", found: false }
  };
  
  const handleFindIssue = (issueId, issueName) => {
    if (!foundIssues.includes(issueId)) {
      const newFound = [...foundIssues, issueId];
      setFoundIssues(newFound);
      trackInteraction('issue_found');
      trackQualityMetric(`issue_${issueId}_found`, true);
      if (newFound.length === 3) {
        setGameComplete(true);
        trackQualityMetric('all_issues_found', true);
      }
    }
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-cyan-400">Activity 2: Find the Problem</h3>
      <p className="text-slate-300 text-sm">Scenario: Sales are down 20%! Investigate the data to find the root cause.</p>
      
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => setCurrentView("overview")}
          className={`p-3 rounded-lg border transition-colors ${
            currentView === "overview" 
              ? 'bg-cyan-600 border-cyan-500 text-white' 
              : 'bg-slate-800 border-slate-700 text-slate-300'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setCurrentView("products")}
          className={`p-3 rounded-lg border transition-colors ${
            currentView === "products" 
              ? 'bg-cyan-600 border-cyan-500 text-white' 
              : 'bg-slate-800 border-slate-700 text-slate-300'
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setCurrentView("regions")}
          className={`p-3 rounded-lg border transition-colors ${
            currentView === "regions" 
              ? 'bg-cyan-600 border-cyan-500 text-white' 
              : 'bg-slate-800 border-slate-700 text-slate-300'
          }`}
        >
          Regions
        </button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Data View */}
        <div className="bg-slate-900/60 rounded-xl border border-cyan-700 p-6">
          <h4 className="text-cyan-300 font-semibold mb-4">{currentView.charAt(0).toUpperCase() + currentView.slice(1)} Data</h4>
          
          {currentView === "overview" && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">Overall Performance</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-800">₱2.4M</span>
                  <span className="text-red-600 font-semibold">-20% ↓</span>
                </div>
              </div>
              <button
                onClick={() => handleFindIssue("low-conversion", "Low Conversion Rate")}
                className="w-full bg-red-100 hover:bg-red-200 border border-red-300 p-3 rounded-lg text-left transition-colors"
              >
                <p className="text-sm font-medium text-red-800">⚠️ Conversion Rate: 2.1%</p>
                <p className="text-xs text-red-600">Down from 3.5% last month</p>
              </button>
            </div>
          )}
          
          {currentView === "products" && (
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3">
                <p className="text-sm text-gray-800 font-medium">Product A: ₱800K</p>
                <p className="text-xs text-green-600">+15% ↑</p>
              </div>
              <button
                onClick={() => handleFindIssue("stock-out", "Product Stock Issues")}
                className="w-full bg-red-100 hover:bg-red-200 border border-red-300 p-3 rounded-lg text-left transition-colors"
              >
                <p className="text-sm font-medium text-red-800">⚠️ Product B: ₱200K</p>
                <p className="text-xs text-red-600">-60% ↓ (Stock issues detected)</p>
              </button>
              <div className="bg-white rounded-lg p-3">
                <p className="text-sm text-gray-800 font-medium">Product C: ₱600K</p>
                <p className="text-xs text-green-600">+8% ↑</p>
              </div>
            </div>
          )}
          
          {currentView === "regions" && (
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3">
                <p className="text-sm text-gray-800 font-medium">North: ₱900K</p>
                <p className="text-xs text-green-600">+12% ↑</p>
              </div>
              <button
                onClick={() => handleFindIssue("region-drop", "Regional Sales Drop")}
                className="w-full bg-red-100 hover:bg-red-200 border border-red-300 p-3 rounded-lg text-left transition-colors"
              >
                <p className="text-sm font-medium text-red-800">⚠️ South: ₱400K</p>
                <p className="text-xs text-red-600">-45% ↓ (Major competitor entered market)</p>
              </button>
              <div className="bg-white rounded-lg p-3">
                <p className="text-sm text-gray-800 font-medium">Central: ₱1.1M</p>
                <p className="text-xs text-green-600">+5% ↑</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Investigation Panel */}
        <div className="space-y-4">
          <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
            <h4 className="text-slate-200 font-semibold mb-3">Issues Found ({foundIssues.length}/3)</h4>
            <div className="space-y-2">
              {Object.values(issues).map((issue, i) => (
                <div
                  key={i}
                  className={`px-3 py-2 rounded border text-sm ${
                    foundIssues.includes(issue.id)
                      ? 'bg-green-600 border-green-500 text-white'
                      : 'bg-slate-700 border-slate-600 text-slate-400'
                  }`}
                >
                  {foundIssues.includes(issue.id) ? '✅' : '🔍'} {issue.name}
                </div>
              ))}
            </div>
          </div>
          
          {gameComplete && (
            <div className="bg-green-900/30 border border-green-600 rounded-xl p-4">
              <h4 className="text-green-300 font-semibold mb-2">🎉 Investigation Complete!</h4>
              <p className="text-slate-300 text-sm">
                You've identified all three root causes of the sales decline. Great analytical thinking!
              </p>
            </div>
          )}
          
          <div className="bg-cyan-900/20 rounded-xl border border-cyan-700 p-4">
            <h4 className="text-cyan-300 font-semibold mb-2">💡 What You're Learning</h4>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• Root cause analysis</li>
              <li>• Data investigation techniques</li>
              <li>• Problem-solving methodology</li>
              <li>• Business intelligence</li>
            </ul>
          </div>
          
          {/* Complete Activity Button */}
          <button
            onClick={handleComplete}
            disabled={isCompleted}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
              isCompleted
                ? 'bg-green-600 text-white cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700 shadow-lg'
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

// Activity 3: Build a Simple Chart
function BuildSimpleChart() {
  const [chartType, setChartType] = useState("bar");
  const [chartColor, setChartColor] = useState("#3b82f6");
  const [chartTitle, setChartTitle] = useState("Student Enrollment");
  
  // Track activity engagement
  const { trackInteraction, saveActivityResult, timeSpent, trackQualityMetric, isAlreadyCompleted } = useActivityTracking(
    'ITBA',
    'Build a Simple Chart'
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
    trackQualityMetric('chart_customized', true);
  };
  
  // Auto-save progress when user interacts
  useEffect(() => {
    if (timeSpent > 30 && !isCompleted) {
      saveActivityResult(false); // Auto-save as progress
    }
  }, [timeSpent, isCompleted, saveActivityResult]);
  
  const data = [
    { label: "BSIT", value: 450 },
    { label: "BSCS", value: 320 },
    { label: "BSIS", value: 280 }
  ];
  
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-cyan-400">Activity 3: Build a Simple Chart</h3>
      <p className="text-slate-300 text-sm">Choose the best chart type and customize it</p>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Chart Preview */}
        <div className="bg-slate-900/60 rounded-xl border border-cyan-700 p-6">
          <h4 className="text-cyan-300 font-semibold mb-4">Chart Preview</h4>
          
          <div className="bg-white rounded-lg p-6">
            <h5 className="text-gray-800 font-bold mb-4">{chartTitle}</h5>
            
            {chartType === "bar" && (
              <div className="flex items-end justify-between h-48 gap-4">
                {data.map((item, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex items-end justify-center h-40">
                      <div
                        className="w-full rounded-t transition-all duration-500"
                        style={{
                          height: `${(item.value / maxValue) * 100}%`,
                          backgroundColor: chartColor
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-600 mt-2">{item.label}</span>
                    <span className="text-xs font-bold text-gray-800">{item.value}</span>
                  </div>
                ))}
              </div>
            )}
            
            {chartType === "pie" && (
              <div className="flex justify-center items-center h-48">
                <div className="relative w-40 h-40">
                  {/* Simple pie representation */}
                  <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    {data.map((item, i) => {
                      const total = data.reduce((sum, d) => sum + d.value, 0);
                      const percentage = (item.value / total) * 100;
                      const offset = data.slice(0, i).reduce((sum, d) => sum + (d.value / total) * 100, 0);
                      
                      return (
                        <circle
                          key={i}
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke={i === 0 ? chartColor : i === 1 ? '#10b981' : '#f59e0b'}
                          strokeWidth="20"
                          strokeDasharray={`${percentage * 2.51} ${251 - percentage * 2.51}`}
                          strokeDashoffset={-offset * 2.51}
                        />
                      );
                    })}
                  </svg>
                </div>
                <div className="ml-6 space-y-2">
                  {data.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <div 
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: i === 0 ? chartColor : i === 1 ? '#10b981' : '#f59e0b' }}
                      />
                      <span className="text-gray-700">{item.label}: {item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {chartType === "line" && (
              <div className="h-48 flex items-end justify-between gap-2">
                <svg className="w-full h-full">
                  <polyline
                    points={data.map((d, i) => `${(i / (data.length - 1)) * 100},${100 - (d.value / maxValue) * 80}`).join(' ')}
                    fill="none"
                    stroke={chartColor}
                    strokeWidth="3"
                    vectorEffect="non-scaling-stroke"
                  />
                  {data.map((d, i) => (
                    <g key={i}>
                      <circle
                        cx={(i / (data.length - 1)) * 100}
                        cy={100 - (d.value / maxValue) * 80}
                        r="4"
                        fill={chartColor}
                      />
                      <text
                        x={(i / (data.length - 1)) * 100}
                        y="95"
                        textAnchor="middle"
                        fontSize="8"
                        fill="#374151"
                      >
                        {d.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            )}
          </div>
        </div>
        
        {/* Chart Builder Controls */}
        <div className="space-y-4">
          <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
            <h4 className="text-slate-200 font-semibold mb-3">Chart Type</h4>
            <div className="grid grid-cols-3 gap-2">
              {['bar', 'pie', 'line'].map(type => (
                <button
                  key={type}
                  onClick={() => {
                    setChartType(type);
                    trackInteraction('chart_type_changed');
                    trackQualityMetric('chart_type_explored', true);
                  }}
                  className={`px-3 py-2 text-sm rounded border transition-colors ${
                    chartType === type 
                      ? 'bg-cyan-600 border-cyan-500 text-white' 
                      : 'bg-slate-700 border-slate-600 text-slate-300'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
            <h4 className="text-slate-200 font-semibold mb-3">Chart Title</h4>
            <input
              type="text"
              value={chartTitle}
              onChange={(e) => {
                setChartTitle(e.target.value);
                trackInteraction('title_changed');
                trackQualityMetric('title_customized', true);
              }}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded"
            />
          </div>
          
          <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
            <h4 className="text-slate-200 font-semibold mb-3">Primary Color</h4>
            <input
              type="color"
              value={chartColor}
              onChange={(e) => {
                setChartColor(e.target.value);
                trackInteraction('color_changed');
                trackQualityMetric('color_customized', true);
              }}
              className="w-full h-12 cursor-pointer rounded"
            />
          </div>
          
          <div className="bg-cyan-900/20 rounded-xl border border-cyan-700 p-4">
            <h4 className="text-cyan-300 font-semibold mb-2">💡 What You're Learning</h4>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• Choosing appropriate chart types</li>
              <li>• Data visualization principles</li>
              <li>• Visual communication</li>
              <li>• Design for clarity</li>
            </ul>
          </div>
          
          {/* Complete Activity Button */}
          <button
            onClick={handleComplete}
            disabled={isCompleted}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
              isCompleted
                ? 'bg-green-600 text-white cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700 shadow-lg'
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
export default function AnalyticsActivities() {
  const [currentActivity, setCurrentActivity] = useState(1);
  
  const activities = [
    { id: 1, name: "Read the Sales Report", icon: <BarChart3 size={20} /> },
    { id: 2, name: "Find the Problem", icon: <TrendingDown size={20} /> },
    { id: 3, name: "Build a Simple Chart", icon: <PieChart size={20} /> }
  ];
  
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-cyan-400">Interactive Activities</h2>
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
                ? 'bg-cyan-600/20 border-cyan-500 shadow-lg shadow-cyan-600/20'
                : 'bg-slate-800/40 border-slate-700 hover:border-slate-600'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`${currentActivity === activity.id ? 'text-cyan-400' : 'text-slate-400'}`}>
                {activity.icon}
              </div>
              <span className={`text-sm font-medium ${
                currentActivity === activity.id ? 'text-cyan-300' : 'text-slate-300'
              }`}>
                {activity.name}
              </span>
            </div>
          </button>
        ))}
      </div>
      
      {/* Activity Content */}
      <div className="bg-slate-900/40 rounded-xl border border-slate-700 p-6">
        {currentActivity === 1 && <ReadSalesReport />}
        {currentActivity === 2 && <FindTheProblem />}
        {currentActivity === 3 && <BuildSimpleChart />}
      </div>
    </section>
  );
}