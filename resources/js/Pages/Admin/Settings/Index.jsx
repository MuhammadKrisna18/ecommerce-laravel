import { useState } from 'react';
import { useForm, usePage, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';
import { Save, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
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
            onSuccess: () => {
                // Flash message will appear automatically
            }
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
        <AdminLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{t('Pengaturan Toko')}</h2>}>
            <div className="max-w-4xl mx-auto space-y-6">
                
                {flash?.success && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-center"
                    >
                        <CheckCircle className="w-5 h-5 mr-2" />
                        {flash.success}
                    </motion.div>
                )}

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Card className="shadow-sm">
                        <form onSubmit={submit}>
                            <CardHeader>
                                <CardTitle>{t('Pengaturan Umum')}</CardTitle>
                                <CardDescription>
                                    {t('Kelola informasi dasar mengenai toko E-Commerce Anda.')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="store_name">{t('Nama Toko')}</Label>
                                    <Input
                                        id="store_name"
                                        type="text"
                                        value={data.store_name}
                                        onChange={(e) => setData('store_name', e.target.value)}
                                        placeholder="Contoh: Toko Maju Jaya"
                                    />
                                    {errors.store_name && <p className="text-sm text-red-600">{errors.store_name}</p>}
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="store_description">{t('Deskripsi Singkat')}</Label>
                                    <Input
                                        id="store_description"
                                        type="text"
                                        value={data.store_description}
                                        onChange={(e) => setData('store_description', e.target.value)}
                                        placeholder="Menjual berbagai macam kebutuhan rumah tangga..."
                                    />
                                    {errors.store_description && <p className="text-sm text-red-600">{errors.store_description}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="contact_email">{t('Email Kontak')}</Label>
                                        <Input
                                            id="contact_email"
                                            type="email"
                                            value={data.contact_email}
                                            onChange={(e) => setData('contact_email', e.target.value)}
                                            placeholder="admin@toko.com"
                                        />
                                        {errors.contact_email && <p className="text-sm text-red-600">{errors.contact_email}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="contact_phone">{t('Nomor Telepon / WhatsApp')}</Label>
                                        <Input
                                            id="contact_phone"
                                            type="text"
                                            value={data.contact_phone}
                                            onChange={(e) => setData('contact_phone', e.target.value)}
                                            placeholder="08123456789"
                                        />
                                        {errors.contact_phone && <p className="text-sm text-red-600">{errors.contact_phone}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="app_language">{t('Bahasa Sistem')}</Label>
                                        <select
                                            id="app_language"
                                            value={data.app_language}
                                            onChange={handleLanguageChange}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <option value="id">Indonesia</option>
                                            <option value="en">Inggris (English)</option>
                                            <option value="es">Spanyol (Español)</option>
                                        </select>
                                        {errors.app_language && <p className="text-sm text-red-600">{errors.app_language}</p>}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end border-t pt-6 bg-slate-50 rounded-b-xl">
                                <Button type="submit" disabled={processing} className="w-full sm:w-auto">
                                    {processing ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            {t('Menyimpan...')}
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4 mr-2" />
                                            {t('Simpan Pengaturan')}
                                        </>
                                    )}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </motion.div>
                
                {/* Modal Konfirmasi Bahasa */}
                <AnimatePresence>
                    {showLangConfirm && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex items-center gap-4 mb-4 text-amber-600">
                                        <div className="p-3 bg-amber-100 rounded-full">
                                            <AlertTriangle className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900">{t('Konfirmasi Ubah Bahasa')}</h3>
                                    </div>
                                    <p className="text-gray-600">
                                        {t('Apakah Anda yakin ingin mengubah bahasa sistem menjadi')}{' '}
                                        <span className="font-bold">
                                            {pendingLang === 'id' ? t('Indonesia') : pendingLang === 'en' ? t('Inggris') : t('Spanyol')}
                                        </span>?
                                    </p>
                                    <div className="mt-6 flex justify-end gap-3">
                                        <Button type="button" variant="outline" onClick={cancelLanguageChange}>
                                            {t('Batal')}
                                        </Button>
                                        <Button type="button" onClick={confirmLanguageChange}>
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
