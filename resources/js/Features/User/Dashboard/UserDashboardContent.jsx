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
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0093cb] via-[#0081b3] to-[#006fa0] p-8 shadow-[0_10px_30px_rgba(0,147,203,0.2)] text-white">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-[#6dd7fd]/20 rounded-full blur-[90px] pointer-events-none" />
                    <div className="absolute -bottom-10 right-32 w-60 h-60 bg-white/10 rounded-full blur-[80px] pointer-events-none" />

                    <div className="relative z-10 space-y-3 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-semibold backdrop-blur-sm">
                            <Sparkles className="w-3.5 h-3.5 text-[#6dd7fd]" />
                            <span>Area Pengguna Tokped</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                            Halo, <span>{displayName}</span> 👋
                        </h1>
                        <p className="text-sm text-sky-100 leading-relaxed">
                            Akun Anda telah aktif sebagai <strong className="text-white underline decoration-[#6dd7fd] underline-offset-4 font-bold">User</strong>.
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
                <div className="rounded-2xl border border-dashed border-slate-200 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] p-12 text-center">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-[#6dd7fd]/20 border border-[#0093cb]/20 flex items-center justify-center text-[#0093cb] mb-4 shadow-sm">
                        <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                        Halaman Dashboard User Masih Kosong
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
                        Belum ada modul atau aktivitas yang ditampilkan saat ini. Modul pesanan,
                        riwayat belanja, dan fitur user lainnya dapat ditambahkan pada langkah berikutnya.
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 font-medium">
                        <Clock className="w-3.5 h-3.5 text-[#0093cb]" />
                        <span>Status: Siap untuk pengembangan modul selanjutnya</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
