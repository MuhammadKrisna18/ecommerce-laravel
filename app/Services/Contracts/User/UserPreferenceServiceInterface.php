<?php

namespace App\Services\Contracts\User;

use App\DTOs\UpdateLocaleDTO;
use App\Models\User;

interface UserPreferenceServiceInterface
{
    public function updateLocale(User $user, UpdateLocaleDTO $dto): User;
}
