CREATE DATABASE IF NOT EXISTS dbPengguna;
USE dbPengguna;

CREATE TABLE pengguna(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(255),
    role ENUM('admin', 'penjual', 'pembeli') DEFAULT 'pembeli',
    email VARCHAR(255) UNIQUE NOT NULL,
    fotoProfil TEXT,
    oauthProvider VARCHAR(50),
    oauthId VARCHAR(255),
    tanggalDibuat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);