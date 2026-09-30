<?php

namespace App\Services\Contracts;

use App\DTOs\RegisterUserDTO;
use App\DTOs\UpdateProfileDTO;
use App\Models\User;
use Illuminate\Http\UploadedFile;

interface UserServiceInterface
{
    public function registerUser(RegisterUserDTO $dto): User;

    public function getUserList(string $role = 'user'): array;

    public function getDashboardStats(): array;

    public function updateProfile(User $user, UpdateProfileDTO $dto): User;

    public function updateAvatar(User $user, UploadedFile $file): User;

    public function deleteAvatar(User $user): User;
}
