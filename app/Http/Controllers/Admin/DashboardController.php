<?php

namespace App\Http\Controllers\Admin;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Services\Contracts\Admin\AdminUserQueryServiceInterface;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    protected AdminUserQueryServiceInterface $adminUserService;

    public function __construct(AdminUserQueryServiceInterface $adminUserService)
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
