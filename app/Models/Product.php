<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'store_id',
        'name',
        'sku',
        'category',
        'price',
        'stock',
        'status',
        'sold',
        'image',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'status' => \App\Enums\ProductStatus::class,
        ];
    }

    public function store()
    {
        return $this->belongsTo(Store::class);
    }
}
