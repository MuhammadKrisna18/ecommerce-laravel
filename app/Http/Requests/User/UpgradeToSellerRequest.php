<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UpgradeToSellerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() && ! $this->user()->isAdmin();
    }

    public function rules(): array
    {
        return [
            'store_name' => ['required', 'string', 'min:4', 'regex:/^[\pL\s]+$/u', 'max:255'],
            'categories' => ['required', 'array', 'min:1'],
            'categories.*' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string', 'max:1000'],
            'owner_name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:25'],
            'city' => ['required', 'string', 'max:100'],
            'store_address' => ['required', 'string', 'max:500'],
            'agree_terms' => ['accepted'],
        ];
    }

    public function attributes(): array
    {
        return [
            'store_name' => __('Nama Toko'),
            'categories' => __('Kategori Produk'),
            'description' => __('Deskripsi Toko'),
            'owner_name' => __('Nama Pemilik'),
            'phone' => __('Nomor Telepon'),
            'city' => __('Kota / Kabupaten'),
            'store_address' => __('Alamat Lengkap Toko'),
            'agree_terms' => __('Syarat & Ketentuan'),
        ];
    }

    public function messages(): array
    {
        return [
            'store_name.required' => __('Nama toko wajib diisi.'),
            'store_name.min' => __('Nama toko minimal 4 karakter.'),
            'store_name.regex' => __('Nama toko hanya boleh berisi huruf.'),
            'categories.required' => __('Pilih minimal satu kategori produk.'),
            'categories.min' => __('Pilih minimal satu kategori produk.'),
            'owner_name.required' => __('Nama pemilik toko wajib diisi.'),
            'phone.required' => __('Nomor telepon wajib diisi.'),
            'city.required' => __('Kota atau kabupaten toko wajib diisi.'),
            'store_address.required' => __('Alamat lengkap penjemputan wajib diisi.'),
            'agree_terms.accepted' => __('Anda wajib menyetujui Syarat & Ketentuan Penjual.'),
        ];
    }
}
