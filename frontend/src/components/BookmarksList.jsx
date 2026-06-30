import { Bookmark, Eye } from 'lucide-react';

const BookmarksList = () => {
  const bookmarks = [
    { title: 'Code Review Prompt', category: 'Development', votes: 45 },
    { title: 'Data Analysis Template', category: 'Analytics', votes: 32 },
    { title: 'Creative Writing Helper', category: 'Writing', votes: 28 },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Bookmarked Prompts</h2>
      <p className="text-sm text-gray-500 mb-6">Prompts you've saved for later reference</p>

      <div className="space-y-4">
        {bookmarks.map((bookmark, idx) => (
          <div key={idx} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors">
            <div>
              <h3 className="font-semibold text-gray-900">{bookmark.title}</h3>
              <span className="inline-block mt-2 px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                {bookmark.category}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">{bookmark.votes} votes</span>
              <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-md text-sm font-medium hover:bg-gray-50">
                <Eye className="w-4 h-4" /> View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookmarksList;
