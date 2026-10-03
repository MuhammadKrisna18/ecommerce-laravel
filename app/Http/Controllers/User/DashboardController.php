<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Services\Contracts\ProductQueryServiceInterface;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    protected ProductQueryServiceInterface $productQueryService;

    public function __construct(ProductQueryServiceInterface $productQueryService)
    {
        $this->productQueryService = $productQueryService;
    }
    public function index(): Response
    {
        $products = $this->productQueryService->getActiveProductsForUserDashboard();

        return Inertia::render('User/Dashboard', [
            'products' => $products,
        ]);
    }
}
