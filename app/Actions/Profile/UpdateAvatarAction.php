<?php

namespace App\Actions\Profile;

use App\Models\User;
use App\Services\Contracts\UserServiceInterface;
use Illuminate\Http\UploadedFile;

class UpdateAvatarAction
{
    protected UserServiceInterface $userService;

    public function __construct(UserServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    public function execute(User $user, UploadedFile $file): User
    {
        return $this->userService->updateAvatar($user, $file);
    }
}
