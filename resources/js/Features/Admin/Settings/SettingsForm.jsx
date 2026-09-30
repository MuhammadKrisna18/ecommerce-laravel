import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';
import { Alert } from '@/Components/ui/alert';
import { CleanModal } from '@/Components/ui/CleanModal';
import { Spinner } from '@/Components/ui/spinner';
import {
    Save,
    Store,
    FileText,
    Mail,
    Phone,
    Globe,
    ShieldCheck,
    Sliders,
    AlertTriangle,
} from 'lucide-react';
import { useTranslation } from '@/Hooks/useTranslation';
import { useFlash } from '@/Hooks/useFlash';

// ─── FieldRow ────────────────────────────────────────────────────────────────

function FieldRow({ id, icon: Icon, label, error, children }) {
    return (
        <div className="space-y-2">
            <Label
                htmlFor={id}
                className="text-xs font-semibold text-slate-700 flex items-center gap-1.5"
            >
                <Icon className="w-3.5 h-3.5 text-brand-primary" />
                {label}
            </Label>
            {children}
            {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}
        </div>
    );
}

// ─── LangConfirmModal ────────────────────────────────────────────────────────

function LangConfirmModal({ open, pendingLang, onConfirm, onCancel, t }) {
    const langName = { id: t('Indonesia'), en: t('Inggris'), es: t('Spanyol') };

    return (
        <CleanModal
            open={open}
            onClose={onCancel}
            title={t('Konfirmasi Ubah Bahasa')}
            description={t('Pengaturan lokalisasi antarmuka')}
            icon={Globe}
            size="sm"
        >
            <div className="p-6">
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {t('Apakah Anda yakin ingin mengubah bahasa sistem menjadi')}{' '}
                    <strong className="font-semibold text-brand-primary">
                        {langName[pendingLang] ?? pendingLang}
                    </strong>
                    ?
                </p>

                <div className="flex items-center justify-end gap-3">
                    <Button 
                        type="button"
                        variant="ghost" 
                        onClick={onCancel} 
                        className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl"
                    >
                        {t('Batal')}
                    </Button>
                    <Button
                        type="button"
                        onClick={onConfirm}
                        className="bg-gradient-to-r from-brand-primary to-brand-dark hover:opacity-95 text-white rounded-xl shadow-[0_4px_15px_rgba(0,147,203,0.25)]"
                    >
                        {t('Ya, Ubah Bahasa')}
                    </Button>
                </div>
            </div>
        </CleanModal>
    );
}

// ─── SettingsForm ─────────────────────────────────────────────────────────────

const inputCls = "h-11 bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl transition-all shadow-sm";

/**
 * Settings form feature component.
 *
 * @param {{ settings: object }} props
 */
