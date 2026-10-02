<?php

namespace App\Http\Controllers\User;

use App\Actions\User\UpdatePasswordAction;
use App\DTOs\UpdatePasswordDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\UpdatePasswordRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends Controller
{
    /**
     * Display the user account settings page.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        return Inertia::render('User/Settings/Index', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'nickname' => $user->nickname,
                'email' => $user->email,
                'avatar_url' => $user->avatar_url,
                'role' => $user->role instanceof \App\Enums\UserRole ? $user->role->value : $user->role,
                'created_at' => $user->created_at?->translatedFormat('d F Y'),
            ],
            'authProvider' => str_contains($user->email ?? '', '@gmail.com') ? 'google' : 'email',
            'locale' => app()->getLocale(),
        ]);
    }

    /**
     * Update the user password.
     */
    public function updatePassword(
        UpdatePasswordRequest $request,
        UpdatePasswordAction $updatePasswordAction
    ): RedirectResponse {
        $dto = UpdatePasswordDTO::fromArray($request->validated());

        $updatePasswordAction->execute($request->user(), $dto);

        return redirect()->back()->with('success', __('Kata sandi berhasil diperbarui.'));
    }
}
