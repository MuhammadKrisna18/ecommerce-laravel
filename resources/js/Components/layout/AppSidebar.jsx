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
                    'flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors',
                    item.active
                        ? 'bg-red-900/60 text-white border border-red-700/40'
                        : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 border border-transparent'
                )}
            >
                <Icon className="w-4 h-4 mr-3" />
                {item.name}
            </Link>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 + index * 0.05 }}
        >
            <Link
                href={item.href}
                className={cn(
                    'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all',
                    item.active
                        ? 'bg-gradient-to-r from-red-900/60 via-rose-950/50 to-zinc-900/40 text-white border border-red-700/40 shadow-[0_0_15px_rgba(153,27,27,0.25)]'
                        : 'text-zinc-400 hover:bg-zinc-900/80 hover:text-zinc-200 border border-transparent'
                )}
            >
                <div className="flex items-center">
                    <Icon className={cn('w-4 h-4 mr-3 transition-colors', item.active ? 'text-rose-400' : 'text-zinc-500')} />
                    <span>{item.name}</span>
                </div>
                {item.active && <ChevronRight className="w-4 h-4 text-rose-400" />}
            </Link>
        </motion.div>
    );
}

// ─── UserFooter ─────────────────────────────────────────────────────────────

function UserFooter({ user, t }) {
    const logout = useLogout();

    return (
        <div className="p-4 border-t border-red-950/40 bg-zinc-950/40">
            <div className="flex items-center gap-3 px-2 py-1.5 rounded-lg">
                {/* Avatar */}
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-950 to-zinc-900 border border-red-800/40 flex items-center justify-center text-rose-300 font-bold text-sm shadow-inner shrink-0">
                    {user.name?.charAt(0).toUpperCase()}
                </div>

                {/* Info */}
                <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-sm font-medium text-zinc-200 truncate flex items-center gap-1.5">
                        {user.name}
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    </span>

                    {user.nickname && (
                        <span className="text-xs text-rose-400/90 flex items-center gap-0.5 truncate">
                            <AtSign className="w-3 h-3" />
                            {user.nickname}
                        </span>
                    )}

                    <span className="text-[11px] text-zinc-500 truncate">{user.email}</span>
                </div>
            </div>

            <button
                type="button"
                onClick={logout}
                className="w-full mt-3 flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-rose-400/90 rounded-xl bg-red-950/20 border border-red-900/30 hover:bg-red-900/40 hover:text-white transition-all shadow-sm"
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
        <div className="p-4 border-t border-red-950/40">
            <button
                type="button"
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-rose-300 rounded-xl bg-red-950/30 border border-red-900/40 hover:bg-red-900/40 transition-colors"
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
 *
 * @param {object}          props
 * @param {object}          props.user           - auth.user
 * @param {Array}           props.navItems        - [{ name, href, icon, active }]
 * @param {React.ElementType} props.brandIcon     - Icon component for the brand logo
 * @param {string}          props.brandLabel      - e.g. "Panel Manajemen"
 * @param {string}          props.mobileTitle     - e.g. "Tokped Admin"
 * @param {boolean}         props.isMobileOpen    - Mobile sidebar open state
 * @param {Function}        props.onMobileClose   - Toggle handler
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
            className="hidden md:flex flex-col w-72 bg-[#0e0a0b] border-r border-red-950/40 shadow-[4px_0_24px_rgba(0,0,0,0.5)] z-20"
        >
            {/* Brand header */}
            <div className="h-20 flex items-center gap-3 px-6 border-b border-red-950/40 relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-rose-800 to-black border border-red-500/30 flex items-center justify-center text-white shadow-[0_0_15px_rgba(225,29,72,0.3)]">
                    <BrandIcon className="w-5 h-5 text-rose-100" />
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-base tracking-tight text-white">
                        Tokped Commerce
                    </span>
                    <span className="text-[11px] font-medium text-rose-400/80 flex items-center gap-1">
                        <BrandIcon className="w-3 h-3 text-red-500" />
                        {brandLabel}
                    </span>
                </div>
                {/* Top glow accent */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-600/40 to-transparent" />
            </div>

            {/* Nav label */}
            <div className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
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
                    className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden"
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
                    className="fixed inset-y-0 left-0 z-50 w-72 bg-[#0e0a0b] border-r border-red-950/40 shadow-2xl md:hidden flex flex-col"
                >
                    {/* Mobile header */}
                    <div className="h-20 flex items-center justify-between px-6 border-b border-red-950/40">
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-rose-900 flex items-center justify-center text-white">
                                <BrandIcon className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-white tracking-tight">{mobileTitle}</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onMobileClose}
                            className="text-zinc-400 hover:text-white hover:bg-zinc-800"
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
