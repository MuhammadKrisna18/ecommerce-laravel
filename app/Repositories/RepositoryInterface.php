<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

interface RepositoryInterface
{
    public function all(): Collection;

    public function find(int|string $id): ?Model;

    public function create(array $data): Model;

    public function update(int|string $id, array $data): bool;

    public function delete(int|string $id): bool;
}
