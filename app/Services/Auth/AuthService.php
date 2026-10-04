<?php

namespace App\Services\Auth;

use App\DTOs\FirebaseAuthDTO;
use App\DTOs\RegisterUserDTO;
use App\Enums\UserRole;
use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Services\Contracts\Auth\AuthServiceInterface;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthService implements AuthServiceInterface
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function registerUser(RegisterUserDTO $dto): User
    {
        
        $user = $this->userRepository->create([
            'name' => $dto->name,
            'nickname' => $dto->nickname,
            'email' => $dto->email,
            'password' => Hash::make($dto->password),
            'role' => $dto->role,
        ]);

        return $user;
    }

    public function findOrCreateFromFirebase(FirebaseAuthDTO $dto): User
    {
        $user = $this->userRepository->findByEmail($dto->email);

        if ($user) {
            return $user;
        }

        $baseNickname = Str::slug(explode('@', $dto->email)[0], '');
        if (empty($baseNickname)) {
            $baseNickname = 'user';
        }
        $nickname = $baseNickname;
        $counter = 1;
        while ($this->userRepository->findByNicknameIgnoreCase($nickname)) {
            $nickname = $baseNickname.$counter;
            $counter++;
        }

        $newUser = $this->userRepository->create([
            'name' => $dto->name,
            'nickname' => $nickname,
            'email' => $dto->email,
            'avatar' => $dto->avatar,
            'password' => Hash::make(Str::random(32)),
            'role' => UserRole::USER->value,
        ]);

        return $newUser;
    }
}
