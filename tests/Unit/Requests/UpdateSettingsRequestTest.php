<?php

namespace Tests\Unit;

use App\Constants\SettingKey;
use App\Enums\AppLocale;
use App\Http\Requests\Admin\UpdateSettingsRequest;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;

class UpdateSettingsRequestTest extends TestCase
{
    private function validate(array $data): \Illuminate\Validation\Validator
    {
        $request = new UpdateSettingsRequest;

        return Validator::make($data, $request->rules());
    }

    /**
     * BVA & EP: Store Name (nullable, string, max:255)
     */
    public function test_store_name_boundary_valid_at_255_chars(): void
    {
        $data = [SettingKey::STORE_NAME => str_repeat('a', 255)];
        $validator = $this->validate($data);

        $this->assertFalse($validator->errors()->has(SettingKey::STORE_NAME));
    }

    public function test_store_name_boundary_invalid_at_256_chars(): void
    {
        $data = [SettingKey::STORE_NAME => str_repeat('a', 256)];
        $validator = $this->validate($data);

        $this->assertTrue($validator->errors()->has(SettingKey::STORE_NAME));
    }

    public function test_store_name_equivalence_partition_null_allowed(): void
    {
        $data = [SettingKey::STORE_NAME => null];
        $validator = $this->validate($data);

        $this->assertFalse($validator->errors()->has(SettingKey::STORE_NAME));
    }

    /**
     * BVA & EP: Store Description (nullable, string, max:1000)
     */
    public function test_store_description_boundary_valid_at_1000_chars(): void
    {
        $data = [SettingKey::STORE_DESCRIPTION => str_repeat('b', 1000)];
        $validator = $this->validate($data);

        $this->assertFalse($validator->errors()->has(SettingKey::STORE_DESCRIPTION));
    }

    public function test_store_description_boundary_invalid_at_1001_chars(): void
    {
        $data = [SettingKey::STORE_DESCRIPTION => str_repeat('b', 1001)];
        $validator = $this->validate($data);

        $this->assertTrue($validator->errors()->has(SettingKey::STORE_DESCRIPTION));
    }

    /**
     * BVA & EP: Contact Phone (nullable, string, max:20)
     */
    public function test_contact_phone_boundary_valid_at_20_chars(): void
    {
        $data = [SettingKey::CONTACT_PHONE => str_repeat('1', 20)];
        $validator = $this->validate($data);

        $this->assertFalse($validator->errors()->has(SettingKey::CONTACT_PHONE));
    }

    public function test_contact_phone_boundary_invalid_at_21_chars(): void
    {
        $data = [SettingKey::CONTACT_PHONE => str_repeat('1', 21)];
        $validator = $this->validate($data);

        $this->assertTrue($validator->errors()->has(SettingKey::CONTACT_PHONE));
    }

    /**
     * EP: Contact Email (nullable, email, max:255)
     */
    public function test_contact_email_valid_partition(): void
    {
        $data = [SettingKey::CONTACT_EMAIL => 'support@ecommerce.test'];
        $validator = $this->validate($data);

        $this->assertFalse($validator->errors()->has(SettingKey::CONTACT_EMAIL));
    }

    public function test_contact_email_invalid_partition(): void
    {
        $data = [SettingKey::CONTACT_EMAIL => 'not-a-valid-email-format'];
        $validator = $this->validate($data);

        $this->assertTrue($validator->errors()->has(SettingKey::CONTACT_EMAIL));
    }

    /**
     * EP: App Language (nullable, in:id,en,es)
     */
    public function test_app_language_valid_equivalence_partitions(): void
    {
        foreach (AppLocale::values() as $locale) {
            $data = [SettingKey::APP_LANGUAGE => $locale];
            $validator = $this->validate($data);

            $this->assertFalse($validator->errors()->has(SettingKey::APP_LANGUAGE));
        }
    }

    public function test_app_language_invalid_equivalence_partitions(): void
    {
        $invalidLocales = ['fr', 'de', 'jp', '123', 'unknown'];
        foreach ($invalidLocales as $locale) {
            $data = [SettingKey::APP_LANGUAGE => $locale];
            $validator = $this->validate($data);

            $this->assertTrue($validator->errors()->has(SettingKey::APP_LANGUAGE));
        }
    }
}
