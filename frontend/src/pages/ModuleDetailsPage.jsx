import { ChevronLeft, CheckCircle2, PlayCircle, FileText, Video, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const ModuleDetailsPage = () => {
  const lessons = [
    { id: 1, title: 'What is Few-Shot Learning?', duration: '8 min', status: 'completed' },
    { id: 2, title: 'Providing Examples', duration: '12 min', status: 'completed' },
    { id: 3, title: 'Example Selection Strategies', duration: '15 min', status: 'completed' },
    { id: 4, title: 'Practical Exercise: Few-Shot Classification', duration: '20 min', status: 'completed' },
    { id: 5, title: 'Common Mistakes to Avoid', duration: '10 min', status: 'completed' },
    { id: 6, title: 'Advanced Techniques', duration: '18 min', status: 'pending' },
    { id: 7, title: 'Final Quiz', duration: '15 min', status: 'pending' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/modules" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors">
        <ChevronLeft className="w-4 h-4" /> Back to Modules
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Header Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded mb-4">
              Intermediate
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Few-Shot Learning</h1>
            <p className="text-gray-600 mb-6">Provide examples to guide AI responses effectively</p>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
              <span>7 lessons</span>
              <span>&bull;</span>
              <span>1.5 hours</span>
              <span>&bull;</span>
              <span>75% Complete</span>
            </div>

            <div>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                <div className="bg-dark h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-sm font-medium text-gray-700">5 of 7 lessons completed</p>
            </div>
          </div>

          {/* Lessons List */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Lessons</h2>
            <p className="text-sm text-gray-500 mb-6">Complete all lessons to finish this module</p>

            <div className="space-y-4">
              {lessons.map((lesson) => (
                <div key={lesson.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    {lesson.status === 'completed' ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-gray-300 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h3 className={`font-semibold ${lesson.status === 'completed' ? 'text-gray-900' : 'text-gray-700'}`}>
                        {lesson.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">{lesson.duration}</p>
                    </div>
                  </div>
                  {lesson.status === 'completed' ? (
                    <button className="px-4 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors">
                      Review
                    </button>
                  ) : (
                    <button className="px-4 py-1.5 text-sm font-medium text-white bg-dark rounded hover:bg-gray-800 transition-colors">
                      Start
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Example Prompts */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Example Prompts</h2>
            <p className="text-sm text-gray-500 mb-4">Learn from these practical examples</p>
            
            <div className="divide-y divide-gray-100 border border-gray-100 rounded-lg">
              <div className="p-4 hover:bg-gray-50 cursor-pointer">
                <h4 className="font-semibold text-sm text-gray-900">Task Classification</h4>
                <p className="text-xs text-gray-500">Classify user requests into categories</p>
              </div>
              <div className="p-4 hover:bg-gray-50 cursor-pointer">
                <h4 className="font-semibold text-sm text-gray-900">Sentiment Analysis</h4>
                <p className="text-xs text-gray-500">Analyze sentiment with few-shot examples</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          
          {/* What You'll Learn */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">What You'll Learn</h2>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                Understand few-shot learning principles
              </li>
              <li className="flex gap-3 text-sm text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                Select effective examples
              </li>
              <li className="flex gap-3 text-sm text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                Structure prompts with examples
              </li>
              <li className="flex gap-3 text-sm text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                Apply few-shot techniques in practice
              </li>
              <li className="flex gap-3 text-sm text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                Optimize example selection
              </li>
            </ul>
          </div>

          {/* Module Resources */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Module Resources</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <FileText className="w-4 h-4 text-gray-400" /> Download Cheat Sheet
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Video className="w-4 h-4 text-gray-400" /> Watch Video Tutorial
              </button>
              <Link to="/playground" className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <PlayCircle className="w-4 h-4 text-gray-400" /> Test in Playground
              </Link>
            </div>
          </div>

          {/* Earn Rewards */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Earn Rewards</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-700">Complete all lessons</span>
                <span className="px-2 py-1 bg-dark text-white text-xs font-bold rounded-full">+200 XP</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-700">Pass final quiz</span>
                <span className="px-2 py-1 bg-dark text-white text-xs font-bold rounded-full">+100 XP</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-700">Perfect score</span>
                <span className="px-2 py-1 bg-warning text-white text-xs font-bold rounded-full flex items-center gap-1">
                  <Award className="w-3 h-3" /> Badge
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ModuleDetailsPage;
