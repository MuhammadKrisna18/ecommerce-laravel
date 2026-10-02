<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdatePasswordRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isUser() ?? false;
    }

    public function rules(): array
    {
        return [
            'current_password' => ['required', 'string', 'current_password'],
            'password' => ['required', 'string', Password::defaults(), 'confirmed'],
            'password_confirmation' => ['required', 'string'],
        ];
    }

    public function attributes(): array
    {
        return [
            'current_password' => __('Kata Sandi Saat Ini'),
            'password' => __('Kata Sandi Baru'),
            'password_confirmation' => __('Konfirmasi Kata Sandi Baru'),
        ];
    }

    public function messages(): array
    {
        return [
            'current_password.current_password' => __('Kata sandi saat ini tidak cocok.'),
            'password.confirmed' => __('Konfirmasi kata sandi tidak cocok.'),
        ];
    }
}
