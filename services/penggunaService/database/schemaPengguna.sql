CREATE DATABASE IF NOT EXISTS dbPengguna;
USE dbPengguna;

CREATE TABLE pengguna(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'penjual', 'pembeli') DEFAULT 'pembeli',
    tanggalDibuat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);