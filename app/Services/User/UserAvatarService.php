<?php

namespace App\Services\User;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Services\Contracts\User\UserAvatarServiceInterface;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class UserAvatarService implements UserAvatarServiceInterface
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function updateAvatar(User $user, UploadedFile $file): User
    {
        if ($user->avatar && ! filter_var($user->avatar, FILTER_VALIDATE_URL)) {
            Storage::disk('public')->delete($user->avatar);
        }

        $path = $file->store('avatars', 'public');

        $this->userRepository->update($user->id, [
            'avatar' => $path,
        ]);

        $updatedUser = $this->userRepository->find($user->id);

        return $updatedUser;
    }

    public function deleteAvatar(User $user): User
    {
        if ($user->avatar && ! filter_var($user->avatar, FILTER_VALIDATE_URL)) {
            Storage::disk('public')->delete($user->avatar);
        }

        $this->userRepository->update($user->id, [
            'avatar' => null,
        ]);

        $updatedUser = $this->userRepository->find($user->id);

        return $updatedUser;
    }
}
