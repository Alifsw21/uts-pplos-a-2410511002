const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { config }= require('./appConfig');
const axios = require('axios');

passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL
    },
    async (accessToken, refreshToken, profile, done) => {
        try {

            const PENGGUNA_SERVICE_URL = process.env.PENGGUNA_SERVICE_URL || 'http://localhost:3002';

            const response = await axios.post(`${PENGGUNA_SERVICE_URL}/internal/find-or-create`, {
                profile: {
                    id: profile.id,
                    displayName: profile.displayName,
                    email: profile.emails[0].value,
                    photo: profile.photos[0].value
                },
                provider: 'google'
            }, {
                headers: { Authorization: `Bearer ${process.env.INTERNAL_SERVICE_TOKEN}`}
            });

            const user = response.data.data;
            return done(null, user);
        } catch (err) {
            return done(err, null)
        } 
    }
));

module.exports = passport;