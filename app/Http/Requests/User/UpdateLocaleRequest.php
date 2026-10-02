<?php

namespace App\Http\Requests\User;

use App\Enums\AppLocale;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateLocaleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isUser() ?? false;
    }

    public function rules(): array
    {
        return [
            'locale' => ['required', 'string', Rule::in(AppLocale::values())],
        ];
    }

    public function attributes(): array
    {
        return [
            'locale' => __('Bahasa Sistem'),
        ];
    }
}
