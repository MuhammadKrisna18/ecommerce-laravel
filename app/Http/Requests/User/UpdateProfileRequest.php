<?php

namespace App\Http\Requests\User;

use App\Repositories\Contracts\UserRepositoryInterface;
use App\Rules\UniqueNicknameIgnoreCase;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        parent::__construct();
        $this->userRepository = $userRepository;
    }

    public function authorize(): bool
    {
        return $this->user() && ($this->user()->isUser() || $this->user()->isSeller());
    }

    public function rules(): array
    {
        $userId = $this->user()?->id;

        return [
            'name' => ['required', 'string', 'max:255'],
            'nickname' => [
                'required',
                'string',
                'max:100',
                new UniqueNicknameIgnoreCase($this->userRepository, $userId),
            ],
            'birth_date' => ['nullable', 'date', 'before:today'],
            'birth_place' => ['nullable', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:1000'],
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => __('Nama Lengkap'),
            'nickname' => __('Nama Panggilan / Username'),
            'birth_date' => __('Tanggal Lahir'),
            'birth_place' => __('Tempat Lahir'),
            'address' => __('Alamat Lengkap'),
        ];
    }
}
