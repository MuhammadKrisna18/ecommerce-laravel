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
        $response->assertRedirect(route('dashboard', absolute: false));
    }
}