export function SettingsForm({ settings }) {
    const { t } = useTranslation();
    const { success } = useFlash();

    const [showLangConfirm, setShowLangConfirm] = useState(false);
    const [pendingLang, setPendingLang] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        store_name:        settings.store_name        || '',
        store_description: settings.store_description || '',
        contact_email:     settings.contact_email     || '',
        contact_phone:     settings.contact_phone     || '',
        app_language:      settings.app_language      || 'id',
    });

    const handleLanguageChange = (e) => {
        const newLang = e.target.value;
        if (newLang !== data.app_language) {
            setPendingLang(newLang);
            setShowLangConfirm(true);
        }
    };

    const confirmLanguageChange = () => {
        const newData = { ...data, app_language: pendingLang };
        setData('app_language', pendingLang);
        setShowLangConfirm(false);
        router.post(route('admin.settings.update'), newData, { preserveScroll: true });
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'));
    };

    return (
        <>
            {/* Flash success */}
            <AnimatePresence>
                {success && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                    >
                        <Alert variant="success">{success}</Alert>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Form card */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="relative rounded-3xl bg-white border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] overflow-hidden">
                    <form onSubmit={submit}>
                        {/* Card header */}
                        <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/60">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white shadow-sm">
                                    <Store className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                                        {t('Pengaturan Umum')}
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        {t('Kelola informasi dasar mengenai toko E-Commerce Anda.')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card body */}
                        <div className="p-6 sm:p-8 space-y-6">
                            <FieldRow id="store_name" icon={Store} label={t('Nama Toko')} error={errors.store_name}>
                                <Input
                                    id="store_name"
                                    type="text"
                                    value={data.store_name}
                                    onChange={(e) => setData('store_name', e.target.value)}
                                    placeholder="Contoh: Tokopedia Official Store"
                                    className={inputCls}
                                />
                            </FieldRow>

                            <FieldRow id="store_description" icon={FileText} label={t('Deskripsi Singkat')} error={errors.store_description}>
                                <Input
                                    id="store_description"
                                    type="text"
                                    value={data.store_description}
                                    onChange={(e) => setData('store_description', e.target.value)}
                                    placeholder="Menjual berbagai macam kebutuhan produk berkualitas..."
                                    className={inputCls}
                                />
                            </FieldRow>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                <FieldRow id="contact_email" icon={Mail} label={t('Email Kontak')} error={errors.contact_email}>
                                    <Input
                                        id="contact_email"
                                        type="email"
                                        value={data.contact_email}
                                        onChange={(e) => setData('contact_email', e.target.value)}
                                        placeholder="admin@toko.com"
                                        className={inputCls}
                                    />
                                </FieldRow>

                                <FieldRow id="contact_phone" icon={Phone} label={t('Nomor Telepon / WhatsApp')} error={errors.contact_phone}>
                                    <Input
                                        id="contact_phone"
                                        type="text"
                                        value={data.contact_phone}
                                        onChange={(e) => setData('contact_phone', e.target.value)}
                                        placeholder="08123456789"
                                        className={inputCls}
                                    />
                                </FieldRow>

                                <FieldRow id="app_language" icon={Globe} label={t('Bahasa Sistem')} error={errors.app_language}>
                                    <div className="md:col-span-2">
                                        <select
                                            id="app_language"
                                            value={data.app_language}
                                            onChange={handleLanguageChange}
                                            className="w-full h-11 rounded-xl bg-white border border-slate-200 px-4 text-sm text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all cursor-pointer shadow-sm"
                                        >
                                            <option value="id" className="text-slate-800">Bahasa Indonesia</option>
                                            <option value="en" className="text-slate-800">English (Inggris)</option>
                                            <option value="es" className="text-slate-800">Español (Spanyol)</option>
                                        </select>
                                        <p className="text-[11px] text-slate-400 mt-1.5">
                                            {t('Mengubah bahasa akan memperbarui teks antarmuka di seluruh panel admin.')}
                                        </p>
                                    </div>
                                </FieldRow>
                            </div>
                        </div>

                        {/* Card footer */}
                        <div className="p-6 sm:p-8 border-t border-slate-100 bg-slate-50/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-xs text-slate-500 flex items-center gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-brand-primary" />
                                Perubahan akan langsung disimpan ke cache memori &amp; database
                            </div>

                            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="h-11 px-6 bg-gradient-to-r from-brand-primary to-brand-dark hover:opacity-95 text-white font-medium rounded-xl shadow-[0_4px_15px_rgba(0,147,203,0.3)] transition-all flex items-center justify-center gap-2"
                                >
                                    {processing ? (
                                        <>
                                            <Spinner size="sm" color="white" />
                                            <span>{t('Menyimpan...')}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4" />
                                            <span>{t('Simpan Pengaturan')}</span>
                                        </>
                                    )}
                                </Button>
                            </motion.div>
                        </div>
                    </form>
                </div>
            </motion.div>

            {/* Language confirm modal */}
            <LangConfirmModal
                open={showLangConfirm}
                pendingLang={pendingLang}
                onConfirm={confirmLanguageChange}
                onCancel={() => { setPendingLang(''); setShowLangConfirm(false); }}
                t={t}
            />
        </>
    );
}
