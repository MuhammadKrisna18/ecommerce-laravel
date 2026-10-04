<?php

namespace App\Services\Admin;

use App\Enums\UserRole;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Services\Contracts\Admin\AdminDashboardServiceInterface;

class AdminDashboardService implements AdminDashboardServiceInterface
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function getDashboardStats(): array
    {
        $totalUsers = $this->userRepository->countByRole(UserRole::USER->value);
        $totalAdmins = $this->userRepository->countByRole(UserRole::ADMIN->value);

        $userGrowthData = [];
        $months = [];
        for ($i = 5; $i >= 0; $i--) {
            $months[] = now()->subMonths($i);
        }

        foreach ($months as $month) {
            $count = $this->userRepository->countRegisteredInMonth($month->year, $month->month);
            
            $userGrowthData[] = [
                'name' => $month->translatedFormat('M'), 
                'users' => $count,
            ];
        }

        $recentUsers = $this->userRepository->getLatestUsers(5);
        $recentActivities = $recentUsers->map(function ($user, $index) {
            $time = $user->created_at->diffForHumans();
            return [
                'id' => $index + 1,
                'text' => 'User baru "' . $user->name . '" mendaftar',
                'time' => $time,
                'type' => 'user',
            ];
        })->toArray();

        return [
            'total_users' => $totalUsers,
            'total_admins' => $totalAdmins,
            'total_accounts' => $totalUsers + $totalAdmins,
            'user_growth_data' => $userGrowthData,
            'recent_activities' => $recentActivities,
        ];
    }
}
