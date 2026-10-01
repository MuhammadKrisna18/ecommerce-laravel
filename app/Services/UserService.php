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

    public function updateProfile(User $user, \App\DTOs\UpdateProfileDTO $dto): User
    {
        $this->userRepository->update($user->id, [
            'name' => $dto->name,
            'nickname' => $dto->nickname,
            'birth_date' => $dto->birth_date ?: null,
            'birth_place' => $dto->birth_place ?: null,
            'address' => $dto->address ?: null,
        ]);

        /** @var User $updatedUser */
        $updatedUser = $this->userRepository->find($user->id);

        return $updatedUser;
    }

    public function updateAvatar(User $user, \Illuminate\Http\UploadedFile $file): User
    {
        // Delete previous avatar if stored locally
        if ($user->avatar && ! filter_var($user->avatar, FILTER_VALIDATE_URL)) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($user->avatar);
        }

        $path = $file->store('avatars', 'public');

        $this->userRepository->update($user->id, [
            'avatar' => $path,
        ]);

        /** @var User $updatedUser */
        $updatedUser = $this->userRepository->find($user->id);

        return $updatedUser;
    }

    public function deleteAvatar(User $user): User
    {
        if ($user->avatar && ! filter_var($user->avatar, FILTER_VALIDATE_URL)) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($user->avatar);
        }

        $this->userRepository->update($user->id, [
            'avatar' => null,
        ]);

        /** @var User $updatedUser */
        $updatedUser = $this->userRepository->find($user->id);

        return $updatedUser;
    }

    public function getPaginatedUsers(int $perPage = 15): \Illuminate\Contracts\Pagination\LengthAwarePaginator
    {
        return $this->userRepository->getPaginatedNonAdminUsers($perPage);
    }

    public function freezeUser(User $user, \App\DTOs\FreezeUserDTO $dto): User
    {
        $now = \Carbon\Carbon::now();

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
            \Illuminate\Support\Facades\Storage::disk('public')->delete($user->avatar);
        }

        return $this->userRepository->delete($user->id);
    }

    public function findOrCreateFromFirebase(\App\DTOs\FirebaseAuthDTO $dto): User
    {
        $user = $this->userRepository->findByEmail($dto->email);

        if ($user) {
            return $user;
        }

        // Generate unique nickname candidate
        $baseNickname = \Illuminate\Support\Str::slug(explode('@', $dto->email)[0], '');
        if (empty($baseNickname)) {
            $baseNickname = 'user';
        }
        $nickname = $baseNickname;
        $counter = 1;
        while ($this->userRepository->findByNicknameIgnoreCase($nickname)) {
            $nickname = $baseNickname.$counter;
            $counter++;
        }

        /** @var User $newUser */
        $newUser = $this->userRepository->create([
            'name' => $dto->name,
            'nickname' => $nickname,
            'email' => $dto->email,
            'avatar' => $dto->avatar,
            'password' => Hash::make(\Illuminate\Support\Str::random(32)),
            'role' => UserRole::USER->value,
        ]);

        return $newUser;
    }
}
