<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class FirebaseLoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id_token' => ['nullable', 'string'],
            'email' => ['required', 'email'],
            'name' => ['nullable', 'string', 'max:255'],
            'avatar' => ['nullable', 'string'],
            'firebase_uid' => ['nullable', 'string'],
        ];
    }
}
