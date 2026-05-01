<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class stok extends Model {
    protected $table = 'stok';
    protected $primaryKey = 'idStok';
    public $timestamps = false;

    protected $allowedFields = ['idProduk', 'jumlahStok'];

    public function produk() {
        return $this->belongsTo(Produk::class, 'idProduk');
    }
}