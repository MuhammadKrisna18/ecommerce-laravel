<?php

namespace Tests\Feature\User;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class UserProfileTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_view_profile_page(): void
    {
        $user = User::factory()->create([
            'role' => UserRole::USER,
        ]);

        $response = $this
            ->actingAs($user)
            ->get(route('user.profile.edit'));

        $response->assertOk();
    }

    public function test_user_can_update_profile_information(): void
    {
        $user = User::factory()->create([
            'role' => UserRole::USER,
            'name' => 'Original Name',
            'nickname' => 'original',
        ]);

        $response = $this
            ->actingAs($user)
            ->patch(route('user.profile.update'), [
                'name' => 'Updated Name',
                'nickname' => 'updated_nick',
                'birth_date' => '1998-05-15',
                'birth_place' => 'Bandung',
                'address' => 'Jl. Asia Afrika No. 10',
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect();

        $user->refresh();

        $this->assertSame('Updated Name', $user->name);
        $this->assertSame('updated_nick', $user->nickname);
        $this->assertSame('1998-05-15', $user->birth_date?->format('Y-m-d'));
        $this->assertSame('Bandung', $user->birth_place);
        $this->assertSame('Jl. Asia Afrika No. 10', $user->address);
    }

    public function test_user_can_keep_own_nickname_without_unique_validation_error(): void
    {
        $user = User::factory()->create([
            'role' => UserRole::USER,
            'name' => 'John Doe',
            'nickname' => 'johndoe',
        ]);

        $response = $this
            ->actingAs($user)
            ->patch(route('user.profile.update'), [
                'name' => 'John Doe Updated',
                'nickname' => 'johndoe', 
            ]);

        $response->assertSessionHasNoErrors();
        $this->assertSame('John Doe Updated', $user->fresh()->name);
    }

    public function test_user_cannot_take_another_users_nickname(): void
    {
        User::factory()->create([
            'role' => UserRole::USER,
            'nickname' => 'existinguser',
        ]);

        $user = User::factory()->create([
            'role' => UserRole::USER,
            'nickname' => 'myownuser',
        ]);

        $response = $this
            ->actingAs($user)
            ->patch(route('user.profile.update'), [
                'name' => 'My User',
                'nickname' => 'ExistingUser', 
            ]);

        $response->assertSessionHasErrors('nickname');
    }

    public function test_user_can_upload_avatar(): void
    {
        Storage::fake('public');

        $user = User::factory()->create([
            'role' => UserRole::USER,
        ]);

        
        $fakeJpg = "\xFF\xD8\xFF\xE0\x00\x10JFIF\x00\x01\x01\x01\x00`\x00`\x00\x00\xFF\xDB\x00C\x00\x08\x06\x06\x07\x06\x05\x08\x07\x07\x07\t\t\x08\n\x0c\x14\r\x0c\x0b\x0b\x0c\x19\x12\x13\x0f\x14\x1d\x1a\x1f\x1e\x1d\x1a\x1c\x1c $.' \",#\x1c\x1c(7),01444\x1f'9=82<.342\xFF\xC0\x00\x0b\x08\x00\x01\x00\x01\x01\x01\x11\x00\xFF\xC4\x00\x1f\x00\x00\x01\x05\x01\x01\x01\x01\x01\x01\x00\x00\x00\x00\x00\x00\x00\x00\x01\x02\x03\x04\x05\x06\x07\x08\t\n\x0b\xFF\xDA\x00\x08\x01\x01\x00\x00?\x00\xbf\x00\xFF\xD9";
        $file = UploadedFile::fake()->createWithContent('avatar.jpg', $fakeJpg);

        $response = $this
            ->actingAs($user)
            ->post(route('user.profile.avatar.update'), [
                'avatar' => $file,
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect();

        $user->refresh();

        $this->assertNotNull($user->avatar);
        Storage::disk('public')->assertExists($user->avatar);
    }

    public function test_user_can_delete_avatar(): void
    {
        Storage::fake('public');

        $path = 'avatars/sample.jpg';
        Storage::disk('public')->put($path, 'fake content');

        $user = User::factory()->create([
            'role' => UserRole::USER,
            'avatar' => $path,
        ]);

        $response = $this
            ->actingAs($user)
            ->delete(route('user.profile.avatar.destroy'));

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect();

        $user->refresh();

        $this->assertNull($user->avatar);
        Storage::disk('public')->assertMissing($path);
    }
}
