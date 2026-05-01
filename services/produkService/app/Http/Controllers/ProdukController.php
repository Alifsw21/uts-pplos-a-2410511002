<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use Illuminate\Http\Request;

class ProdukController extends Controller
{
    public function index(Request $request) {
        $query = Produk::with(['kategori.toko', 'stok']);

        if ($request->has('search')) {
            $query->where('namaProduk', 'like', '%' . $request->search . '%');
        }

        if ($request->has('idKategori')) {
            $query->where('idKategori', $request->idKategori);
        }

        $data = $query->paginate(5);

        return response()->json([
            'success' => true,
            'message' => 'Data Produk',
            'data'    => $data
        ], 200);
    }

    public function store(Request $request) {
        $produk = \App\Models\Produk::create([
            'idKategori' => $request->idKategori,
            'namaProduk' => $request->namaProduk,
            'harga'      => $request->harga
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Produk berhasil ditambahkan',
            'data'    => $produk
        ], 201);
    }

    public function update(Request $request, $id) {
        $produk = \App\Models\Produk::find($id);

        if (!$produk) {
            return response()->json([
                'success' => false,
                'message' => 'Produk tidak ditemukan',
                'data'    => null
            ], 404);
        }

        $produk->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Produk berhasil diperbarui',
            'data'    => $produk
        ], 200);
    }

    public function destroy($id) {
        $produk = \App\Models\Produk::find($id);

        if (!$produk) {
            return response()->json([
                'success' => false,
                'message' => 'Produk tidak ditemukan',
                'data'    => null
            ], 404);
        }

        $produk->delete();

        return response()->json([
            'success' => true,
            'message' => 'Produk berhasil dihapus',
            'data'    => null
        ], 200);
    }
}
