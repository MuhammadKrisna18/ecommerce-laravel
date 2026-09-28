<?php

namespace App\Services\Contracts;

interface SettingServiceInterface
{
    /**
     * Retrieve all cached settings.
     */
    public function getAllSettings(): array;

    /**
     * Get a specific setting value.
     */
    public function getSetting(string $key, mixed $default = null): mixed;

    /**
     * Clear the settings cache.
     */
    public function clearCache(): void;

    /**
     * Persist multiple settings and refresh cache.
     */
    public function saveSettings(array $settings): bool;
}
