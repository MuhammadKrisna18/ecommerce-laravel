<?php

namespace App\DTOs;

class FreezeUserDTO
{
    public function __construct(
        public int $durationValue,
        public string $durationUnit,
        public ?string $reason = null,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            durationValue: (int) $data['duration_value'],
            durationUnit: (string) $data['duration_unit'],
            reason: $data['reason'] ?? null,
        );
    }
}
