const PromptChallenge = require('../models/PromptChallenge');
const User = require('../models/User');
const toObjectId = require('../utils/toObjectId');
const { checkChallenge } = require('../services/aiService');

const createChallenge = async (req, res, next) => {
  try {
    const challenge = await PromptChallenge.create({
      ...req.body,
      createdBy: req.user._id,
    });

    return res.status(201).json({ message: 'Challenge created', challenge });
  } catch (error) {
    return next(error);
  }
};

const listChallenges = async (req, res, next) => {
  try {
    const challenges = await PromptChallenge.find().populate('createdBy', 'name email role');
    return res.status(200).json({ challenges });
  } catch (error) {
    return next(error);
  }
};

const getChallengeById = async (req, res, next) => {
  try {
    const challengeId = toObjectId(req.params.id);
    const challenge = await PromptChallenge.findById(challengeId).populate('createdBy', 'name email role');

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    return res.status(200).json({ challenge });
  } catch (error) {
    return next(error);
  }
};

const updateChallenge = async (req, res, next) => {
  try {
    const challengeId = toObjectId(req.params.id);
    const allowedFields = ['title', 'promptTask', 'expectedOutcome', 'difficulty'];
    const updates = {};

    allowedFields.forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        updates[field] = req.body[field];
      }
    });

    const challenge = await PromptChallenge.findById(challengeId);

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    Object.assign(challenge, updates);
    await challenge.save();

    return res.status(200).json({ message: 'Challenge updated', challenge });
  } catch (error) {
    return next(error);
  }
};

const deleteChallenge = async (req, res, next) => {
  try {
    const challengeId = toObjectId(req.params.id);
    const challenge = await PromptChallenge.findByIdAndDelete(challengeId);

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    return res.status(200).json({ message: 'Challenge deleted' });
  } catch (error) {
    return next(error);
  }
};

const submitChallenge = async (req, res, next) => {
  try {
    const challengeId = toObjectId(req.params.id);
    const { prompt } = req.body;
    
    if (!prompt) return res.status(400).json({ message: 'Prompt is required' });

    const challenge = await PromptChallenge.findById(challengeId);
    if (!challenge) return res.status(404).json({ message: 'Challenge not found' });

    // Call AI Service
    const evaluation = await checkChallenge(prompt, challenge.expectedOutcome);

    // If successful, award XP
    if (evaluation.success) {
      const xpToAward = challenge.xp || 100;
      await User.findByIdAndUpdate(req.user._id, { $inc: { xp: xpToAward } });
      
      // We could also record this attempt in a submission table, but for now we just increment attempts/successes
      challenge.attempts = (challenge.attempts || 0) + 1;
      const successes = (challenge.successes || 0) + 1;
      challenge.successes = successes;
      challenge.successRate = Math.round((successes / challenge.attempts) * 100) + '%';
      await challenge.save();
    } else {
      challenge.attempts = (challenge.attempts || 0) + 1;
      const successes = challenge.successes || 0;
      challenge.successRate = Math.round((successes / challenge.attempts) * 100) + '%';
      await challenge.save();
    }

    return res.status(200).json({ evaluation });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createChallenge,
  listChallenges,
  getChallengeById,
  updateChallenge,
  deleteChallenge,
  submitChallenge,
};
