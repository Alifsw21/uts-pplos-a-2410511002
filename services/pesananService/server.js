require('dotenv').config();
const express = require('express');
const app = express();
const orderRoutes = require('./routes/order');

app.use(express.json());

app.use('/', orderRoutes);

const PORT = process.env.DB_PORT || 3003;
app.listen(PORT, () => {
    console.log(`Pesanan Service perjalan di port ${PORT}`);
});