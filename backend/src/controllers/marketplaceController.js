const MarketplacePrompt = require('../models/MarketplacePrompt');

const getAllPrompts = async (req, res, next) => {
  try {
    const prompts = await MarketplacePrompt.find({}).populate('createdBy', 'name');
    res.status(200).json({ prompts });
  } catch (error) {
    return next(error);
  }
};

const getPromptById = async (req, res, next) => {
  try {
    const prompt = await MarketplacePrompt.findById(req.params.id).populate('createdBy', 'name');
    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }
    res.status(200).json({ prompt });
  } catch (error) {
    return next(error);
  }
};

const createPrompt = async (req, res, next) => {
  try {
    const prompt = new MarketplacePrompt({ ...req.body, createdBy: req.user._id });
    await prompt.save();
    res.status(201).json({ message: 'Prompt created successfully', prompt });
  } catch (error) {
    return next(error);
  }
};

const updatePrompt = async (req, res, next) => {
  try {
    const prompt = await MarketplacePrompt.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }
    res.status(200).json({ message: 'Prompt updated successfully', prompt });
  } catch (error) {
    return next(error);
  }
};

const deletePrompt = async (req, res, next) => {
  try {
    const prompt = await MarketplacePrompt.findByIdAndDelete(req.params.id);
    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }
    res.status(200).json({ message: 'Prompt deleted successfully' });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllPrompts,
  getPromptById,
  createPrompt,
  updatePrompt,
  deletePrompt
};
