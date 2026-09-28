<?php

namespace App\Actions\Settings;

use App\Repositories\SettingRepository;
use App\Services\SettingService;
use Illuminate\Support\Facades\DB;

class UpdateSettingsAction
{
    protected SettingRepository $settingRepository;
    protected SettingService $settingService;

    public function __construct(SettingRepository $settingRepository, SettingService $settingService)
    {
        $this->settingRepository = $settingRepository;
        $this->settingService = $settingService;
    }

    public function execute(array $settingsData): bool
    {
        DB::beginTransaction();

        try {
            foreach ($settingsData as $key => $value) {
                $this->settingRepository->updateOrCreate($key, $value);
            }
            
            DB::commit();
            
            // Clear cache so the new settings take effect immediately
            $this->settingService->clearCache();
            
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            return false;
        }
    }
}
