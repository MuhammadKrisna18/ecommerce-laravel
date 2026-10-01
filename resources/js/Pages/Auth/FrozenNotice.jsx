import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ShieldAlert, Clock, AlertTriangle, ArrowLeft, Mail, HelpCircle } from 'lucide-react';
import { Button } from '@/Components/ui/button';

export default function FrozenNotice({
    userName = 'Pengguna',
    frozenUntil = '15 Oktober 2026, 12:00 WIB',
    durationText = '2 Minggu',
    reason = 'Aktivitas akun mencurigakan atau pelanggaran ketentuan layanan komunitas.',
    supportEmail = 'help@tokped.test',
}) {
    const handleLogout = () => {
        // Form submit logout
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '/logout';
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (csrfToken) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = '_token';
            input.value = csrfToken;
            form.appendChild(input);
        }
        document.body.appendChild(form);
        form.submit();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 flex items-center justify-center p-4">
            <Head title="Akun Dibekukan Sementara" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-lg bg-white rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.35)] overflow-hidden border border-slate-100"
            >
                {/* Header status */}
                <div className="bg-gradient-to-r from-rose-500 via-rose-600 to-red-600 p-8 text-white text-center relative overflow-hidden">
                    <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-4 shadow-lg border border-white/30">
                        <ShieldAlert className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-extrabold tracking-tight">
                        Akun Anda Sedang Dibekukan
                    </h1>
                    <p className="text-rose-100 text-xs mt-1.5 max-w-sm mx-auto">
                        Akses masuk dan transaksi ke akun Anda telah dinonaktifkan untuk sementara waktu oleh Administrator.
                    </p>
                </div>

                {/* Details Content */}
                <div className="p-6 sm:p-8 space-y-6">
                    {/* Greeting & Summary */}
                    <div className="text-center">
                        <p className="text-xs text-slate-500">Halo, <strong className="text-slate-800 font-semibold">{userName}</strong></p>
                        <p className="text-xs text-slate-500 mt-1">
                            Akun Anda dibekukan selama <span className="inline-block px-2.5 py-0.5 rounded-full font-bold bg-rose-50 text-rose-700 border border-rose-200 text-xs">{durationText}</span>
                        </p>
                    </div>

                    {/* Information cards */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                            <div className="w-9 h-9 rounded-xl bg-amber-100/70 text-amber-700 flex items-center justify-center shrink-0">
                                <Clock className="w-4 h-4" />
                            </div>
                            <div className="text-xs">
                                <span className="text-slate-400 block font-medium">Batas Waktu Pembekuan:</span>
                                <span className="text-slate-800 font-semibold text-sm">{frozenUntil}</span>
                            </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                            <span className="text-slate-400 block font-medium">Alasan Pembekuan:</span>
                            <p className="text-slate-700 leading-relaxed font-normal">
                                {reason}
                            </p>
                        </div>
                    </div>

                    {/* Notice alert */}
                    <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-800 leading-snug">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                            Setelah batas waktu berakhir, akun Anda akan otomatis dipulihkan kembali dan dapat bertransaksi seperti biasa.
                        </div>
                    </div>

                    {/* Help & Support contact */}
                    <div className="p-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2.5">
                            <HelpCircle className="w-4 h-4 text-brand-primary" />
                            <div className="text-[11px] text-slate-500">
                                Butuh bantuan atau sanggahan banding?
                            </div>
                        </div>
                        <a
                            href={`mailto:${supportEmail}`}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-primary hover:underline"
                        >
                            <Mail className="w-3.5 h-3.5" />
                            Hubungi Admin
                        </a>
                    </div>

                    {/* Logout Button */}
                    <div className="pt-2">
                        <Button
                            type="button"
                            onClick={handleLogout}
                            className="w-full h-11 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-medium flex items-center justify-center gap-2 shadow-sm"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Keluar dari Akun (Logout)
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
