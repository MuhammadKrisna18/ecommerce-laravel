<?php

namespace App\Http\Middleware;

use App\Enums\UserRole;
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

        $userRole = auth()->user()->role;
        $roleValue = $userRole instanceof UserRole ? $userRole->value : $userRole;

        if ($roleValue !== UserRole::USER->value) {
            if ($roleValue === UserRole::ADMIN->value) {
                return redirect()->route('dashboard');
            }

            abort(403, __('Akses tidak diizinkan. Halaman ini khusus untuk pengguna.'));
        }

        return $next($request);
    }
}
