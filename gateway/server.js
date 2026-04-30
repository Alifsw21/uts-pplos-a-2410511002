require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const app = express();

const limit = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 60,
    message: {
        success: false,
        message: "Terlalu banyak permintaan silahkan coba lagi nanti (Limit: 60 req/min)."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(limit);

const verifyTokenGateway = (req, res, next) => {
    const publicRoutes = [
        '/auth/login',
        '/auth/google',
        '/auth/refresh',
        '/users/register'
    ];

    if (publicRoutes.some(route => req.originalUrl.startsWith(route))) {
        return next();
    }

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Akses ditolak, token tidak ada.",
            data: null
        });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(403).json({
            success: false,
            message: "Token tidak valid atau kadaluwarsa",
            data: err.message
        });
    }
};

app.use('/auth', createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
    changeOrigin: true,
    pathRewrite: {
        '^/auth': '',
    }
}));

app.use('/users', verifyTokenGateway, createProxyMiddleware({
    target: process.env.PENGGUNA_SERVICE_URL || 'http://localhost:3002',
    changeOrigin: true,
    pathRewrite: {
        '^/users': '',
    }
}));

app.use('/orders', verifyTokenGateway, createProxyMiddleware({
    target: process.env.PESANAN_SERVICE_URL || 'http://localhost:3003',
    changeOrigin: true,
    pathRewrite: { '^/orders': '' }
}));

app.use('/products', createProxyMiddleware({ 
    target: process.env.PRODUK_SERVICE_URL || 'http://localhost:8000',
    changeOrigin: true,
    pathRewrite: { '^/products': '' }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API Gateway berjalan di port ${PORT}`);
    console.log(`- Auth Service proxy: http://localhost:${PORT}/auth -> Port 3001`);
    console.log(`- Pengguna Service proxy: http://localhost:${PORT}/users -> Port: 3002`);
    console.log(`- Pesanan Service proxy: http://localhost:${PORT}/orders -> Port: 3003`);
    console.log(`- Produk Service proxy: http://localhost:${PORT}/products -> Port: 8000`);
});