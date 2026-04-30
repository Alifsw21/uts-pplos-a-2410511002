const express = require('express');
const passport = require('../config/passport');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/login', authController.login);

router.post('/refresh', authController.refresh);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false }),
    authController.googleCallback
);

module.exports = router;