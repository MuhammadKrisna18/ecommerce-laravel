import { useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import { LayoutDashboard, Store, Package, ShoppingBag } from 'lucide-react';
import { AppShell } from '@/Components/layout/AppShell';
import { AppSidebar } from '@/Components/layout/AppSidebar';
import { AppTopbar } from '@/Components/layout/AppTopbar';
import { useTranslation } from '@/Hooks/useTranslation';

export default function SellerLayout({ header, children }) {
    const { t } = useTranslation();
    const { auth, store } = usePage().props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navItems = [
        {
            name: t('Dashboard Toko'),
            href: route('seller.dashboard'),
            icon: LayoutDashboard,
            active: route().current('seller.dashboard'),
        },
        {
            name: t('Katalog & Produk'),
            href: route('seller.products.index'),
            icon: Package,
            active: route().current('seller.products.*'),
        },
        {
            name: t('Pengaturan Toko'),
            href: route('seller.settings.index'),
            icon: Store,
            active: route().current('seller.settings.*'),
        },
    ];

    return (
        <AppShell
            sidebar={
                <AppSidebar
                    user={auth.user}
                    navItems={navItems}
                    brandIcon={Store}
                    brandLabel={t('Seller Center')}
                    mobileTitle="K-Tienda Seller"
                    isMobileOpen={isSidebarOpen}
                    onMobileClose={() => setIsSidebarOpen(false)}
                />
            }
            topbar={
                <AppTopbar
                    header={header}
                    onMenuToggle={() => setIsSidebarOpen((v) => !v)}
                    right={
                        <div className="flex items-center gap-2.5">
                            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs font-semibold text-emerald-800 shadow-xs">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span>{store?.name || t('Toko Saya')}</span>
                            </span>

                            <Link
                                href={route('user.dashboard')}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-semibold text-slate-700 transition-all shadow-xs"
                            >
                                <ShoppingBag className="w-3.5 h-3.5 text-brand-primary" />
                                <span>{t('Mode Pembeli')}</span>
                            </Link>
                        </div>
                    }
                />
            }
        >
            {children}
        </AppShell>
    );
}
