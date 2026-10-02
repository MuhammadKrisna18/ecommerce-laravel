<?php

namespace App\Services\Contracts\Admin;

use App\DTOs\FreezeUserDTO;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface AdminUserServiceInterface
{
    public function getUserList(string $role = 'user'): array;

    public function getDashboardStats(): array;

    public function getPaginatedUsers(int $perPage = 15): LengthAwarePaginator;

    public function freezeUser(User $user, FreezeUserDTO $dto): User;

    public function unfreezeUser(User $user): User;

    public function deleteUser(User $user): bool;
}
