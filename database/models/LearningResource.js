const mongoose = require('mongoose');

const learningResourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This creates the foreign key relationship
    required: true
  },
  isPublished: {
    type: Boolean,
    default: false
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('LearningResource', learningResourceSchema);