const dotenv = require('dotenv');

dotenv.config();

const mongodbUri = process.env.MONGODB_URI || process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '7d';

if (!mongodbUri) {
  throw new Error('Missing required environment variable: MONGODB_URI or MONGO_URI');
}

if (!jwtSecret) {
  throw new Error('Missing required environment variable: JWT_SECRET');
}

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  mongodbUri,
  jwtSecret,
  jwtExpiresIn,
};
