<?php

namespace App\Repositories\Contracts;

use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;
use App\Repositories\RepositoryInterface;

interface ProductRepositoryInterface extends RepositoryInterface
{
    public function getActiveProductsWithStore(): Collection;
    
    public function getProductsByStoreId(int $storeId): Collection;
}
