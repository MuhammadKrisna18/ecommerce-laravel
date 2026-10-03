<?php

namespace App\Services\Contracts;

use Illuminate\Database\Eloquent\Collection;

interface ProductQueryServiceInterface
{
    public function getActiveProductsForUserDashboard(): Collection;
    
    public function getSellerProducts(int $storeId): Collection;
}
