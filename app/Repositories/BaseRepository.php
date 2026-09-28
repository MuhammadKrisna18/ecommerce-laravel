<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

abstract class BaseRepository implements RepositoryInterface
{
    protected Model $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function all(): Collection
    {
        return $this->model->all();
    }

    public function find(int|string $id): ?Model
    {
        return $this->model->find($id);
    }

    public function create(array $data): Model
    {
        return $this->model->create($data);
    }

    public function update(int|string $id, array $data): bool
    {
        $record = $this->find($id);
        if ($record) {
            return $record->update($data);
        }

        return false;
    }

    public function delete(int|string $id): bool
    {
        $record = $this->find($id);
        if ($record) {
            return $record->delete();
        }

        return false;
    }
}
