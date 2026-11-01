const mongoose = require('mongoose');

module.exports = function validateTaskId(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid task ID format' });
  }
  next();
};
