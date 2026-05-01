<?php

namespace App\Http\Controllers;

use App\Models\Toko;
use Illuminate\Http\Request;

class TokoController extends Controller
{
    public function index() {
        $data = Toko::with('kategoris')->get();
        return response()->json([
            'success' => true,
            'message' => 'Data toko',
            'data'    => $data
        ]);
    }

    public function store(Request $request) {
        $request->validate([
            'namaToko'   => 'required|string|max:255',
            'alamatToko' => 'required|string'
        ]);

        try {
            $toko = Toko::create([
                'namaToko'   => $request->namaToko,
                'alamatToko' => $request->alamatToko
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Toko berhasil ditambahkan',
                'data'    => $toko
            ], 201);
        } catch(\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id) {
        $toko = Toko::with('kategoris')->find($id);

        if (!$toko) {
            return response()->json([
                'success' => false,
                'message' => 'Toko tidak ditemukan',
                'data'    => null
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Detail toko',
            'data'    => $toko
        ]);
    }

    public function update(Request $request, $id) {
        $toko = Toko::find($id);

        if (!$toko) {
            return response()->json([
                'success' => false,
                'message' => 'Toko tidak ditemukan',
                'data'    => null
            ], 404);
        }

        $toko->update([
            'namaToko'   => $request->namaToko ?? $toko->namaToko,
            'alamatToko' => $request->alamatToko ?? $toko->alamatToko
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Toko berhasil diperbarui',
            'data'    => $toko
        ]);
    }

    public function destroy($id) {
        $toko = Toko::find($id);

        if (!$toko) {
            return response()->json([
                'success' => false,
                'message' => 'Toko tidak ditemukan',
                'data'    => null
            ], 404);
        }

        $toko->delete();

        return response()->json([
            'success' => true,
            'message' => 'Toko berhasil dihapus',
            'data'    => null
        ]);
    }
}