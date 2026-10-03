<?php

namespace App\Services\User;

use App\DTOs\UpgradeToSellerDTO;
use App\Enums\UserRole;
use App\Models\Store;
use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Services\Contracts\User\UserSellerServiceInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UserSellerService implements UserSellerServiceInterface
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function upgradeToSeller(User $user, UpgradeToSellerDTO $dto): User
    {
        return DB::transaction(function () use ($user, $dto) {
            $baseSlug = Str::slug($dto->store_name);
            $slug = $baseSlug;
            $counter = 1;

            while (Store::where('slug', $slug)->where('user_id', '!=', $user->id)->exists()) {
                $slug = $baseSlug . '-' . $counter;
                $counter++;
            }

            Store::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'name' => $dto->store_name,
                    'slug' => $slug,
                    'categories' => $dto->categories,
                    'description' => $dto->description,
                    'phone' => $dto->phone,
                    'city' => $dto->city,
                    'address' => $dto->store_address,
                    'status' => 'active',
                ]
            );

            $this->userRepository->update($user->id, [
                'role' => UserRole::SELLER->value,
                'address' => $user->address ?: $dto->store_address,
            ]);

            
            $updatedUser = $this->userRepository->find($user->id);

            return $updatedUser;
        });
    }
}
