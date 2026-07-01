import { useState, useEffect } from 'react';
import { Trophy, Target, TrendingUp, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

const Challenges = () => {
  const [challengesList, setChallengesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const { data } = await api.get('/challenges');
        setChallengesList(data.challenges);
      } catch (error) {
        toast.error('Failed to load challenges');
      } finally {
        setLoading(false);
      }
    };
    fetchChallenges();
  }, []);

  // Mock leaderboard for now
  const leaderboard = [
    { rank: 1, name: "Alice Chen", xp: 4850, badges: 12 },
    { rank: 2, name: "Bob Smith", xp: 4720, badges: 11 },
    { rank: 3, name: "Carol Davis", xp: 4680, badges: 10 },
    { rank: 4, name: "You (Student)", xp: 2450, badges: 5, isUser: true },
    { rank: 5, name: "Eve Wilson", xp: 2380, badges: 5 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Reverse Engineering Challenges</h1>
        <p className="text-gray-600 mt-1">Test your skills by engineering prompts to match target outputs</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <MetricCard icon={<Trophy className="text-warning" />} value="0" label="Challenges Won" />
        <MetricCard icon={<Target className="text-blue-500" />} value="0" label="Total Attempts" />
        <MetricCard icon={<TrendingUp className="text-emerald-500" />} value="0%" label="Success Rate" />
        <MetricCard icon={<CheckCircle2 className="text-purple-500" />} value="#4" label="Global Rank" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Active Challenges */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex gap-4 mb-2">
            <button className="px-4 py-1 bg-dark text-white text-sm font-medium rounded-full">Active Challenges</button>
            <button className="px-4 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm font-medium rounded-full transition-colors">Completed</button>
          </div>

          {loading ? (
            <p className="text-gray-500 py-4 text-center">Loading challenges...</p>
          ) : challengesList.length === 0 ? (
            <p className="text-gray-500 py-4 text-center">No challenges available.</p>
          ) : (
            challengesList.map((challenge) => (
              <div key={challenge._id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{challenge.title}</h3>
                  <span className="px-3 py-1 bg-warning/10 text-warning text-xs font-bold rounded-full">
                    +{challenge.xp || 100} XP
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{challenge.promptTask}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-6">
                  <span className={`px-2 py-1 rounded font-medium capitalize ${
                    challenge.difficulty === 'easy' ? 'bg-emerald-100 text-emerald-700' :
                    challenge.difficulty === 'medium' ? 'bg-blue-100 text-blue-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {challenge.difficulty}
                  </span>
                  <span className="flex items-center gap-1"><Target className="w-3 h-3" /> {challenge.time || '15 min'}</span>
                  <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> {challenge.attempts || 0} attempts &bull; {challenge.successRate || '0%'} success</span>
                </div>

                <Link to={`/playground?challengeId=${challenge._id}`} className="block w-full text-center py-2.5 bg-dark text-white font-medium rounded-lg text-sm hover:bg-gray-800 transition-colors">
                  Start Challenge
                </Link>
              </div>
            ))
          )}

          {/* How Challenges Work */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mt-8">
            <h3 className="font-bold text-gray-900 mb-4">How Challenges Work</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Target Output:</p>
                <div className="bg-dark text-emerald-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                  {`{\n  "name": "John Doe",\n  "role": "Engineer",\n  "skills": ["Python", "JavaScript", "AI"]\n}`}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Your Task:</p>
                <div className="bg-white border border-gray-200 p-4 rounded-lg text-gray-400 text-sm">
                  Write a prompt that generates the exact output above...
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                <strong>Goal:</strong> Create a prompt that produces the exact target output. The AI will compare your result with the target and score your accuracy.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          
          {/* Leaderboard */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Leaderboard</h2>
            <p className="text-sm text-gray-500 mb-6">Top performers this month</p>
            
            <div className="space-y-4">
              {leaderboard.map((user) => (
                <div key={user.rank} className={`flex items-center gap-3 p-3 rounded-lg ${user.isUser ? 'bg-blue-50 border border-blue-100' : ''}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                    user.rank === 1 ? 'bg-warning' : 
                    user.rank === 2 ? 'bg-gray-400' : 
                    user.rank === 3 ? 'bg-orange-400' : 'bg-primary'
                  }`}>
                    {user.rank}
                  </div>
                  <div className="flex-grow">
                    <p className={`text-sm font-bold ${user.isUser ? 'text-primary' : 'text-gray-900'}`}>{user.name}</p>
                    <p className="text-xs text-gray-500">{user.xp} XP &bull; {user.badges} badges</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Challenge Tips */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Challenge Tips</h2>
            <ul className="space-y-3 text-sm text-gray-700 list-disc pl-5">
              <li>Analyze the target output structure carefully</li>
              <li>Use clear, specific instructions</li>
              <li>Test your prompt in the playground first</li>
              <li>Pay attention to formatting details</li>
            </ul>
          </div>

          {/* Rewards */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Rewards</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-700">Perfect Score (100)</span>
                <span className="px-2 py-1 bg-warning text-white text-xs font-bold rounded-full">+50 XP Bonus</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-700">First Attempt Win</span>
                <span className="px-2 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">+25 XP Bonus</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-700">Speed Bonus (&lt;5 min)</span>
                <span className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">+15 XP Bonus</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ icon, value, label }) => (
  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
    <div className="mb-2">{icon}</div>
    <div className="text-2xl font-bold text-gray-900">{value}</div>
    <div className="text-xs font-medium text-gray-500 uppercase">{label}</div>
  </div>
);

export default Challenges;
