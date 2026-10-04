<?php

namespace App\Services\User;

use App\DTOs\UpdateProfileDTO;
use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Services\Contracts\User\UserProfileServiceInterface;

class UserProfileService implements UserProfileServiceInterface
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

        $updatedUser = $this->userRepository->find($user->id);

        return $updatedUser;
    }
}
