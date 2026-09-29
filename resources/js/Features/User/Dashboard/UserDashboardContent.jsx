import { motion } from 'framer-motion';
import { Sparkles, ShoppingBag, Clock } from 'lucide-react';
import { useAuth } from '@/Hooks/useAuth';
import { useTranslation } from '@/Hooks/useTranslation';

/**
 * User dashboard widgets / content area.
 * Rendered by Pages/User/Dashboard.jsx.
 */
export function UserDashboardContent() {
    const { t } = useTranslation();
    const { user } = useAuth();

    const displayName = user?.nickname || user?.name || 'Pengguna';

    return (
        <div className="space-y-8">
            {/* Welcome Card */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#160d0f] via-[#100a0b] to-[#0a0708] border border-red-900/30 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-red-700/15 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute -bottom-10 right-32 w-60 h-60 bg-rose-900/20 rounded-full blur-[90px] pointer-events-none" />

                    <div className="relative z-10 space-y-3 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-800/40 text-rose-300 text-xs font-medium">
                            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                            <span>Area Pengguna Tokped</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                            Halo,{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-white">
                                {displayName}
                            </span>{' '}
                            👋
                        </h1>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Akun Anda telah aktif sebagai <strong className="text-rose-300">User</strong>.
                            Halaman ini disiapkan untuk fitur belanja, transaksi, dan aktivitas Anda selanjutnya.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Placeholder / coming soon */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="rounded-2xl border border-dashed border-red-950/60 bg-[#0e0a0b]/40 backdrop-blur-sm p-12 text-center">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-red-950/40 border border-red-900/30 flex items-center justify-center text-rose-400 mb-4 shadow-[0_0_20px_rgba(225,29,72,0.15)]">
                        <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                        Halaman Dashboard User Masih Kosong
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-md mx-auto leading-relaxed">
                        Belum ada modul atau aktivitas yang ditampilkan saat ini. Modul pesanan,
                        riwayat belanja, dan fitur user lainnya dapat ditambahkan pada langkah berikutnya.
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400">
                        <Clock className="w-3.5 h-3.5 text-rose-400" />
                        <span>Status: Siap untuk pengembangan modul selanjutnya</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
