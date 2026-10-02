<?php

namespace App\Actions\Profile;

use App\Models\User;
use App\Services\Contracts\User\UserAvatarServiceInterface;

class DeleteAvatarAction
{
    protected UserAvatarServiceInterface $userService;

    public function __construct(UserAvatarServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    public function execute(User $user): User
    {
        return $this->userService->deleteAvatar($user);
    }
}
