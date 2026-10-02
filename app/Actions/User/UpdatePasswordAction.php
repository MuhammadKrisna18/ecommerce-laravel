<?php

namespace App\Actions\User;

use App\DTOs\UpdatePasswordDTO;
use App\Models\User;
use App\Services\Contracts\User\UserServiceInterface;

class UpdatePasswordAction
{
    protected UserServiceInterface $userService;

    public function __construct(UserServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    public function execute(User $user, UpdatePasswordDTO $dto): User
    {
        return $this->userService->updatePassword($user, $dto->password);
    }
}
