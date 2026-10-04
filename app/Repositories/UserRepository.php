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

    public function findByNicknameIgnoreCase(string $nickname, int|string|null $ignoreUserId = null): ?User
    {
        return $this->model
            ->whereRaw('LOWER(nickname) = ?', [mb_strtolower(trim($nickname))])
            ->when($ignoreUserId, fn ($query) => $query->where('id', '!=', $ignoreUserId))
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

    public function getPaginatedNonAdminUsers(int $perPage = 15): \Illuminate\Contracts\Pagination\LengthAwarePaginator
    {
        return $this->model
            ->where('role', '!=', \App\Enums\UserRole::ADMIN->value)
            ->select(['id', 'name', 'email', 'avatar', 'role', 'frozen_until', 'frozen_reason', 'created_at'])
            ->latest()
            ->paginate($perPage);
    }

    public function getLatestUsers(int $limit): \Illuminate\Database\Eloquent\Collection
    {
        return $this->model->latest()->take($limit)->get();
    }

    public function countRegisteredInMonth(int $year, int $month): int
    {
        return $this->model->whereYear('created_at', $year)
            ->whereMonth('created_at', $month)
            ->count();
    }
}
