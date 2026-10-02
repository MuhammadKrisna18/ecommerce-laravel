<?php

namespace App\DTOs;

class UpdatePasswordDTO extends BaseDTO
{
    public string $current_password;

    public string $password;
}
