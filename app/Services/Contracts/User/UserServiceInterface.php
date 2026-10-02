<?php

namespace App\Services\Contracts\User;

use App\DTOs\UpdateProfileDTO;
use App\Models\User;
use Illuminate\Http\UploadedFile;

interface UserServiceInterface
{
    public function updateProfile(User $user, UpdateProfileDTO $dto): User;

    public function updateAvatar(User $user, UploadedFile $file): User;

    public function deleteAvatar(User $user): User;

    public function updatePassword(User $user, string $newPassword): User;
}
