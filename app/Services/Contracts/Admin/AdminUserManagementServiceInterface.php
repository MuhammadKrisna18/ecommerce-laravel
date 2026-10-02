<?php

namespace App\Services\Contracts\Admin;

use App\DTOs\FreezeUserDTO;
use App\Models\User;

interface AdminUserManagementServiceInterface
{
    public function freezeUser(User $user, FreezeUserDTO $dto): User;

    public function unfreezeUser(User $user): User;

    public function deleteUser(User $user): bool;
}
