<?php

namespace App\Http\Controllers\Admin;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Services\Contracts\Admin\AdminUserServiceInterface;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    protected AdminUserServiceInterface $adminUserService;

    public function __construct(AdminUserServiceInterface $adminUserService)
    {
        $this->adminUserService = $adminUserService;
    }

    public function index(): Response
    {
        $users = $this->adminUserService->getUserList(UserRole::USER->value);
        $stats = $this->adminUserService->getDashboardStats();

        return Inertia::render('Admin/Dashboard', [
            'users' => $users,
            'stats' => $stats,
        ]);
    }
}
