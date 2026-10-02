<?php

namespace App\Services\User;

use App\DTOs\UpdateLocaleDTO;
use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Services\Contracts\User\UserPreferenceServiceInterface;

class UserPreferenceService implements UserPreferenceServiceInterface
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function updateLocale(User $user, UpdateLocaleDTO $dto): User
    {
        $this->userRepository->update($user->id, [
            'locale' => $dto->locale,
        ]);

        session(['locale' => $dto->locale]);

        /** @var User $updatedUser */
        $updatedUser = $this->userRepository->find($user->id);

        return $updatedUser;
    }
}
