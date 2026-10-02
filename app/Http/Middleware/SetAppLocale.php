<?php

namespace App\Http\Middleware;

use App\Constants\SettingKey;
use App\Enums\AppLocale;
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
        $user = $request->user();

        $language = $request->session()->get('locale')
            ?? $user?->locale
            ?? $this->settingService->getSetting(SettingKey::APP_LANGUAGE, config('app.locale'));

        if (! in_array($language, AppLocale::values(), true)) {
            $language = config('app.locale');
        }

        App::setLocale($language);

        return $next($request);
    }
}
