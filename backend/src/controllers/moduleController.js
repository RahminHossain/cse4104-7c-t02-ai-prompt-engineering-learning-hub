const Module = require('../models/Module');

const getAllModules = async (req, res, next) => {
  try {
    const modules = await Module.find({});
    res.status(200).json({ modules });
  } catch (error) {
    return next(error);
  }
};

const getModuleById = async (req, res, next) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }
    res.status(200).json({ module });
  } catch (error) {
    return next(error);
  }
};

const createModule = async (req, res, next) => {
  try {
    const module = new Module(req.body);
    await module.save();
    res.status(201).json({ message: 'Module created successfully', module });
  } catch (error) {
    return next(error);
  }
};

const updateModule = async (req, res, next) => {
  try {
    const module = await Module.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }
    res.status(200).json({ message: 'Module updated successfully', module });
  } catch (error) {
    return next(error);
  }
};

const deleteModule = async (req, res, next) => {
  try {
    const module = await Module.findByIdAndDelete(req.params.id);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }
    res.status(200).json({ message: 'Module deleted successfully' });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllModules,
  getModuleById,
  createModule,
  updateModule,
  deleteModule
};
