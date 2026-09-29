import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';
import { Alert } from '@/Components/ui/alert';
import { Modal } from '@/Components/ui/modal';
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
                className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5"
            >
                <Icon className="w-3.5 h-3.5 text-rose-400" />
                {label}
            </Label>
            {children}
            {error && <p className="text-xs text-rose-400">{error}</p>}
        </div>
    );
}

// ─── LangConfirmModal ────────────────────────────────────────────────────────

function LangConfirmModal({ open, pendingLang, onConfirm, onCancel, t }) {
    const langName = { id: t('Indonesia'), en: t('Inggris'), es: t('Spanyol') };

    return (
        <Modal
            open={open}
            onClose={onCancel}
            title={t('Konfirmasi Ubah Bahasa')}
            description="Pengaturan lokalisasi antarmuka"
            size="sm"
        >
            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                {t('Apakah Anda yakin ingin mengubah bahasa sistem menjadi')}{' '}
                <span className="font-bold text-rose-300 underline underline-offset-4">
                    {langName[pendingLang] ?? pendingLang}
                </span>
                ?
            </p>

            <Modal.Footer>
                <Button variant="ghost" onClick={onCancel} className="text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl">
                    {t('Batal')}
                </Button>
                <Button
                    onClick={onConfirm}
                    className="bg-red-700 hover:bg-red-600 text-white rounded-xl shadow-[0_0_15px_rgba(225,29,72,0.3)]"
                >
                    {t('Ya, Ubah Bahasa')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

// ─── SettingsForm ─────────────────────────────────────────────────────────────

const inputCls = "h-11 bg-zinc-950/70 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-xl transition-all";

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
                <div className="relative rounded-3xl bg-[#0e0a0b]/90 backdrop-blur-xl border border-red-950/40 shadow-[0_10px_40px_rgba(0,0,0,0.6)] overflow-hidden">
                    {/* Top accent */}
                    <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />

                    <form onSubmit={submit}>
                        {/* Card header */}
                        <div className="p-6 sm:p-8 border-b border-red-950/30 bg-zinc-950/30">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600/20 to-zinc-900 border border-red-800/40 flex items-center justify-center text-rose-300">
                                    <Store className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white tracking-tight">
                                        {t('Pengaturan Umum')}
                                    </h3>
                                    <p className="text-xs text-zinc-400 mt-0.5">
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
                                            className="w-full h-11 rounded-xl bg-zinc-950/70 border border-zinc-800 px-4 text-sm text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all cursor-pointer"
                                        >
                                            <option value="id" className="bg-[#120d0f] text-white">Bahasa Indonesia</option>
                                            <option value="en" className="bg-[#120d0f] text-white">English (Inggris)</option>
                                            <option value="es" className="bg-[#120d0f] text-white">Español (Spanyol)</option>
                                        </select>
                                        <p className="text-[11px] text-zinc-500 mt-1.5">
                                            {t('Mengubah bahasa akan memperbarui teks antarmuka di seluruh panel admin.')}
                                        </p>
                                    </div>
                                </FieldRow>
                            </div>
                        </div>

                        {/* Card footer */}
                        <div className="p-6 sm:p-8 border-t border-red-950/30 bg-zinc-950/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-xs text-zinc-500 flex items-center gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-rose-500/70" />
                                Perubahan akan langsung disimpan ke cache memori &amp; database
                            </div>

                            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="h-11 px-6 bg-gradient-to-r from-red-700 via-rose-800 to-red-900 hover:from-red-600 hover:via-rose-700 hover:to-red-800 text-white font-medium rounded-xl shadow-[0_0_20px_rgba(225,29,72,0.3)] border border-red-500/20 transition-all flex items-center justify-center gap-2"
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
