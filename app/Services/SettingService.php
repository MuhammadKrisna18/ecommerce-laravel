<?php

namespace App\Services;

use App\Repositories\SettingRepository;
use Illuminate\Support\Facades\Cache;

class SettingService
{
    protected SettingRepository $settingRepository;
    const CACHE_KEY = 'app_settings';

    public function __construct(SettingRepository $settingRepository)
    {
        $this->settingRepository = $settingRepository;
    }

    public function getAllSettings(): array
    {
        return Cache::rememberForever(self::CACHE_KEY, function () {
            return $this->settingRepository->getAllAsKeyValue();
        });
    }

    public function getSetting(string $key, $default = null)
    {
        $settings = $this->getAllSettings();
        return $settings[$key] ?? $default;
    }

    public function clearCache(): void
    {
        Cache::forget(self::CACHE_KEY);
    }
}
