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
