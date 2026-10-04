<?php

namespace App\Services\Contracts\Admin;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface AdminUserQueryServiceInterface
{
    public function getUserList(?string $role = null): array;

    public function getPaginatedUsers(int $perPage = 15): LengthAwarePaginator;
}
