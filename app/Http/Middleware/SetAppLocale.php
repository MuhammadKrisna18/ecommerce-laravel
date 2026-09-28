<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Services\SettingService;
use Illuminate\Support\Facades\App;

class SetAppLocale
{
    protected SettingService $settingService;

    public function __construct(SettingService $settingService)
    {
        $this->settingService = $settingService;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Try to get language from settings, default to config('app.locale')
        $language = $this->settingService->getSetting('app_language', config('app.locale'));
        
        App::setLocale($language);

        return $next($request);
    }
}
