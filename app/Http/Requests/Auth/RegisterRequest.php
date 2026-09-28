<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Rules\UniqueNicknameIgnoreCase;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        parent::__construct();
        $this->userRepository = $userRepository;
    }

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'nickname' => ['required', 'string', 'max:100', new UniqueNicknameIgnoreCase($this->userRepository)],
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
