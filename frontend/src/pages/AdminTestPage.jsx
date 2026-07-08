import { useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

const AdminTestPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSeed = async () => {
    setLoading(true);
    try {
      const response = await api.post('/admin/seed');
      toast.success(response.data.message || 'Database seeded successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to seed database');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Test Tools</h1>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          This is a hidden admin tool used for testing on different hosts. 
          Click the button below to execute the backend seed script and populate the database with dummy data.
        </p>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8 text-orange-800 text-sm max-w-xl mx-auto">
          <strong>Warning:</strong> Running this will delete all current data (including users, modules, and challenges) and reset the database to the initial seed state. You will be logged out because your session will become invalid.
        </div>
        
        <button
          onClick={handleSeed}
          disabled={loading}
          className="px-6 py-3 bg-dark text-white rounded-lg font-medium hover:bg-gray-800 disabled:opacity-75 transition-colors shadow-sm"
        >
          {loading ? 'Running Seed Script...' : 'Run Seed Script Now'}
        </button>
      </div>
    </div>
  );
};

export default AdminTestPage;
