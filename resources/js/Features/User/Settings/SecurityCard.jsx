import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    KeyRound,
    Lock,
    Eye,
    EyeOff,
    ShieldCheck,
    CheckCircle2,
    XCircle,
    Laptop,
    LogOut,
} from 'lucide-react';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';
import { CleanModal } from '@/Components/ui/CleanModal';
import { Alert } from '@/Components/ui/alert';
import { Spinner } from '@/Components/ui/spinner';
import { useTranslation } from '@/Hooks/useTranslation';
import { useFlash } from '@/Hooks/useFlash';
import { LogoutOtherSessionsModal } from '@/Features/User/Settings/Modals/LogoutOtherSessionsModal';

function calculatePasswordStrength(pass) {
    if (!pass) return { score: 0, label: 'Kosong', color: 'bg-slate-200', text: 'text-slate-400' };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score++;
    if (/\d/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    switch (score) {
        case 1:
            return { score: 25, label: 'Lemah', color: 'bg-rose-500', text: 'text-rose-500' };
        case 2:
            return { score: 50, label: 'Cukup', color: 'bg-amber-500', text: 'text-amber-500' };
        case 3:
            return { score: 75, label: 'Kuat', color: 'bg-sky-500', text: 'text-sky-500' };
        case 4:
            return {
                score: 100,
                label: 'Sangat Kuat',
                color: 'bg-emerald-500',
                text: 'text-emerald-500',
            };
        default:
            return {
                score: 15,
                label: 'Sangat Lemah',
                color: 'bg-rose-500',
                text: 'text-rose-500',
            };
    }
}

export function SecurityCard({ user }) {
    const { t } = useTranslation();
    const { success: flashSuccess, error: flashError } = useFlash();

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [showLogoutOtherModal, setShowLogoutOtherModal] = useState(false);
    const [sessionNotice, setSessionNotice] = useState(null);

    const { data, setData, put, processing, errors, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const strength = calculatePasswordStrength(data.password);

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        put(route('user.settings.password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    const confirmLogoutOtherSessions = () => {
        setShowLogoutOtherModal(false);
        setSessionNotice({
            type: 'success',
            message: t('Semua sesi di perangkat lain telah berhasil dihentikan.'),
        });
    };

    return (
        <div className="space-y-6">
            <div className="rounded-3xl bg-white border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] overflow-hidden">
                <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/60 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white shadow-sm">
                        <KeyRound className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                            {t('Ubah Kata Sandi')}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                            {t(
                                'Perbarui kata sandi secara berkala untuk menjaga akun tetap terlindungi'
                            )}
                        </p>
                    </div>
                </div>

                <form onSubmit={handlePasswordSubmit} className="p-6 sm:p-8 space-y-6">
                    <AnimatePresence>
                        {flashSuccess && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                            >
                                <Alert variant="success">{flashSuccess}</Alert>
                            </motion.div>
                        )}
                        {flashError && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                            >
                                <Alert variant="danger">{flashError}</Alert>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="space-y-2">
                        <Label
                            htmlFor="current_password"
                            className="text-xs font-semibold text-slate-700 flex items-center gap-1.5"
                        >
                            <Lock className="w-3.5 h-3.5 text-brand-primary" />
                            {t('Kata Sandi Saat Ini')}
                        </Label>
                        <div className="relative">
                            <Input
                                id="current_password"
                                type={showCurrentPassword ? 'text' : 'password'}
                                value={data.current_password}
                                onChange={(e) => setData('current_password', e.target.value)}
                                placeholder={t('Masukkan kata sandi lama Anda')}
                                className={`h-11 pr-11 bg-white text-slate-800 placeholder:text-slate-400 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl transition-all shadow-sm ${
                                    errors.current_password ? 'border-rose-400' : 'border-slate-200'
                                }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                            >
                                {showCurrentPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                        {errors.current_password && (
                            <p className="text-xs text-rose-500 font-medium">
                                {errors.current_password}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label
                                htmlFor="password"
                                className="text-xs font-semibold text-slate-700 flex items-center gap-1.5"
                            >
                                <Lock className="w-3.5 h-3.5 text-brand-primary" />
                                {t('Kata Sandi Baru')}
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showNewPassword ? 'text' : 'password'}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder={t('Minimal 8 karakter kombinasi')}
                                    className={`h-11 pr-11 bg-white text-slate-800 placeholder:text-slate-400 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl transition-all shadow-sm ${
                                        errors.password ? 'border-rose-400' : 'border-slate-200'
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                                >
                                    {showNewPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-xs text-rose-500 font-medium">
                                    {errors.password}
                                </p>
                            )}

                            {data.password && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="pt-2 space-y-2"
                                >
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-slate-500 font-medium">
                                            {t('Kekuatan Kata Sandi')}:
                                        </span>
                                        <span className={`font-semibold ${strength.text}`}>
                                            {t(strength.label)}
                                        </span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div
                                            className={`h-full ${strength.color}`}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${strength.score}%` }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="password_confirmation"
                                className="text-xs font-semibold text-slate-700 flex items-center gap-1.5"
                            >
                                <Lock className="w-3.5 h-3.5 text-brand-primary" />
                                {t('Konfirmasi Kata Sandi Baru')}
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password_confirmation"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData('password_confirmation', e.target.value)
                                    }
                                    placeholder={t('Ulangi kata sandi baru')}
                                    className={`h-11 pr-11 bg-white text-slate-800 placeholder:text-slate-400 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl transition-all shadow-sm ${
                                        errors.password_confirmation
                                            ? 'border-rose-400'
                                            : 'border-slate-200'
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                            {errors.password_confirmation && (
                                <p className="text-xs text-rose-500 font-medium">
                                    {errors.password_confirmation}
                                </p>
                            )}

                            {data.password_confirmation && (
                                <p
                                    className={`text-[11px] flex items-center gap-1 font-medium pt-1 ${
                                        data.password === data.password_confirmation
                                            ? 'text-emerald-600'
                                            : 'text-rose-500'
                                    }`}
                                >
                                    {data.password === data.password_confirmation ? (
                                        <>
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            {t('Kata sandi cocok')}
                                        </>
                                    ) : (
                                        <>
                                            <XCircle className="w-3.5 h-3.5" />
                                            {t('Kata sandi belum cocok')}
                                        </>
                                    )}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
                        <div className="flex items-center gap-2">
                            <div
                                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                                    data.password.length >= 8
                                        ? 'bg-emerald-100 text-emerald-600'
                                        : 'bg-slate-200 text-slate-400'
                                }`}
                            >
                                ✓
                            </div>
                            <span>{t('Minimal 8 karakter')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div
                                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                                    /\d/.test(data.password)
                                        ? 'bg-emerald-100 text-emerald-600'
                                        : 'bg-slate-200 text-slate-400'
                                }`}
                            >
                                ✓
                            </div>
                            <span>{t('Kombinasi angka')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div
                                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                                    /[^A-Za-z0-9]/.test(data.password)
                                        ? 'bg-emerald-100 text-emerald-600'
                                        : 'bg-slate-200 text-slate-400'
                                }`}
                            >
                                ✓
                            </div>
                            <span>{t('Karakter simbol (@#$%)')}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <div className="text-xs text-slate-400 flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            <span>{t('Dilindungi enkripsi Bcrypt hashing standard')}</span>
                        </div>

                        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="h-11 px-6 bg-brand-primary hover:bg-brand-dark text-white font-medium rounded-xl shadow-[0_4px_15px_rgba(0,147,203,0.25)] transition-colors duration-200 flex items-center gap-2"
                            >
                                {processing ? (
                                    <>
                                        <Spinner size="sm" color="white" />
                                        <span>{t('Menyimpan Sandi...')}</span>
                                    </>
                                ) : (
                                    <>
                                        <KeyRound className="w-4 h-4" />
                                        <span>{t('Perbarui Kata Sandi')}</span>
                                    </>
                                )}
                            </Button>
                        </motion.div>
                    </div>
                </form>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] p-6 sm:p-8 space-y-4">
                <AnimatePresence>
                    {sessionNotice && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            <Alert variant={sessionNotice.type}>{sessionNotice.message}</Alert>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                            <Laptop className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-base font-bold text-slate-800">
                                {t('Sesi & Perangkat Aktif')}
                            </h4>
                            <p className="text-xs text-slate-500 mt-0.5">
                                {t(
                                    'Daftar perangkat yang saat ini memiliki akses login aktif ke akun Anda'
                                )}
                            </p>
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowLogoutOtherModal(true)}
                        className="text-xs text-slate-600 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 rounded-xl flex items-center gap-1.5"
                    >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>{t('Keluar dari Perangkat Lain')}</span>
                    </Button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                        <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-xs">
                            <Laptop className="w-4 h-4" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-slate-800">
                                    Windows Desktop • Google Chrome
                                </span>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700">
                                    {t('Sesi Saat Ini')}
                                </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">
                                Jakarta, Indonesia • IP: 182.253.xxx.xxx • {t('Aktif sekarang')}
                            </p>
                        </div>
                    </div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                </div>
            </div>

            <LogoutOtherSessionsModal
                isOpen={showLogoutOtherModal}
                onClose={() => setShowLogoutOtherModal(false)}
                onConfirm={confirmLogoutOtherSessions}
            />
        </div>
    );
}
