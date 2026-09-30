<?php

namespace App\Http\Controllers\User;

use App\Actions\Profile\DeleteAvatarAction;
use App\Actions\Profile\UpdateAvatarAction;
use App\Actions\Profile\UpdateProfileAction;
use App\DTOs\UpdateProfileDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\UpdateAvatarRequest;
use App\Http\Requests\User\UpdateProfileRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function edit(Request $request): Response
    {
        $user = $request->user();

        return Inertia::render('User/Profile', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'nickname' => $user->nickname,
                'avatar' => $user->avatar,
                'avatar_url' => $user->avatar_url,
                'birth_date' => $user->birth_date?->format('Y-m-d'),
                'birth_place' => $user->birth_place,
                'address' => $user->address,
                'email' => $user->email,
                'role' => $user->role instanceof \App\Enums\UserRole ? $user->role->value : $user->role,
                'created_at' => $user->created_at?->translatedFormat('d F Y'),
            ],
        ]);
    }

    public function update(
        UpdateProfileRequest $request,
        UpdateProfileAction $updateProfileAction
    ): RedirectResponse {
        $dto = UpdateProfileDTO::fromArray($request->validated());

        $updateProfileAction->execute($request->user(), $dto);

        return redirect()->back()->with('success', __('Profil berhasil diperbarui.'));
    }

    public function updateAvatar(
        UpdateAvatarRequest $request,
        UpdateAvatarAction $updateAvatarAction
    ): RedirectResponse {
        $file = $request->file('avatar');

        $updateAvatarAction->execute($request->user(), $file);

        return redirect()->back()->with('success', __('Foto profil berhasil diperbarui.'));
    }

    public function destroyAvatar(
        Request $request,
        DeleteAvatarAction $deleteAvatarAction
    ): RedirectResponse {
        $deleteAvatarAction->execute($request->user());

        return redirect()->back()->with('success', __('Foto profil berhasil dihapus.'));
    }
}
