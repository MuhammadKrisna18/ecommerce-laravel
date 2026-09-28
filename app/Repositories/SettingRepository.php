<?php

namespace App\Repositories;

use App\Models\Setting;
use Illuminate\Database\Eloquent\Collection;

class SettingRepository extends BaseRepository
{
    public function __construct(Setting $model)
    {
        parent::__construct($model);
    }

    public function getAllAsKeyValue(): array
    {
        return $this->model->pluck('value', 'key')->toArray();
    }

    public function getByKey(string $key): ?string
    {
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
