<?php

namespace App\Actions\User;

use App\DTOs\UpdateLocaleDTO;
use App\Models\User;
use App\Services\Contracts\User\UserPreferenceServiceInterface;

class UpdateLocaleAction
{
    protected UserPreferenceServiceInterface $preferenceService;

    public function __construct(UserPreferenceServiceInterface $preferenceService)
    {
        $this->preferenceService = $preferenceService;
    }

    public function execute(User $user, UpdateLocaleDTO $dto): User
    {
        return $this->preferenceService->updateLocale($user, $dto);
    }
}
