const express = require('express');
const orders = require('../models/pesanan');
const axios = require('axios');

const router = express.Router();

router.get('/pesanan', async (req, res) => {
    try {
        const result = await orders.getAll();
        
        res.status(200).json({
            success: true,
            message: 'Data pesanan berhasil diambil',
            data: result
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server',
            data: err.message
        });
    }
});

router.post('/pesanan', async (req, res) => {
    try {
        const {idPengguna, idToko, idProduk, jumlah} = req.body;
        
        if (!idPengguna || !idToko || !idProduk || !jumlah) {
            return res.status(400).json({
                success: false,
                message: 'Semua data harus diisi',
                data: null
            });
        }

        const PRODUK_SERVICE_URL = process.env.PRODUK_SERVICE_URL || 'http://localhost:8000';

        let hargaSatuan = 0;
        try {
            const responseProduk = await axios.get(`${PRODUK_SERVICE_URL}/api/produk/${idProduk}`);
            hargaSatuan = responseProduk.data.data.harga;
        } catch (err) {
            return res.status(404).json({
                success: false,
                message: 'Gagal membuat pesanan. Produk tidak ditemukan di produk service',
                data: null
            });
        }

        const result = await orders.create(idPengguna, idToko, idProduk, hargaSatuan, jumlah);

        res.status(201).json({
            success: true,
            message: 'Pesanan berhasil ditambahkan',
            data: result
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Gagal melakukan transaksi',
            data: err.message
        });
    }
});

router.put('/update/:id', async (req, res) => {
    const { idPengguna, idToko, idProduk, hargaSatuan, jumlah } = req.body;
    const id = req.params.id;

    if (!idPengguna || !idToko || !idProduk || !hargaSatuan || !jumlah) {
        return res.status(400).json({
            success: false,
            message: 'Semua data harus diisi',
            data: null
        });
    }

    try {
        const result = await orders.update(id, idPengguna, idToko, idProduk, hargaSatuan, jumlah);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Data pesanan tidak ditemukan',
                data: null
            });
        }
        res.status(200).json({
            success: true,
            message: 'Data pesanan berhasil diperbarui',
            data: {idPengguna, idToko, idProduk, hargaSatuan, jumlah}
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