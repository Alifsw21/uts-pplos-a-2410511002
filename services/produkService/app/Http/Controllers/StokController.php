<?php

namespace App\Http\Controllers;

use App\Models\Stok;
use Illuminate\Http\Request;

class StokController extends Controller{
    public function index() {
        return response()->json([
            'success' => true,
            'message' => 'Data stok',
            'data'    => Stok::with('produk')->get()
        ]);
    }

    public function store(Request $request) {
        try {
            $stok = Stok::create([
                'idProduk'   => $request->idProduk,
                'jumlahStok' => $request->jumlahStok
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Stok berhasil ditambahkan',
                'data'    => $stok
            ], 201);
        } catch(\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
    
    public function update(Request $request, $id) {
        $stok = Stok::find($id);

        if (!$stok) {
            return response()->json([
                'success' => false,
                'message' => 'Stok tidak ditemukan',
                'data'    => null
            ], 404);
        }

        $stok->update([
            'jumlahStok' => $request->jumlahStok
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Stok berhasil diperbarui',
            'data'    => $stok
        ]);
    }

    public function show($idProduk) {
        $stok = Stok::with('produk')->where('idProduk', $idProduk)->first();

        if (!$stok) {
            return response()->json([
                'success' => false,
                'message' => 'Stok tidak ditemukan',
                'data'    => null
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Detail stok',
            'data'    => $stok
        ]);
    }
}