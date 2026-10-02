<?php

namespace App\Actions\Admin;

use App\Models\User;
use App\Services\Contracts\Admin\AdminUserManagementServiceInterface;

class UnfreezeUserAction
{
    protected AdminUserManagementServiceInterface $adminUserService;

    public function __construct(AdminUserManagementServiceInterface $adminUserService)
    {
        $this->adminUserService = $adminUserService;
    }

    public function execute(User $user): User
    {
        return $this->adminUserService->unfreezeUser($user);
    }
}
