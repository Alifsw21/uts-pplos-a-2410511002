# uts-pplos-a-2410511002

# Identitas
Nama  : Alif Satriya Wicaksono
NIM   : 2410511002
Kelas : A

# Link Video Presentasi
https://youtu.be/HA35x7Vl7ZY

# Cara Menjalankan

# 1. Konfigurasi file

1. Menjalankan perintah "npm install" pada gateway, auth-service, pesananService, dan penggunaService.

2. Membuat file .env pada folder gateway. Berisikan data berikut:
- PORT = 3000
- AUTH_SERVICE_URL=http://localhost:3001
- PENGGUNA_SERVICE_URL=http://localhost:3002
- PESANAN_SERVICE_URL=http://localhost:3003
- PRODUK_SERVICE_URL=http://localhost:8000
- JWT_SECRET=

3. Membuat file .env pada folder auth-service. Berisikan data berikut:
- PORT=3001
- JWT_SECRET=
- JWT_EXPIRES_IN=15m
- JWT_REFRESH_EXPIRES_IN=7d
- GOOGLE_CLIENT_ID=
- GOOGLE_CLIENT_SECRET=
- GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
- PENGGUNA_SERVICE_URL=http://localhost:3002
- INTERNAL_SERVICE_TOKEN=tokenAlif321(Token bebas)

4. Membuat file .env pada folder penggunaService. Berisikan data berikut:
- PORT=3002
- NODE_ENV=development
- DB_HOST=localhost
- DB_PORT=3307
- DB_NAME=dbPengguna
- DB_USER=root
- DB_PASSWORD=root
- JWT_SECRET=
- INTERNAL_SERVICE_TOKEN=tokenAlif321(Token harus sama dengan token internal pada file .env auth-service)

5. Membuat file .env pada folder pesananService. Berisikan data berikut:
- PORT=3003
- DB_HOST=localhost
- DB_PORT=3309
- DB_NAME=dbPesanan
- DB_USER=root
- DB_PASSWORD=root

6. Menyalin file konfigurasi bawaan laravel dengan perintah cp .env.example .env. Setelah itu memodifikasi data berikut:
- APP_URL=http://localhost:8000
- DB_CONNECTION=mysql
- DB_HOST=127.0.0.1
- DB_PORT=3308
- DB_DATABASE=dbProduk
- DB_USERNAME=root
- DB_PASSWORD=root

# 2. Menjalankan Docker

- Membuka Terminal
- Pindah direktori uts-pplos-a-2410511002
- Menjalankan perintah `docker-compose up --build` 

# 3. Menjalankan server

1. Gateway
**Node.js*
- Membuka Terminal
- Pindah direktori gateway/
- Menjalankan perintah `node server.js`

2. Auth Service
**Node.js*
- Membuka Terminal
- Pindah direktori services/auth-service
- Menjalankan perintah `node server.js`

3. Pengguna Service
**Node.js*
- Membuka Terminal
- Pindah direktori services/penggunaService
- Menjalankan perintah `node server.js`

4. Pesanan Service
**Node.js**
- Membuka Terminal
- Pindah direktori services/pesananService
- Menjalankan perintah `node server.js`

5. Produk Service
**Composer*
- Membuka Terminal
- Pindah direktori services/produkService
- Menjalankan perintah `php artisan serve --port=8000`

# 4. Peta Endpoint

Gunakan URL `http://localhost:3000`

1. Auth Service
- POST `/auth/login` : Melakukan login
- POST `/auth/refresh` : Refresh token jika token kadaluwarsa
- POST `/auth/logout` : Keluar dari program (access token tidak bisa digunakan setelah logout)
- GET `/auth/google` : Login menggunakan akun google

2. Pengguna Service
- POST `/users/register` : Mendaftarkan akun (Publik)
- GET `/users/protected/:id` : Melihat data profil pengguna (Butuh JWT)
- PUT `/users/update/:id` : Memperbarui data pengguna (Butuh JWT)

3. Produk Service
**Tabel Toko**
- GET `/toko` : Melihat semua data toko (Butuh JWT)
- POST `/toko` : Menambahkan data toko (Butuh JWT)
- GET `/toko/:id` : Melihat detail toko berdasarkan id (Butuh JWT)
- PUT `/toko/:id` : Memperbarui data toko (Butuh JWT)
- DELETE `/toko/:id` : Menghapus data toko (Butuh JWT)

**Tabel Kategori**
- GET `/kategori` : Melihat semua kategori (Butuh JWT)
- POST `/kategori` : Menambahkan kategori (Butuh JWT)
- GET `/kategori/:id` : Melihat kategori berdasarkan id (Butuh JWT)
- PUT `/kategori/:id` : Memperbarui kategori (Butuh JWT)
- DELETE `/kategori/:id` : Menghapus kategori (Butuh JWT)

**Tabel Produk**
- GET `/products` : Melihat semua produk (Butuh JWT)
> GET `/products?page=1&per_page=5` : Menentukan berapa baris data yang ingin ditampilkan (Butuh JWT)
> GET `/products?search=keyword` : Mencari data produk berdasarkan kata kunci (Butuh JWT)
> GET `/products?idKategori=id` : Mencari data produk berdasarkan id kategori (Butuh JWT)
- POST `/products` : Menambahkan produk (Butuh JWT)
- GET `/products/:id` : Mencari produk berdasarkan id produk (Butuh JWT)
- PUT `/products/:id` : Memperbarui produk (Butuh JWT)
- DELETE `/products/:id` : Menghapus produk (Butuh JWT)

**Tabel Stok**
- GET `/stok` : Melihat stok (Butuh JWT)
- POST `/stok` : Menambah stok (Butuh JWT)
- GET `/stok/:id` : Melihat stok berdasarkan id (Butuh JWT)
- PUT `/stok/:id` : Memperbarui stok (Butuh JWT)

4. Pesanan Service
- GET `/orders/pesanan` : Melihat semua pesanan (Butuh JWT)
- POST `/orders/pesanan` : Menambahkan pesanan (Butuh JWT)
- PUT `/orders/update/:id` : Memperbarui pesanan (Butuh JWT)