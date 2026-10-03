<?php

namespace App\Repositories;

use App\Models\Product;
use App\Repositories\Contracts\ProductRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class ProductRepository extends BaseRepository implements ProductRepositoryInterface
{
    public function __construct(Product $model)
    {
        parent::__construct($model);
    }

    public function getActiveProductsWithStore(): Collection
    {
        return $this->model->with('store:id,name')
            ->where('status', 'active')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function getProductsByStoreId(int $storeId): Collection
    {
        return $this->model->where('store_id', $storeId)
            ->orderBy('created_at', 'desc')
            ->get();
    }
}
