import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { LayoutDashboard, ShoppingBag, User as UserIcon } from 'lucide-react';
import { AppShell } from '@/Components/layout/AppShell';
import { AppSidebar } from '@/Components/layout/AppSidebar';
import { AppTopbar } from '@/Components/layout/AppTopbar';
import { useTranslation } from '@/Hooks/useTranslation';

export default function UserLayout({ header, children }) {
    const { t } = useTranslation();
    const { auth } = usePage().props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navItems = [
        {
            name: t('Dashboard'),
            href: route('user.dashboard'),
            icon: LayoutDashboard,
            active: route().current('user.dashboard'),
        },
    ];

    return (
        <AppShell
            sidebar={
                <AppSidebar
                    user={auth.user}
                    navItems={navItems}
                    brandIcon={ShoppingBag}
                    brandLabel={t('Area Pengguna')}
                    mobileTitle="Tokped User"
                    isMobileOpen={isSidebarOpen}
                    onMobileClose={() => setIsSidebarOpen(false)}
                />
            }
            topbar={
                <AppTopbar
                    header={header}
                    onMenuToggle={() => setIsSidebarOpen((v) => !v)}
                    right={
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/40 border border-red-900/30 text-xs text-rose-300">
                            <UserIcon className="w-3.5 h-3.5 text-rose-400" />
                            <span>
                                Role:{' '}
                                <strong className="text-white uppercase tracking-wider">
                                    {auth.user.role || 'User'}
                                </strong>
                            </span>
                        </div>
                    }
                />
            }
        >
            {children}
        </AppShell>
    );
}
