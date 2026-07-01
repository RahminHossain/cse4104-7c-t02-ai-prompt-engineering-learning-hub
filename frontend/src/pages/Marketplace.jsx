import { useState, useEffect } from 'react';
import { Search, Copy, Download, Heart } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

const Marketplace = () => {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const { data } = await api.get('/marketplace');
        // Only show approved prompts to regular users
        const approvedPrompts = data.prompts.filter(p => p.status === 'Approved');
        setPrompts(approvedPrompts);
      } catch (error) {
        toast.error('Failed to load marketplace items');
      } finally {
        setLoading(false);
      }
    };
    fetchPrompts();
  }, []);

  const categories = [
    { name: "All", count: prompts.length, active: true },
    { name: "< > Development", count: prompts.filter(p => p.category === 'Development').length },
    { name: "📊 Analytics", count: prompts.filter(p => p.category === 'Analytics').length },
    { name: "✍️ Writing", count: prompts.filter(p => p.category === 'Writing').length },
    { name: "📈 Marketing", count: prompts.filter(p => p.category === 'Marketing').length }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Prompt Marketplace</h1>
        <p className="text-gray-600 mt-1">Discover, share, and export enterprise-grade prompts from the community</p>
      </div>

      {/* Search and Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <div className="relative w-full sm:max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search prompts..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all shadow-sm"
          />
        </div>
        <button className="w-full sm:w-auto px-6 py-2.5 bg-dark text-white font-medium rounded-lg hover:bg-gray-800 transition-colors shrink-0">
          Publish Prompt
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-64 shrink-0 space-y-8">
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
            <div className="space-y-1.5">
              {categories.map((cat, idx) => (
                <button 
                  key={idx} 
                  className={`w-full flex justify-between items-center px-3 py-2 rounded-md text-sm transition-colors ${
                    cat.active ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="bg-white border border-gray-200 px-2 py-0.5 rounded text-xs text-gray-500">
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {['code', 'data', 'writing', 'api', 'sql', 'seo', 'review', 'analysis'].map(tag => (
                <span key={tag} className="px-2.5 py-1 bg-gray-50 border border-gray-200 text-gray-600 text-xs rounded-md cursor-pointer hover:bg-gray-100 transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Main Feed */}
        <div className="flex-grow">
          {/* Tabs */}
          <div className="flex gap-6 border-b border-gray-200 mb-6">
            {['Trending', 'Recent', 'Top Rated', 'My Prompts'].map((tab, idx) => (
              <button 
                key={idx}
                className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                  idx === 0 ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {loading ? (
              <p className="text-gray-500 py-4 text-center">Loading prompts...</p>
            ) : prompts.length === 0 ? (
              <p className="text-gray-500 py-4 text-center">No prompts found in the marketplace.</p>
            ) : (
              prompts.map((prompt) => (
                <div key={prompt._id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-gray-900">{prompt.title}</h3>
                      <span className="px-2.5 py-0.5 bg-dark text-white text-xs rounded-md">
                        {prompt.category}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">{prompt.desc}</p>
                  <p className="text-xs text-gray-500 mb-4">by {prompt.authorName}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {prompt.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-50 border border-gray-100 text-gray-500 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <button className="flex items-center gap-1 hover:text-gray-900 transition-colors">
                        <Heart className="w-4 h-4" /> {prompt.likes || 0}
                      </button>
                      <span className="flex items-center gap-1">
                        <Download className="w-4 h-4" /> {prompt.downloads || 0}
                      </span>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 font-medium text-xs rounded border border-emerald-100">
                        {prompt.price || 'Free'}
                      </span>
                    </div>
                    
                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                        <Copy className="w-4 h-4" /> Copy
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-dark text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                        <Download className="w-4 h-4" /> Export
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
