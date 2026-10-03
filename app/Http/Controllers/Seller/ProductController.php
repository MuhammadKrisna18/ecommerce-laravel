<?php

namespace App\Http\Controllers\Seller;

use App\Actions\Seller\CreateProductAction;
use App\DTOs\Seller\CreateProductDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Seller\CreateProductRequest;
use App\Services\Contracts\ProductQueryServiceInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    protected ProductQueryServiceInterface $productQueryService;

    public function __construct(ProductQueryServiceInterface $productQueryService)
    {
        $this->productQueryService = $productQueryService;
    }
    public function index(Request $request): Response
    {
        $user = $request->user()->loadMissing('store');
        
        $products = $this->productQueryService->getSellerProducts($user->store->id);

        return Inertia::render('Seller/Products/Index', [
            'store' => $user->store,
            'products' => $products,
        ]);
    }

    public function store(CreateProductRequest $request, CreateProductAction $createProductAction)
    {
        $dto = CreateProductDTO::fromArray($request->validated());
        
        $createProductAction->execute($request->user(), $dto);

        return redirect()->back()->with('success', 'Produk berhasil ditambahkan.');
    }
}
