<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Settings\UpdateSettingsAction;
use App\Http\Controllers\Controller;
use App\Services\SettingService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    protected SettingService $settingService;

    public function __construct(SettingService $settingService)
    {
        $this->settingService = $settingService;
    }

    public function index()
    {
        $settings = $this->settingService->getAllSettings();

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request, UpdateSettingsAction $updateSettingsAction)
    {
        $validated = $request->validate([
            'store_name' => 'nullable|string|max:255',
            'store_description' => 'nullable|string|max:1000',
            'contact_email' => 'nullable|email|max:255',
            'contact_phone' => 'nullable|string|max:20',
            'app_language' => 'nullable|string|in:id,en,es',
        ]);

        if ($updateSettingsAction->execute($validated)) {
            return redirect()->back()->with('success', 'Pengaturan berhasil disimpan.');
        }

        return redirect()->back()->with('error', 'Gagal menyimpan pengaturan.');
    }
}
