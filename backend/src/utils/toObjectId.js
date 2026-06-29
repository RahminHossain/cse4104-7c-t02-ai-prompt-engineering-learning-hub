const mongoose = require('mongoose');

const toObjectId = (value) => new mongoose.Types.ObjectId(value);

module.exports = toObjectId;
