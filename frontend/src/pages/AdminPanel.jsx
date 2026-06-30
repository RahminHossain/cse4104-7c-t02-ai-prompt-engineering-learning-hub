import { useState } from 'react';
import { Users, BookOpen, Trophy, TrendingUp, Search, Plus, Edit, Trash2, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('Users'); // Users, Modules, Marketplace, Analytics

  const metrics = [
    { label: 'Total Users', value: '2,458', icon: <Users className="text-blue-500 w-6 h-6" />, color: 'bg-blue-100', trend: '+12%', trendColor: 'text-emerald-500 bg-emerald-50' },
    { label: 'Active Modules', value: '12', icon: <BookOpen className="text-emerald-500 w-6 h-6" />, color: 'bg-emerald-100', trend: '+2', trendColor: 'text-emerald-500 bg-emerald-50' },
    { label: 'Challenges Created', value: '45', icon: <Trophy className="text-purple-500 w-6 h-6" />, color: 'bg-purple-100', trend: '+5', trendColor: 'text-emerald-500 bg-emerald-50' },
    { label: 'Marketplace Items', value: '234', icon: <TrendingUp className="text-orange-500 w-6 h-6" />, color: 'bg-orange-100', trend: '+18', trendColor: 'text-emerald-500 bg-emerald-50' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
        <p className="text-gray-600 mt-1">Manage users, content, and platform activities</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-lg ${metric.color} flex items-center justify-center`}>
                {metric.icon}
              </div>
              <span className={`px-2 py-1 text-xs font-bold rounded-full ${metric.trendColor}`}>
                {metric.trend}
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</p>
            <p className="text-sm font-medium text-gray-500">{metric.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 p-1 rounded-lg w-full max-w-[400px] mb-6 overflow-x-auto">
        {['Users', 'Modules', 'Marketplace', 'Analytics'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === tab ? 'bg-white text-gray-900 shadow' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        {activeTab === 'Users' && <UserManagement />}
        {activeTab === 'Modules' && <ModulesManagement />}
        {activeTab === 'Marketplace' && <MarketplaceManagement />}
        {activeTab === 'Analytics' && <PlatformAnalytics />}
      </div>
    </div>
  );
};

const UserManagement = () => {
  const users = [
    { name: 'Alice Chen', email: 'alice@example.com', role: 'Student', xp: '4,850', status: 'Active' },
    { name: 'Bob Smith', email: 'bob@example.com', role: 'Student', xp: '4,720', status: 'Active' },
    { name: 'Carol Davis', email: 'carol@example.com', role: 'Student', xp: '4,680', status: 'Active' },
    { name: 'David Lee', email: 'david@example.com', role: 'Admin', xp: '2,340', status: 'Active' },
    { name: 'Eve Wilson', email: 'eve@example.com', role: 'Student', xp: '2,380', status: 'Inactive' },
  ];

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-lg font-bold text-gray-900">User Management</h2>
        <div className="flex gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search users..." className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-dark text-white text-sm font-medium rounded-lg hover:bg-gray-800 shrink-0">
            <Plus className="w-4 h-4" /> Add User
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-sm text-gray-500 font-medium">
              <th className="pb-3 pl-4">Name</th>
              <th className="pb-3">Email</th>
              <th className="pb-3">Role</th>
              <th className="pb-3">XP</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right pr-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {users.map((user, idx) => (
              <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 pl-4 font-medium text-gray-900">{user.name}</td>
                <td className="py-4 text-gray-600">{user.email}</td>
                <td className="py-4">
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-md ${user.role === 'Admin' ? 'bg-dark text-white' : 'bg-gray-100 text-gray-600'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-4 text-gray-600">{user.xp}</td>
                <td className="py-4">
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${user.status === 'Active' ? 'bg-dark text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-4 pr-4">
                  <div className="flex items-center justify-end gap-3">
                    <button className="text-gray-400 hover:text-gray-900"><Edit className="w-4 h-4" /></button>
                    <button className="text-gray-400 hover:text-danger"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ModulesManagement = () => {
  const modules = [
    { title: 'Zero-Shot Prompting', lessons: 6, enrollments: '1,245', status: 'Published' },
    { title: 'Few-Shot Learning', lessons: 7, enrollments: '1,089', status: 'Published' },
    { title: 'Chain-of-Thought', lessons: 8, enrollments: '956', status: 'Published' },
    { title: 'Role-play Techniques', lessons: 6, enrollments: '0', status: 'Draft' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-900">Learning Modules</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-dark text-white text-sm font-medium rounded-lg hover:bg-gray-800">
          <Plus className="w-4 h-4" /> Create Module
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-sm text-gray-500 font-medium">
              <th className="pb-3 pl-4">Title</th>
              <th className="pb-3">Lessons</th>
              <th className="pb-3">Enrollments</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right pr-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {modules.map((mod, idx) => (
              <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 pl-4 font-medium text-gray-900">{mod.title}</td>
                <td className="py-4 text-gray-600">{mod.lessons}</td>
                <td className="py-4 text-gray-600">{mod.enrollments}</td>
                <td className="py-4">
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${mod.status === 'Published' ? 'bg-dark text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {mod.status}
                  </span>
                </td>
                <td className="py-4 pr-4">
                  <div className="flex items-center justify-end gap-3">
                    <button className="text-gray-400 hover:text-gray-900"><Edit className="w-4 h-4" /></button>
                    <button className="text-gray-400 hover:text-danger"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const MarketplaceManagement = () => {
  const prompts = [
    { title: 'Code Review Expert', author: 'Alice Chen', votes: 245, status: 'Approved' },
    { title: 'Data Analysis Template', author: 'Bob Smith', votes: 189, status: 'Approved' },
    { title: 'Content Strategy', author: 'Carol Davis', votes: 98, status: 'Pending' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-900">Marketplace Management</h2>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search prompts..." className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-sm text-gray-500 font-medium">
              <th className="pb-3 pl-4">Title</th>
              <th className="pb-3">Author</th>
              <th className="pb-3">Votes</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right pr-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {prompts.map((p, idx) => (
              <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 pl-4 font-medium text-gray-900">{p.title}</td>
                <td className="py-4 text-gray-600">{p.author}</td>
                <td className="py-4 text-gray-600">{p.votes}</td>
                <td className="py-4">
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${p.status === 'Approved' ? 'bg-dark text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {p.status}
                  </span>
                </td>
                <td className="py-4 pr-4">
                  <div className="flex items-center justify-end gap-3">
                    {p.status === 'Pending' && (
                      <button className="px-3 py-1 bg-dark text-white text-xs font-medium rounded hover:bg-gray-800 transition-colors">
                        Approve
                      </button>
                    )}
                    <button className="text-gray-400 hover:text-danger"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PlatformAnalytics = () => {
  const engagementData = [
    { name: 'Mon', users: 400 },
    { name: 'Tue', users: 300 },
    { name: 'Wed', users: 550 },
    { name: 'Thu', users: 450 },
    { name: 'Fri', users: 700 },
    { name: 'Sat', users: 600 },
    { name: 'Sun', users: 800 },
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-xl border border-gray-100 p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-1">User Engagement</h3>
          <p className="text-xs text-gray-500 mb-6">Active users over time</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dx={-10} />
                <Tooltip cursor={{ stroke: '#E5E7EB', strokeWidth: 2 }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl border border-gray-100 p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-1">Module Completion</h3>
          <p className="text-xs text-gray-500 mb-6">Completion rates by module</p>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
            <div className="text-center text-gray-400">
              <BarChart3 className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <span className="text-sm">Chart visualization would appear here</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl border border-gray-100 p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-1">Challenge Performance</h3>
          <p className="text-xs text-gray-500 mb-6">Success rates and attempts</p>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
            <div className="text-center text-gray-400">
              <BarChart3 className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <span className="text-sm">Chart visualization would appear here</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl border border-gray-100 p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-1">Marketplace Activity</h3>
          <p className="text-xs text-gray-500 mb-6">Downloads and uploads</p>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
            <div className="text-center text-gray-400">
              <BarChart3 className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <span className="text-sm">Chart visualization would appear here</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
