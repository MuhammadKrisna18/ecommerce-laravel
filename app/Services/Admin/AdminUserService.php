<?php

namespace App\Services\Admin;

use App\DTOs\FreezeUserDTO;
use App\Enums\UserRole;
use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Services\Contracts\Admin\AdminUserServiceInterface;
use Carbon\Carbon;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;

class AdminUserService implements AdminUserServiceInterface
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

    public function freezeUser(User $user, FreezeUserDTO $dto): User
    {
        $now = Carbon::now();

        $frozenUntil = match ($dto->durationUnit) {
            'hours' => $now->addHours($dto->durationValue),
            'days' => $now->addDays($dto->durationValue),
            'weeks' => $now->addWeeks($dto->durationValue),
            'months' => $now->addMonths($dto->durationValue),
            'years' => $now->addYears($dto->durationValue),
        };

        $this->userRepository->update($user->id, [
            'frozen_until' => $frozenUntil,
            'frozen_reason' => $dto->reason,
        ]);

        /** @var User $updatedUser */
        $updatedUser = $this->userRepository->find($user->id);

        return $updatedUser;
    }

    public function unfreezeUser(User $user): User
    {
        $this->userRepository->update($user->id, [
            'frozen_until' => null,
            'frozen_reason' => null,
        ]);

        /** @var User $updatedUser */
        $updatedUser = $this->userRepository->find($user->id);

        return $updatedUser;
    }

    public function deleteUser(User $user): bool
    {
        if ($user->avatar && ! filter_var($user->avatar, FILTER_VALIDATE_URL)) {
            Storage::disk('public')->delete($user->avatar);
        }

        return $this->userRepository->delete($user->id);
    }
}
