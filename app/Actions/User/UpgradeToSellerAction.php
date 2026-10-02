<?php

namespace App\Actions\User;

use App\DTOs\UpgradeToSellerDTO;
use App\Models\User;
use App\Services\Contracts\User\UserSellerServiceInterface;

class UpgradeToSellerAction
{
    protected UserSellerServiceInterface $sellerService;

    public function __construct(UserSellerServiceInterface $sellerService)
    {
        $this->sellerService = $sellerService;
    }

    public function execute(User $user, UpgradeToSellerDTO $dto): User
    {
        return $this->sellerService->upgradeToSeller($user, $dto);
    }
}
