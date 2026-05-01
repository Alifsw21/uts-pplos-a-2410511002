<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stok extends Model {
    protected $table = 'stok';
    protected $primaryKey = 'idStok';
    public $timestamps = false;

    protected $fillable = ['idProduk', 'jumlahStok'];

    public function produk() {
        return $this->belongsTo(Produk::class, 'idProduk');
    }
}