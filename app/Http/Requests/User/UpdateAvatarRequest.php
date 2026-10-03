<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAvatarRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() && ($this->user()->isUser() || $this->user()->isSeller());
    }

    public function rules(): array
    {
        return [
            'avatar' => [
                'required',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048', 
            ],
        ];
    }

    public function attributes(): array
    {
        return [
            'avatar' => __('Foto Profil'),
        ];
    }
}
