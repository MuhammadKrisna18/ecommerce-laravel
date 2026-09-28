<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\RegisterUserAction;
use App\DTOs\RegisterUserDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class RegisteredUserController extends Controller
{
    public function store(
        RegisterRequest $request,
        RegisterUserAction $registerUserAction
    ): RedirectResponse {
        $dto = RegisterUserDTO::fromArray($request->validated());

        $user = $registerUserAction->execute($dto);

        event(new Registered($user));

        Auth::login($user);

        return redirect()->intended(route('user.dashboard', absolute: false));
    }
}
