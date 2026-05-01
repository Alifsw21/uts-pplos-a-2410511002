<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class kategori extends Model {
    protected $table = 'kategori';
    protected $primaryKey = 'idKategori';
    public $timestamps = false;

    protected $allowedFields = ['idToko', 'namaKategori'];

    public function toko() {
        return $this->belongsTo(Toko::class, 'idToko');
    }
}