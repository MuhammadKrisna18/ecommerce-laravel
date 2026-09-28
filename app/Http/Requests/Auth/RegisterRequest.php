<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'nickname' => ['required', 'string', 'max:100'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'string', Password::defaults()],
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => __('Nama Lengkap'),
            'nickname' => __('Nama Panggilan'),
            'email' => __('Alamat Email'),
            'password' => __('Kata Sandi'),
        ];
    }
}
