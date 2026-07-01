const mongoose = require('mongoose');

const promptChallengeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 200,
    },
    promptTask: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 3000,
    },
    expectedOutcome: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    time: {
      type: String, // e.g., "15 min"
      default: "15 min",
    },
    attempts: {
      type: Number,
      default: 0,
    },
    successRate: {
      type: String, // e.g., "68%"
      default: "0%",
    },
    xp: {
      type: Number, // e.g., 150
      default: 100,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('PromptChallenge', promptChallengeSchema);
