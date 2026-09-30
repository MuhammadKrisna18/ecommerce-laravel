import { useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';
import { Spinner } from '@/Components/ui/spinner';
import {
    User,
    AtSign,
    Calendar,
    MapPin,
    Home,
    Save,
    ShieldCheck,
    Mail,
} from 'lucide-react';
import { useTranslation } from '@/Hooks/useTranslation';

const inputCls = "h-11 bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl transition-all shadow-sm";

function FormField({ id, icon: Icon, label, error, children, helper }) {
    return (
        <div className="space-y-1.5">
            <Label
                htmlFor={id}
                className="text-xs font-semibold text-slate-700 flex items-center gap-1.5"
            >
                <Icon className="w-3.5 h-3.5 text-brand-primary" />
                {label}
            </Label>
            {children}
            {helper && <p className="text-[11px] text-slate-400 mt-1">{helper}</p>}
            {error && <p className="text-xs text-rose-500 font-medium mt-1">{error}</p>}
        </div>
    );
}

export function ProfileForm({ user }) {
    const { t } = useTranslation();

    const { data, setData, patch, processing, errors } = useForm({
        name: user.name || '',
        nickname: user.nickname || '',
        birth_date: user.birth_date || '',
        birth_place: user.birth_place || '',
        address: user.address || '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('user.profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <div className="rounded-3xl bg-white border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] overflow-hidden">
            <form onSubmit={submit}>
                {/* Header */}
                <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/60">
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
                </div>

                {/* Body */}
                <div className="p-6 sm:p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Nama Lengkap */}
                        <FormField
                            id="name"
                            icon={User}
                            label={t('Nama Lengkap')}
                            error={errors.name}
                        >
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Contoh: Muhammad Krisna"
                                className={inputCls}
                                required
                            />
                        </FormField>

                        {/* Nama Panggilan / Username */}
                        <FormField
                            id="nickname"
                            icon={AtSign}
                            label={t('Nama Panggilan / Username')}
                            error={errors.nickname}
                            helper="Digunakan sebagai panggilan unik Anda di platform"
                        >
                            <Input
                                id="nickname"
                                type="text"
                                value={data.nickname}
                                onChange={(e) => setData('nickname', e.target.value)}
                                placeholder="Contoh: krisna18"
                                className={inputCls}
                                required
                            />
                        </FormField>

                        {/* Email (Read Only) */}
                        <FormField
                            id="email"
                            icon={Mail}
                            label={t('Email Akun')}
                            helper="Email terhubung dengan kredensial login utama Anda"
                        >
                            <Input
                                id="email"
                                type="email"
                                value={user.email}
                                disabled
                                className={`${inputCls} bg-slate-100/70 text-slate-500 cursor-not-allowed`}
                            />
                        </FormField>

                        {/* Tempat Lahir */}
                        <FormField
                            id="birth_place"
                            icon={MapPin}
                            label={t('Tempat Lahir')}
                            error={errors.birth_place}
                        >
                            <Input
                                id="birth_place"
                                type="text"
                                value={data.birth_place}
                                onChange={(e) => setData('birth_place', e.target.value)}
                                placeholder="Contoh: Jakarta"
                                className={inputCls}
                            />
                        </FormField>

                        {/* Tanggal Lahir */}
                        <FormField
                            id="birth_date"
                            icon={Calendar}
                            label={t('Tanggal Lahir')}
                            error={errors.birth_date}
                        >
                            <Input
                                id="birth_date"
                                type="date"
                                value={data.birth_date}
                                onChange={(e) => setData('birth_date', e.target.value)}
                                className={inputCls}
                            />
                        </FormField>
                    </div>

                    {/* Alamat Lengkap */}
                    <FormField
                        id="address"
                        icon={Home}
                        label={t('Alamat Lengkap')}
                        error={errors.address}
                        helper="Alamat lengkap tempat tinggal untuk pengiriman pesanan Anda"
                    >
                        <textarea
                            id="address"
                            rows={3}
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            placeholder="Jl. Merdeka No. 123, Kelurahan, Kecamatan, Kota, Kode Pos"
                            className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-sm"
                        />
                    </FormField>
                </div>

                {/* Footer */}
                <div className="p-6 sm:p-8 border-t border-slate-100 bg-slate-50/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-slate-500 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-brand-primary" />
                        <span>Data profil Anda terlindungi dengan standar keamanan privasi.</span>
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
                                    <span>{t('Menyimpan Perubahan...')}</span>
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    <span>{t('Simpan Perubahan')}</span>
                                </>
                            )}
                        </Button>
                    </motion.div>
                </div>
            </form>
        </div>
    );
}
