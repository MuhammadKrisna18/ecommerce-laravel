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
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UserManagementController extends Controller
{

    public function show(User $user): \Inertia\Response
    {
        if ($user->isSeller()) {
            $user->load(['store.products']);
        } else {
            $user->load(['store']);
        }

        return \Inertia\Inertia::render('Admin/Users/Show', [
            'user' => clone $user,
        ]);
    }

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

    public function unfreeze(
        User $user,
        UnfreezeUserAction $action
    ): RedirectResponse {
        $action->execute($user);

        return redirect()->back()->with('success', __('Pembekuan akun :name telah berhasil dibuka.', [
            'name' => $user->name,
        ]));
    }

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

    public function generateVerificationCode(Request $request): \Illuminate\Http\JsonResponse
    {
        $code = strtoupper(Str::random(4));
        $request->session()->put('admin_verification_code', $code);

        return response()->json(['code' => $code]);
    }
}
