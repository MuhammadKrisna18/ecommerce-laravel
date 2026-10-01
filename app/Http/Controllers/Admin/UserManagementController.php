<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Admin\DeleteUserAction;
use App\Actions\Admin\FreezeUserAction;
use App\Actions\Admin\UnfreezeUserAction;
use App\DTOs\FreezeUserDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\DeleteUserRequest;
use App\Http\Requests\Admin\FreezeUserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;

class UserManagementController extends Controller
{
    /**
     * Freeze a user account with custom duration.
     */
    public function freeze(
        FreezeUserRequest $request,
        User $user,
        FreezeUserAction $action
    ): RedirectResponse {
        if ($user->isAdmin()) {
            return redirect()->back()->with('error', __('Akun administrator tidak dapat dibekukan.'));
        }

        $dto = FreezeUserDTO::fromArray($request->validated());
        $action->execute($user, $dto);

        return redirect()->back()->with('success', __('Akun :name berhasil dibekukan.', [
            'name' => $user->name,
        ]));
    }

    /**
     * Unfreeze a user account immediately.
     */
    public function unfreeze(
        User $user,
        UnfreezeUserAction $action
    ): RedirectResponse {
        $action->execute($user);

        return redirect()->back()->with('success', __('Pembekuan akun :name telah berhasil dibuka.', [
            'name' => $user->name,
        ]));
    }

    /**
     * Permanently delete a user account from the database.
     */
    public function destroy(
        DeleteUserRequest $request,
        User $user,
        DeleteUserAction $action
    ): RedirectResponse {
        if ($user->isAdmin()) {
            return redirect()->back()->with('error', __('Akun administrator tidak dapat dihapus.'));
        }

        $userName = $user->name;
        $action->execute($user);

        return redirect()->back()->with('success', __('Akun :name berhasil dihapus permanen dari database.', [
            'name' => $userName,
        ]));
    }
}
