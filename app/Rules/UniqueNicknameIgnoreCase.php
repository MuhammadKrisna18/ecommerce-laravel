<?php

namespace App\Rules;

use App\Repositories\Contracts\UserRepositoryInterface;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class UniqueNicknameIgnoreCase implements ValidationRule
{
    protected UserRepositoryInterface $userRepository;

    protected int|string|null $ignoreUserId;

    public function __construct(UserRepositoryInterface $userRepository, int|string|null $ignoreUserId = null)
    {
        $this->userRepository = $userRepository;
        $this->ignoreUserId = $ignoreUserId;
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! is_string($value) || trim($value) === '') {
            return;
        }

        $existingUser = $this->userRepository->findByNicknameIgnoreCase($value, $this->ignoreUserId);

        if ($existingUser) {
            $fail(__('Nama panggilan sudah digunakan. Silakan pilih nama panggilan lain.'));
        }
    }
}
