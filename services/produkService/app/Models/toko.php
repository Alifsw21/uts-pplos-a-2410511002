<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Toko extends Model {
    protected $table = 'toko';
    protected $primaryKey = 'idToko';
    public $timestamps = false;

    protected $fillable = ['namaToko', 'alamatToko'];

    public function kategoris() {
        return $this->hasMany(Kategori::class, 'idToko');
    }
}