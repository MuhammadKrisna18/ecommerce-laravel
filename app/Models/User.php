<?php

namespace App\Models;

use App\Enums\UserRole;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['name', 'nickname', 'avatar', 'birth_date', 'birth_place', 'address', 'locale', 'email', 'password', 'role', 'frozen_until', 'frozen_reason'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $appends = ['avatar_url', 'is_frozen', 'frozen_duration_text'];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'birth_date' => 'date:Y-m-d',
            'password' => 'hashed',
            'role' => UserRole::class,
            'frozen_until' => 'datetime',
        ];
    }

    public function getAvatarUrlAttribute(): ?string
    {
        if (! $this->avatar) {
            return null;
        }

        if (filter_var($this->avatar, FILTER_VALIDATE_URL)) {
            return $this->avatar;
        }

        return \Illuminate\Support\Facades\Storage::disk('public')->url($this->avatar);
    }

    public function getIsFrozenAttribute(): bool
    {
        return $this->frozen_until !== null && $this->frozen_until->isFuture();
    }

    public function getFrozenDurationTextAttribute(): ?string
    {
        if (! $this->is_frozen) {
            return null;
        }

        return $this->frozen_until->diffForHumans(now(), [
            'parts' => 2,
            'syntax' => \Carbon\CarbonInterface::DIFF_ABSOLUTE,
        ]);
    }

    public function isAdmin(): bool
    {
        return $this->role === UserRole::ADMIN;
    }

    public function isUser(): bool
    {
        return $this->role === UserRole::USER;
    }
}
