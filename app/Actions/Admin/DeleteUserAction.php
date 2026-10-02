<?php

namespace App\Actions\Admin;

use App\Models\User;
use App\Services\Contracts\Admin\AdminUserServiceInterface;

class DeleteUserAction
{
    protected AdminUserServiceInterface $adminUserService;

    public function __construct(AdminUserServiceInterface $adminUserService)
    {
        $this->adminUserService = $adminUserService;
    }

    public function execute(User $user): bool
    {
        return $this->adminUserService->deleteUser($user);
    }
}
