<?php

namespace App\Http\Controllers\Admin;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Services\Contracts\Admin\AdminDashboardServiceInterface;
use App\Services\Contracts\Admin\AdminUserQueryServiceInterface;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    protected AdminUserQueryServiceInterface $adminUserService;
    protected AdminDashboardServiceInterface $adminDashboardService;

    public function __construct(
        AdminUserQueryServiceInterface $adminUserService,
        AdminDashboardServiceInterface $adminDashboardService
    ) {
        $this->adminUserService = $adminUserService;
        $this->adminDashboardService = $adminDashboardService;
    }

    public function index(): Response
    {
        $users = $this->adminUserService->getUserList();
        $stats = $this->adminDashboardService->getDashboardStats();

        return Inertia::render('Admin/Dashboard', [
            'users' => $users,
            'stats' => $stats,
        ]);
    }
}
