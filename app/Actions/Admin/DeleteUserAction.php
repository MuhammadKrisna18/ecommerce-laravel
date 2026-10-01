<?php

namespace App\Actions\Admin;

use App\Models\User;
use App\Services\Contracts\UserServiceInterface;

class DeleteUserAction
{
    protected UserServiceInterface $userService;

    public function __construct(UserServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    public function execute(User $user): bool
    {
        return $this->userService->deleteUser($user);
    }
}
