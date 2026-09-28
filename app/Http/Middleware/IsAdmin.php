<?php

namespace App\Http\Middleware;

use App\Enums\UserRole;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        $userRole = auth()->user()->role;
        $roleValue = $userRole instanceof UserRole ? $userRole->value : $userRole;

        if (! auth()->check() || $roleValue !== UserRole::ADMIN->value) {
            abort(403, __('Akses tidak diizinkan.'));
        }

        return $next($request);
    }
}
