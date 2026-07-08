import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { X, CheckCircle2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import toast from 'react-hot-toast';
import api from '../services/api';

const LessonViewerPage = () => {
  const { moduleId, lessonIndex } = useParams();
  const navigate = useNavigate();
  
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 font-medium">Loading your lesson...</p>
        </div>
      </div>
    );
  }

  if (!module || !module.lessonList || module.lessonList.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No lessons available</h2>
        <button onClick={() => navigate(`/modules/${moduleId}`)} className="text-primary hover:underline font-medium">
          Return to Module
        </button>
      </div>
    );
  }

  const lessons = module.lessonList;
  const currentLesson = lessons[index];
  const progressPercent = Math.max(5, Math.round(((index) / lessons.length) * 100));

  if (!currentLesson) {
    navigate(`/modules/${moduleId}`);
    return null;
  }

  const handleContinue = () => {
    if (index < lessons.length - 1) {
      // Go to next lesson
      navigate(`/modules/${moduleId}/lessons/${index + 1}`);
    } else {
      // Finished the module
      toast.success('🎉 You completed the module!', {
        duration: 4000,
        position: 'top-center',
        style: {
          fontWeight: 'bold',
          padding: '16px',
          color: '#10B981'
        }
      });
      navigate(`/modules/${moduleId}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F8] flex flex-col font-sans selection:bg-primary/20">
      
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-10 bg-[#F7F7F8] pt-6 pb-4 px-4">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <button 
            onClick={() => navigate(`/modules/${moduleId}`)}
            className="text-gray-400 hover:text-gray-900 transition-colors p-2 hover:bg-gray-200 rounded-full"
            aria-label="Exit lesson"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex-1">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-primary h-3 rounded-full transition-all duration-500 ease-out relative"
                style={{ width: `${progressPercent}%` }}
              >
                <div className="absolute top-0.5 right-2 w-full h-1 bg-white/20 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-6 py-8 pb-32">
        <div className="mb-8 text-center sm:text-left">
          <span className={`inline-block px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg mb-4 ${
            currentLesson.isQuiz ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
          }`}>
            {currentLesson.isQuiz ? 'Quiz Challenge' : 'New Concept'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-2">
            {currentLesson.title}
          </h1>
          <p className="text-gray-500 font-medium">{currentLesson.duration}</p>
        </div>

        {/* Markdown Content */}
        <div className="prose prose-lg sm:prose-xl prose-gray max-w-none text-gray-800
            prose-headings:font-bold prose-headings:text-gray-900 
            prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-blue-700
            prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:shadow-lg
            prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
            prose-strong:text-gray-900 prose-strong:font-extrabold
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-blue-50/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:italic
        ">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {currentLesson.content || 'This lesson has no content yet.'}
          </ReactMarkdown>
        </div>
      </main>

      {/* Sticky Bottom Footer (Mimo Style) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 sm:p-6 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <h4 className="font-bold text-gray-900">Keep going!</h4>
            <p className="text-sm text-gray-500">You're doing great.</p>
          </div>
          <button 
            onClick={handleContinue}
            className="w-full sm:w-auto flex-1 sm:flex-none bg-primary hover:bg-blue-700 text-white font-bold text-lg py-4 sm:py-3 px-12 rounded-2xl shadow-[0_4px_0_0_rgb(29,78,216)] hover:shadow-[0_2px_0_0_rgb(29,78,216)] hover:translate-y-[2px] transition-all active:shadow-none active:translate-y-[4px]"
          >
            {index < lessons.length - 1 ? 'CONTINUE' : 'FINISH MODULE'}
          </button>
        </div>
      </div>

    </div>
  );
};

export default LessonViewerPage;
