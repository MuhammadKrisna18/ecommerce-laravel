<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Settings\UpdateSettingsAction;
use App\DTOs\UpdateSettingsDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateSettingsRequest;
use App\Services\Contracts\SettingServiceInterface;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class SettingsController extends Controller
{
    protected SettingServiceInterface $settingService;

    public function __construct(SettingServiceInterface $settingService)
    {
        $this->settingService = $settingService;
    }

    /**
     * Display the settings management view.
     */
    public function index(): Response
    {
        $settings = $this->settingService->getAllSettings();

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update application settings.
     */
    public function update(
        UpdateSettingsRequest $request, 
        UpdateSettingsAction $updateSettingsAction
    ): RedirectResponse {
        $dto = UpdateSettingsDTO::fromArray($request->validated());

        if ($updateSettingsAction->execute($dto)) {
            return redirect()->back()->with('success', 'Pengaturan berhasil disimpan.');
        }

        return redirect()->back()->with('error', 'Gagal menyimpan pengaturan.');
    }
}
