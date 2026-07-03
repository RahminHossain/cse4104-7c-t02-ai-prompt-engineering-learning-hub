const { evaluatePrompt } = require('../services/aiService');

exports.evaluate = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ message: 'Prompt is required' });

    const evaluation = await evaluatePrompt(prompt);
    res.json(evaluation);
  } catch (error) {
    console.error('AI Eval Error:', error);
    res.status(500).json({ message: error.message || 'Error evaluating prompt' });
  }
};
