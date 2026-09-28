<?php

namespace App\Actions\Settings;

use App\DTOs\UpdateSettingsDTO;
use App\Services\Contracts\SettingServiceInterface;

class UpdateSettingsAction
{
    protected SettingServiceInterface $settingService;

    public function __construct(SettingServiceInterface $settingService)
    {
        $this->settingService = $settingService;
    }

    public function execute(UpdateSettingsDTO $dto): bool
    {
        return $this->settingService->saveSettings($dto->toFilteredArray());
    }
}
