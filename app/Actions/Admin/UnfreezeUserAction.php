<?php

namespace App\Actions\Admin;

use App\Models\User;
use App\Services\Contracts\UserServiceInterface;

class UnfreezeUserAction
{
    protected UserServiceInterface $userService;

    public function __construct(UserServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    public function execute(User $user): User
    {
        return $this->userService->unfreezeUser($user);
    }
}
