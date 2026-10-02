<?php

namespace App\Actions\User;

use App\DTOs\UpdatePasswordDTO;
use App\Models\User;
use App\Services\Contracts\User\UserPasswordServiceInterface;

class UpdatePasswordAction
{
    protected UserPasswordServiceInterface $userService;

    public function __construct(UserPasswordServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    public function execute(User $user, UpdatePasswordDTO $dto): User
    {
        return $this->userService->updatePassword($user, $dto->password);
    }
}
