<?php

namespace App\Actions\Admin;

use App\Models\User;
use App\Services\Contracts\Admin\AdminUserServiceInterface;

class UnfreezeUserAction
{
    protected AdminUserServiceInterface $adminUserService;

    public function __construct(AdminUserServiceInterface $adminUserService)
    {
        $this->adminUserService = $adminUserService;
    }

    public function execute(User $user): User
    {
        return $this->adminUserService->unfreezeUser($user);
    }
}
