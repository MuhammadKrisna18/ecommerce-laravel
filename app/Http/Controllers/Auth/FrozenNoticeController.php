<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FrozenNoticeController extends Controller
{

    public function __invoke(Request $request): Response|RedirectResponse
    {
        $user = $request->user();

        if (! $user || ! $user->is_frozen) {
            return redirect()->route('login');
        }

        return Inertia::render('Auth/FrozenNotice', [
            'userName' => $user->name,
            'frozenUntil' => $user->frozen_until?->translatedFormat('d F Y, H:i').' WIB',
            'durationText' => $user->frozen_duration_text ?? __('Sedang berlangsung'),
            'reason' => $user->frozen_reason ?: __('Pelanggaran ketentuan atau kebijakan komunitas.'),
            'supportEmail' => config('mail.from.address', 'support@k-tienda.test'),
        ]);
    }
}
