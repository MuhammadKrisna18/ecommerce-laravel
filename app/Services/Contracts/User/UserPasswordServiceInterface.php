<?php

namespace App\Services\Contracts\User;

use App\Models\User;

interface UserPasswordServiceInterface
{
    public function updatePassword(User $user, string $newPassword): User;
}
