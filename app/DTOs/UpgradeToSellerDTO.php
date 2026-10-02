<?php

namespace App\DTOs;

class UpgradeToSellerDTO extends BaseDTO
{
    public string $store_name;

    public array $categories;

    public ?string $description = null;

    public string $owner_name;

    public string $phone;

    public string $city;

    public string $store_address;
}
