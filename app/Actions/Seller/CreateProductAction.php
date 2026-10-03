<?php

namespace App\Actions\Seller;

use App\DTOs\Seller\CreateProductDTO;
use App\Models\Product;
use App\Models\User;
use App\Enums\ProductStatus;
use App\Repositories\Contracts\ProductRepositoryInterface;

class CreateProductAction
{
    protected ProductRepositoryInterface $productRepository;

    public function __construct(ProductRepositoryInterface $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function execute(User $user, CreateProductDTO $dto): Product
    {
        $store = $user->store;
        
        if (!$store) {
            throw new \Exception("User does not have a store.");
        }

        $data = [
            'store_id' => $store->id,
            'name' => $dto->name,
            'category' => $dto->category,
            'price' => $dto->price,
            'stock' => $dto->stock,
            'description' => $dto->description,
            'sku' => 'PRD-' . strtoupper(uniqid()),
            'status' => $dto->stock > 0 ? ProductStatus::ACTIVE->value : ProductStatus::OUT_OF_STOCK->value,
            'sold' => 0,
        ];

        return $this->productRepository->create($data);
    }
}
