<?php

namespace App\Http\Controllers\User;

use App\Actions\User\UpdateLocaleAction;
use App\Actions\User\UpdatePasswordAction;
use App\Actions\User\UpgradeToSellerAction;
use App\DTOs\UpdateLocaleDTO;
use App\DTOs\UpdatePasswordDTO;
use App\DTOs\UpgradeToSellerDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\UpdateLocaleRequest;
use App\Http\Requests\User\UpdatePasswordRequest;
use App\Http\Requests\User\UpgradeToSellerRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user()->loadMissing('store');

        return Inertia::render('User/Settings/Index', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'nickname' => $user->nickname,
                'email' => $user->email,
                'avatar_url' => $user->avatar_url,
                'role' => $user->role instanceof \App\Enums\UserRole ? $user->role->value : $user->role,
                'created_at' => $user->created_at?->translatedFormat('d F Y'),
                'store' => $user->store ? [
                    'name' => $user->store->name,
                    'slug' => $user->store->slug,
                    'categories' => $user->store->categories,
                    'description' => $user->store->description,
                    'phone' => $user->store->phone,
                    'city' => $user->store->city,
                    'address' => $user->store->address,
                    'status' => $user->store->status,
                ] : null,
            ],
            'authProvider' => str_contains($user->email ?? '', '@gmail.com') ? 'google' : 'email',
            'locale' => app()->getLocale(),
        ]);
    }

    public function updatePassword(
        UpdatePasswordRequest $request,
        UpdatePasswordAction $updatePasswordAction
    ): RedirectResponse {
        $dto = UpdatePasswordDTO::fromArray($request->validated());

        $updatePasswordAction->execute($request->user(), $dto);

        return redirect()->back()->with('success', __('Kata sandi berhasil diperbarui.'));
    }

    public function updateLocale(
        UpdateLocaleRequest $request,
        UpdateLocaleAction $updateLocaleAction
    ): RedirectResponse {
        $dto = UpdateLocaleDTO::fromArray($request->validated());

        $updateLocaleAction->execute($request->user(), $dto);

        return redirect()->back()->with('success', __('Preferensi bahasa berhasil diperbarui.'));
    }

    public function upgradeToSeller(
        UpgradeToSellerRequest $request,
        UpgradeToSellerAction $upgradeToSellerAction
    ): RedirectResponse {
        $dto = UpgradeToSellerDTO::fromArray($request->validated());

        $upgradeToSellerAction->execute($request->user(), $dto);

        return redirect()->back()->with('success', __('Selamat! Akun Anda berhasil diubah menjadi akun Seller K-Tienda en Línea.'));
    }
}
