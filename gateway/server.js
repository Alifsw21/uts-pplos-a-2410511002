require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/auth', createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
    changeOrigin: true
}));

app.use('/users', createProxyMiddleware({
    target: process.env.PENGGUNA_SERVICE_URL || 'http://localhost:3002',
    changeOrigin: true
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API Gateway berjalan di port ${PORT}`);
    console.log(`- Auth Service proxy: http://localhost:${PORT}/auth -> Port 3001`);
    console.log(`- Pengguna Service proxy: http://localhost:${PORT}/users -> Port: 3002`);
});