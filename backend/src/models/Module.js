const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      required: true,
    },
    lessons: {
      type: Number,
      required: true,
    },
    lessonList: [
      {
        title: { type: String, required: true },
        duration: { type: String, required: true },
        status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
        content: { type: String }, // Actual lesson markdown/content
        isQuiz: { type: Boolean, default: false }
      }
    ],
    time: {
      type: String, // e.g. "45 min", "1.5 hours"
      required: true,
    },
    status: {
      type: String,
      enum: ['Published', 'Draft'],
      default: 'Draft',
    },
    enrollments: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Module', moduleSchema);
