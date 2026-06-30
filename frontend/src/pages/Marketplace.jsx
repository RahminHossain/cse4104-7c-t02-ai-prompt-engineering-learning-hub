import { Search, Copy, Download, Heart } from 'lucide-react';

const Marketplace = () => {
  const prompts = [
    {
      id: 1,
      title: "Code Review Expert",
      author: "Alice Chen",
      category: "Development",
      desc: "Comprehensive code review prompt with best practices and security checks",
      tags: ["code", "review", "security"],
      likes: 245,
      downloads: 1250,
      price: "Free"
    },
    {
      id: 2,
      title: "Data Analysis Template",
      author: "Bob Smith",
      category: "Analytics",
      desc: "Structured prompt for analyzing datasets and generating insights",
      tags: ["data", "analysis", "insights"],
      likes: 189,
      downloads: 890,
      price: "Free"
    },
    {
      id: 3,
      title: "Technical Documentation Writer",
      author: "Carol Davis",
      category: "Writing",
      desc: "Create clear, comprehensive technical documentation",
      tags: ["docs", "writing", "technical"],
      likes: 156,
      downloads: 670,
      price: "Free"
    },
    {
      id: 4,
      title: "API Design Assistant",
      author: "David Lee",
      category: "Development",
      desc: "RESTful API design with best practices and OpenAPI specs",
      tags: ["api", "design", "rest"],
      likes: 134,
      downloads: 540,
      price: "Free"
    }
  ];

  const categories = [
    { name: "All", count: 245, active: true },
    { name: "< > Development", count: 89 },
    { name: "📊 Analytics", count: 45 },
    { name: "✍️ Writing", count: 67 },
    { name: "📈 Marketing", count: 34 }
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
            {prompts.map((prompt) => (
              <div key={prompt.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-gray-900">{prompt.title}</h3>
                    <span className="px-2.5 py-0.5 bg-dark text-white text-xs rounded-md">
                      {prompt.category}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{prompt.desc}</p>
                <p className="text-xs text-gray-500 mb-4">by {prompt.author}</p>
                
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
                      <Heart className="w-4 h-4" /> {prompt.likes}
                    </button>
                    <span className="flex items-center gap-1">
                      <Download className="w-4 h-4" /> {prompt.downloads}
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 font-medium text-xs rounded border border-emerald-100">
                      {prompt.price}
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
