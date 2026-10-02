<?php

namespace App\Services\Contracts\User;

use App\Models\User;
use Illuminate\Http\UploadedFile;

interface UserAvatarServiceInterface
{
    public function updateAvatar(User $user, UploadedFile $file): User;

    public function deleteAvatar(User $user): User;
}
