import { Head } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Sparkles } from 'lucide-react';
import UserLayout from '@/Layouts/UserLayout';
import { AvatarUploadCard } from '@/Features/User/Profile/AvatarUploadCard';
import { ProfileForm } from '@/Features/User/Profile/ProfileForm';
import { Alert } from '@/Components/ui/alert';
import { useTranslation } from '@/Hooks/useTranslation';
import { useFlash } from '@/Hooks/useFlash';

export default function ProfileEdit({ user }) {
    const { t } = useTranslation();
    const { success, error } = useFlash();

    return (
        <UserLayout
            header={
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold tracking-tight text-slate-800 flex items-center gap-2">
                        <User className="w-5 h-5 text-brand-primary" />
                        {t('Profil Pengguna')}
                    </h2>
                    <span className="text-xs text-slate-500 font-normal">
                        {t('Kelola data diri, informasi kontak, dan foto profil akun Anda.')}
                    </span>
                </div>
            }
        >
            <Head title={t('Profil Pengguna')} />

            <div className="max-w-4xl mx-auto space-y-6">
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
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            <Alert variant="danger">{error}</Alert>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <AvatarUploadCard user={user} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.08 }}
                >
                    <ProfileForm user={user} />
                </motion.div>
            </div>
        </UserLayout>
    );
}
