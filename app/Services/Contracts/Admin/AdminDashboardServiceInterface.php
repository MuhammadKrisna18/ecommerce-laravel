<?php

namespace App\Services\Contracts\Admin;

interface AdminDashboardServiceInterface
{
    public function getDashboardStats(): array;
}
