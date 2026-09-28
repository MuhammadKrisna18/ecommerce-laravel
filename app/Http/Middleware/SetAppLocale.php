<?php

namespace App\Http\Middleware;

use App\Services\Contracts\SettingServiceInterface;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;

class SetAppLocale
{
    protected SettingServiceInterface $settingService;

    public function __construct(SettingServiceInterface $settingService)
    {
        $this->settingService = $settingService;
    }

    public function handle(Request $request, Closure $next): Response
    {

        $language = $this->settingService->getSetting('app_language', config('app.locale'));

        App::setLocale($language);

        return $next($request);
    }
}
