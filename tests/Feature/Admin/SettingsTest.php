<?php

namespace Tests\Feature\Admin;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SettingsTest extends TestCase
{
    use RefreshDatabase;

    public function test_non_admin_cannot_access_settings(): void
    {
        $user = User::factory()->create(['role' => 'user']);

        $response = $this->actingAs($user)->get(route('admin.settings.index'));

        $response->assertStatus(403);
    }

    public function test_admin_can_access_settings(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $response = $this->actingAs($admin)->get(route('admin.settings.index'));

        $response->assertStatus(200);
    }

    public function test_admin_can_update_settings_via_layered_architecture(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $response = $this->actingAs($admin)->post(route('admin.settings.update'), [
            'store_name' => 'Tokped Official Store',
            'contact_email' => 'support@tokped.test',
            'app_language' => 'id',
        ]);

        $response->assertSessionHas('success');
        $this->assertDatabaseHas('settings', [
            'key' => 'store_name',
            'value' => 'Tokped Official Store',
        ]);
        $this->assertDatabaseHas('settings', [
            'key' => 'contact_email',
            'value' => 'support@tokped.test',
        ]);
    }
}
