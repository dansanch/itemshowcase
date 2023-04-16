const jwt = require('jsonwebtoken');

exports.checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

exports.checkAdmin = (req, res, next) => {
  if (req.userData && req.userData.isAdmin) {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied' });
  }
};
