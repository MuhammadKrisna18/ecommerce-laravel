<?php

namespace App\DTOs;

class FirebaseAuthDTO
{
    public function __construct(
        public string $email,
        public string $name,
        public ?string $avatar = null,
    ) {}

    public static function fromArray(array $data): self
    {
        $email = $data['email'];
        $name = $data['name'] ?? explode('@', $email)[0];
        $avatar = $data['avatar'] ?? null;

        return new self(
            email: $email,
            name: $name,
            avatar: $avatar,
        );
    }
}
