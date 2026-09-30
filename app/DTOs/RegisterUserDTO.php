<?php

namespace App\DTOs;

use App\Enums\UserRole;

class RegisterUserDTO extends BaseDTO
{
    public string $name;

    public ?string $nickname = null;

    public string $email;

    public string $password;

    public string $role = UserRole::USER->value;
}
