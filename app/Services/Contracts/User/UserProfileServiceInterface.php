<?php

namespace App\Services\Contracts\User;

use App\DTOs\UpdateProfileDTO;
use App\Models\User;

interface UserProfileServiceInterface
{
    public function updateProfile(User $user, UpdateProfileDTO $dto): User;
}
