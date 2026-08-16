import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X, CheckCircle2, Sparkles, HelpCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';

const LessonViewerPage = () => {
  const { moduleId, lessonIndex } = useParams();
  const navigate = useNavigate();
  
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedQuizOption, setSelectedQuizOption] = useState(null);
  const [completing, setCompleting] = useState(false);

  const index = parseInt(lessonIndex, 10) || 0;

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const { data } = await api.get(`/modules/${moduleId}`);
        setModule(data.module);
      } catch (error) {
        toast.error('Failed to load lesson');
        navigate(`/modules/${moduleId}`);
      } finally {
        setLoading(false);
      }
    };
    fetchModule();
  }, [moduleId, navigate]);

  // Reset quiz option when index changes
  useEffect(() => {
    setSelectedQuizOption(null);
  }, [index]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F7F8] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 font-medium">Loading your lesson...</p>
        </div>
      </div>
    );
  }

  if (!module || !module.lessonList || module.lessonList.length === 0) {
    return (
      <div className="min-h-screen bg-[#F7F7F8] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No lessons available</h2>
        <p className="text-gray-600 mb-6">This module does not have any lesson content configured yet.</p>
        <button 
          onClick={() => navigate(`/modules/${moduleId}`)} 
          className="px-6 py-2.5 bg-dark text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          Return to Module
        </button>
      </div>
    );
  }

  const lessons = module.lessonList;
  const currentLesson = lessons[index];
  const progressPercent = Math.max(10, Math.round(((index + 1) / lessons.length) * 100));

  if (!currentLesson) {
    navigate(`/modules/${moduleId}`);
    return null;
  }

  const handleContinue = async () => {
    try {
      setCompleting(true);
      const { data } = await api.post(`/modules/${moduleId}/lessons/${index}/complete`);
      
      if (data.moduleCompleted) {
        toast.success(`🎉 You completed the module! +${data.xpGained || 200} XP`, {
          duration: 5000,
          position: 'top-center',
          style: {
            fontWeight: 'bold',
            padding: '16px',
            color: '#10B981'
          }
        });
      } else if (data.xpGained > 0) {
        toast.success(`✅ Lesson completed! +${data.xpGained} XP`, {
          duration: 3000,
          position: 'top-center'
        });
      }

      if (data.badgeEarned) {
        toast.success(`🏆 New Badge Unlocked: ${data.badgeEarned}!`, {
          duration: 5000,
          position: 'top-center'
        });
      }

      if (index < lessons.length - 1) {
        navigate(`/modules/${moduleId}/lessons/${index + 1}`);
      } else {
        navigate(`/modules/${moduleId}`);
      }
    } catch (error) {
      console.error('Error completing lesson', error);
      if (index < lessons.length - 1) {
        navigate(`/modules/${moduleId}/lessons/${index + 1}`);
      } else {
        navigate(`/modules/${moduleId}`);
      }
    } finally {
      setCompleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F8] flex flex-col font-sans selection:bg-primary/20">
      
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-10 bg-[#F7F7F8] border-b border-gray-200/60 pt-4 pb-4 px-4 sm:px-8">
        <div className="max-w-3xl mx-auto flex items-center gap-6">
          <button 
            onClick={() => navigate(`/modules/${moduleId}`)}
            className="text-gray-400 hover:text-gray-900 transition-colors p-2 hover:bg-gray-200 rounded-full"
            aria-label="Exit lesson"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex-1">
            <div className="flex justify-between items-center text-xs font-semibold text-gray-500 mb-1.5">
              <span>Lesson {index + 1} of {lessons.length}</span>
              <span>{progressPercent}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-primary h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-10 pb-36">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg ${
              currentLesson.isQuiz ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
            }`}>
              {currentLesson.isQuiz ? <HelpCircle className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
              {currentLesson.isQuiz ? 'Quiz Challenge' : 'Core Concept'}
            </span>
            <span className="text-xs font-medium text-gray-400">&bull; {currentLesson.duration}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-2">
            {currentLesson.title}
          </h1>
        </div>

        {/* Lesson Body Content Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-10 mb-8">
          <LessonContentBody content={currentLesson.content} isQuiz={currentLesson.isQuiz} />

          {currentLesson.isQuiz && (
            <div className="mt-8 pt-8 border-t border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 text-base">Select the best answer:</h3>
              <div className="space-y-3">
                {[
                  'It provides clear examples of expected inputs and outputs to guide the model',
                  'It reduces the number of tokens sent to the API',
                  'It fine-tunes the weights of the neural network permanently',
                  'It bypasses context window limitations entirely'
                ].map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => setSelectedQuizOption(oIdx)}
                    className={`w-full text-left p-4 rounded-xl border-2 font-medium text-sm transition-all flex items-center justify-between ${
                      selectedQuizOption === oIdx
                        ? 'border-primary bg-blue-50/60 text-primary'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                    }`}
                  >
                    <span>{opt}</span>
                    {selectedQuizOption === oIdx && <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Sticky Bottom Footer (Mimo / Duolingo Style) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 sm:p-6 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-20">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <h4 className="font-bold text-gray-900">{index < lessons.length - 1 ? 'Keep Going!' : 'Finish Module!'}</h4>
            <p className="text-xs text-gray-500">
              {index < lessons.length - 1 ? `Up next: ${lessons[index + 1]?.title}` : 'Earn +200 XP upon completion'}
            </p>
          </div>
          <button 
            onClick={handleContinue}
            disabled={completing}
            className="w-full sm:w-auto flex-1 sm:flex-none bg-primary hover:bg-blue-700 text-white font-bold text-base py-3.5 px-10 rounded-xl shadow-[0_4px_0_0_rgb(29,78,216)] hover:shadow-[0_2px_0_0_rgb(29,78,216)] hover:translate-y-[2px] transition-all active:shadow-none active:translate-y-[4px] disabled:opacity-50"
          >
            {completing ? 'Saving...' : index < lessons.length - 1 ? 'CONTINUE' : 'FINISH MODULE'}
          </button>
        </div>
      </div>

    </div>
  );
};

// Safe, clean content body parser that never crashes on unescaped markdown or ESM mismatches
const LessonContentBody = ({ content, isQuiz }) => {
  if (!content) {
    return <p className="text-gray-500 italic">This lesson has no content yet.</p>;
  }

  // Split content by paragraphs/newlines
  const rawSections = content.replace(/\\n/g, '\n').split(/\n\n+/);

  return (
    <div className="space-y-6 text-gray-800 text-base sm:text-lg leading-relaxed">
      {rawSections.map((section, sIdx) => {
        const text = section.trim();
        if (!text) return null;

        // Code block
        if (text.startsWith('```') && text.endsWith('```')) {
          const lines = text.slice(3, -3).trim().split('\n');
          return (
            <div key={sIdx} className="bg-gray-900 text-emerald-400 p-5 rounded-xl overflow-x-auto text-sm font-mono shadow-md my-4">
              <pre>{lines.join('\n')}</pre>
            </div>
          );
        }

        // Example Cards (Input: / Output: or Q: / A:)
        if (text.includes('Input:') || text.includes('Output:') || text.includes('Q:') || text.includes('A:')) {
          return (
            <div key={sIdx} className="bg-slate-50 border border-slate-200 rounded-xl p-5 my-4 font-mono text-sm space-y-2 text-gray-900 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-primary font-sans mb-1">Example Prompt</div>
              {text.split('\n').map((line, lIdx) => (
                <div key={lIdx} className={line.startsWith('Output:') || line.startsWith('A:') ? 'font-bold text-emerald-700' : 'text-gray-800'}>
                  {line}
                </div>
              ))}
            </div>
          );
        }

        // Bullet points
        if (text.includes('\n- ') || text.startsWith('- ')) {
          const items = text.split('\n').filter(l => l.trim().startsWith('- '));
          return (
            <ul key={sIdx} className="space-y-2.5 my-3 pl-2">
              {items.map((item, iIdx) => (
                <li key={iIdx} className="flex items-start gap-2.5 text-gray-700">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2.5 shrink-0" />
                  <span>{formatInline(item.replace(/^- /, ''))}</span>
                </li>
              ))}
            </ul>
          );
        }

        // Standard text paragraph with inline bold and quotes
        return (
          <p key={sIdx} className="text-gray-700 leading-relaxed">
            {formatInline(text)}
          </p>
        );
      })}
    </div>
  );
};

// Formats inline `code` and **bold**
const formatInline = (text) => {
  if (!text) return '';
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);

  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={idx} className="font-extrabold text-gray-900">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={idx} className="px-1.5 py-0.5 bg-pink-50 text-pink-600 font-mono text-sm rounded border border-pink-100">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
};

export default LessonViewerPage;
