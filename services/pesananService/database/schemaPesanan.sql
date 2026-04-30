CREATE DATABASE IF NOT EXISTS dbPesanan;
USE dbPesanan;

CREATE TABLE pesanan(
    idPesanan INT AUTO_INCREMENT PRIMARY KEY,
    idPengguna INT,
    idToko INT,
    idProduk INT,
    hargaSatuan INT,
    totalHarga INT,
    tanggalDibuat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);