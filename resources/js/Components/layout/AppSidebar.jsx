import { Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronRight,
    LogOut,
    X,
    AtSign,
} from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { useTranslation } from '@/Hooks/useTranslation';
import { useLogout } from '@/Hooks/useLogout';
import { cn } from '@/lib/utils';

// ─── NavItem ────────────────────────────────────────────────────────────────

function NavItem({ item, index, mobile = false }) {
    const Icon = item.icon;

    if (mobile) {
        return (
            <Link
                href={item.href}
                className={cn(
                    'flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-colors',
                    item.active
                        ? 'bg-brand-primary/10 text-brand-primary font-semibold'
                        : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                )}
            >
                <Icon className={cn("w-4 h-4 mr-3", item.active ? "text-brand-primary" : "text-slate-400")} />
                {item.name}
            </Link>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.04 + index * 0.04 }}
        >
            <Link
                href={item.href}
                className={cn(
                    'flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all group',
                    item.active
                        ? 'bg-brand-primary/10 text-brand-primary font-semibold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                )}
            >
                <div className="flex items-center">
                    <Icon className={cn('w-4 h-4 mr-3 transition-colors', item.active ? 'text-brand-primary' : 'text-slate-400 group-hover:text-slate-600')} />
                    <span>{item.name}</span>
                </div>
                {item.active && <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />}
            </Link>
        </motion.div>
    );
}

// ─── UserFooter ─────────────────────────────────────────────────────────────

function UserFooter({ user, t }) {
    const logout = useLogout();

    return (
        <div className="p-4 border-t border-slate-100 bg-white">
            <div className="flex items-center gap-3 p-1 rounded-xl">
                {/* Avatar */}
                {user?.avatar_url ? (
                    <img
                        src={user.avatar_url}
                        alt={user.name}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-sm shrink-0"
                    />
                ) : (
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-accent text-white font-bold text-sm shadow-sm flex items-center justify-center shrink-0">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                )}

                {/* Info */}
                <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-sm font-semibold text-slate-800 truncate flex items-center gap-1.5">
                        {user?.name}
                    </span>

                    {user?.nickname && (
                        <span className="text-xs text-brand-primary font-medium flex items-center gap-0.5 truncate">
                            <AtSign className="w-3 h-3 text-brand-primary/70 shrink-0" />
                            {user.nickname}
                        </span>
                    )}

                    <span className="text-[11px] text-slate-400 truncate mt-0.5" title={user?.email}>
                        {user?.email}
                    </span>
                </div>
            </div>

            <button
                type="button"
                onClick={logout}
                className="w-full mt-3 flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-600 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all shadow-none"
            >
                <LogOut className="w-3.5 h-3.5" />
                {t('Logout Sesi')}
            </button>
        </div>
    );
}

// ─── MobileFooter ────────────────────────────────────────────────────────────

function MobileFooter({ t }) {
    const logout = useLogout();

    return (
        <div className="p-4 border-t border-slate-200/80 bg-slate-50/80">
            <button
                type="button"
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 rounded-xl bg-white border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors shadow-sm"
            >
                <LogOut className="w-4 h-4 mr-2" />
                {t('Logout Sesi')}
            </button>
        </div>
    );
}

// ─── AppSidebar ─────────────────────────────────────────────────────────────

/**
 * Shared sidebar for Admin and User layouts.
 */
export function AppSidebar({
    user,
    navItems,
    brandIcon: BrandIcon,
    brandLabel,
    mobileTitle,
    isMobileOpen,
    onMobileClose,
}) {
    const { t } = useTranslation();

    // ── Desktop sidebar ──────────────────────────────────────────────────────
    const desktopSidebar = (
        <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:flex flex-col w-72 bg-white border-r border-slate-200/80 shadow-[4px_0_20px_rgba(0,0,0,0.02)] z-20"
        >
            {/* Brand header */}
            <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-200/80 relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white shadow-sm">
                    <BrandIcon className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-base tracking-tight text-slate-900">
                        Tokped Commerce
                    </span>
                    <span className="text-[11px] font-semibold text-brand-primary flex items-center gap-1">
                        <BrandIcon className="w-3 h-3 text-brand-primary" />
                        {brandLabel}
                    </span>
                </div>
            </div>

            {/* Nav label */}
            <div className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Menu Utama
            </div>

            {/* Nav items */}
            <nav className="flex-1 overflow-y-auto px-4 space-y-1.5">
                {navItems.map((item, index) => (
                    <NavItem key={item.name} item={item} index={index} />
                ))}
            </nav>

            {/* User footer */}
            <UserFooter user={user} t={t} />
        </motion.aside>
    );

    // ── Mobile backdrop ──────────────────────────────────────────────────────
    const mobileOverlay = (
        <AnimatePresence>
            {isMobileOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden"
                    onClick={onMobileClose}
                />
            )}
        </AnimatePresence>
    );

    // ── Mobile sidebar ───────────────────────────────────────────────────────
    const mobileSidebar = (
        <AnimatePresence>
            {isMobileOpen && (
                <motion.aside
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-100%' }}
                    transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                    className="fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200/80 shadow-2xl md:hidden flex flex-col"
                >
                    {/* Mobile header */}
                    <div className="h-20 flex items-center justify-between px-6 border-b border-slate-200/80">
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white">
                                <BrandIcon className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-slate-900 tracking-tight">{mobileTitle}</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onMobileClose}
                            className="text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Mobile nav */}
                    <nav className="flex-1 px-4 py-4 space-y-1.5">
                        {navItems.map((item) => (
                            <NavItem key={item.name} item={item} mobile />
                        ))}
                    </nav>

                    {/* Mobile footer */}
                    <MobileFooter t={t} />
                </motion.aside>
            )}
        </AnimatePresence>
    );

    return (
        <>
            {desktopSidebar}
            {mobileOverlay}
            {mobileSidebar}
        </>
    );
}
