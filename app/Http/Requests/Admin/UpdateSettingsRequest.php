<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSettingsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() && $this->user()->role === 'admin';
    }

    public function rules(): array
    {
        return [
            'store_name' => ['nullable', 'string', 'max:255'],
            'store_description' => ['nullable', 'string', 'max:1000'],
            'contact_email' => ['nullable', 'email', 'max:255'],
            'contact_phone' => ['nullable', 'string', 'max:20'],
            'app_language' => ['nullable', 'string', 'in:id,en,es'],
        ];
    }

    public function attributes(): array
    {
        return [
            'store_name' => 'Nama Toko',
            'store_description' => 'Deskripsi Toko',
            'contact_email' => 'Email Kontak',
            'contact_phone' => 'Nomor Telepon',
            'app_language' => 'Bahasa Aplikasi',
        ];
    }
}
