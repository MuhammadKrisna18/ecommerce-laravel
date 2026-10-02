<?php

namespace App\Services\Admin;

use App\DTOs\FreezeUserDTO;
use App\Enums\UserRole;
use App\Models\User;
use App\Services\Contracts\Admin\AdminUserManagementServiceInterface;
use App\Services\Contracts\Admin\AdminUserQueryServiceInterface;
use App\Services\Contracts\Admin\AdminUserServiceInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class AdminUserService implements AdminUserServiceInterface
{
    protected AdminUserQueryServiceInterface $queryService;
    protected AdminUserManagementServiceInterface $managementService;

    public function __construct(
        AdminUserQueryServiceInterface $queryService,
        AdminUserManagementServiceInterface $managementService
    ) {
        $this->queryService = $queryService;
        $this->managementService = $managementService;
    }

    public function getUserList(string $role = UserRole::USER->value): array
    {
        return $this->queryService->getUserList($role);
    }

    public function getDashboardStats(): array
    {
        return $this->queryService->getDashboardStats();
    }

    public function getPaginatedUsers(int $perPage = 15): LengthAwarePaginator
    {
        return $this->queryService->getPaginatedUsers($perPage);
    }

    public function freezeUser(User $user, FreezeUserDTO $dto): User
    {
        return $this->managementService->freezeUser($user, $dto);
    }

    public function unfreezeUser(User $user): User
    {
        return $this->managementService->unfreezeUser($user);
    }

    public function deleteUser(User $user): bool
    {
        return $this->managementService->deleteUser($user);
    }
}
