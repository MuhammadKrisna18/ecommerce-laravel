<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user()->loadMissing('store');

        return Inertia::render('Seller/Dashboard/Index', [
            'store' => $user->store,
        ]);
    }
}
