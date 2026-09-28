<?php

namespace App\Actions\Auth;

use App\DTOs\RegisterUserDTO;
use App\Models\User;
use App\Services\Contracts\UserServiceInterface;

class RegisterUserAction
{
    protected UserServiceInterface $userService;

    public function __construct(UserServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    public function execute(RegisterUserDTO $dto): User
    {
        return $this->userService->registerUser($dto);
    }
}
