const db = require('../config/appConfig');

const order = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM pesanan');
        return rows;
    },

    create: async (idPengguna, idToko, idProduk, hargaSatuan, jumlah) => {
        const totalHarga = hargaSatuan * jumlah;
        const [result] = await db.query('INSERT INTO pesanan (idPengguna, idToko, idProduk, hargaSatuan, totalHarga) VALUES (?, ?, ?, ?, ?)',
                [idPengguna, idToko, idProduk, hargaSatuan, totalHarga]
            );
        
        const [rows] = await db.query('SELECT * FROM pesanan WHERE idPesanan = ?', [result.insertId]);
        return rows[0];
    },

    update: async (id, idPengguna, idToko, idProduk, hargaSatuan, jumlah) => {
        const totalHarga = hargaSatuan * jumlah;
        const [result] = await db.query(`UPDATE pesanan SET idPengguna = ?, idToko = ?, idProduk = ?, hargaSatuan = ?, totalHarga = ? WHERE idPesanan = ?`,
            [idPengguna, idToko, idProduk, hargaSatuan, totalHarga, id]
        );
        return result;
    }
};

module.exports = order;