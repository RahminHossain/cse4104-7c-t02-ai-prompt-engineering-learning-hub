import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Calendar, Award, Bookmark, Settings, Zap, Trophy, PenTool } from 'lucide-react';
import BookmarksList from '../components/BookmarksList';
import ProfileSettings from '../components/ProfileSettings';

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('Badges'); // 'Badges', 'Bookmarks', 'Settings'

  const userStats = [
    { label: 'Total XP', value: '2,450' },
    { label: 'Modules Completed', value: '8/12' },
    { label: 'Challenges Won', value: '12' },
    { label: 'Prompts Published', value: '7' },
    { label: 'Average Score', value: '87%' },
    { label: 'Learning Streak', value: '15 days' },
  ];

  const badges = [
    { title: 'First Steps', date: 'Earned Jan 15, 2026', icon: <Award className="w-8 h-8" />, color: 'bg-blue-500' },
    { title: 'Quick Learner', date: 'Earned Jan 18, 2026', icon: <Zap className="w-8 h-8" />, color: 'bg-warning' },
    { title: 'Challenger', date: 'Earned Jan 20, 2026', icon: <Trophy className="w-8 h-8" />, color: 'bg-emerald-500' },
    { title: 'Prompt Master', date: 'Earned Jan 25, 2026', icon: <PenTool className="w-8 h-8" />, color: 'bg-purple-500' },
    { title: 'Contributor', date: 'Earned Feb 1, 2026', icon: <Award className="w-8 h-8" />, color: 'bg-orange-500' },
    { title: 'Perfectionist', date: 'Earned Feb 5, 2026', icon: <Trophy className="w-8 h-8" />, color: 'bg-pink-500' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-primary text-white text-3xl font-bold rounded-full flex items-center justify-center">
            {user?.name?.substring(0, 2).toUpperCase() || 'JD'}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user?.name || 'John Doe'}</h1>
            <p className="text-gray-500 mb-2">{user?.bio || 'Prompt Engineering Enthusiast'}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1"><span className="w-4 h-4 text-gray-400 font-mono">@</span> {user?.email || 'john.doe@example.com'}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-gray-400" /> Joined Jan 10, 2026</span>
            </div>
          </div>
        </div>
        
        <div className="text-center px-8 py-4 bg-gray-50 rounded-xl border border-gray-200">
          <div className="text-xl font-bold text-gray-900 bg-dark text-white px-4 py-1 rounded-md mb-2">Level 5</div>
          <div className="text-sm font-medium text-gray-600">2,450 XP</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {userStats.map((stat, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 p-1 rounded-lg w-full max-w-md mb-6">
        {['Badges', 'Bookmarks', 'Settings'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab ? 'bg-white text-gray-900 shadow' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 min-h-[400px]">
        {activeTab === 'Badges' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Earned Badges</h2>
            <p className="text-sm text-gray-500 mb-8">Your achievements and milestones</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {badges.map((badge, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className={`w-20 h-20 rounded-full ${badge.color} text-white flex items-center justify-center mb-4 shadow-md`}>
                    {badge.icon}
                  </div>
                  <h3 className="font-bold text-gray-900">{badge.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">{badge.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Bookmarks' && <BookmarksList />}
        {activeTab === 'Settings' && <ProfileSettings />}
      </div>
    </div>
  );
};

export default ProfilePage;
