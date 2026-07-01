import { useState, useEffect } from 'react';
import { CheckCircle2, PlayCircle, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const ModulesPage = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const { data } = await api.get('/modules');
        setModules(data.modules);
      } catch (error) {
        console.error('Failed to load modules', error);
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, []);

  const completedCount = modules.filter(m => m.status === 'Completed').length;
  const totalCount = modules.length;
  const progressPercent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Learning Modules</h1>
        <p className="text-gray-600 mt-1">Master prompt engineering through structured lessons and practical exercises</p>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading modules...</div>
      ) : (
        <>
          {/* Overall Progress */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Overall Progress</p>
              <p className="text-2xl font-bold text-gray-900">{completedCount} of {totalCount} Modules Completed</p>
            </div>
            <div className="w-full md:w-1/3">
              <div className="flex justify-end mb-1">
                <span className="text-sm font-medium text-gray-600">{progressPercent}% Complete</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-dark h-2 rounded-full" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>
          </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((mod) => (
              <ModuleCard key={mod._id} module={mod} />
            ))}
            {modules.length === 0 && (
              <p className="text-gray-500 col-span-2 text-center py-4">No modules available at the moment.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const ModuleCard = ({ module }) => {
  // Using status from DB, assuming 'Draft' means locked/hidden and 'Published' means accessible.
  // For student progress, we'd normally check user.completedModules.
  const isLocked = module.status === 'Draft';
  const isCompleted = false; // We'd check if module._id is in user.completedModules
  const inProgress = false; // Add real tracking logic here

  return (
    <div className={`bg-white rounded-xl border p-6 transition-all ${
      isLocked ? 'border-gray-100 opacity-75' : 'border-gray-200 shadow-sm hover:shadow-md'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className={`text-lg font-bold ${isLocked ? 'text-gray-500' : 'text-gray-900'}`}>{module.title}</h3>
        {isCompleted && <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />}
        {isLocked && <Lock className="w-5 h-5 text-gray-400 flex-shrink-0" />}
        {inProgress && <PlayCircle className="w-6 h-6 text-primary flex-shrink-0" />}
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
            <span>{isCompleted ? 100 : 0}% Complete</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div className={`h-1.5 rounded-full ${isCompleted ? 'bg-emerald-500' : 'bg-primary'}`} style={{ width: `${isCompleted ? 100 : 0}%` }}></div>
          </div>
        </div>
      )}

      {isCompleted ? (
        <Link to={`/modules/${module._id}`} className="block w-full text-center py-2 bg-dark text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
          Review Module
        </Link>
      ) : isLocked ? (
        <button disabled className="w-full py-2 bg-gray-100 text-gray-400 rounded-lg text-sm font-medium cursor-not-allowed">
          Coming Soon
        </button>
      ) : (
        <Link to={`/modules/${module._id}`} className="block w-full text-center py-2 bg-dark text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium flex items-center justify-center gap-2">
          <PlayCircle className="w-4 h-4" /> Start Learning
        </Link>
      )}
    </div>
  );
};

export default ModulesPage;
