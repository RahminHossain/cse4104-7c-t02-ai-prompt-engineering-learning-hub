import { useSelector } from 'react-redux';
import { Zap, BookOpen, Award, Trophy, PlayCircle, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  // Mock data based on the wireframe (Fig 4)
  const stats = [
    { label: 'Total XP', value: '2,450', icon: <Zap className="text-warning w-6 h-6" />, bgColor: 'bg-yellow-50' },
    { label: 'Modules Completed', value: '8/12', icon: <BookOpen className="text-blue-500 w-6 h-6" />, bgColor: 'bg-blue-50' },
    { label: 'Badges Earned', value: '5', icon: <Award className="text-purple-500 w-6 h-6" />, bgColor: 'bg-purple-50' },
    { label: 'Challenges Won', value: '12', icon: <Trophy className="text-emerald-500 w-6 h-6" />, bgColor: 'bg-emerald-50' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          Welcome back, {user?.name?.split(' ')[0] || 'Student'}! 👋
        </h1>
        <p className="text-gray-600 mt-1">Track your learning progress and continue your prompt engineering journey</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Learning Progress */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Learning Progress</h2>
                <p className="text-sm text-gray-500">Continue where you left off</p>
              </div>
            </div>

            <div className="space-y-6">
              <ProgressItem title="Zero-Shot Prompting" progress={100} status="Completed" />
              <ProgressItem title="Few-Shot Learning" progress={75} status="In Progress" />
              <ProgressItem title="Chain-of-Thought" progress={40} status="In Progress" />
              <ProgressItem title="Role-play Techniques" progress={0} status="Not Started" />
            </div>

            <Link to="/modules" className="mt-6 block w-full text-center py-2.5 bg-dark text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
              View All Modules
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Recent Activity</h2>
            <p className="text-sm text-gray-500 mb-6">Your latest achievements and actions</p>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
              <ActivityItem text={<>Completed <strong>Zero-Shot Prompting</strong> module</>} time="2 hours ago" color="bg-blue-500" />
              <ActivityItem text={<>Earned <strong>Quick Learner</strong> badge</>} time="5 hours ago" color="bg-warning" />
              <ActivityItem text={<>Submitted <strong>Reverse Challenge #15</strong></>} time="1 day ago" color="bg-purple-500" />
              <ActivityItem text={<>Published <strong>Code Generation Prompt</strong></>} time="2 days ago" color="bg-emerald-500" />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          
          {/* Earned Badges */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Earned Badges</h2>
            <p className="text-sm text-gray-500 mb-6">Your achievements</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Badge icon={<Award />} title="First Steps" color="bg-blue-500" />
              <Badge icon={<Zap />} title="Quick Learner" color="bg-warning" />
              <Badge icon={<Trophy />} title="Challenger" color="bg-emerald-500" />
              <Badge icon={<Code />} title="Prompt Master" color="bg-purple-500" />
            </div>

            <button className="w-full py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors">
              View All Badges
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Quick Actions</h2>
            <p className="text-sm text-gray-500 mb-4">Jump into your learning</p>
            
            <div className="space-y-3">
              <Link to="/playground" className="flex items-center gap-3 w-full p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group">
                <PlayCircle className="w-5 h-5 text-gray-400 group-hover:text-primary" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Test a Prompt</span>
              </Link>
              <Link to="/challenges" className="flex items-center gap-3 w-full p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group">
                <Trophy className="w-5 h-5 text-gray-400 group-hover:text-warning" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Try a Challenge</span>
              </Link>
              <Link to="/marketplace" className="flex items-center gap-3 w-full p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group">
                <BookOpen className="w-5 h-5 text-gray-400 group-hover:text-emerald-500" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Browse Marketplace</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const ProgressItem = ({ title, progress, status }) => (
  <div>
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm font-medium text-gray-900 flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-gray-400" />
        {title}
      </span>
      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
        status === 'Completed' ? 'bg-dark text-white' : 
        status === 'In Progress' ? 'bg-gray-100 text-gray-600' : 
        'bg-gray-50 text-gray-400'
      }`}>
        {status}
      </span>
    </div>
    <div className="w-full bg-gray-100 rounded-full h-2">
      <div className="bg-dark h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
    </div>
    <p className="text-xs text-gray-500 mt-1 text-right">{progress}% Complete</p>
  </div>
);

const ActivityItem = ({ text, time, color }) => (
  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
    <div className={`flex items-center justify-center w-4 h-4 rounded-full border-4 border-white ${color} shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2`}></div>
    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
      <p className="text-sm text-gray-800">{text}</p>
      <span className="text-xs text-gray-400 mt-1 block">{time}</span>
    </div>
  </div>
);

const Badge = ({ icon, title, color }) => (
  <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl text-center hover:bg-gray-100 transition-colors">
    <div className={`w-12 h-12 rounded-full ${color} text-white flex items-center justify-center mb-2 shadow-sm`}>
      {icon}
    </div>
    <span className="text-xs font-semibold text-gray-700">{title}</span>
  </div>
);

export default Dashboard;
