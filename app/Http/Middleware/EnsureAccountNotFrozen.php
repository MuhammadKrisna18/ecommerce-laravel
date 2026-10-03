<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAccountNotFrozen
{
    




    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user && $user->is_frozen) {
            
            if ($request->routeIs('frozen.notice') || $request->routeIs('logout')) {
                return $next($request);
            }

            return redirect()->route('frozen.notice');
        }

        return $next($request);
    }
}
