<?php

namespace App\DTOs;

abstract class BaseDTO
{
    public static function fromArray(array $data): static
    {
        $dto = new static;
        foreach ($data as $key => $value) {
            if (property_exists($dto, $key)) {
                $dto->{$key} = $value;
            }
        }

        return $dto;
    }

    public function toArray(): array
    {
        return get_object_vars($this);
    }
}
