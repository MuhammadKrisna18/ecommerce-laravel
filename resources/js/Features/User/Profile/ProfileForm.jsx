import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/Components/ui/button';
import { EditProfileModal } from '@/Features/User/Profile/EditProfileModal';
import {
    User,
    AtSign,
    Calendar,
    MapPin,
    Home,
    Mail,
    Edit3,
    ShieldCheck,
} from 'lucide-react';
import { useTranslation } from '@/Hooks/useTranslation';

function InfoItem({ icon: Icon, label, value, helper }) {
    return (
        <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50/80 border border-slate-100 hover:border-slate-200 transition-colors">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5 text-brand-primary" />
                {label}
            </span>
            <div className="text-sm font-semibold text-slate-800 break-words">
                {value ? (
                    value
                ) : (
                    <span className="text-slate-400 italic text-xs font-normal">
                        Belum diatur
                    </span>
                )}
            </div>
            {helper && <p className="text-[11px] text-slate-400">{helper}</p>}
        </div>
    );
}

export function ProfileForm({ user }) {
    const { t } = useTranslation();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    return (
        <>
            <div className="rounded-3xl bg-white border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] overflow-hidden">
                {/* Header */}
                <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white shadow-sm">
                            <User className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                                {t('Informasi Pribadi')}
                            </h3>
                            <p className="text-xs text-slate-500 mt-0.5">
                                {t('Kelola data diri, identitas username, dan alamat pengiriman Anda.')}
                            </p>
                        </div>
                    </div>

                    {/* Edit button in header */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                            type="button"
                            onClick={() => setIsEditModalOpen(true)}
                            className="h-10 px-4 bg-brand-primary hover:bg-brand-dark text-white font-medium rounded-xl shadow-[0_4px_15px_rgba(0,147,203,0.25)] transition-colors duration-200 flex items-center gap-2 text-xs"
                        >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>{t('Edit Profil')}</span>
                        </Button>
                    </motion.div>
                </div>

                {/* Body Details */}
                <div className="p-6 sm:p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InfoItem
                            icon={User}
                            label={t('Nama Lengkap')}
                            value={user.name}
                        />

                        <InfoItem
                            icon={AtSign}
                            label={t('Nama Panggilan / Username')}
                            value={user.nickname ? `@${user.nickname}` : null}
                            helper={t('Digunakan sebagai panggilan unik Anda di platform')}
                        />

                        <InfoItem
                            icon={Mail}
                            label={t('Email Akun')}
                            value={user.email}
                            helper={t('Email terhubung dengan kredensial login utama Anda')}
                        />

                        <InfoItem
                            icon={MapPin}
                            label={t('Tempat Lahir')}
                            value={user.birth_place}
                        />

                        <InfoItem
                            icon={Calendar}
                            label={t('Tanggal Lahir')}
                            value={user.birth_date}
                        />

                        <div className="md:col-span-2">
                            <InfoItem
                                icon={Home}
                                label={t('Alamat Lengkap')}
                                value={user.address}
                                helper={t('Alamat lengkap tempat tinggal untuk pengiriman pesanan Anda')}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 sm:p-8 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between gap-4">
                    <div className="text-xs text-slate-500 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-brand-primary" />
                        <span>{t('Data profil Anda terlindungi dengan standar keamanan privasi.')}</span>
                    </div>
                </div>
            </div>

            {/* Pop Card Modal for Editing Profile */}
            <EditProfileModal
                open={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                user={user}
            />
        </>
    );
}
