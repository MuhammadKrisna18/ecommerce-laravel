<?php

namespace App\Services\Admin;

use App\Enums\UserRole;
use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Services\Contracts\Admin\AdminUserQueryServiceInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class AdminUserQueryService implements AdminUserQueryServiceInterface
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function getUserList(string $role = UserRole::USER->value): array
    {
        $users = $this->userRepository->getUsersByRole($role);

        return $users->map(fn (User $user) => [
            'id' => $user->id,
            'name' => $user->name,
            'nickname' => $user->nickname,
            'avatar_url' => $user->avatar_url,
            'email' => $user->email,
            'birth_date' => $user->birth_date?->format('d/m/Y') ?? null,
            'birth_place' => $user->birth_place,
            'address' => $user->address,
            'role' => $user->role instanceof \App\Enums\UserRole ? $user->role->value : $user->role,
            'created_at' => $user->created_at?->translatedFormat('d M Y, H:i') ?? '-',
            'updated_at' => $user->updated_at?->translatedFormat('d M Y, H:i') ?? '-',
        ])->toArray();
    }

    public function getDashboardStats(): array
    {
        $totalUsers = $this->userRepository->countByRole(UserRole::USER->value);
        $totalAdmins = $this->userRepository->countByRole(UserRole::ADMIN->value);

        return [
            'total_users' => $totalUsers,
            'total_admins' => $totalAdmins,
            'total_accounts' => $totalUsers + $totalAdmins,
        ];
    }

    public function getPaginatedUsers(int $perPage = 15): LengthAwarePaginator
    {
        return $this->userRepository->getPaginatedNonAdminUsers($perPage);
    }
}
