<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureIsSeller
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! auth()->check()) {
            return redirect()->route('login');
        }

        $user = auth()->user();

        if (! $user->isSeller()) {
            return redirect()->route('user.settings.index')
                ->with('error', __('Anda belum terdaftar sebagai penjual. Silakan buka toko terlebih dahulu.'));
        }

        return $next($request);
    }
}
