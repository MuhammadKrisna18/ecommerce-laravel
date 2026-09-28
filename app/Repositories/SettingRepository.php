<?php

namespace App\Repositories;

use App\Models\Setting;
use App\Repositories\Contracts\SettingRepositoryInterface;

class SettingRepository extends BaseRepository implements SettingRepositoryInterface
{
    public function __construct(Setting $model)
    {
        parent::__construct($model);
    }

    public function getAllAsKeyValue(): array
    {
        if (!\Illuminate\Support\Facades\Schema::hasTable($this->model->getTable())) {
            return [];
        }

        return $this->model->pluck('value', 'key')->toArray();
    }

    public function getByKey(string $key): ?string
    {
        if (!\Illuminate\Support\Facades\Schema::hasTable($this->model->getTable())) {
            return null;
        }

        $setting = $this->model->where('key', $key)->first();
        return $setting ? $setting->value : null;
    }

    public function updateOrCreate(string $key, ?string $value): void
    {
        $this->model->updateOrCreate(
            ['key' => $key],
            ['value' => $value]
        );
    }
}
