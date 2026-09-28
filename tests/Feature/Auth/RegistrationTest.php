<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function test_new_users_can_register(): void
    {
        $response = $this->post('/register', [
            'name' => 'Muhammad Krisna',
            'nickname' => 'Krisna',
            'email' => 'krisna@example.com',
            'password' => 'password123',
        ]);

        $this->assertAuthenticated();
        $this->assertDatabaseHas('users', [
            'email' => 'krisna@example.com',
            'nickname' => 'Krisna',
            'role' => 'user',
        ]);
        $response->assertRedirect(route('user.dashboard', absolute: false));
    }

    public function test_registration_fails_when_nickname_already_taken_case_insensitively(): void
    {
        // Pengguna pertama mendaftar dengan nama panggilan 'Krisna'
        $firstResponse = $this->post('/register', [
            'name' => 'Muhammad Krisna',
            'nickname' => 'Krisna',
            'email' => 'krisna1@example.com',
            'password' => 'password123',
        ]);
        $firstResponse->assertRedirect(route('user.dashboard', absolute: false));

        // Logout pengguna pertama agar request kedua tidak terhalang middleware 'guest'
        $this->post('/logout');

        // Pengguna kedua mendaftar dengan variasi huruf besar/kecil 'kRiSNA'
        $response = $this->post('/register', [
            'name' => 'Krisna Lain',
            'nickname' => 'kRiSNA',
            'email' => 'krisna2@example.com',
            'password' => 'password123',
        ]);

        $response->assertSessionHasErrors(['nickname']);
        $this->assertDatabaseMissing('users', [
            'email' => 'krisna2@example.com',
        ]);
    }
}
