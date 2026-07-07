import { useState } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';
import { useSelector } from 'react-redux';

const PublishPromptModal = ({ isOpen, onClose, onPromptAdded }) => {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ title: '', description: '', promptText: '', tags: '' });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dataToSubmit = {
        title: formData.title,
        desc: formData.description,
        promptText: formData.promptText,
        tags: formData.tags.split(',').map(t => t.trim()),
        authorName: user?.name || 'Anonymous',
        category: 'General'
      };
      const { data } = await api.post('/marketplace', dataToSubmit);
      toast.success('Prompt published! Waiting for admin approval.');
      if (onPromptAdded) onPromptAdded(data.prompt);
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to publish prompt');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50 shrink-0">
          <h2 className="text-lg font-bold text-gray-900">Publish to Marketplace</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900"><X className="w-5 h-5" /></button>
        </div>
        <div className="overflow-y-auto p-6 flex-1">
          <form id="publish-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm" placeholder="e.g. SEO Content Generator" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input type="text" required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm" placeholder="Briefly describe what this prompt does" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">The Prompt</label>
              <textarea required rows={5} value={formData.promptText} onChange={(e) => setFormData({...formData, promptText: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary font-mono text-sm resize-none" placeholder="Paste your prompt here..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
              <input type="text" required value={formData.tags} onChange={(e) => setFormData({...formData, tags: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm" placeholder="Marketing, SEO, Writing" />
            </div>
          </form>
        </div>
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
          <button type="submit" form="publish-form" disabled={loading} className="px-4 py-2 text-sm font-medium text-white bg-dark rounded-md hover:bg-gray-800 disabled:opacity-75">{loading ? 'Publishing...' : 'Publish Prompt'}</button>
        </div>
      </div>
    </div>
  );
};

export default PublishPromptModal;
