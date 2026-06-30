import { CheckCircle2, PlayCircle, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const ModulesPage = () => {
  const modules = [
    {
      id: 1,
      title: "Introduction to Prompt Engineering",
      desc: "Learn the basics of prompt engineering and why it matters",
      level: "Beginner",
      lessons: 5,
      time: "45 min",
      progress: 100,
      status: "completed",
    },
    {
      id: 2,
      title: "Zero-Shot Prompting",
      desc: "Master the art of getting results without examples",
      level: "Beginner",
      lessons: 6,
      time: "1 hour",
      progress: 100,
      status: "completed",
    },
    {
      id: 3,
      title: "Few-Shot Learning",
      desc: "Provide examples to guide AI responses effectively",
      level: "Intermediate",
      lessons: 7,
      time: "1.5 hours",
      progress: 75,
      status: "in-progress",
    },
    {
      id: 4,
      title: "Chain-of-Thought Prompting",
      desc: "Break down complex problems into step-by-step reasoning",
      level: "Intermediate",
      lessons: 8,
      time: "2 hours",
      progress: 40,
      status: "in-progress",
    },
    {
      id: 5,
      title: "Role-play Techniques",
      desc: "Assign specific roles to AI for better context",
      level: "Intermediate",
      lessons: 6,
      time: "1.5 hours",
      progress: 0,
      status: "locked",
    },
    {
      id: 6,
      title: "Advanced Prompt Optimization",
      desc: "Fine-tune prompts for maximum efficiency and accuracy",
      level: "Advanced",
      lessons: 10,
      time: "3 hours",
      progress: 0,
      status: "locked",
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Learning Modules</h1>
        <p className="text-gray-600 mt-1">Master prompt engineering through structured lessons and practical exercises</p>
      </div>

      {/* Overall Progress */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Overall Progress</p>
          <p className="text-2xl font-bold text-gray-900">8 of 12 Modules Completed</p>
        </div>
        <div className="w-full md:w-1/3">
          <div className="flex justify-end mb-1">
            <span className="text-sm font-medium text-gray-600">67% Complete</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div className="bg-dark h-2 rounded-full" style={{ width: '67%' }}></div>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((mod) => (
          <ModuleCard key={mod.id} module={mod} />
        ))}
      </div>
    </div>
  );
};

const ModuleCard = ({ module }) => {
  const isLocked = module.status === 'locked';
  const isCompleted = module.status === 'completed';

  return (
    <div className={`bg-white rounded-xl border p-6 transition-all ${
      isLocked ? 'border-gray-100 opacity-75' : 'border-gray-200 shadow-sm hover:shadow-md'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className={`text-lg font-bold ${isLocked ? 'text-gray-500' : 'text-gray-900'}`}>{module.title}</h3>
        {isCompleted && <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />}
        {isLocked && <Lock className="w-5 h-5 text-gray-400 flex-shrink-0" />}
        {module.status === 'in-progress' && <PlayCircle className="w-6 h-6 text-primary flex-shrink-0" />}
      </div>
      
      <p className="text-sm text-gray-600 mb-4 h-10">{module.desc}</p>
      
      <div className="flex items-center gap-3 mb-6">
        <span className={`text-xs px-2 py-1 rounded font-medium ${
          module.level === 'Beginner' ? 'bg-emerald-100 text-emerald-700' :
          module.level === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
          'bg-purple-100 text-purple-700'
        }`}>
          {module.level}
        </span>
        <span className="text-xs text-gray-500 flex items-center gap-1">
          {module.lessons} lessons &bull; {module.time}
        </span>
      </div>

      {!isLocked && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{module.progress}% Complete</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div className={`h-1.5 rounded-full ${isCompleted ? 'bg-emerald-500' : 'bg-primary'}`} style={{ width: `${module.progress}%` }}></div>
          </div>
        </div>
      )}

      {isCompleted ? (
        <Link to={`/modules/${module.id}`} className="block w-full text-center py-2 bg-dark text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
          Review Module
        </Link>
      ) : isLocked ? (
        <button disabled className="w-full py-2 bg-gray-100 text-gray-400 rounded-lg text-sm font-medium cursor-not-allowed">
          Complete Previous Modules
        </button>
      ) : (
        <Link to={`/modules/${module.id}`} className="block w-full text-center py-2 bg-dark text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium flex items-center justify-center gap-2">
          <PlayCircle className="w-4 h-4" /> Continue Learning
        </Link>
      )}
    </div>
  );
};

export default ModulesPage;
