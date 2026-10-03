<?php

namespace App\Repositories\Contracts;

use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;

interface ProductRepositoryInterface
{
    public function getActiveProductsWithStore(): Collection;
    
    public function getProductsByStoreId(int $storeId): Collection;
    
    public function create(array $data): Product;
}
