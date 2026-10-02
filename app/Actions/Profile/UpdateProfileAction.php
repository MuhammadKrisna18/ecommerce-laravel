<?php

namespace App\Actions\Profile;

use App\DTOs\UpdateProfileDTO;
use App\Models\User;
use App\Services\Contracts\User\UserProfileServiceInterface;

class UpdateProfileAction
{
    protected UserProfileServiceInterface $userService;

    public function __construct(UserProfileServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    public function execute(User $user, UpdateProfileDTO $dto): User
    {
        return $this->userService->updateProfile($user, $dto);
    }
}
