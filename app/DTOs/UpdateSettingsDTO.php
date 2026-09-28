<?php

namespace App\DTOs;

class UpdateSettingsDTO extends BaseDTO
{
    public ?string $store_name = null;
    public ?string $store_description = null;
    public ?string $contact_email = null;
    public ?string $contact_phone = null;
    public ?string $app_language = null;

    /**
     * Filter out null values or return as associative payload for saving.
     */
    public function toFilteredArray(): array
    {
        return array_filter($this->toArray(), fn ($value) => !is_null($value));
    }
}
