<?php

namespace App\Actions\Auth;

use App\DTOs\RegisterUserDTO;
use App\Models\User;
use App\Services\Contracts\Auth\AuthServiceInterface;

class RegisterUserAction
{
    protected AuthServiceInterface $authService;

    public function __construct(AuthServiceInterface $authService)
    {
        $this->authService = $authService;
    }

    public function execute(RegisterUserDTO $dto): User
    {
        return $this->authService->registerUser($dto);
    }
}
