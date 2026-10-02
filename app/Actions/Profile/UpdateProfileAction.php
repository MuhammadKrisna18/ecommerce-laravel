<?php

namespace App\Actions\Profile;

use App\DTOs\UpdateProfileDTO;
use App\Models\User;
use App\Services\Contracts\User\UserServiceInterface;

class UpdateProfileAction
{
    protected UserServiceInterface $userService;

    public function __construct(UserServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    public function execute(User $user, UpdateProfileDTO $dto): User
    {
        return $this->userService->updateProfile($user, $dto);
    }
}
