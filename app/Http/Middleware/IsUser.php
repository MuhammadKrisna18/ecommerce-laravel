<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsUser
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (! auth()->check()) {
            return redirect()->route('login');
        }

        $user = auth()->user();

        if (! $user->isUser() && ! $user->isSeller()) {
            if ($user->isAdmin()) {
                return redirect()->route('admin.dashboard');
            }

            abort(403, __('Akses tidak diizinkan. Halaman ini khusus untuk pengguna.'));
        }

        return $next($request);
    }
}
