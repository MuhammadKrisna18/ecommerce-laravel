<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAccountNotFrozen
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user && $user->is_frozen) {
            // Allow logout and frozen notice page itself
            if ($request->routeIs('frozen.notice') || $request->routeIs('logout')) {
                return $next($request);
            }

            return redirect()->route('frozen.notice');
        }

        return $next($request);
    }
}
