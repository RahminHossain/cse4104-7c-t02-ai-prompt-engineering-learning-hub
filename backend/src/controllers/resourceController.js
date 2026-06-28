const LearningResource = require('../models/LearningResource');
const toObjectId = require('../utils/toObjectId');

const createResource = async (req, res, next) => {
  try {
    const resource = await LearningResource.create({
      ...req.body,
      createdBy: req.user._id,
    });

    return res.status(201).json({ message: 'Resource created', resource });
  } catch (error) {
    return next(error);
  }
};

const listResources = async (req, res, next) => {
  try {
    const resources = await LearningResource.find({ isPublished: true }).populate('createdBy', 'name email role');
    return res.status(200).json({ resources });
  } catch (error) {
    return next(error);
  }
};

const getResourceById = async (req, res, next) => {
  try {
    const resourceId = toObjectId(req.params.id);
    const resource = await LearningResource.findById(resourceId).populate('createdBy', 'name email role');

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    return res.status(200).json({ resource });
  } catch (error) {
    return next(error);
  }
};

const updateResource = async (req, res, next) => {
  try {
    const resourceId = toObjectId(req.params.id);
    const allowedFields = ['title', 'description', 'level', 'category', 'isPublished'];
    const updates = {};

    allowedFields.forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        updates[field] = req.body[field];
      }
    });

    const resource = await LearningResource.findById(resourceId);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    Object.assign(resource, updates);
    await resource.save();

    return res.status(200).json({ message: 'Resource updated', resource });
  } catch (error) {
    return next(error);
  }
};

const deleteResource = async (req, res, next) => {
  try {
    const resourceId = toObjectId(req.params.id);
    const resource = await LearningResource.findByIdAndDelete(resourceId);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    return res.status(200).json({ message: 'Resource deleted' });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createResource,
  listResources,
  getResourceById,
  updateResource,
  deleteResource,
};
