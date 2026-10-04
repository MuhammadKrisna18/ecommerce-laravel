<?php

namespace App\Repositories\Contracts;

use App\Models\User;
use App\Repositories\RepositoryInterface;

interface UserRepositoryInterface extends RepositoryInterface
{
    public function findByEmail(string $email): ?User;

    public function findByNicknameIgnoreCase(string $nickname, int|string|null $ignoreUserId = null): ?User;

    public function getUsersByRole(string $role): \Illuminate\Database\Eloquent\Collection;

    public function countByRole(string $role): int;

    public function getPaginatedNonAdminUsers(int $perPage = 15): \Illuminate\Contracts\Pagination\LengthAwarePaginator;

    public function getLatestUsers(int $limit): \Illuminate\Database\Eloquent\Collection;

    public function countRegisteredInMonth(int $year, int $month): int;
}
