<?php

namespace App\Services;

use App\DTOs\RegisterUserDTO;
use App\Enums\UserRole;
use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Services\Contracts\UserServiceInterface;
use Illuminate\Support\Facades\Hash;

class UserService implements UserServiceInterface
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function registerUser(RegisterUserDTO $dto): User
    {
        /** @var User $user */
        $user = $this->userRepository->create([
            'name' => $dto->name,
            'nickname' => $dto->nickname,
            'email' => $dto->email,
            'password' => Hash::make($dto->password),
            'role' => $dto->role,
        ]);

        return $user;
    }

    public function getUserList(string $role = UserRole::USER->value): array
    {
        $users = $this->userRepository->getUsersByRole($role);

        return $users->map(fn (User $user) => [
            'id' => $user->id,
            'name' => $user->name,
            'nickname' => $user->nickname,
            'email' => $user->email,
            'role' => $user->role instanceof \App\Enums\UserRole ? $user->role->value : $user->role,
            'created_at' => $user->created_at?->translatedFormat('d M Y, H:i') ?? '-',
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
}
