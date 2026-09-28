<?php

namespace App\DTOs;

abstract class BaseDTO
{
    /**
     * Parse array to DTO instance.
     */
    public static function fromArray(array $data): static
    {
        $dto = new static();
        foreach ($data as $key => $value) {
            if (property_exists($dto, $key)) {
                $dto->{$key} = $value;
            }
        }
        return $dto;
    }

    /**
     * Convert DTO to array.
     */
    public function toArray(): array
    {
        return get_object_vars($this);
    }
}
