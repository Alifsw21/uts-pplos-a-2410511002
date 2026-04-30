const authModel = require('../models/authModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { config } = require('../config/appConfig');

const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role }, config.jwtSecret, { expiresIn: config.jwtRefreshExpiresIn });
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await authModel.findByUsername(username);

        if(!user) {
            return res.status(401).json({
                success: false,
                message: 'User tidak ditemukan',
                data: null
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Password salah',
                data: null
            });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        return res.status(200).json({
            success: true,
            message: 'Login berhasil',
            data: { accessToken, refreshToken }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan',
            data: err.message
        });
    }
};

const refresh = (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Refresh Token diperlukan'
        });
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);

        const newAccessToken = jwt.sign({ id: decoded.id, role: decoded.role }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });

        res.status(200).json({
            success: true,
            message: 'Access Token Baru Berhasil dibuat',
            data: { accessToken: newAccessToken }
        });
    } catch (err) {
        res.status(403).json({
            success: false,
            message: 'Refesh Token tidak valid',
            data: err.message
        });
    }
};

const logout = (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'Logout berhasil.'
    });
};

const googleCallback = (req, res) => {
    const user = req.user;

    const token = jwt.sign(
        { id: user.id, role: user.role },
        config.jwtSecret,
        { expiresIn: config.jwtExpiresIn }
    );

    res.redirect(`http://localhost:3000/login-success?token=${token}`);
};

module.exports = { login, googleCallback, refresh, logout, googleAuth: passport.authenticate('google', { scope: ['profile', 'email']})};