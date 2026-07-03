const Setting = require('../models/Setting');

// Get all settings or a specific setting
exports.getSettings = async (req, res) => {
  try {
    const { key } = req.query;
    if (key) {
      const setting = await Setting.findOne({ key });
      return res.json({ [key]: setting ? setting.value : null });
    }
    const settings = await Setting.find();
    const settingsObj = {};
    settings.forEach(s => settingsObj[s.key] = s.value);
    res.json(settingsObj);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching settings' });
  }
};

// Update a setting
exports.updateSetting = async (req, res) => {
  try {
    const { key, value } = req.body;
    if (!key || value === undefined) {
      return res.status(400).json({ message: 'Key and value are required' });
    }
    const setting = await Setting.findOneAndUpdate(
      { key },
      { value },
      { new: true, upsert: true }
    );
    res.json({ message: 'Setting updated successfully', setting });
  } catch (error) {
    res.status(500).json({ message: 'Server error updating setting' });
  }
};
