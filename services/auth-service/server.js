require('dotenv').config();
const express = require('express');
const passport = require('./config/passport');
const authRoutes = require('./routes/auth');
const app = express();

app.use(express.json());
app.use(passport.initialize());

app.use('/', authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Auth Service berjalan di port ${PORT}`);
});