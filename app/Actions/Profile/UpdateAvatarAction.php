<?php

namespace App\Actions\Profile;

use App\Models\User;
use App\Services\Contracts\User\UserAvatarServiceInterface;
use Illuminate\Http\UploadedFile;

class UpdateAvatarAction
{
    protected UserAvatarServiceInterface $userService;

    public function __construct(UserAvatarServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    public function execute(User $user, UploadedFile $file): User
    {
        return $this->userService->updateAvatar($user, $file);
    }
}
