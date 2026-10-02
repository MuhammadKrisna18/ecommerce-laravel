<?php

namespace App\Services\User;

use App\DTOs\UpdateProfileDTO;
use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Services\Contracts\User\UserServiceInterface;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserService implements UserServiceInterface
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function updateProfile(User $user, UpdateProfileDTO $dto): User
    {
        $this->userRepository->update($user->id, [
            'name' => $dto->name,
            'nickname' => $dto->nickname,
            'birth_date' => $dto->birth_date ?: null,
            'birth_place' => $dto->birth_place ?: null,
            'address' => $dto->address ?: null,
        ]);

        /** @var User $updatedUser */
        $updatedUser = $this->userRepository->find($user->id);

        return $updatedUser;
    }

    public function updateAvatar(User $user, UploadedFile $file): User
    {
        // Delete previous avatar if stored locally
        if ($user->avatar && ! filter_var($user->avatar, FILTER_VALIDATE_URL)) {
            Storage::disk('public')->delete($user->avatar);
        }

        $path = $file->store('avatars', 'public');

        $this->userRepository->update($user->id, [
            'avatar' => $path,
        ]);

        /** @var User $updatedUser */
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

        /** @var User $updatedUser */
        $updatedUser = $this->userRepository->find($user->id);

        return $updatedUser;
    }

    public function updatePassword(User $user, string $newPassword): User
    {
        $this->userRepository->update($user->id, [
            'password' => Hash::make($newPassword),
        ]);

        /** @var User $updatedUser */
        $updatedUser = $this->userRepository->find($user->id);

        return $updatedUser;
    }
}
