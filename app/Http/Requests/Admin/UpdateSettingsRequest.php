<?php

namespace App\Http\Requests\Admin;

use App\Constants\SettingKey;
use App\Enums\AppLocale;
use App\Enums\UserRole;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSettingsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() && $this->user()->role === UserRole::ADMIN->value;
    }

    public function rules(): array
    {
        return [
            SettingKey::STORE_NAME => ['nullable', 'string', 'max:255'],
            SettingKey::STORE_DESCRIPTION => ['nullable', 'string', 'max:1000'],
            SettingKey::CONTACT_EMAIL => ['nullable', 'email', 'max:255'],
            SettingKey::CONTACT_PHONE => ['nullable', 'string', 'max:20'],
            SettingKey::APP_LANGUAGE => ['nullable', 'string', Rule::in(AppLocale::values())],
        ];
    }

    public function attributes(): array
    {
        return [
            SettingKey::STORE_NAME => __('Nama Toko'),
            SettingKey::STORE_DESCRIPTION => __('Deskripsi Singkat'),
            SettingKey::CONTACT_EMAIL => __('Email Kontak'),
            SettingKey::CONTACT_PHONE => __('Nomor Telepon / WhatsApp'),
            SettingKey::APP_LANGUAGE => __('Bahasa Sistem'),
        ];
    }
}
