<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! auth()->check()) {
            return redirect()->route('login');
        }

        $user = auth()->user();

        if (! $user->isAdmin()) {
            if ($user->isUser() && $request->routeIs('admin.dashboard')) {
                return redirect()->route('user.dashboard');
            }

            abort(403, __('Akses tidak diizinkan.'));
        }

        return $next($request);
    }
}
