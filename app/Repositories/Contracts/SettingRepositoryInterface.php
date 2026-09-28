<?php

namespace App\Repositories\Contracts;

use App\Repositories\RepositoryInterface;

interface SettingRepositoryInterface extends RepositoryInterface
{
    public function getAllAsKeyValue(): array;

    public function getByKey(string $key): ?string;

    public function updateOrCreate(string $key, ?string $value): void;
}
