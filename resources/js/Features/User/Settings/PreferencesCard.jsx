import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check, SlidersHorizontal, Loader2 } from 'lucide-react';
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
    const [isUpdatingLocale, setIsUpdatingLocale] = useState(false);
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        setSelectedLocale(initialLocale || currentLocale || 'id');
    }, [initialLocale, currentLocale]);

    const languages = [
        { code: 'id', name: 'Bahasa Indonesia', native: 'Bahasa Indonesia', flag: '🇮🇩' },
        { code: 'en', name: 'English (US)', native: 'English', flag: '🇺🇸' },
        { code: 'es', name: 'Español', native: 'Español', flag: '🇪🇸' },
    ];

    const handleSelectLanguage = (code) => {
        if (code !== selectedLocale) {
            setPendingLocale(code);
            setShowLangModal(true);
        }
    };

    const confirmLanguageChange = () => {
        if (!pendingLocale || isUpdatingLocale) return;

        setIsUpdatingLocale(true);
        router.put(
            route('user.settings.locale.update'),
            { locale: pendingLocale },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setSelectedLocale(pendingLocale);
                    setShowLangModal(false);
                    setIsUpdatingLocale(false);
                    setFeedback({
                        type: 'success',
                        message: t('Preferensi bahasa berhasil diperbarui.'),
                    });
                },
                onError: (errors) => {
                    setIsUpdatingLocale(false);
                    setShowLangModal(false);
                    setFeedback({
                        type: 'error',
                        message: errors?.locale || t('Gagal menyimpan pengaturan.'),
                    });
                },
            }
        );
    };

    return (
        <div className="space-y-6">
            <div className="rounded-3xl bg-white border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] overflow-hidden">
                <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/60 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white shadow-sm">
                        <SlidersHorizontal className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                            {t('Preferensi & Tampilan')}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                            {t(
                                'Pilih bahasa utama yang ingin Anda gunakan untuk menjelajahi platform K-Tienda en Línea'
                            )}
                        </p>
                    </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
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

                    <div className="space-y-3">
                        <Label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5 text-brand-primary" />
                            {t('Bahasa Sistem / Interface')}
                        </Label>

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
                                                <p className="text-xs text-slate-400">
                                                    {lang.native}
                                                </p>
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
                </div>
            </div>

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
                            {{ id: t('Indonesia'), en: t('Inggris'), es: t('Spanyol') }[
                                pendingLocale
                            ] || pendingLocale}
                        </strong>
                        ?
                    </p>

                    <div className="flex items-center justify-end gap-3">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setShowLangModal(false)}
                            disabled={isUpdatingLocale}
                            className="rounded-xl"
                        >
                            {t('Batal')}
                        </Button>
                        <Button
                            type="button"
                            onClick={confirmLanguageChange}
                            disabled={isUpdatingLocale}
                            className="bg-brand-primary hover:bg-brand-dark text-white rounded-xl shadow-[0_4px_15px_rgba(0,147,203,0.25)] transition-colors flex items-center gap-2"
                        >
                            {isUpdatingLocale && <Loader2 className="w-4 h-4 animate-spin" />}
                            <span>
                                {isUpdatingLocale ? t('Menyimpan...') : t('Ya, Ubah Bahasa')}
                            </span>
                        </Button>
                    </div>
                </div>
            </CleanModal>
        </div>
    );
}
