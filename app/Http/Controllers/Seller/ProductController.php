<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user()->loadMissing('store');
        
        $products = $user->store->products()->orderBy('created_at', 'desc')->get();

        return Inertia::render('Seller/Products/Index', [
            'store' => $user->store,
            'products' => $products,
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user()->loadMissing('store');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:1'],
            'stock' => ['required', 'integer', 'min:0'],
            'description' => ['nullable', 'string'],
        ]);

        $validated['sku'] = 'PRD-' . strtoupper(uniqid());
        $validated['status'] = $validated['stock'] > 0 ? 'active' : 'out_of_stock';
        $validated['sold'] = 0;
        
        $user->store->products()->create($validated);

        return redirect()->back()->with('success', 'Produk berhasil ditambahkan.');
    }
}
