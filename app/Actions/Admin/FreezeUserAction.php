<?php

namespace App\Actions\Admin;

use App\DTOs\FreezeUserDTO;
use App\Models\User;
use App\Services\Contracts\Admin\AdminUserManagementServiceInterface;

class FreezeUserAction
{
    protected AdminUserManagementServiceInterface $adminUserService;

    public function __construct(AdminUserManagementServiceInterface $adminUserService)
    {
        $this->adminUserService = $adminUserService;
    }

    public function execute(User $user, FreezeUserDTO $dto): User
    {
        return $this->adminUserService->freezeUser($user, $dto);
    }
}
