<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class kategori extends Model {
    protected $table = 'produk';
    protected $primaryKey = 'idProduk';
    public $timestamps = false;

    protected $allowedFields = ['idKategori', 'namaProduk', 'harga'];

    public function kategori() {
        return $this->belongsTo(Kategori::class, 'idKategori');
    }

    public function stok() {
        return $this->hasOne(Stok::class, 'idProduk');
    }
}