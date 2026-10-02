<?php

namespace App\Actions\Admin;

use App\DTOs\FreezeUserDTO;
use App\Models\User;
use App\Services\Contracts\Admin\AdminUserServiceInterface;

class FreezeUserAction
{
    protected AdminUserServiceInterface $adminUserService;

    public function __construct(AdminUserServiceInterface $adminUserService)
    {
        $this->adminUserService = $adminUserService;
    }

    public function execute(User $user, FreezeUserDTO $dto): User
    {
        return $this->adminUserService->freezeUser($user, $dto);
    }
}
