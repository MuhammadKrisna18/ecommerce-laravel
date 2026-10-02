<?php

namespace App\Services\Contracts\User;

use App\DTOs\UpgradeToSellerDTO;
use App\Models\User;

interface UserSellerServiceInterface
{
    public function upgradeToSeller(User $user, UpgradeToSellerDTO $dto): User;
}
