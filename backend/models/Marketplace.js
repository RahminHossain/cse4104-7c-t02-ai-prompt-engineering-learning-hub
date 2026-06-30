const mongoose = require('mongoose');

const marketplaceSchema = new mongoose.Schema({
  sharedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  originalPrompt: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prompt',
    required: true
  },
  title: {
    type: String,
    required: [true, 'A title is required for the marketplace listing']
  },
  description: {
    type: String,
    required: true
  },
  upvotes: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String // e.g., ['coding', 'creative-writing', 'marketing']
  }]
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Marketplace', marketplaceSchema);