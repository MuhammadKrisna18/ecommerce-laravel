<?php

namespace Tests\Feature\User;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class UserPasswordUpdateTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_view_settings_page(): void
    {
        $user = User::factory()->create([
            'role' => UserRole::USER,
        ]);

        $response = $this
            ->actingAs($user)
            ->get(route('user.settings.index'));

        $response->assertOk();
    }

    public function test_user_can_update_password_with_valid_current_password(): void
    {
        $user = User::factory()->create([
            'role' => UserRole::USER,
            'password' => Hash::make('OldPassword123'),
        ]);

        $response = $this
            ->actingAs($user)
            ->put(route('user.settings.password.update'), [
                'current_password' => 'OldPassword123',
                'password' => 'NewPassword123!',
                'password_confirmation' => 'NewPassword123!',
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect();

        $user->refresh();

        $this->assertTrue(Hash::check('NewPassword123!', $user->password));
    }

    public function test_user_cannot_update_password_with_incorrect_current_password(): void
    {
        $user = User::factory()->create([
            'role' => UserRole::USER,
            'password' => Hash::make('OldPassword123'),
        ]);

        $response = $this
            ->actingAs($user)
            ->from(route('user.settings.index'))
            ->put(route('user.settings.password.update'), [
                'current_password' => 'WrongPassword123',
                'password' => 'NewPassword123!',
                'password_confirmation' => 'NewPassword123!',
            ]);

        $response
            ->assertSessionHasErrors(['current_password'])
            ->assertRedirect(route('user.settings.index'));

        $user->refresh();

        $this->assertTrue(Hash::check('OldPassword123', $user->password));
    }

    public function test_user_cannot_update_password_if_confirmation_does_not_match(): void
    {
        $user = User::factory()->create([
            'role' => UserRole::USER,
            'password' => Hash::make('OldPassword123'),
        ]);

        $response = $this
            ->actingAs($user)
            ->from(route('user.settings.index'))
            ->put(route('user.settings.password.update'), [
                'current_password' => 'OldPassword123',
                'password' => 'NewPassword123!',
                'password_confirmation' => 'DifferentPassword123!',
            ]);

        $response
            ->assertSessionHasErrors(['password'])
            ->assertRedirect(route('user.settings.index'));

        $user->refresh();

        $this->assertTrue(Hash::check('OldPassword123', $user->password));
    }

    public function test_user_cannot_update_password_below_minimum_length(): void
    {
        $user = User::factory()->create([
            'role' => UserRole::USER,
            'password' => Hash::make('OldPassword123'),
        ]);

        $response = $this
            ->actingAs($user)
            ->from(route('user.settings.index'))
            ->put(route('user.settings.password.update'), [
                'current_password' => 'OldPassword123',
                'password' => 'short',
                'password_confirmation' => 'short',
            ]);

        $response
            ->assertSessionHasErrors(['password'])
            ->assertRedirect(route('user.settings.index'));
    }

    public function test_unauthenticated_cannot_access_settings_or_update_password(): void
    {
        $this->get(route('user.settings.index'))
            ->assertRedirect(route('login'));

        $this->put(route('user.settings.password.update'), [
            'current_password' => 'OldPassword123',
            'password' => 'NewPassword123!',
            'password_confirmation' => 'NewPassword123!',
        ])->assertRedirect(route('login'));
    }
}
