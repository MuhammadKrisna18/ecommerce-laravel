import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Globe,
    Clock,
    Coins,
    Calendar,
    Check,
    Save,
    CheckCircle2,
    SlidersHorizontal,
} from 'lucide-react';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';
import { CleanModal } from '@/Components/ui/CleanModal';
import { Alert } from '@/Components/ui/alert';
import { useTranslation } from '@/Hooks/useTranslation';
import { router } from '@inertiajs/react';

export function PreferencesCard({ locale: initialLocale }) {
    const { t, locale: currentLocale } = useTranslation();

    const [selectedLocale, setSelectedLocale] = useState(initialLocale || currentLocale || 'id');
    const [pendingLocale, setPendingLocale] = useState(null);
    const [showLangModal, setShowLangModal] = useState(false);

    const [timezone, setTimezone] = useState('Asia/Jakarta');
    const [currency, setCurrency] = useState('IDR');
    const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
    const [isSavingPreferences, setIsSavingPreferences] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const languages = [
        { code: 'id', name: 'Bahasa Indonesia', native: 'Bahasa Indonesia', flag: '🇮🇩' },
        { code: 'en', name: 'English (US)', native: 'English', flag: '🇺🇸' },
        { code: 'es', name: 'Español', native: 'Español', flag: '🇪🇸' },
    ];

    const timezones = [
        { code: 'Asia/Jakarta', label: 'WIB - Waktu Indonesia Barat (UTC+07:00)' },
        { code: 'Asia/Makassar', label: 'WITA - Waktu Indonesia Tengah (UTC+08:00)' },
        { code: 'Asia/Jayapura', label: 'WIT - Waktu Indonesia Timur (UTC+09:00)' },
    ];

    const currencies = [
        { code: 'IDR', symbol: 'Rp', name: 'Rupiah Indonesia' },
        { code: 'USD', symbol: '$', name: 'US Dollar' },
        { code: 'EUR', symbol: '€', name: 'Euro' },
    ];

    const dateFormats = [
        { format: 'DD/MM/YYYY', example: '25/12/2026' },
        { format: 'YYYY-MM-DD', example: '2026-12-25' },
        { format: 'DD MMMM YYYY', example: '25 Desember 2026' },
    ];

    const handleSelectLanguage = (code) => {
        if (code !== selectedLocale) {
            setPendingLocale(code);
            setShowLangModal(true);
        }
    };

    const confirmLanguageChange = () => {
        if (pendingLocale) {
            setSelectedLocale(pendingLocale);
            setShowLangModal(false);
            setFeedback({
                type: 'success',
                message: t('Preferensi bahasa berhasil diperbarui. Antarmuka akan dimuat ulang.'),
            });
        }
    };

    const handleSavePreferences = (e) => {
        e.preventDefault();
        setIsSavingPreferences(true);
        setTimeout(() => {
            setIsSavingPreferences(false);
            setFeedback({
                type: 'success',
                message: t('Pengaturan preferensi tampilan dan regional berhasil disimpan.'),
            });
        }, 600);
    };

    return (
        <div className="space-y-6">
            <div className="rounded-3xl bg-white border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] overflow-hidden">
                {/* Header */}
                <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/60 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white shadow-sm">
                        <SlidersHorizontal className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                            {t('Preferensi & Tampilan')}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                            {t('Sesuaikan bahasa antarmuka, zona waktu, dan format regional akun Anda')}
                        </p>
                    </div>
                </div>

                <div className="p-6 sm:p-8 space-y-8">
                    <AnimatePresence>
                        {feedback && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                            >
                                <Alert variant={feedback.type}>{feedback.message}</Alert>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Bahasa Antarmuka */}
                    <div className="space-y-3">
                        <Label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5 text-brand-primary" />
                            {t('Bahasa Sistem / Interface')}
                        </Label>
                        <p className="text-xs text-slate-400">
                            {t('Pilih bahasa utama yang ingin Anda gunakan untuk menjelajahi platform Tokped')}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                            {languages.map((lang) => {
                                const isSelected = selectedLocale === lang.code;
                                return (
                                    <button
                                        key={lang.code}
                                        type="button"
                                        onClick={() => handleSelectLanguage(lang.code)}
                                        className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all duration-200 ${
                                            isSelected
                                                ? 'bg-brand-primary/5 border-brand-primary ring-2 ring-brand-primary/20 shadow-xs'
                                                : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{lang.flag}</span>
                                            <div>
                                                <p className="text-sm font-bold text-slate-800">
                                                    {lang.name}
                                                </p>
                                                <p className="text-xs text-slate-400">{lang.native}</p>
                                            </div>
                                        </div>
                                        {isSelected && (
                                            <div className="w-5 h-5 rounded-full bg-brand-primary text-white flex items-center justify-center">
                                                <Check className="w-3 h-3 stroke-[3]" />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="h-px bg-slate-100" />

                    {/* Zona Waktu & Mata Uang */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Zona Waktu */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="timezone"
                                className="text-xs font-semibold text-slate-700 flex items-center gap-1.5"
                            >
                                <Clock className="w-3.5 h-3.5 text-brand-primary" />
                                {t('Zona Waktu')}
                            </Label>
                            <select
                                id="timezone"
                                value={timezone}
                                onChange={(e) => setTimezone(e.target.value)}
                                className="w-full h-11 rounded-xl bg-white border border-slate-200 px-3.5 text-sm text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all cursor-pointer shadow-sm"
                            >
                                {timezones.map((tz) => (
                                    <option key={tz.code} value={tz.code}>
                                        {tz.label}
                                    </option>
                                ))}
                            </select>
                            <p className="text-[11px] text-slate-400">
                                {t('Semua riwayat transaksi dan log sesi akan mengikuti zona waktu ini')}
                            </p>
                        </div>

                        {/* Mata Uang */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="currency"
                                className="text-xs font-semibold text-slate-700 flex items-center gap-1.5"
                            >
                                <Coins className="w-3.5 h-3.5 text-brand-primary" />
                                {t('Mata Uang Tampilan')}
                            </Label>
                            <select
                                id="currency"
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                className="w-full h-11 rounded-xl bg-white border border-slate-200 px-3.5 text-sm text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all cursor-pointer shadow-sm"
                            >
                                {currencies.map((curr) => (
                                    <option key={curr.code} value={curr.code}>
                                        {curr.code} ({curr.symbol}) - {curr.name}
                                    </option>
                                ))}
                            </select>
                            <p className="text-[11px] text-slate-400">
                                {t('Mata uang standar belanja default transaksi Anda')}
                            </p>
                        </div>

                        {/* Format Tanggal */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="dateFormat"
                                className="text-xs font-semibold text-slate-700 flex items-center gap-1.5"
                            >
                                <Calendar className="w-3.5 h-3.5 text-brand-primary" />
                                {t('Format Tanggal')}
                            </Label>
                            <select
                                id="dateFormat"
                                value={dateFormat}
                                onChange={(e) => setDateFormat(e.target.value)}
                                className="w-full h-11 rounded-xl bg-white border border-slate-200 px-3.5 text-sm text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all cursor-pointer shadow-sm"
                            >
                                {dateFormats.map((df) => (
                                    <option key={df.format} value={df.format}>
                                        {df.format} (e.g. {df.example})
                                    </option>
                                ))}
                            </select>
                            <p className="text-[11px] text-slate-400">
                                {t('Format tanggal pada nota dan histori faktur')}
                            </p>
                        </div>
                    </div>

                    {/* Tombol Simpan */}
                    <div className="flex items-center justify-end pt-4 border-t border-slate-100">
                        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                            <Button
                                type="button"
                                onClick={handleSavePreferences}
                                disabled={isSavingPreferences}
                                className="h-11 px-6 bg-brand-primary hover:bg-brand-dark text-white font-medium rounded-xl shadow-[0_4px_15px_rgba(0,147,203,0.25)] transition-colors duration-200 flex items-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                <span>
                                    {isSavingPreferences
                                        ? t('Menyimpan...')
                                        : t('Simpan Preferensi')}
                                </span>
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Modal Konfirmasi Ubah Bahasa */}
            <CleanModal
                open={showLangModal}
                onClose={() => setShowLangModal(false)}
                title={t('Konfirmasi Ubah Bahasa')}
                description={t('Pengaturan lokalisasi antarmuka')}
                icon={Globe}
                size="sm"
            >
                <div className="p-6">
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                        {t('Apakah Anda yakin ingin mengubah bahasa sistem menjadi')}{' '}
                        <strong className="font-semibold text-brand-primary">
                            {languages.find((l) => l.code === pendingLocale)?.name || pendingLocale}
                        </strong>
                        ?
                    </p>

                    <div className="flex items-center justify-end gap-3">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setShowLangModal(false)}
                            className="rounded-xl"
                        >
                            {t('Batal')}
                        </Button>
                        <Button
                            type="button"
                            onClick={confirmLanguageChange}
                            className="bg-brand-primary hover:bg-brand-dark text-white rounded-xl shadow-[0_4px_15px_rgba(0,147,203,0.25)] transition-colors"
                        >
                            {t('Ya, Ubah Bahasa')}
                        </Button>
                    </div>
                </div>
            </CleanModal>
        </div>
    );
}
