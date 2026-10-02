<?php

namespace App\Providers;

use App\Repositories\Contracts\SettingRepositoryInterface;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Repositories\SettingRepository;
use App\Repositories\UserRepository;
use App\Services\Admin\AdminUserManagementService;
use App\Services\Admin\AdminUserQueryService;
use App\Services\Admin\AdminUserService;
use App\Services\Auth\AuthService;
use App\Services\Contracts\Admin\AdminUserManagementServiceInterface;
use App\Services\Contracts\Admin\AdminUserQueryServiceInterface;
use App\Services\Contracts\Admin\AdminUserServiceInterface;
use App\Services\Contracts\Auth\AuthServiceInterface;
use App\Services\Contracts\SettingServiceInterface;
use App\Services\Contracts\User\UserAvatarServiceInterface;
use App\Services\Contracts\User\UserPasswordServiceInterface;
use App\Services\Contracts\User\UserProfileServiceInterface;
use App\Services\Contracts\User\UserServiceInterface as RoleUserServiceInterface;
use App\Services\Contracts\UserServiceInterface;
use App\Services\SettingService;
use App\Services\User\UserAvatarService;
use App\Services\User\UserPasswordService;
use App\Services\User\UserProfileService;
use App\Services\User\UserService as RoleUserService;
use App\Services\UserService;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // Settings bindings
        $this->app->bind(SettingRepositoryInterface::class, SettingRepository::class);
        $this->app->bind(SettingServiceInterface::class, SettingService::class);

        // User repository binding
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);

        // Granular Admin Services
        $this->app->bind(AdminUserQueryServiceInterface::class, AdminUserQueryService::class);
        $this->app->bind(AdminUserManagementServiceInterface::class, AdminUserManagementService::class);

        // Granular User Services
        $this->app->bind(UserProfileServiceInterface::class, UserProfileService::class);
        $this->app->bind(UserAvatarServiceInterface::class, UserAvatarService::class);
        $this->app->bind(UserPasswordServiceInterface::class, UserPasswordService::class);

        // Role-based service bindings
        $this->app->bind(AdminUserServiceInterface::class, AdminUserService::class);
        $this->app->bind(RoleUserServiceInterface::class, RoleUserService::class);
        $this->app->bind(AuthServiceInterface::class, AuthService::class);

        // Unified service binding for backward compatibility
        $this->app->bind(UserServiceInterface::class, UserService::class);
    }

    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
