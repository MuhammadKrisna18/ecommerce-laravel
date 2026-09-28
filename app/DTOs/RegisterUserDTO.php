<?php

namespace App\DTOs;

class RegisterUserDTO extends BaseDTO
{
    public string $name;

    public ?string $nickname = null;

    public string $email;

    public string $password;

    public string $role = 'user';
}
