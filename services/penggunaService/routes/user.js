const express = require('express');
const User = require('../models/pengguna');
const authenticateJWT = require('../middleware/authenticationJWT');
const user = require('../models/pengguna');
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const {username, password, role} = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username dan password wajib diisi',
                data: null
            });
        }

        await User.register(username, password, role);

        res.status(201).json({
            success: true,
            message: 'User berhasil terdaftar',
            data: { username, role }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server',
            data: err.message
        });
    }
});

router.get('/protected/:id', authenticateJWT, async (req, res) => {
    try {
        const ID = req.params.id;
        const userData = await User.getPenggunaData(ID);

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
    const { username, password, role } = req.body;
    const id = req.params.id;

    if (!username || !password || !role) {
        return res.status(400).json({
            success: false,
            message: 'Username, password, role harus diisi',
            data: null
        });
    }

    try {
        const result = await user.updatePengguna(id, username, password, role);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Data pengguna tidak ditemukan',
                data: null
            });
        }
        res.status(200).json({
            success: true,
            message: 'Data pengguna berhasail diperbarui',
            data: {id, username, role}
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Terjadi Kesalahan',
            data: err.message
        });
    }
});

module.exports = router;