const express = require('express');
const passport = require('../config/passport');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/login', authController.login);

router.post('/refresh', authController.refresh);

router.post('/logout', authController.logout);

router.get('/google', authController.googleAuth);

router.get('/google/callback', passport.authenticate('google', { session: false }),
    authController.googleCallback
);

module.exports = router;