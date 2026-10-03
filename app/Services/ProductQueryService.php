<?php

namespace App\Services;

use App\Repositories\Contracts\ProductRepositoryInterface;
use App\Services\Contracts\ProductQueryServiceInterface;
use Illuminate\Database\Eloquent\Collection;

class ProductQueryService implements ProductQueryServiceInterface
{
    protected ProductRepositoryInterface $productRepository;

    public function __construct(ProductRepositoryInterface $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function getActiveProductsForUserDashboard(): Collection
    {
        return $this->productRepository->getActiveProductsWithStore();
    }

    public function getSellerProducts(int $storeId): Collection
    {
        return $this->productRepository->getProductsByStoreId($storeId);
    }
}
