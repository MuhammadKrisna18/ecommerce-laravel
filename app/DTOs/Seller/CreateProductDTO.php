<?php

namespace App\DTOs\Seller;

class CreateProductDTO
{
    public function __construct(
        public readonly string $name,
        public readonly ?string $category,
        public readonly float $price,
        public readonly int $stock,
        public readonly ?string $description,
    ) {
    }

    public static function fromArray(array $data): self
    {
        return new self(
            name: $data['name'],
            category: $data['category'] ?? null,
            price: (float) $data['price'],
            stock: (int) $data['stock'],
            description: $data['description'] ?? null,
        );
    }
}
