<?php

namespace App\Services\Admin;

use App\DTOs\FreezeUserDTO;
use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Services\Contracts\Admin\AdminUserManagementServiceInterface;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class AdminUserManagementService implements AdminUserManagementServiceInterface
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
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

        
        $updatedUser = $this->userRepository->find($user->id);

        return $updatedUser;
    }

    public function unfreezeUser(User $user): User
    {
        $this->userRepository->update($user->id, [
            'frozen_until' => null,
            'frozen_reason' => null,
        ]);

        
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
