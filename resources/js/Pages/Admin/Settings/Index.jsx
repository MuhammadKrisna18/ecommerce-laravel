import { useState } from 'react';
import { useForm, usePage, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '@/Layouts/AdminLayout';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';
import { 
    Save, 
    Loader2, 
    CheckCircle2, 
    AlertTriangle, 
    Store, 
    FileText, 
    Mail, 
    Phone, 
    Globe, 
    Sparkles, 
    ShieldCheck,
    Sliders
} from 'lucide-react';
import { useTranslation } from '@/Hooks/useTranslation';

export default function SettingsIndex({ settings }) {
    const { t } = useTranslation();
    const { flash } = usePage().props;
    const [showLangConfirm, setShowLangConfirm] = useState(false);
    const [pendingLang, setPendingLang] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        store_name: settings.store_name || '',
        store_description: settings.store_description || '',
        contact_email: settings.contact_email || '',
        contact_phone: settings.contact_phone || '',
        app_language: settings.app_language || 'id',
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
        
        router.post(route('admin.settings.update'), newData, {
            preserveScroll: true,
        });
    };

    const cancelLanguageChange = () => {
        setPendingLang('');
        setShowLangConfirm(false);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'));
    };

    return (
        <AdminLayout 
            header={
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                        <Sliders className="w-5 h-5 text-rose-400" />
                        {t('Pengaturan Toko')}
                    </h2>
                    <span className="text-xs text-zinc-400">
                        {t('Konfigurasi identitas toko, kontak layanan, dan lokalisasi')}
                    </span>
                </div>
            }
        >
            <div className="max-w-4xl mx-auto space-y-6">
                
                {/* Flash Message Sukses */}
                {flash?.success && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="bg-emerald-950/40 border border-emerald-800/50 text-emerald-300 px-4 py-3.5 rounded-2xl flex items-center gap-3 shadow-lg shadow-emerald-950/20"
                    >
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        <span className="text-sm font-medium">{flash.success}</span>
                    </motion.div>
                )}

                {/* Form Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="relative rounded-3xl bg-[#0e0a0b]/90 backdrop-blur-xl border border-red-950/40 shadow-[0_10px_40px_rgba(0,0,0,0.6)] overflow-hidden">
                        {/* Top Ambient Highlight */}
                        <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />

                        <form onSubmit={submit}>
                            {/* Card Header */}
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

                            {/* Card Content */}
                            <div className="p-6 sm:p-8 space-y-6">
                                {/* Nama Toko */}
                                <div className="space-y-2">
                                    <Label htmlFor="store_name" className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                                        <Store className="w-3.5 h-3.5 text-rose-400" />
                                        {t('Nama Toko')}
                                    </Label>
                                    <div className="relative group">
                                        <Input
                                            id="store_name"
                                            type="text"
                                            value={data.store_name}
                                            onChange={(e) => setData('store_name', e.target.value)}
                                            placeholder="Contoh: Tokopedia Official Store"
                                            className="h-11 bg-zinc-950/70 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-xl transition-all"
                                        />
                                    </div>
                                    {errors.store_name && <p className="text-xs text-rose-400">{errors.store_name}</p>}
                                </div>
                                
                                {/* Deskripsi Singkat */}
                                <div className="space-y-2">
                                    <Label htmlFor="store_description" className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                                        <FileText className="w-3.5 h-3.5 text-rose-400" />
                                        {t('Deskripsi Singkat')}
                                    </Label>
                                    <Input
                                        id="store_description"
                                        type="text"
                                        value={data.store_description}
                                        onChange={(e) => setData('store_description', e.target.value)}
                                        placeholder="Menjual berbagai macam kebutuhan produk berkualitas..."
                                        className="h-11 bg-zinc-950/70 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-xl transition-all"
                                    />
                                    {errors.store_description && <p className="text-xs text-rose-400">{errors.store_description}</p>}
                                </div>

                                {/* Kontak & Bahasa Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                    {/* Email Kontak */}
                                    <div className="space-y-2">
                                        <Label htmlFor="contact_email" className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                                            <Mail className="w-3.5 h-3.5 text-rose-400" />
                                            {t('Email Kontak')}
                                        </Label>
                                        <Input
                                            id="contact_email"
                                            type="email"
                                            value={data.contact_email}
                                            onChange={(e) => setData('contact_email', e.target.value)}
                                            placeholder="admin@toko.com"
                                            className="h-11 bg-zinc-950/70 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-xl transition-all"
                                        />
                                        {errors.contact_email && <p className="text-xs text-rose-400">{errors.contact_email}</p>}
                                    </div>

                                    {/* Nomor Telepon / WhatsApp */}
                                    <div className="space-y-2">
                                        <Label htmlFor="contact_phone" className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                                            <Phone className="w-3.5 h-3.5 text-rose-400" />
                                            {t('Nomor Telepon / WhatsApp')}
                                        </Label>
                                        <Input
                                            id="contact_phone"
                                            type="text"
                                            value={data.contact_phone}
                                            onChange={(e) => setData('contact_phone', e.target.value)}
                                            placeholder="08123456789"
                                            className="h-11 bg-zinc-950/70 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-xl transition-all"
                                        />
                                        {errors.contact_phone && <p className="text-xs text-rose-400">{errors.contact_phone}</p>}
                                    </div>

                                    {/* Bahasa Sistem */}
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="app_language" className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                                            <Globe className="w-3.5 h-3.5 text-rose-400" />
                                            {t('Bahasa Sistem')}
                                        </Label>
                                        <div className="relative">
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
                                        </div>
                                        <p className="text-[11px] text-zinc-500">
                                            {t('Mengubah bahasa akan memperbarui teks antarmuka di seluruh panel admin.')}
                                        </p>
                                        {errors.app_language && <p className="text-xs text-rose-400">{errors.app_language}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className="p-6 sm:p-8 border-t border-red-950/30 bg-zinc-950/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="text-xs text-zinc-500 flex items-center gap-1.5">
                                    <ShieldCheck className="w-4 h-4 text-rose-500/70" />
                                    Perubahan akan langsung disimpan ke cache memori & database
                                </div>

                                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                    <Button 
                                        type="submit" 
                                        disabled={processing} 
                                        className="h-11 px-6 bg-gradient-to-r from-red-700 via-rose-800 to-red-900 hover:from-red-600 hover:via-rose-700 hover:to-red-800 text-white font-medium rounded-xl shadow-[0_0_20px_rgba(225,29,72,0.3)] border border-red-500/20 transition-all flex items-center justify-center gap-2"
                                    >
                                        {processing ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
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
                
                {/* Modal Konfirmasi Bahasa */}
                <AnimatePresence>
                    {showLangConfirm && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                className="bg-[#120d0f] border border-red-900/40 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] w-full max-w-md overflow-hidden relative"
                            >
                                <div className="p-6 sm:p-7 space-y-4">
                                    <div className="flex items-center gap-3.5 text-rose-300">
                                        <div className="p-3 bg-red-950/60 border border-red-800/40 rounded-2xl">
                                            <AlertTriangle className="w-6 h-6 text-rose-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold text-white">{t('Konfirmasi Ubah Bahasa')}</h3>
                                            <p className="text-xs text-zinc-400">Pengaturan lokalisasi antarmuka</p>
                                        </div>
                                    </div>

                                    <p className="text-sm text-zinc-300 leading-relaxed">
                                        {t('Apakah Anda yakin ingin mengubah bahasa sistem menjadi')}{' '}
                                        <span className="font-bold text-rose-300 underline underline-offset-4">
                                            {pendingLang === 'id' ? t('Indonesia') : pendingLang === 'en' ? t('Inggris') : t('Spanyol')}
                                        </span>?
                                    </p>

                                    <div className="pt-3 flex justify-end gap-3">
                                        <Button 
                                            type="button" 
                                            variant="ghost" 
                                            onClick={cancelLanguageChange}
                                            className="text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl"
                                        >
                                            {t('Batal')}
                                        </Button>
                                        <Button 
                                            type="button" 
                                            onClick={confirmLanguageChange}
                                            className="bg-red-700 hover:bg-red-600 text-white rounded-xl shadow-[0_0_15px_rgba(225,29,72,0.3)]"
                                        >
                                            {t('Ya, Ubah Bahasa')}
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </AdminLayout>
    );
}
