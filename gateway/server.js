require('dotenv').config();
const express = require('express');
const { createProxyMiddleware, fixRequestBody } = require('http-proxy-middleware');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const app = express();

const tokenBlacklist = new Set();

app.use(express.json());

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

    if (tokenBlacklist.has(token)) {
        return res.status(401).json({
            success: false,
            message: 'Token sudah tidak valid, silahkan login ulang',
            data: null
        });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        req.headers['x-user-id'] = String(verified.id);
        req.headers['x-user-role'] = verified.role;
        next();
    } catch (err) {
        res.status(403).json({
            success: false,
            message: "Token tidak valid atau kadaluwarsa",
            data: err.message
        });
    }
};

app.post('/auth/logout', (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if(token) tokenBlacklist.add(token);
    next();
});

app.use('/auth', createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
    changeOrigin: true,
    pathRewrite: { '^/auth': '' },
    onProxyReq: fixRequestBody
}));

app.use('/users', verifyTokenGateway, createProxyMiddleware({
    target: process.env.PENGGUNA_SERVICE_URL || 'http://localhost:3002',
    changeOrigin: true,
    pathRewrite: { '^/users': '' },
    onProxyReq: fixRequestBody
}));

app.use('/orders', verifyTokenGateway, createProxyMiddleware({
    target: process.env.PESANAN_SERVICE_URL || 'http://localhost:3003',
    changeOrigin: true,
    pathRewrite: { '^/orders': '' },
    onProxyReq: fixRequestBody
}));

app.use('/toko', verifyTokenGateway, createProxyMiddleware({
    target: process.env.PRODUK_SERVICE_URL || 'http://localhost:8000',
    changeOrigin: true,
    pathRewrite: { '^/toko': '/api/toko' },
    onProxyReq: fixRequestBody
}));

app.use('/kategori', verifyTokenGateway, createProxyMiddleware({
    target: process.env.PRODUK_SERVICE_URL || 'http://localhost:8000',
    changeOrigin: true,
    pathRewrite: { '^/kategori': '/api/kategori' },
    onProxyReq: fixRequestBody
}));

app.use('/products', verifyTokenGateway, createProxyMiddleware({
    target: process.env.PRODUK_SERVICE_URL || 'http://localhost:8000',
    changeOrigin: true,
    pathRewrite: { '^/products': '/api/produk' },
    onProxyReq: fixRequestBody
}));

app.use('/stok', verifyTokenGateway, createProxyMiddleware({
    target:  process.env.PRODUK_SERVICE_URL || 'http://localhost:8000',
    changeOrigin: true,
    pathRewrite: { '^/stok': '/api/stok' },
    onProxyReq: fixRequestBody
}));


app.get('/login-success', (req, res) => {
    const token = req.query.token;

    if (!token) {
        return res.status(400).json({
            success: false,
            message: 'Token tidak ditemukan'
        });
    }

    res.status(200).json({
        success: true,
        message: 'Login google berhasil! Silahkan copy token dibawah ini untuk test di postman',
        data: token
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API Gateway berjalan di port ${PORT}`);
    console.log(`- Auth Service proxy: http://localhost:${PORT}/auth -> Port 3001`);
    console.log(`- Pengguna Service proxy: http://localhost:${PORT}/users -> Port: 3002`);
    console.log(`- Pesanan Service proxy: http://localhost:${PORT}/orders -> Port: 3003`);
    console.log(`- Produk Service proxy: http://localhost:${PORT}/products -> Port: 8000`);
});