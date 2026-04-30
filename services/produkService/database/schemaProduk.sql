CREATE DATABASE IF NOT EXISTS dbProduk;

USE dbProduk;

CREATE TABLE toko(
    idToko INT AUTO_INCREMENT PRIMARY KEY,
    namaToko VARCHAR(100),
    alamatToko TEXT
);

CREATE TABLE kategori(
    idKategori INT AUTO_INCREMENT PRIMARY KEY,
    idToko INT,
    namaKategori VARCHAR(100),
    FOREIGN KEY (idToko) REFERENCES toko(idToko)
);

CREATE TABLE produk(
    idProduk INT AUTO_INCREMENT PRIMARY KEY,
    idKategori INT,
    namaProduk VARCHAR(100),
    harga INT,
    FOREIGN KEY (idKategori) REFERENCES kategori(idKategori)
);

CREATE TABLE stok(
    idStok INT AUTO_INCREMENT PRIMARY KEY,
    idProduk INT,
    jumlahStok INT,
    FOREIGN KEY (idProduk) REFERENCES produk(idProduk)
);