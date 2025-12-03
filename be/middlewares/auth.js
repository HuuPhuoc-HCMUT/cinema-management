const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

const auth = async (req, res, next) => {
  try {
    //get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'No authentication token, access denied' });
    }

    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //get user from database
    const user = await User.findById(decoded.userId, decoded.userType);

    if (!user) {
      return res.status(401).json({ error: 'User not found, authorization denied' });
    }

    //attach user to request
    req.user = {
      userId: user.user_id,
      email: user.email,
      userType: decoded.userType,
      role: user.role || 'customer'
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token is not valid' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired' });
    }
    res.status(500).json({ error: 'Server error in authentication' });
  }
};

//check: user is staff
const isStaff = (req, res, next) => {
  if (req.user.role !== 'staff' && req.user.role !== 'manager') {
    console.log(`Access denied for user ID ${req.user.userId} with role ${req.user.role}. Staff privileges required.`);
    return res.status(403).json({ error: 'Access denied. Staff privileges required.' });
  }
  next();
};

//check: user is manager
const isManager = (req, res, next) => {
  if (req.user.role !== 'manager') {
    console.log(`Access denied for user ID ${req.user.userId} with role ${req.user.role}. Manager privileges required.`);
    return res.status(403).json({ error: 'Access denied. Manager privileges required.' });
  }
  next();
};

module.exports = { auth, isStaff, isManager };
