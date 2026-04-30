require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes = require('./routes/user');

app.use(express.json());

app.use('/', userRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Pengguna Service berjalan di port ${PORT}`);
});