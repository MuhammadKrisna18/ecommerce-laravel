<?php

namespace App\Services\Contracts\Auth;

use App\DTOs\FirebaseAuthDTO;
use App\DTOs\RegisterUserDTO;
use App\Models\User;

interface AuthServiceInterface
{
    public function registerUser(RegisterUserDTO $dto): User;

    public function findOrCreateFromFirebase(FirebaseAuthDTO $dto): User;
}
