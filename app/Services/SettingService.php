<?php

namespace App\Services;

use App\Repositories\Contracts\SettingRepositoryInterface;
use App\Services\Contracts\SettingServiceInterface;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class SettingService implements SettingServiceInterface
{
    protected SettingRepositoryInterface $settingRepository;
    const CACHE_KEY = 'app_settings';

    public function __construct(SettingRepositoryInterface $settingRepository)
    {
        $this->settingRepository = $settingRepository;
    }

    public function getAllSettings(): array
    {
        return Cache::rememberForever(self::CACHE_KEY, function () {
            return $this->settingRepository->getAllAsKeyValue();
        });
    }

    public function getSetting(string $key, mixed $default = null): mixed
    {
        $settings = $this->getAllSettings();
        return $settings[$key] ?? $default;
    }

    public function clearCache(): void
    {
        Cache::forget(self::CACHE_KEY);
    }

    public function saveSettings(array $settings): bool
    {
        DB::beginTransaction();

        try {
            foreach ($settings as $key => $value) {
                $this->settingRepository->updateOrCreate($key, $value);
            }

            DB::commit();
            $this->clearCache();

            return true;
        } catch (\Throwable $e) {
            DB::rollBack();
            return false;
        }
    }
}
