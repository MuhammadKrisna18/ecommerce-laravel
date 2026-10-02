<?php

namespace App\Actions\Profile;

use App\Models\User;
use App\Services\Contracts\User\UserServiceInterface;

class DeleteAvatarAction
{
    protected UserServiceInterface $userService;

    public function __construct(UserServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    public function execute(User $user): User
    {
        return $this->userService->deleteAvatar($user);
    }
}
