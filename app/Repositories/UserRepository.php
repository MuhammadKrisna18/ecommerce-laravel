<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;

class UserRepository extends BaseRepository implements UserRepositoryInterface
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }

    public function findByEmail(string $email): ?User
    {
        return $this->model->where('email', $email)->first();
    }

    public function findByNicknameIgnoreCase(string $nickname): ?User
    {
        return $this->model
            ->whereRaw('LOWER(nickname) = ?', [mb_strtolower(trim($nickname))])
            ->first();
    }

    public function getUsersByRole(string $role): \Illuminate\Database\Eloquent\Collection
    {
        return $this->model->where('role', $role)->latest()->get();
    }

    public function countByRole(string $role): int
    {
        return $this->model->where('role', $role)->count();
    }

    public function getRecentUsers(int $limit = 5): \Illuminate\Database\Eloquent\Collection
    {
        return $this->model->latest()->take($limit)->get();
    }
}
