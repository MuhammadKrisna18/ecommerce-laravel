<?php

namespace Tests\Feature\User;

use App\Enums\UserRole;
use App\Models\Store;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserSellerUpgradeTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_upgrade_to_seller_with_valid_data(): void
    {
        $user = User::factory()->create([
            'role' => UserRole::USER,
        ]);

        $payload = [
            'store_name' => 'Berkah Jaya Abadi',
            'categories' => ['electronics', 'fashion'],
            'description' => 'Toko resmi peralatan gadget dan fashion',
            'owner_name' => 'Budi Santoso',
            'phone' => '081234567890',
            'city' => 'Jakarta Selatan',
            'store_address' => 'Jl. Kemang Raya No. 10',
            'agree_terms' => true,
        ];

        $response = $this
            ->actingAs($user)
            ->post(route('user.settings.seller.upgrade'), $payload);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect();

        $user->refresh();
        $this->assertSame(UserRole::SELLER, $user->role);
        $this->assertTrue($user->isSeller());

        $this->assertDatabaseHas('stores', [
            'user_id' => $user->id,
            'name' => 'Berkah Jaya Abadi',
            'phone' => '081234567890',
            'city' => 'Jakarta Selatan',
        ]);

        $store = Store::where('user_id', $user->id)->first();
        $this->assertNotNull($store);
        $this->assertSame(['electronics', 'fashion'], $store->categories);
    }

    public function test_store_name_must_be_at_least_4_characters(): void
    {
        $user = User::factory()->create([
            'role' => UserRole::USER,
        ]);

        $response = $this
            ->actingAs($user)
            ->post(route('user.settings.seller.upgrade'), [
                'store_name' => 'Abc',
                'categories' => ['electronics'],
                'owner_name' => 'Budi Santoso',
                'phone' => '081234567890',
                'city' => 'Jakarta Selatan',
                'store_address' => 'Jl. Kemang Raya No. 10',
                'agree_terms' => true,
            ]);

        $response->assertSessionHasErrors('store_name');
    }

    public function test_store_name_must_only_contain_letters(): void
    {
        $user = User::factory()->create([
            'role' => UserRole::USER,
        ]);

        $response = $this
            ->actingAs($user)
            ->post(route('user.settings.seller.upgrade'), [
                'store_name' => 'Toko 123 Elektronik',
                'categories' => ['electronics'],
                'owner_name' => 'Budi Santoso',
                'phone' => '081234567890',
                'city' => 'Jakarta Selatan',
                'store_address' => 'Jl. Kemang Raya No. 10',
                'agree_terms' => true,
            ]);

        $response->assertSessionHasErrors('store_name');
    }

    public function test_product_categories_cannot_be_empty(): void
    {
        $user = User::factory()->create([
            'role' => UserRole::USER,
        ]);

        $response = $this
            ->actingAs($user)
            ->post(route('user.settings.seller.upgrade'), [
                'store_name' => 'Toko Sukses',
                'categories' => [],
                'owner_name' => 'Budi Santoso',
                'phone' => '081234567890',
                'city' => 'Jakarta Selatan',
                'store_address' => 'Jl. Kemang Raya No. 10',
                'agree_terms' => true,
            ]);

        $response->assertSessionHasErrors('categories');
    }

    public function test_description_is_optional(): void
    {
        $user = User::factory()->create([
            'role' => UserRole::USER,
        ]);

        $response = $this
            ->actingAs($user)
            ->post(route('user.settings.seller.upgrade'), [
                'store_name' => 'Toko Sukses',
                'categories' => ['electronics'],
                'description' => null,
                'owner_name' => 'Budi Santoso',
                'phone' => '081234567890',
                'city' => 'Jakarta Selatan',
                'store_address' => 'Jl. Kemang Raya No. 10',
                'agree_terms' => true,
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect();
    }

    public function test_store_owner_personal_details_must_all_be_filled(): void
    {
        $user = User::factory()->create([
            'role' => UserRole::USER,
        ]);

        $response = $this
            ->actingAs($user)
            ->post(route('user.settings.seller.upgrade'), [
                'store_name' => 'Toko Sukses',
                'categories' => ['electronics'],
                'owner_name' => '',
                'phone' => '',
                'city' => '',
                'store_address' => '',
                'agree_terms' => false,
            ]);

        $response->assertSessionHasErrors([
            'owner_name',
            'phone',
            'city',
            'store_address',
            'agree_terms',
        ]);
    }

    public function test_guest_cannot_upgrade_to_seller(): void
    {
        $response = $this->post(route('user.settings.seller.upgrade'), [
            'store_name' => 'Toko Sukses',
            'categories' => ['electronics'],
            'owner_name' => 'Budi Santoso',
            'phone' => '081234567890',
            'city' => 'Jakarta Selatan',
            'store_address' => 'Jl. Kemang Raya No. 10',
            'agree_terms' => true,
        ]);

        $response->assertRedirect(route('login'));
    }
}
