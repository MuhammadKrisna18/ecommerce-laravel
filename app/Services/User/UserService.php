<?php

namespace App\Services\User;

use App\DTOs\UpdateLocaleDTO;
use App\DTOs\UpdateProfileDTO;
use App\Models\User;
use App\Services\Contracts\User\UserAvatarServiceInterface;
use App\Services\Contracts\User\UserPasswordServiceInterface;
use App\Services\Contracts\User\UserPreferenceServiceInterface;
use App\Services\Contracts\User\UserProfileServiceInterface;
use App\Services\Contracts\User\UserServiceInterface;
use Illuminate\Http\UploadedFile;

class UserService implements UserServiceInterface
{
    protected UserProfileServiceInterface $profileService;
    protected UserAvatarServiceInterface $avatarService;
    protected UserPasswordServiceInterface $passwordService;
    protected UserPreferenceServiceInterface $preferenceService;

    public function __construct(
        UserProfileServiceInterface $profileService,
        UserAvatarServiceInterface $avatarService,
        UserPasswordServiceInterface $passwordService,
        UserPreferenceServiceInterface $preferenceService
    ) {
        $this->profileService = $profileService;
        $this->avatarService = $avatarService;
        $this->passwordService = $passwordService;
        $this->preferenceService = $preferenceService;
    }

    public function updateProfile(User $user, UpdateProfileDTO $dto): User
    {
        return $this->profileService->updateProfile($user, $dto);
    }

    public function updateAvatar(User $user, UploadedFile $file): User
    {
        return $this->avatarService->updateAvatar($user, $file);
    }

    public function deleteAvatar(User $user): User
    {
        return $this->avatarService->deleteAvatar($user);
    }

    public function updatePassword(User $user, string $newPassword): User
    {
        return $this->passwordService->updatePassword($user, $newPassword);
    }

    public function updateLocale(User $user, UpdateLocaleDTO $dto): User
    {
        return $this->preferenceService->updateLocale($user, $dto);
    }
}
