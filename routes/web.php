<?php

use Illuminate\Support\Facades\Route;

Route::get('/', fn () => redirect()->route('login'));

// ── Admin routes ─────────────────────────────────────────────────────────────
Route::middleware(['auth', 'verified', 'admin', 'prevent-back-history'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])
            ->name('dashboard');

        Route::get('/settings', [\App\Http\Controllers\Admin\SettingsController::class, 'index'])
            ->name('settings.index');

        Route::post('/settings', [\App\Http\Controllers\Admin\SettingsController::class, 'update'])
            ->name('settings.update');
    });

// ── User routes ───────────────────────────────────────────────────────────────
Route::middleware(['auth', 'verified', 'user', 'prevent-back-history'])
    ->prefix('user')
    ->name('user.')
    ->group(function () {
        Route::get('/dashboard', [\App\Http\Controllers\User\DashboardController::class, 'index'])
            ->name('dashboard');
    });

require __DIR__.'/auth.php';

