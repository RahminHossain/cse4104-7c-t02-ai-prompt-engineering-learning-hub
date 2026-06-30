import { useState } from 'react';
import { Send, Settings2, RotateCcw, CheckCircle2, TrendingUp, AlertCircle, Copy, Play } from 'lucide-react';

const Playground = () => {
  const [prompt, setPrompt] = useState('Type your prompt here... For example: Act as a senior software engineer.\nReview the following code and provide suggestions for improvement...');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState('Score'); // Score, Feedback, Optimized

  const handleEvaluate = () => {
    setIsEvaluating(true);
    // Simulate API call to Gemini
    setTimeout(() => {
      setResults({
        score: 84,
        clarity: 92,
        specificity: 78,
        constraints: 82,
        feedback: [
          { type: 'positive', title: 'Strong Role Definition', desc: 'Clear role assignment helps the AI understand the context' },
          { type: 'improvement', title: 'Add Specific Constraints', desc: 'Include output format, length limits, or specific requirements' },
          { type: 'warning', title: 'Missing Context', desc: 'Provide more background information or examples for better results' }
        ],
        optimized: `Act as a Senior Software Engineer with 10+ years of experience in code review. Review the following code segment and provide detailed feedback focusing on: 1. Code quality and best practices 2. Performance optimization opportunities 3. Security considerations 4. Maintainability improvements\n\nFormat your response as:\n- Issue: [description]\n- Severity: Low/Medium/High\n- Suggestion: [specific improvement]\n\nProvide 3-5 actionable suggestions.`
      });
      setIsEvaluating(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">AI Prompt Playground</h1>
        <p className="text-gray-600 mt-1">Test your prompts and get real-time AI evaluation and feedback</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Editor Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Write Your Prompt</h2>
              <button 
                className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                onClick={() => setPrompt('')}
              >
                <RotateCcw className="w-4 h-4" /> Clear
              </button>
            </div>
            
            <p className="text-sm text-gray-500 mb-4">Craft your prompt and submit it for AI analysis</p>
            
            <textarea
              className="w-full h-64 p-4 bg-gray-50 border border-gray-200 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-primary outline-none transition-all"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>

            <div className="flex gap-4 mt-6">
              <button 
                onClick={handleEvaluate}
                disabled={isEvaluating || !prompt.trim()}
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-dark text-white font-medium rounded-lg hover:bg-gray-800 disabled:opacity-75 transition-colors flex-1"
              >
                {isEvaluating ? (
                  <span className="flex items-center gap-2">Analyzing <span className="animate-pulse">...</span></span>
                ) : (
                  <><Send className="w-4 h-4" /> Evaluate Prompt</>
                )}
              </button>
              <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shrink-0">
                <Settings2 className="w-4 h-4" /> Optimize
              </button>
            </div>
          </div>

          {/* Evaluation Results */}
          {results && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">Evaluation Results</h2>
                <p className="text-sm text-gray-500">AI-powered analysis of your prompt</p>
              </div>

              <div className="flex border-b border-gray-100 bg-gray-50 px-6 pt-4">
                {['Score', 'Feedback', 'Optimized'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                      activeTab === tab ? 'bg-white border-t border-l border-r border-gray-200 text-gray-900 mb-[-1px]' : 'text-gray-500 hover:text-gray-700 border border-transparent'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* Score Tab */}
                {activeTab === 'Score' && (
                  <div className="flex flex-col items-center py-8">
                    <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center text-4xl font-bold text-white shadow-lg mb-6 ring-8 ring-blue-50">
                      {results.score}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Good Quality Prompt</h3>
                    <p className="text-gray-500 text-sm mt-1 mb-8">Your prompt shows strong structure but can be improved</p>
                    
                    <div className="grid grid-cols-3 gap-6 w-full max-w-md">
                      <div className="flex flex-col items-center p-4 border border-gray-100 rounded-xl">
                        <CheckCircle2 className="w-6 h-6 text-emerald-500 mb-2" />
                        <span className="text-xs text-gray-500 uppercase font-medium">Clarity</span>
                        <span className="text-xl font-bold text-gray-900 mt-1">{results.clarity}</span>
                      </div>
                      <div className="flex flex-col items-center p-4 border border-gray-100 rounded-xl">
                        <TrendingUp className="w-6 h-6 text-blue-500 mb-2" />
                        <span className="text-xs text-gray-500 uppercase font-medium">Specificity</span>
                        <span className="text-xl font-bold text-gray-900 mt-1">{results.specificity}</span>
                      </div>
                      <div className="flex flex-col items-center p-4 border border-gray-100 rounded-xl">
                        <AlertCircle className="w-6 h-6 text-warning mb-2" />
                        <span className="text-xs text-gray-500 uppercase font-medium">Constraints</span>
                        <span className="text-xl font-bold text-gray-900 mt-1">{results.constraints}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Feedback Tab (Fig 13) */}
                {activeTab === 'Feedback' && (
                  <div className="space-y-4">
                    {results.feedback.map((item, idx) => (
                      <div key={idx} className={`p-4 rounded-lg border-l-4 ${
                        item.type === 'positive' ? 'bg-emerald-50 border-emerald-500' :
                        item.type === 'improvement' ? 'bg-blue-50 border-blue-500' :
                        'bg-yellow-50 border-warning'
                      }`}>
                        <div className="flex items-start gap-3">
                          {item.type === 'positive' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />}
                          {item.type === 'improvement' && <TrendingUp className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />}
                          {item.type === 'warning' && <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />}
                          <div>
                            <h4 className={`font-bold ${
                              item.type === 'positive' ? 'text-emerald-800' :
                              item.type === 'improvement' ? 'text-blue-800' :
                              'text-yellow-800'
                            }`}>{item.title}</h4>
                            <p className={`text-sm mt-1 ${
                              item.type === 'positive' ? 'text-emerald-700' :
                              item.type === 'improvement' ? 'text-blue-700' :
                              'text-yellow-700'
                            }`}>{item.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Optimized Tab (Fig 14) */}
                {activeTab === 'Optimized' && (
                  <div>
                    <div className="bg-dark text-gray-300 p-6 rounded-xl font-mono text-sm whitespace-pre-wrap leading-relaxed shadow-inner">
                      {results.optimized}
                    </div>
                    <div className="flex gap-4 mt-6">
                      <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                        <Copy className="w-4 h-4" /> Copy Optimized
                      </button>
                      <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                        <Play className="w-4 h-4" /> Test This Prompt
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          
          {/* Tips */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Tips for Better Prompts</h2>
            <ul className="space-y-3 text-sm text-gray-700 list-disc pl-5">
              <li className="pl-1">Define a clear role or persona</li>
              <li className="pl-1">Be specific about desired output</li>
              <li className="pl-1">Include relevant examples</li>
              <li className="pl-1">Set clear constraints and boundaries</li>
              <li className="pl-1">Specify output format</li>
            </ul>
          </div>

          {/* Quick Templates */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Quick Templates</h2>
            <p className="text-sm text-gray-500 mb-4">Common prompt structures</p>
            
            <div className="space-y-3">
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-blue-50 transition-all group">
                <h4 className="font-semibold text-sm text-gray-900 group-hover:text-primary">Role-Based Prompt</h4>
                <p className="text-xs text-gray-500 mt-1">Act as a [role]...</p>
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-blue-50 transition-all group">
                <h4 className="font-semibold text-sm text-gray-900 group-hover:text-primary">Few-Shot Example</h4>
                <p className="text-xs text-gray-500 mt-1">Here are examples...</p>
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-blue-50 transition-all group">
                <h4 className="font-semibold text-sm text-gray-900 group-hover:text-primary">Chain-of-Thought</h4>
                <p className="text-xs text-gray-500 mt-1">Let's think step by step...</p>
              </button>
            </div>
          </div>

          {/* History */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Evaluation History</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-dark text-white text-xs font-bold flex items-center justify-center">92</span>
                  <span className="text-sm font-medium text-gray-700">Code Review</span>
                </div>
                <button className="text-sm text-primary hover:underline font-medium">View</button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-dark text-white text-xs font-bold flex items-center justify-center">84</span>
                  <span className="text-sm font-medium text-gray-700">Data Analysis</span>
                </div>
                <button className="text-sm text-primary hover:underline font-medium">View</button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-dark text-white text-xs font-bold flex items-center justify-center">76</span>
                  <span className="text-sm font-medium text-gray-700">Content Writing</span>
                </div>
                <button className="text-sm text-primary hover:underline font-medium">View</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Playground;
