const express = require('express');
const User = require('../models/pengguna');
const authenticateJWT = require('../middleware/authenticationJWT');
const { db } = require('../config/appConfig');
const router = express.Router();

const checkInternalToken = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token !== process.env.INTERNAL_SERVICE_TOKEN) {
        res.status(403).json({ success: false, message: 'Forbidden', data: null });
        return false;
    }
    return true;
};

router.post('/register', async (req, res) => {
    try {
        const {username, password, role, email} = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({
                success: false,
                message: 'Username, password, dan email wajib diisi',
                data: null
            });
        }

        await User.register(username, password, role || 'pembeli', email);

        res.status(201).json({
            success: true,
            message: 'User berhasil terdaftar',
            data: { username, role: role || 'pembeli', email }
        });
    } catch (err) {

        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                success: false,
                message: 'Email atau username sudah terdaftar',
                data: null
            });
        }
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server',
            data: err.message
        });
    }
});

router.get('/protected/:id', authenticateJWT, async (req, res) => {
    try {
        const id = req.params.id;
        const userData = await User.getPenggunaData(id);

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: 'User tidak ditemukan',
                data: null
            });
        }

        res.status(200).json({
            success: true,
            message: 'Data profil berhasil diambil',
            data: userData
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Terjadi Kesalahan',
            data: err.message
        });
    }
});

router.put('/update/:id', authenticateJWT, async (req, res) => {
    const { username, password, role, email } = req.body;
    const id = req.params.id;

    if (!username || !password || !role || !email) {
        return res.status(400).json({
            success: false,
            message: 'Username, password, role, email harus diisi',
            data: null
        });
    }

    try {
        const result = await User.updatePengguna(id, username, password, role, email);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Data pengguna tidak ditemukan',
                data: null
            });
        }
        res.status(200).json({
            success: true,
            message: 'Data pengguna berhasil diperbarui',
            data: {id, username, role, email}
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Terjadi Kesalahan',
            data: err.message
        });
    }
});

router.post('/internal/find-or-create', async(req, res) => {
    if (!checkInternalToken(req, res)) return;

    try {
        const { profile, provider } = req.body;

        if (!profile || !provider) {
            return res.status(400).json({
                success: false,
                message: 'Data profil dan provider harus diisi',
                data: null
            });
        }

        const userData = await User.findOrCreatedOAuth(profile, provider);

        res.status(200).json({
            success: true,
            message: 'Sinkronisasi user OAuth berhasil',
            data: userData
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Gagal melakukan sinkronisasi',
            data: err.message
        });
    }
});

router.post('/internal/get-user', async (req, res) => {
    if (!checkInternalToken(req, res)) return;

    const { username } = req.body;

    try {
        const [rows] = await db.execute('SELECT * FROM pengguna WHERE username = ?', [username]);

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User tidak ditemukan',
                data:  null
            });
        }

        res.status(200).json({
            success: true,
            message: 'User ditemukan',
            data: rows[0]
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan',
            data: err.message
        });
    }
});

module.exports = router;