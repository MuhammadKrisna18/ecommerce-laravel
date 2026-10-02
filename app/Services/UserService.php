<?php

namespace App\Services;

use App\DTOs\FirebaseAuthDTO;
use App\DTOs\FreezeUserDTO;
use App\DTOs\RegisterUserDTO;
use App\DTOs\UpdateProfileDTO;
use App\Models\User;
use App\Services\Admin\AdminUserService;
use App\Services\Auth\AuthService;
use App\Services\Contracts\UserServiceInterface;
use App\Services\User\UserService as RoleUserService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\UploadedFile;

/**
 * Unified facade service maintaining backward compatibility across roles.
 */
class UserService implements UserServiceInterface
{
    protected AdminUserService $adminUserService;

    protected RoleUserService $roleUserService;

    protected AuthService $authService;

    public function __construct(
        AdminUserService $adminUserService,
        RoleUserService $roleUserService,
        AuthService $authService
    ) {
        $this->adminUserService = $adminUserService;
        $this->roleUserService = $roleUserService;
        $this->authService = $authService;
    }

    // ── Auth Operations ──────────────────────────────────────────────────────────

    public function registerUser(RegisterUserDTO $dto): User
    {
        return $this->authService->registerUser($dto);
    }

    public function findOrCreateFromFirebase(FirebaseAuthDTO $dto): User
    {
        return $this->authService->findOrCreateFromFirebase($dto);
    }

    // ── Admin Operations ─────────────────────────────────────────────────────────

    public function getUserList(string $role = 'user'): array
    {
        return $this->adminUserService->getUserList($role);
    }

    public function getDashboardStats(): array
    {
        return $this->adminUserService->getDashboardStats();
    }

    public function getPaginatedUsers(int $perPage = 15): LengthAwarePaginator
    {
        return $this->adminUserService->getPaginatedUsers($perPage);
    }

    public function freezeUser(User $user, FreezeUserDTO $dto): User
    {
        return $this->adminUserService->freezeUser($user, $dto);
    }

    public function unfreezeUser(User $user): User
    {
        return $this->adminUserService->unfreezeUser($user);
    }

    public function deleteUser(User $user): bool
    {
        return $this->adminUserService->deleteUser($user);
    }

    // ── User Operations ──────────────────────────────────────────────────────────

    public function updateProfile(User $user, UpdateProfileDTO $dto): User
    {
        return $this->roleUserService->updateProfile($user, $dto);
    }

    public function updateAvatar(User $user, UploadedFile $file): User
    {
        return $this->roleUserService->updateAvatar($user, $file);
    }

    public function deleteAvatar(User $user): User
    {
        return $this->roleUserService->deleteAvatar($user);
    }

    public function updatePassword(User $user, string $newPassword): User
    {
        return $this->roleUserService->updatePassword($user, $newPassword);
    }

    public function updateLocale(User $user, \App\DTOs\UpdateLocaleDTO $dto): User
    {
        return $this->roleUserService->updateLocale($user, $dto);
    }
}
