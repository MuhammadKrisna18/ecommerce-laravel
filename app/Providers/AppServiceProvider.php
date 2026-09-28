<?php

namespace App\Providers;

use App\Repositories\Contracts\SettingRepositoryInterface;
use App\Repositories\SettingRepository;
use App\Services\Contracts\SettingServiceInterface;
use App\Services\SettingService;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {

        $this->app->bind(SettingRepositoryInterface::class, SettingRepository::class);

        $this->app->bind(SettingServiceInterface::class, SettingService::class);
    }

    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
