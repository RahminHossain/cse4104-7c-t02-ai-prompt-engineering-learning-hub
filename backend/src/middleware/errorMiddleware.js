const { ValidationError } = require('mongoose').Error;

const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Invalid token' });
  }

  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ message: 'Token expired' });
  }

  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    return res.status(409).json({ message: `${field} already exists` });
  }

  if (error instanceof ValidationError) {
    return res.status(400).json({ message: error.message });
  }

  const statusCode = error.statusCode || 500;
  return res.status(statusCode).json({ message: error.message || 'Internal server error' });
};

module.exports = errorHandler;
