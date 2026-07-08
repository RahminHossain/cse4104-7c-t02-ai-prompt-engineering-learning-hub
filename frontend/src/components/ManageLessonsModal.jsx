import { useState, useEffect } from 'react';
import { X, Trash2, Plus, BookOpen, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';

const ManageLessonsModal = ({ isOpen, onClose, module, onModuleUpdated }) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLesson, setNewLesson] = useState({ title: '', duration: '', content: '', isQuiz: false });

  useEffect(() => {
    if (module) {
      setLessons(module.lessonList || []);
      setShowAddForm(false);
      setNewLesson({ title: '', duration: '', content: '', isQuiz: false });
    }
  }, [module]);

  if (!isOpen || !module) return null;

  const saveToBackend = async (updatedLessons) => {
    setLoading(true);
    try {
      const { data } = await api.put(`/modules/${module._id}`, { lessonList: updatedLessons });
      toast.success('Lessons updated successfully');
      setLessons(data.module.lessonList || []);
      onModuleUpdated(data.module);
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update lessons');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (indexToDelete) => {
    if (!window.confirm('Are you sure you want to delete this lesson?')) return;
    const updatedLessons = lessons.filter((_, idx) => idx !== indexToDelete);
    await saveToBackend(updatedLessons);
  };

  const handleAddLesson = async (e) => {
    e.preventDefault();
    const updatedLessons = [...lessons, { ...newLesson, status: 'pending' }];
    const success = await saveToBackend(updatedLessons);
    if (success) {
      setShowAddForm(false);
      setNewLesson({ title: '', duration: '', content: '', isQuiz: false });
    }
  };

  const handleMagicGenerate = () => {
    setShowAddForm(true);
    setNewLesson({
      title: 'Advanced AI Techniques (Auto-Generated)',
      duration: '15 min',
      isQuiz: false,
      content: `## Welcome to Advanced Techniques!

This is an automatically generated lesson demonstrating the power of AI prompting.

### Key Concepts
1. **Chain of Thought Reasoning:** Helps models break down complex problems.
2. **Few-Shot Prompting:** Providing examples drastically improves output formatting.
3. **Retrieval-Augmented Generation (RAG):** Grounding models in factual data.

> "The better the context, the better the output." - AI Proverb

Try writing a prompt using these three techniques and see the difference!`
    });
    toast.success('Dummy lesson generated! You can now edit and save it.');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-500" /> Manage Lessons
            </h2>
            <p className="text-sm text-gray-500 mt-1">Module: {module.title}</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleMagicGenerate}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-purple-700 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors shadow-sm"
              title="Magic Generate Dummy Lesson"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI GENERATE</span>
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-900 bg-gray-100 p-1.5 rounded-full"><X className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 bg-gray-50/50">
          {!showAddForm ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">Current Lessons ({lessons.length})</h3>
                <button 
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-dark text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Lesson
                </button>
              </div>

              {lessons.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-xl bg-white">
                  <p className="text-gray-500">No lessons added yet.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {lessons.map((lesson, idx) => (
                    <div key={lesson._id || idx} className="flex justify-between items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                      <div>
                        <h4 className="font-semibold text-gray-900">{lesson.title}</h4>
                        <div className="flex gap-2 text-xs text-gray-500 mt-1">
                          <span className="px-2 py-0.5 bg-gray-100 rounded">{lesson.duration}</span>
                          <span className={`px-2 py-0.5 rounded ${lesson.isQuiz ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                            {lesson.isQuiz ? 'Quiz' : 'Reading'}
                          </span>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDelete(idx)} 
                        disabled={loading}
                        className="p-2 text-gray-400 hover:text-danger hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4 border-b pb-2">Add New Lesson</h3>
              <form onSubmit={handleAddLesson} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Title</label>
                    <input 
                      type="text" 
                      required 
                      value={newLesson.title} 
                      onChange={(e) => setNewLesson({...newLesson, title: e.target.value})} 
                      placeholder="e.g. Introduction to Prompting"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm" 
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <input 
                      type="text" 
                      required 
                      value={newLesson.duration} 
                      onChange={(e) => setNewLesson({...newLesson, duration: e.target.value})} 
                      placeholder="e.g. 10 min"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Content (Markdown/Text)</label>
                  <textarea 
                    required 
                    rows={4} 
                    value={newLesson.content} 
                    onChange={(e) => setNewLesson({...newLesson, content: e.target.value})} 
                    placeholder="Write your lesson content here..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm resize-y" 
                  />
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <input 
                    type="checkbox" 
                    id="isQuiz" 
                    checked={newLesson.isQuiz}
                    onChange={(e) => setNewLesson({...newLesson, isQuiz: e.target.checked})}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="isQuiz" className="text-sm font-medium text-gray-700">This is a Quiz</label>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t mt-4">
                  <button 
                    type="button" 
                    onClick={() => setShowAddForm(false)} 
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={loading} 
                    className="px-4 py-2 text-sm font-medium text-white bg-dark rounded-md hover:bg-gray-800 disabled:opacity-75 transition-colors flex items-center gap-2"
                  >
                    {loading ? 'Saving...' : 'Save Lesson'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageLessonsModal;
