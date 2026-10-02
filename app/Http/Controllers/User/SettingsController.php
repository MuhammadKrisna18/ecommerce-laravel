<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
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
}
