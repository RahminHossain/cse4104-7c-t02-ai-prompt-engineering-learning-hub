const mongoose = require('mongoose');

const promptChallengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  promptTask: {
    type: String,
    required: [true, 'Prompt task is required']
  },
  expectedOutcome: {
    type: String,
    required: [true, 'Expected outcome is required']
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Links back to the User collection
    required: true
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('PromptChallenge', promptChallengeSchema);