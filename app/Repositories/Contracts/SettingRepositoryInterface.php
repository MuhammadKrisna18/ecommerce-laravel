<?php

namespace App\Repositories\Contracts;

use App\Repositories\RepositoryInterface;

interface SettingRepositoryInterface extends RepositoryInterface
{
    /**
     * Get all settings as key => value pair.
     */
    public function getAllAsKeyValue(): array;

    /**
     * Get single setting value by key.
     */
    public function getByKey(string $key): ?string;

    /**
     * Update or create a setting key-value pair.
     */
    public function updateOrCreate(string $key, ?string $value): void;
}
