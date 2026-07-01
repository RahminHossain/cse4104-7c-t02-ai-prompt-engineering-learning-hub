const User = require('../models/User');
const Module = require('../models/Module');
const MarketplacePrompt = require('../models/MarketplacePrompt');
const PromptChallenge = require('../models/PromptChallenge');

const getStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeModules = await Module.countDocuments({ status: 'Published' });
    const challengesCreated = await PromptChallenge.countDocuments();
    const marketplaceItems = await MarketplacePrompt.countDocuments();

    // Mock engagement data for now, ideally this would be aggregated from analytics models
    const engagementData = [
      { name: 'Mon', users: 400 },
      { name: 'Tue', users: 300 },
      { name: 'Wed', users: 550 },
      { name: 'Thu', users: 450 },
      { name: 'Fri', users: 700 },
      { name: 'Sat', users: 600 },
      { name: 'Sun', users: 800 },
    ];

    res.status(200).json({
      metrics: {
        totalUsers,
        activeModules,
        challengesCreated,
        marketplaceItems,
      },
      engagementData
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getStats
};
