<?php

use App\Http\Controllers\ProdukController;
use App\Http\Controllers\StokController;
use App\Http\Controllers\TokoController;
use App\Http\Controllers\KategoriController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/produk', [ProdukController::class, 'index']);
Route::get('/produk/{id}', [ProdukController::class, 'show']);
Route::post('/produk', [ProdukController::class, 'store']);
Route::put('/produk/{id}', [ProdukController::class, 'update']);
Route::delete('/produk/{id}', [ProdukController::class, 'destroy']);

Route::get('/stok', [StokController::class, 'index']);
Route::post('/stok', [StokController::class, 'store']);
Route::get('/stok/{idProduk}', [StokController::class, 'show']);
Route::put('/stok/{id}', [StokController::class, 'update']);

Route::get('/toko', [TokoController::class, 'index']);
Route::post('/toko', [TokoController::class, 'store']);
Route::get('/toko/{id}', [TokoController::class, 'show']);
Route::put('/toko/{id}', [TokoController::class, 'update']);
Route::delete('/toko/{id}', [TokoController::class, 'destroy']);

Route::get('/kategori', [KategoriController::class, 'index']);
Route::post('/kategori', [KategoriController::class, 'store']);
Route::get('/kategori/{id}', [KategoriController::class, 'show']);
Route::put('/kategori/{id}', [KategoriController::class, 'update']);
Route::delete('/kategori/{id}', [KategoriController::class, 'destroy']);