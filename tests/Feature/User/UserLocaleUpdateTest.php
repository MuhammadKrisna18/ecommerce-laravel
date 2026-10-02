<?php

namespace Tests\Feature\User;

use App\Enums\AppLocale;
use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserLocaleUpdateTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_update_locale_to_valid_locales(): void
    {
        $user = User::factory()->create([
            'role' => UserRole::USER,
            'locale' => 'id',
        ]);

        foreach (AppLocale::values() as $locale) {
            $response = $this
                ->actingAs($user)
                ->put(route('user.settings.locale.update'), [
                    'locale' => $locale,
                ]);

            $response
                ->assertSessionHasNoErrors()
                ->assertSessionHas('locale', $locale)
                ->assertRedirect();

            $user->refresh();
            $this->assertSame($locale, $user->locale);
        }
    }

    public function test_middleware_applies_user_preferred_locale(): void
    {
        $user = User::factory()->create([
            'role' => UserRole::USER,
            'locale' => 'en',
        ]);

        $this
            ->actingAs($user)
            ->get(route('user.settings.index'));

        $this->assertSame('en', app()->getLocale());
    }

    public function test_user_cannot_update_locale_with_invalid_value(): void
    {
        $user = User::factory()->create([
            'role' => UserRole::USER,
            'locale' => 'id',
        ]);

        $response = $this
            ->actingAs($user)
            ->from(route('user.settings.index'))
            ->put(route('user.settings.locale.update'), [
                'locale' => 'invalid_lang',
            ]);

        $response
            ->assertSessionHasErrors(['locale'])
            ->assertRedirect(route('user.settings.index'));

        $user->refresh();
        $this->assertSame('id', $user->locale);
    }

    public function test_user_cannot_update_locale_with_empty_value(): void
    {
        $user = User::factory()->create([
            'role' => UserRole::USER,
            'locale' => 'id',
        ]);

        $response = $this
            ->actingAs($user)
            ->from(route('user.settings.index'))
            ->put(route('user.settings.locale.update'), [
                'locale' => '',
            ]);

        $response
            ->assertSessionHasErrors(['locale'])
            ->assertRedirect(route('user.settings.index'));
    }

    public function test_unauthenticated_user_cannot_update_locale(): void
    {
        $this->put(route('user.settings.locale.update'), [
            'locale' => 'en',
        ])->assertRedirect(route('login'));
    }
}
