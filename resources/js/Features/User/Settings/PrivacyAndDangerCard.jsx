import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Shield,
    Download,
    AlertTriangle,
    CheckCircle2,
    RefreshCw,
    X,
    ExternalLink,
    Lock,
    KeyRound,
} from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { CleanModal } from '@/Components/ui/CleanModal';
import { Alert } from '@/Components/ui/alert';
import { useTranslation } from '@/Hooks/useTranslation';

function generateRandomCode() {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 4; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export function PrivacyAndDangerCard({ user, authProvider }) {
    const { t } = useTranslation();

    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadSuccess, setDownloadSuccess] = useState(false);

    // Danger Zone state
    const [showDeactivateModal, setShowDeactivateModal] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [inputCode, setInputCode] = useState('');
    const [codeError, setCodeError] = useState('');
    const [isDeactivating, setIsDeactivating] = useState(false);
    const [dangerNotice, setDangerNotice] = useState(null);

    const isGoogleConnected = authProvider === 'google' || user?.email?.includes('@gmail.com');

    const handleDownloadData = () => {
        setIsDownloading(true);
        setTimeout(() => {
            setIsDownloading(false);
            setDownloadSuccess(true);

            // Trigger JSON download
            const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(user, null, 2));
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute('href', dataStr);
            downloadAnchor.setAttribute('download', `tokped-user-data-${user.id || 'export'}.json`);
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();

            setTimeout(() => setDownloadSuccess(false), 4000);
        }, 1200);
    };

    const openDeactivateModal = () => {
        setVerificationCode(generateRandomCode());
        setInputCode('');
        setCodeError('');
        setShowDeactivateModal(true);
    };

    const handleConfirmDeactivate = () => {
        if (inputCode.trim().toUpperCase() !== verificationCode) {
            setCodeError(t('Kode verifikasi tidak sesuai. Silakan ketik ulang.'));
            return;
        }

        setIsDeactivating(true);
        setTimeout(() => {
            setIsDeactivating(false);
            setShowDeactivateModal(false);
            setDangerNotice({
                type: 'danger',
                message: t('Permintaan penonaktifan akun telah diajukan. Tim dukungan akan meninjau dalam 24 jam.'),
            });
        }, 1000);
    };

    return (
        <div className="space-y-6">
            {/* Akun Tertaut (Google & Kredensial) */}
            <div className="rounded-3xl bg-white border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] overflow-hidden">
                <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/60 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white shadow-sm">
                        <Shield className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                            {t('Akun Tertaut & Integrasi')}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                            {t('Kelola integrasi login sosial Google dan status otorisasi pihak ketiga')}
                        </p>
                    </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                    {/* Google Firebase card */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-xs shrink-0">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h4 className="text-sm font-bold text-slate-800">
                                        Google Account (Firebase)
                                    </h4>
                                    {isGoogleConnected ? (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            {t('Terhubung')}
                                        </span>
                                    ) : (
                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-200 text-slate-600">
                                            {t('Belum Terhubung')}
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    {isGoogleConnected
                                        ? t('Akun Google tertaut untuk kemudahan login dengan satu klik.')
                                        : t('Tautkan akun Google Anda untuk login cepat tanpa mengetik kata sandi.')}
                                </p>
                            </div>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            className="text-xs rounded-xl hover:bg-slate-100"
                        >
                            {isGoogleConnected ? t('Kelola Tautan') : t('Hubungkan Google')}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Ekspor & Unduh Data */}
            <div className="rounded-3xl bg-white border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] p-6 sm:p-8 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-brand-primary">
                            <Download className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-base font-bold text-slate-800">
                                {t('Unduh Salinan Data Akun')}
                            </h4>
                            <p className="text-xs text-slate-500 mt-0.5">
                                {t('Dapatkan salinan arsip data profil, alamat, dan informasi akun Anda dalam format berkas JSON.')}
                            </p>
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleDownloadData}
                        disabled={isDownloading}
                        className="text-xs rounded-xl flex items-center gap-2 border-slate-200 text-slate-700 hover:bg-slate-50"
                    >
                        <Download className="w-3.5 h-3.5" />
                        <span>
                            {isDownloading ? t('Menyiapkan Arsip...') : t('Ekspor Data (.json)')}
                        </span>
                    </Button>
                </div>

                <AnimatePresence>
                    {downloadSuccess && (
                        <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            <Alert variant="success">
                                {t('Berkas arsip data berhasil diunduh ke perangkat Anda.')}
                            </Alert>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Zona Bahaya (Danger Zone) */}
            <div className="rounded-3xl bg-white border border-rose-200/80 shadow-[0_10px_30px_rgba(244,63,94,0.04)] overflow-hidden">
                <div className="p-6 sm:p-8 border-b border-rose-100 bg-rose-50/50 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-rose-900 tracking-tight">
                            {t('Zona Bahaya')}
                        </h3>
                        <p className="text-xs text-rose-600/90 mt-0.5">
                            {t('Tindakan berikut memiliki konsekuensi permanen pada akun dan riwayat Anda')}
                        </p>
                    </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                    <AnimatePresence>
                        {dangerNotice && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                            >
                                <Alert variant={dangerNotice.type}>
                                    {dangerNotice.message}
                                </Alert>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-rose-50/30 border border-rose-100">
                        <div>
                            <h4 className="text-sm font-bold text-slate-800">
                                {t('Penonaktifan / Penutupan Akun')}
                            </h4>
                            <p className="text-xs text-slate-500 mt-1 max-w-xl leading-relaxed">
                                {t('Menonaktifkan akun akan menyembunyikan profil Anda dan membatalkan akses transaksi belanja. Diperlukan kode verifikasi acak untuk melanjutkan.')}
                            </p>
                        </div>

                        <Button
                            type="button"
                            onClick={openDeactivateModal}
                            className="bg-rose-600 hover:bg-rose-700 text-white text-xs rounded-xl shadow-xs shrink-0"
                        >
                            {t('Nonaktifkan Akun')}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Modal Proteksi 4-Digit Kode Keamanan Acak */}
            <CleanModal
                open={showDeactivateModal}
                onClose={() => setShowDeactivateModal(false)}
                title={t('Konfirmasi Penonaktifan Akun')}
                description={t('Proteksi keamanan anti-human-error')}
                icon={AlertTriangle}
                size="md"
            >
                <div className="p-6 space-y-5">
                    <p className="text-sm text-slate-600 leading-relaxed">
                        {t('Untuk mencegah kesalahan klik tidak sengaja, masukkan 4 karakter kode keamanan di bawah ini untuk mengonfirmasi penonaktifan akun Anda:')}
                    </p>

                    {/* Display random code */}
                    <div className="p-4 rounded-2xl bg-slate-900 flex items-center justify-between text-white shadow-inner">
                        <div className="space-y-0.5">
                            <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                                {t('Kode Verifikasi Acak')}
                            </span>
                            <div className="text-2xl font-mono font-black tracking-widest text-brand-accent">
                                {verificationCode}
                            </div>
                        </div>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                                setVerificationCode(generateRandomCode());
                                setCodeError('');
                            }}
                            className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl"
                            title={t('Ganti Kode')}
                        >
                            <RefreshCw className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Input code */}
                    <div className="space-y-2">
                        <Input
                            type="text"
                            maxLength={4}
                            value={inputCode}
                            onChange={(e) => {
                                setInputCode(e.target.value.toUpperCase());
                                setCodeError('');
                            }}
                            placeholder={t('Ketik 4 karakter kode di atas')}
                            className="h-11 uppercase text-center font-mono font-bold tracking-widest text-base bg-white border-slate-200 focus:border-rose-500 focus:ring-rose-500 rounded-xl"
                        />
                        {codeError && (
                            <p className="text-xs text-rose-500 font-medium text-center">
                                {codeError}
                            </p>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setShowDeactivateModal(false)}
                            className="rounded-xl"
                        >
                            {t('Batal')}
                        </Button>
                        <Button
                            type="button"
                            onClick={handleConfirmDeactivate}
                            disabled={isDeactivating || inputCode.length < 4}
                            className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-xs disabled:opacity-50"
                        >
                            {isDeactivating ? t('Memproses...') : t('Konfirmasi Nonaktifkan')}
                        </Button>
                    </div>
                </div>
            </CleanModal>
        </div>
    );
}
