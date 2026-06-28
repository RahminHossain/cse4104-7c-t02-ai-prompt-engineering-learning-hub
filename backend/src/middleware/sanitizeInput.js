const sanitizeObject = (value) => {
  if (Array.isArray(value)) {
    value.forEach((item) => sanitizeObject(item));
    return;
  }

  if (!value || typeof value !== 'object') {
    return;
  }

  Object.keys(value).forEach((key) => {
    if (key.startsWith('$') || key.includes('.')) {
      delete value[key];
      return;
    }

    sanitizeObject(value[key]);
  });
};

const sanitizeInput = (req, res, next) => {
  sanitizeObject(req.body);
  sanitizeObject(req.params);
  sanitizeObject(req.query);
  next();
};

module.exports = sanitizeInput;
