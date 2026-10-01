<?php

namespace Tests\Feature\Admin;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserManagementTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;
    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->create([
            'role' => UserRole::ADMIN->value,
        ]);

        $this->user = User::factory()->create([
            'role' => UserRole::USER->value,
            'frozen_until' => null,
            'frozen_reason' => null,
        ]);
    }

    public function test_admin_can_freeze_user_with_valid_verification_code(): void
    {
        $code = '7K2B';

        $response = $this->actingAs($this->admin)->post(route('admin.users.freeze', $this->user), [
            'duration_value' => 3,
            'duration_unit' => 'days',
            'reason' => 'Test freeze reason',
            'confirmation_code' => $code,
            'expected_code' => $code,
        ]);

        $response->assertRedirect();
        $this->user->refresh();

        $this->assertTrue($this->user->is_frozen);
        $this->assertEquals('Test freeze reason', $this->user->frozen_reason);
    }

    public function test_admin_cannot_freeze_user_with_invalid_verification_code(): void
    {
        $response = $this->actingAs($this->admin)->post(route('admin.users.freeze', $this->user), [
            'duration_value' => 3,
            'duration_unit' => 'days',
            'reason' => 'Test freeze reason',
            'confirmation_code' => 'AAAA',
            'expected_code' => 'BBBB',
        ]);

        $response->assertSessionHasErrors(['confirmation_code']);
        $this->user->refresh();

        $this->assertFalse($this->user->is_frozen);
    }

    public function test_admin_can_unfreeze_user(): void
    {
        $this->user->update([
            'frozen_until' => now()->addDays(5),
            'frozen_reason' => 'Reason',
        ]);

        $response = $this->actingAs($this->admin)->post(route('admin.users.unfreeze', $this->user));

        $response->assertRedirect();
        $this->user->refresh();

        $this->assertFalse($this->user->is_frozen);
        $this->assertNull($this->user->frozen_until);
    }

    public function test_admin_can_delete_user_with_valid_verification_code(): void
    {
        $code = '9X4C';

        $response = $this->actingAs($this->admin)->delete(route('admin.users.destroy', $this->user), [
            'confirmation_code' => $code,
            'expected_code' => $code,
        ]);

        $response->assertRedirect();
        $this->assertDatabaseMissing('users', ['id' => $this->user->id]);
    }

    public function test_frozen_user_is_redirected_to_frozen_notice(): void
    {
        $this->user->update([
            'frozen_until' => now()->addDays(2),
            'frozen_reason' => 'Dibekukan',
        ]);

        $response = $this->actingAs($this->user)->get(route('user.dashboard'));

        $response->assertRedirect(route('frozen.notice'));
    }
}
