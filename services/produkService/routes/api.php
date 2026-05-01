<?php

use App\Http\Controllers\ProdukController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/produk', [ProdukController::class, 'index']);

Route::get('/produk/{id}', [ProdukController::class, 'show']);

Route::post('/produk', [ProdukController::class, 'store']);

Route::put('/produk/{id}', [ProdukController::class, 'update']);

Route::delete('/produk/{id}', [ProdukController::class, 'destroy']);