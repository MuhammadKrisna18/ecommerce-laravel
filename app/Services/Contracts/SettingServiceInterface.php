<?php

namespace App\Services\Contracts;

interface SettingServiceInterface
{
    public function getAllSettings(): array;

    public function getSetting(string $key, mixed $default = null): mixed;

    public function clearCache(): void;

    public function saveSettings(array $settings): bool;
}
