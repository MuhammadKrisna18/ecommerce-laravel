<?php

namespace App\Actions\Admin;

use App\DTOs\FreezeUserDTO;
use App\Models\User;
use App\Services\Contracts\UserServiceInterface;

class FreezeUserAction
{
    protected UserServiceInterface $userService;

    public function __construct(UserServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    public function execute(User $user, FreezeUserDTO $dto): User
    {
        return $this->userService->freezeUser($user, $dto);
    }
}
