const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];


  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const requestDeviceId = req.headers['device-id'];

    console.log(requestDeviceId)
    console.log(decoded)

    if (decoded.deviceId !== requestDeviceId) {
        return res.status(403).json({ message: 'Token is not valid for this device' });
      }
    
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticateToken;
