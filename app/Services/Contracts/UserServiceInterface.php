<?php

namespace App\Services\Contracts;

use App\DTOs\RegisterUserDTO;
use App\Models\User;

interface UserServiceInterface
{
    public function registerUser(RegisterUserDTO $dto): User;

    public function getUserList(string $role = 'user'): array;

    public function getDashboardStats(): array;
}
