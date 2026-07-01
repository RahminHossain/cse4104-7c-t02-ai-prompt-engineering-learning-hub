import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Users, BookOpen, Trophy, TrendingUp, Search, Plus, Edit, Trash2, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { BarChart3 } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

const AdminPanel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'Users'; // Users, Modules, Marketplace, Analytics
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    activeModules: 0,
    challengesCreated: 0,
    marketplaceItems: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/stats');
        setMetrics(data.metrics);
      } catch (error) {
        toast.error('Failed to load admin stats');
      }
    };
    fetchStats();
  }, []);

  const metricsDisplay = [
    { label: 'Total Users', value: metrics.totalUsers, icon: <Users className="text-blue-500 w-6 h-6" />, color: 'bg-blue-100', trend: '+12%', trendColor: 'text-emerald-500 bg-emerald-50' },
    { label: 'Active Modules', value: metrics.activeModules, icon: <BookOpen className="text-emerald-500 w-6 h-6" />, color: 'bg-emerald-100', trend: '+2', trendColor: 'text-emerald-500 bg-emerald-50' },
    { label: 'Challenges Created', value: metrics.challengesCreated, icon: <Trophy className="text-purple-500 w-6 h-6" />, color: 'bg-purple-100', trend: '+5', trendColor: 'text-emerald-500 bg-emerald-50' },
    { label: 'Marketplace Items', value: metrics.marketplaceItems, icon: <TrendingUp className="text-orange-500 w-6 h-6" />, color: 'bg-orange-100', trend: '+18', trendColor: 'text-emerald-500 bg-emerald-50' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
        <p className="text-gray-600 mt-1">Manage users, content, and platform activities</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metricsDisplay.map((metric, idx) => (
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
            onClick={() => setSearchParams({ tab })}
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
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/users');
      setUsers(data.users);
    } catch (error) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.delete(`/users/${id}`);
      toast.success('User deleted successfully');
      setUsers(users.filter(u => u._id !== id));
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

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
        {loading ? (
          <p className="text-center text-gray-500 py-4">Loading users...</p>
        ) : (
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
              {users.map((user) => (
                <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 pl-4 font-medium text-gray-900">{user.name}</td>
                  <td className="py-4 text-gray-600">{user.email}</td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-md ${user.role === 'admin' ? 'bg-dark text-white' : 'bg-gray-100 text-gray-600'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 text-gray-600">{user.xp || 0}</td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${user.status === 'Active' ? 'bg-dark text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {user.status || 'Active'}
                    </span>
                  </td>
                  <td className="py-4 pr-4">
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-gray-400 hover:text-gray-900"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(user._id)} className="text-gray-400 hover:text-danger"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const ModulesManagement = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/modules');
      setModules(data.modules);
    } catch (error) {
      toast.error('Failed to load modules');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this module?')) return;
    try {
      await api.delete(`/modules/${id}`);
      toast.success('Module deleted successfully');
      setModules(modules.filter(m => m._id !== id));
    } catch (error) {
      toast.error('Failed to delete module');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-900">Learning Modules</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-dark text-white text-sm font-medium rounded-lg hover:bg-gray-800">
          <Plus className="w-4 h-4" /> Create Module
        </button>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-center text-gray-500 py-4">Loading modules...</p>
        ) : modules.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No modules found.</p>
        ) : (
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
              {modules.map((mod) => (
                <tr key={mod._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 pl-4 font-medium text-gray-900">{mod.title}</td>
                  <td className="py-4 text-gray-600">{mod.lessons}</td>
                  <td className="py-4 text-gray-600">{mod.enrollments || 0}</td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${mod.status === 'Published' ? 'bg-dark text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {mod.status}
                    </span>
                  </td>
                  <td className="py-4 pr-4">
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-gray-400 hover:text-gray-900"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(mod._id)} className="text-gray-400 hover:text-danger"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const MarketplaceManagement = () => {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrompts();
  }, []);

  const fetchPrompts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/marketplace');
      setPrompts(data.prompts);
    } catch (error) {
      toast.error('Failed to load marketplace items');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this prompt?')) return;
    try {
      await api.delete(`/marketplace/${id}`);
      toast.success('Prompt deleted successfully');
      setPrompts(prompts.filter(p => p._id !== id));
    } catch (error) {
      toast.error('Failed to delete prompt');
    }
  };

  const handleApprove = async (id) => {
    try {
      await api.put(`/marketplace/${id}`, { status: 'Approved' });
      toast.success('Prompt approved successfully');
      fetchPrompts();
    } catch (error) {
      toast.error('Failed to approve prompt');
    }
  };

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
        {loading ? (
          <p className="text-center text-gray-500 py-4">Loading marketplace items...</p>
        ) : prompts.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No prompts found.</p>
        ) : (
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
              {prompts.map((p) => (
                <tr key={p._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 pl-4 font-medium text-gray-900">{p.title}</td>
                  <td className="py-4 text-gray-600">{p.authorName}</td>
                  <td className="py-4 text-gray-600">{p.likes || 0}</td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${p.status === 'Approved' ? 'bg-dark text-white' : p.status === 'Rejected' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-4 pr-4">
                    <div className="flex items-center justify-end gap-3">
                      {p.status === 'Pending' && (
                        <button onClick={() => handleApprove(p._id)} className="px-3 py-1 bg-dark text-white text-xs font-medium rounded hover:bg-gray-800 transition-colors">
                          Approve
                        </button>
                      )}
                      <button onClick={() => handleDelete(p._id)} className="text-gray-400 hover:text-danger"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const PlatformAnalytics = () => {
  const [engagementData, setEngagementData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/stats');
        setEngagementData(data.engagementData || []);
      } catch (error) {
        toast.error('Failed to load analytics data');
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-xl border border-gray-100 p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-1">User Engagement</h3>
          <p className="text-xs text-gray-500 mb-6">Active users over time</p>
          <div className="h-64">
            {engagementData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dx={-10} />
                  <Tooltip cursor={{ stroke: '#E5E7EB', strokeWidth: 2 }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
               <div className="h-full flex items-center justify-center">
                 <p className="text-gray-400 text-sm">No data available</p>
               </div>
            )}
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
