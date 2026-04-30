const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { config }= require('./appConfig');

passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL
    },
    (accessToken, refreshToken, profile, done) => {
        const user = { id: profile.id, role: 'user', username: profile.displayName };
        return done(null, user);
    }
));

module.exports = passport;