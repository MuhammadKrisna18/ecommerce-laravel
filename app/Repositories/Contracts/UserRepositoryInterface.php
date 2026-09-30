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

    public function getRecentUsers(int $limit = 5): \Illuminate\Database\Eloquent\Collection;
}
