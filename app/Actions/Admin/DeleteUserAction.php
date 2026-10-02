<?php

namespace App\Actions\Admin;

use App\Models\User;
use App\Services\Contracts\Admin\AdminUserManagementServiceInterface;

class DeleteUserAction
{
    protected AdminUserManagementServiceInterface $adminUserService;

    public function __construct(AdminUserManagementServiceInterface $adminUserService)
    {
        $this->adminUserService = $adminUserService;
    }

    public function execute(User $user): bool
    {
        return $this->adminUserService->deleteUser($user);
    }
}
