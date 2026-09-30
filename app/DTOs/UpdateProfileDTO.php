<?php

namespace App\DTOs;

class UpdateProfileDTO extends BaseDTO
{
    public string $name;

    public ?string $nickname = null;

    public ?string $birth_date = null;

    public ?string $birth_place = null;

    public ?string $address = null;
}
