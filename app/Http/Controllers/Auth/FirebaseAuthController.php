<?php

namespace App\Http\Controllers\Auth;

use App\DTOs\FirebaseAuthDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\FirebaseLoginRequest;
use App\Services\Contracts\Auth\AuthServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class FirebaseAuthController extends Controller
{
    protected AuthServiceInterface $authService;

    public function __construct(AuthServiceInterface $authService)
    {
        $this->authService = $authService;
    }

    


    public function authenticate(FirebaseLoginRequest $request): JsonResponse
    {
        try {
            $dto = FirebaseAuthDTO::fromArray($request->validated());
            $user = $this->authService->findOrCreateFromFirebase($dto);

            
            Auth::login($user, true);
            $request->session()->regenerate();

            $targetUrl = $user->is_frozen
                ? route('frozen.notice')
                : ($user->isAdmin() ? route('admin.dashboard') : route('dashboard'));

            return response()->json([
                'status' => 'success',
                'redirect_url' => $targetUrl,
            ]);
        } catch (\Throwable $e) {
            Log::error('Firebase authentication failed: '.$e->getMessage(), [
                'exception' => $e,
            ]);

            return response()->json([
                'status' => 'error',
                'message' => __('Autentikasi gagal diproses di server: :msg', ['msg' => $e->getMessage()]),
            ], 500);
        }
    }
}
