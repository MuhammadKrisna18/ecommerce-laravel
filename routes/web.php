<?php

use Illuminate\Support\Facades\Route;

Route::get('/', fn () => redirect()->route('login'));

// ── Admin routes ─────────────────────────────────────────────────────────────
Route::middleware(['auth', 'verified', 'admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])
            ->name('dashboard');

        Route::get('/settings', [\App\Http\Controllers\Admin\SettingsController::class, 'index'])
            ->name('settings.index');

        Route::post('/settings', [\App\Http\Controllers\Admin\SettingsController::class, 'update'])
            ->name('settings.update');

        // User account control routes
        Route::post('/users/{user}/freeze', [\App\Http\Controllers\Admin\UserManagementController::class, 'freeze'])
            ->name('users.freeze');
        Route::post('/users/{user}/unfreeze', [\App\Http\Controllers\Admin\UserManagementController::class, 'unfreeze'])
            ->name('users.unfreeze');
        Route::delete('/users/{user}', [\App\Http\Controllers\Admin\UserManagementController::class, 'destroy'])
            ->name('users.destroy');
    });

// ── Frozen Notice route ──────────────────────────────────────────────────────
Route::get('/account/frozen', \App\Http\Controllers\Auth\FrozenNoticeController::class)
    ->name('frozen.notice')
    ->middleware(['auth']);

// ── User routes ───────────────────────────────────────────────────────────────
Route::middleware(['auth', 'verified', 'user'])
    ->prefix('user')
    ->name('user.')
    ->group(function () {
        Route::get('/dashboard', [\App\Http\Controllers\User\DashboardController::class, 'index'])
            ->name('dashboard');

        Route::get('/profile', [\App\Http\Controllers\User\ProfileController::class, 'edit'])
            ->name('profile.edit');
        Route::patch('/profile', [\App\Http\Controllers\User\ProfileController::class, 'update'])
            ->name('profile.update');
        Route::post('/profile/avatar', [\App\Http\Controllers\User\ProfileController::class, 'updateAvatar'])
            ->name('profile.avatar.update');
        Route::delete('/profile/avatar', [\App\Http\Controllers\User\ProfileController::class, 'destroyAvatar'])
            ->name('profile.avatar.destroy');

        Route::get('/settings', [\App\Http\Controllers\User\SettingsController::class, 'index'])
            ->name('settings.index');
        Route::put('/settings/password', [\App\Http\Controllers\User\SettingsController::class, 'updatePassword'])
            ->name('settings.password.update');
        Route::put('/settings/locale', [\App\Http\Controllers\User\SettingsController::class, 'updateLocale'])
            ->name('settings.locale.update');
        Route::post('/settings/seller', [\App\Http\Controllers\User\SettingsController::class, 'upgradeToSeller'])
            ->name('settings.seller.upgrade');
    });

Route::middleware(['auth', 'verified', 'seller'])
    ->prefix('seller')
    ->name('seller.')
    ->group(function () {
        Route::get('/dashboard', [\App\Http\Controllers\Seller\DashboardController::class, 'index'])
            ->name('dashboard');
        Route::get('/products', [\App\Http\Controllers\Seller\ProductController::class, 'index'])
            ->name('products.index');
        Route::get('/settings', [\App\Http\Controllers\Seller\SettingsController::class, 'index'])
            ->name('settings.index');
    });

require __DIR__.'/auth.php';


