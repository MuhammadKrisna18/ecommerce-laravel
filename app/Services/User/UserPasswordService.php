<?php

namespace App\Services\User;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Services\Contracts\User\UserPasswordServiceInterface;
use Illuminate\Support\Facades\Hash;

class UserPasswordService implements UserPasswordServiceInterface
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function updatePassword(User $user, string $newPassword): User
    {
        $this->userRepository->update($user->id, [
            'password' => Hash::make($newPassword),
        ]);

        $updatedUser = $this->userRepository->find($user->id);

        return $updatedUser;
    }
}
