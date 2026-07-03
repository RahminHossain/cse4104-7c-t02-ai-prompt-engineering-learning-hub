import { useState } from 'react';
import { X, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';

const ChallengeSubmitModal = ({ isOpen, onClose, challenge, onSuccess }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  if (!isOpen || !challenge) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const { data } = await api.post(`/challenges/${challenge._id}/submit`, { prompt });
      setResult(data.evaluation);
      if (data.evaluation?.success) {
        toast.success(`Challenge passed! You earned XP!`);
        if (onSuccess) onSuccess();
      } else {
        toast.error('Challenge failed. Try adjusting your prompt.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit challenge');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPrompt('');
    setResult(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50 shrink-0">
          <h2 className="text-lg font-bold text-gray-900">{challenge.title}</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-900"><X className="w-5 h-5" /></button>
        </div>
        
        <div className="overflow-y-auto p-6 flex-1 space-y-6">
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
            <h3 className="text-sm font-bold text-blue-900 mb-1">Your Task</h3>
            <p className="text-sm text-blue-800">{challenge.promptTask}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-2">Target Output</h3>
            <div className="bg-dark text-emerald-400 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
              {challenge.expectedOutcome}
            </div>
          </div>

          <form id="submit-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Write your prompt to generate the exact Target Output:</label>
              <textarea 
                required 
                rows={4} 
                value={prompt} 
                onChange={(e) => setPrompt(e.target.value)} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary font-mono text-sm resize-none" 
                placeholder="Type your prompt here..." 
              />
            </div>
          </form>

          {result && (
            <div className={`p-4 rounded-lg border ${result.success ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
              <div className="flex items-center gap-2 mb-2">
                {result.success ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-red-600" />}
                <h4 className={`font-bold ${result.success ? 'text-emerald-800' : 'text-red-800'}`}>
                  {result.success ? 'Success! Match Found' : 'Incorrect Output'}
                </h4>
              </div>
              <p className={`text-sm ${result.success ? 'text-emerald-700' : 'text-red-700'}`}>{result.feedback}</p>
              {!result.success && (
                <div className="mt-3 p-3 bg-white rounded border border-red-100 text-xs font-mono text-red-800 whitespace-pre-wrap">
                  Score: {result.score}/100
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
          <button type="button" onClick={handleClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
          <button type="submit" form="submit-form" disabled={loading} className="px-6 py-2 flex items-center gap-2 text-sm font-medium text-white bg-dark rounded-md hover:bg-gray-800 disabled:opacity-75">
            {loading ? 'Evaluating...' : <><Send className="w-4 h-4" /> Submit Solution</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeSubmitModal;
