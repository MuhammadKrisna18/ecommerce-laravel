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

        return Inertia::render('Seller/Products/Index', [
            'store' => $user->store,
        ]);
    }
}
