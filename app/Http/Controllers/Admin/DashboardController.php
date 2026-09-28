<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Contracts\UserServiceInterface;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    protected UserServiceInterface $userService;

    public function __construct(UserServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    public function index(): Response
    {
        $users = $this->userService->getUserList('user');
        $stats = $this->userService->getDashboardStats();

        return Inertia::render('Dashboard', [
            'users' => $users,
            'stats' => $stats,
        ]);
    }
}
