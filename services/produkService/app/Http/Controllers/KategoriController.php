<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use Illuminate\Http\Request;

class KategoriController extends Controller
{
    public function index() {
        $data = Kategori::with('toko')->get();
        return response()->json([
            'success' => true,
            'message' => 'Data kategori',
            'data'    => $data
        ]);
    }

    public function store(Request $request) {
        $request->validate([
            'idToko'      => 'required|integer|exists:toko,idToko',
            'namaKategori' => 'required|string|max:255'
        ]);

        try {
            $kategori = Kategori::create([
                'idToko'      => $request->idToko,
                'namaKategori' => $request->namaKategori
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Kategori berhasil ditambahkan',
                'data'    => $kategori
            ], 201);
        } catch(\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id) {
        $kategori = Kategori::with('toko')->find($id);

        if (!$kategori) {
            return response()->json([
                'success' => false,
                'message' => 'Kategori tidak ditemukan',
                'data'    => null
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Detail kategori',
            'data'    => $kategori
        ]);
    }

    public function update(Request $request, $id) {
        $kategori = Kategori::find($id);

        if (!$kategori) {
            return response()->json([
                'success' => false,
                'message' => 'Kategori tidak ditemukan',
                'data'    => null
            ], 404);
        }

        $kategori->update([
            'idToko'      => $request->idToko ?? $kategori->idToko,
            'namaKategori' => $request->namaKategori ?? $kategori->namaKategori
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Kategori berhasil diperbarui',
            'data'    => $kategori
        ]);
    }

    public function destroy($id) {
        $kategori = Kategori::find($id);

        if (!$kategori) {
            return response()->json([
                'success' => false,
                'message' => 'Kategori tidak ditemukan',
                'data'    => null
            ], 404);
        }

        $kategori->delete();

        return response()->json([
            'success' => true,
            'message' => 'Kategori berhasil dihapus',
            'data'    => null
        ]);
    }
}