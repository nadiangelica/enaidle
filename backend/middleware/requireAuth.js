const jwt = require('jsonwebtoken');
const User = require('../models/orgUserModel');

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  const user_id = req.header('User-Id');

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    if (_id.toString() !== user_id) {
      return res.status(401).json({ error: 'User ID mismatch' });
    }

    req.user = await User.findOne({ _id }).select('_id');
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Request is not authorized' });
  }
};

module.exports = requireAuth;
