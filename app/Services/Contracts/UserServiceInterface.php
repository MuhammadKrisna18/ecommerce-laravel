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

    public function getPaginatedUsers(int $perPage = 15): \Illuminate\Contracts\Pagination\LengthAwarePaginator;

    public function freezeUser(User $user, \App\DTOs\FreezeUserDTO $dto): User;

    public function unfreezeUser(User $user): User;

    public function deleteUser(User $user): bool;

    public function findOrCreateFromFirebase(\App\DTOs\FirebaseAuthDTO $dto): User;
}
