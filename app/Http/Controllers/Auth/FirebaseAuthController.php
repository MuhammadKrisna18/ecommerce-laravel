<?php

namespace App\Http\Controllers\Auth;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\FirebaseLoginRequest;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class FirebaseAuthController extends Controller
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Authenticate or register a user through Firebase Auth.
     */
    public function authenticate(FirebaseLoginRequest $request): JsonResponse
    {
        try {
            $email = $request->input('email');
            $name = $request->input('name') ?? explode('@', $email)[0];
            $avatar = $request->input('avatar');

            // Look up existing user
            $user = $this->userRepository->findByEmail($email);

            if (! $user) {
                // Generate unique nickname candidate
                $baseNickname = Str::slug(explode('@', $email)[0], '');
                if (empty($baseNickname)) {
                    $baseNickname = 'user';
                }
                $nickname = $baseNickname;
                $counter = 1;
                while ($this->userRepository->findByNicknameIgnoreCase($nickname)) {
                    $nickname = $baseNickname.$counter;
                    $counter++;
                }

                // Create new User
                $user = $this->userRepository->create([
                    'name' => $name,
                    'nickname' => $nickname,
                    'email' => $email,
                    'avatar' => $avatar,
                    'password' => Hash::make(Str::random(32)),
                    'role' => UserRole::USER->value,
                ]);
            }

            // Log the user in to the Laravel session
            Auth::login($user, true);
            $request->session()->regenerate();

            $targetUrl = $user->isAdmin() ? route('admin.dashboard') : route('user.dashboard');

            return response()->json([
                'status' => 'success',
                'redirect_url' => $targetUrl,
            ]);
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::error('Firebase authentication failed: '.$e->getMessage(), [
                'exception' => $e,
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Autentikasi gagal diproses di server: '.$e->getMessage(),
            ], 500);
        }
    }
}
