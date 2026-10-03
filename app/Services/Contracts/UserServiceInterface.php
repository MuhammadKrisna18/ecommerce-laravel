<?php

namespace App\Services\Contracts;

use App\Services\Contracts\Admin\AdminUserServiceInterface;
use App\Services\Contracts\Auth\AuthServiceInterface;
use App\Services\Contracts\User\UserServiceInterface as RoleUserServiceInterface;




interface UserServiceInterface extends AdminUserServiceInterface, RoleUserServiceInterface, AuthServiceInterface
{
}
