const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  prompt: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prompt', // Links to the specific prompt submitted
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100 // Example: AI grades the prompt out of 100
  },
  feedback: {
    type: String,
    required: [true, 'AI feedback is required']
  },
  optimizedPrompt: {
    type: String,
    required: true
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Evaluation', evaluationSchema);