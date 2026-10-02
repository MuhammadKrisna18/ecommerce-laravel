<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Settings\UpdateSettingsAction;
use App\DTOs\UpdateSettingsDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateSettingsRequest;
use App\Services\Contracts\Admin\AdminUserServiceInterface;
use App\Services\Contracts\SettingServiceInterface;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends Controller
{
    protected SettingServiceInterface $settingService;
    protected AdminUserServiceInterface $adminUserService;

    public function __construct(
        SettingServiceInterface $settingService,
        AdminUserServiceInterface $adminUserService
    ) {
        $this->settingService = $settingService;
        $this->adminUserService = $adminUserService;
    }

    public function index(): Response
    {
        $settings = $this->settingService->getAllSettings();
        $users = $this->adminUserService->getPaginatedUsers(15);

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings,
            'users' => $users,
        ]);
    }

    public function update(
        UpdateSettingsRequest $request,
        UpdateSettingsAction $updateSettingsAction
    ): RedirectResponse {
        $dto = UpdateSettingsDTO::fromArray($request->validated());

        if ($updateSettingsAction->execute($dto)) {
            return redirect()->back()->with('success', __('Pengaturan berhasil disimpan.'));
        }

        return redirect()->back()->with('error', __('Gagal menyimpan pengaturan.'));
    }
}
