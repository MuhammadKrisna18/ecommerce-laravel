<?php

namespace Tests\Unit\DTOs;

use App\DTOs\UpdateSettingsDTO;
use PHPUnit\Framework\TestCase;

class UpdateSettingsDTOTest extends TestCase
{
    /**
     * EP: Normal population with complete data
     */
    public function test_dto_populated_from_complete_array(): void
    {
        $payload = [
            'store_name' => 'Tokped Store',
            'store_description' => 'Toko Resmi',
            'contact_email' => 'admin@tokped.test',
            'contact_phone' => '08123456789',
            'app_language' => 'id',
        ];

        $dto = UpdateSettingsDTO::fromArray($payload);

        $this->assertEquals('Tokped Store', $dto->store_name);
        $this->assertEquals('Toko Resmi', $dto->store_description);
        $this->assertEquals('admin@tokped.test', $dto->contact_email);
        $this->assertEquals('08123456789', $dto->contact_phone);
        $this->assertEquals('id', $dto->app_language);
    }

    /**
     * BVA & EP: Filtering null values vs empty string
     */
    public function test_to_filtered_array_excludes_null_and_preserves_values(): void
    {
        $dto = new UpdateSettingsDTO;
        $dto->store_name = 'Toko Baru';
        $dto->contact_email = null;

        $filtered = $dto->toFilteredArray();

        $this->assertArrayHasKey('store_name', $filtered);
        $this->assertArrayNotHasKey('contact_email', $filtered);
        $this->assertArrayNotHasKey('store_description', $filtered);
    }

    /**
     * EP: Boundary check for unknown properties (unrecognized input partition)
     */
    public function test_dto_ignores_unknown_properties(): void
    {
        $payload = [
            'store_name' => 'Toko Aman',
            'malicious_key' => 'drop table users',
            'role' => 'admin',
        ];

        $dto = UpdateSettingsDTO::fromArray($payload);

        $this->assertEquals('Toko Aman', $dto->store_name);
        $this->assertArrayNotHasKey('malicious_key', $dto->toArray());
        $this->assertArrayNotHasKey('role', $dto->toArray());
    }
}
