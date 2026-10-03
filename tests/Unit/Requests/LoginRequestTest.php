<?php

namespace Tests\Unit\Requests;

use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;

class LoginRequestTest extends TestCase
{
    private function validate(array $data): \Illuminate\Validation\Validator
    {
        $request = new LoginRequest;

        return Validator::make($data, $request->rules());
    }

    


    public function test_email_valid_partition(): void
    {
        $data = [
            'email' => 'admin@laravel.test',
            'password' => 'secret123',
        ];
        $validator = $this->validate($data);

        $this->assertFalse($validator->errors()->has('email'));
    }

    public function test_email_invalid_format_partition(): void
    {
        $data = [
            'email' => 'invalid-email-address',
            'password' => 'secret123',
        ];
        $validator = $this->validate($data);

        $this->assertTrue($validator->errors()->has('email'));
    }

    public function test_email_missing_required_partition(): void
    {
        $data = [
            'password' => 'secret123',
        ];
        $validator = $this->validate($data);

        $this->assertTrue($validator->errors()->has('email'));
    }

    


    public function test_password_valid_partition(): void
    {
        $data = [
            'email' => 'admin@laravel.test',
            'password' => 'any-valid-password',
        ];
        $validator = $this->validate($data);

        $this->assertFalse($validator->errors()->has('password'));
    }

    public function test_password_boundary_empty_string_invalid(): void
    {
        $data = [
            'email' => 'admin@laravel.test',
            'password' => '',
        ];
        $validator = $this->validate($data);

        $this->assertTrue($validator->errors()->has('password'));
    }

    public function test_password_boundary_single_char_valid(): void
    {
        $data = [
            'email' => 'admin@laravel.test',
            'password' => 'p',
        ];
        $validator = $this->validate($data);

        $this->assertFalse($validator->errors()->has('password'));
    }
}
