<?php

namespace App\Services\Contracts;

use App\DTOs\RegisterUserDTO;
use App\Models\User;

interface UserServiceInterface
{
    public function registerUser(RegisterUserDTO $dto): User;
}
