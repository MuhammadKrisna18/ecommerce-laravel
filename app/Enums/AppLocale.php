<?php

namespace App\Enums;

enum AppLocale: string
{
    case ID = 'id';
    case EN = 'en';
    case ES = 'es';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
