import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bell,
    ShoppingBag,
    Tag,
    ShieldAlert,
    Mail,
    Smartphone,
    Monitor,
    Check,
} from 'lucide-react';
import { Switch } from '@/Components/ui/switch';
import { Alert } from '@/Components/ui/alert';
import { useTranslation } from '@/Hooks/useTranslation';

function NotificationRow({ icon: Icon, title, description, checked, onChange, disabled }) {
    return (
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-100 hover:border-slate-200 transition-all flex items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-brand-primary shadow-xs shrink-0 mt-0.5 sm:mt-0">
                    <Icon className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-slate-800 tracking-tight">
                        {title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
            <div className="shrink-0 pt-1 sm:pt-0">
                <Switch
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    aria-label={title}
                />
            </div>
        </div>
    );
}

export function NotificationCard() {
    const { t } = useTranslation();

    const [settings, setSettings] = useState({
        orderUpdates: true,
        promotions: true,
        securityAlerts: true,
        channelEmail: true,
        channelWhatsapp: false,
        channelPush: true,
    });

    const [feedback, setFeedback] = useState(null);

    const handleToggle = (key) => (checked) => {
        setSettings((prev) => ({ ...prev, [key]: checked }));
        setFeedback(t('Preferensi notifikasi Anda berhasil diperbarui.'));
        setTimeout(() => setFeedback(null), 3000);
    };

    return (
        <div className="space-y-6">
            <div className="rounded-3xl bg-white border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] overflow-hidden">
                {/* Header */}
                <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/60 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white shadow-sm">
                        <Bell className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                            {t('Pengaturan Notifikasi')}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                            {t('Pilih informasi dan saluran pemberitahuan yang ingin Anda terima')}
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
                                <Alert variant="success">{feedback}</Alert>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Kategori Notifikasi */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            {t('Aktivitas Akun & Belanja')}
                        </h4>

                        <div className="space-y-3">
                            <NotificationRow
                                icon={ShoppingBag}
                                title={t('Status Pesanan & Pengiriman')}
                                description={t('Dapatkan pembaruan langsung tentang status konfirmasi pembayaran, pengemasan, dan nomor resi kurir.')}
                                checked={settings.orderUpdates}
                                onChange={handleToggle('orderUpdates')}
                            />

                            <NotificationRow
                                icon={Tag}
                                title={t('Promo, Diskon & Flash Sale')}
                                description={t('Informasi penawaran harga spesial, kupon cashback Tokped, dan diskon produk favorit Anda.')}
                                checked={settings.promotions}
                                onChange={handleToggle('promotions')}
                            />

                            <NotificationRow
                                icon={ShieldAlert}
                                title={t('Peringatan Keamanan Akun')}
                                description={t('Pemberitahuan segera jika terdeteksi aktivitas login dari perangkat baru atau perubahan kata sandi.')}
                                checked={settings.securityAlerts}
                                onChange={handleToggle('securityAlerts')}
                            />
                        </div>
                    </div>

                    <div className="h-px bg-slate-100" />

                    {/* Saluran Komunikasi */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            {t('Saluran Komunikasi')}
                        </h4>

                        <div className="space-y-3">
                            <NotificationRow
                                icon={Mail}
                                title={t('Notifikasi Email')}
                                description={t('Terima ringkasan transaksi, faktur digital, dan pengumuman platform melalui email terdaftar.')}
                                checked={settings.channelEmail}
                                onChange={handleToggle('channelEmail')}
                            />

                            <NotificationRow
                                icon={Smartphone}
                                title={t('Notifikasi WhatsApp / SMS')}
                                description={t('Kirimkan pemberitahuan instan langsung ke nomor telepon seluler Anda.')}
                                checked={settings.channelWhatsapp}
                                onChange={handleToggle('channelWhatsapp')}
                            />

                            <NotificationRow
                                icon={Monitor}
                                title={t('Push Notifikasi Peramban')}
                                description={t('Munculkan jendela pemberitahuan langsung di layar saat peramban browser sedang terbuka.')}
                                checked={settings.channelPush}
                                onChange={handleToggle('channelPush')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
