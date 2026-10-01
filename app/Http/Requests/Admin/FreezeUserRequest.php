<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FreezeUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() ?? false;
    }

    public function rules(): array
    {
        return [
            'duration_value' => ['required', 'integer', 'min:1', 'max:365'],
            'duration_unit' => ['required', Rule::in(['hours', 'days', 'weeks', 'months', 'years'])],
            'reason' => ['nullable', 'string', 'max:500'],
            'confirmation_code' => ['required', 'string', 'size:4'],
            'expected_code' => ['required', 'string', 'size:4'],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            $input = $this->input('confirmation_code');
            $expected = $this->input('expected_code');

            if ($input && $expected && strtoupper($input) !== strtoupper($expected)) {
                $validator->errors()->add('confirmation_code', __('Kode verifikasi salah. Harap ketik ulang 4 karakter yang ditampilkan.'));
            }
        });
    }

    public function attributes(): array
    {
        return [
            'duration_value' => __('Durasi'),
            'duration_unit' => __('Satuan Waktu'),
            'reason' => __('Alasan Pembekuan'),
            'confirmation_code' => __('Kode Verifikasi'),
        ];
    }
}
