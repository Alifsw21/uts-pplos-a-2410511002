const { config } = require('../config/appConfig');
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token tidak ditemukan' });
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token tidak valid atau kadaluwarsa' });
    }
};

module.exports = authenticateJWT;