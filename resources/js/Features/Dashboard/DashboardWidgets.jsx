import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { motion } from 'framer-motion';
import { useTranslation } from '@/Hooks/useTranslation';

export function DashboardWidgets() {
    const { t } = useTranslation();
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
    };

    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
        >
            {/* Welcome Banner */}
            <motion.div variants={itemVariants}>
                <Card className="border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle className="text-primary">{t('Selamat Datang di Panel Admin')}</CardTitle>
                        <CardDescription>
                            {t('Anda telah berhasil login sebagai Admin E-Commerce.')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            {t('Area ini masih kosong. Silakan gunakan menu di atas atau mulai tambahkan widget, grafik statistik, dan tabel data di sini.')}
                        </p>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Placeholder for future widgets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{t('Total Pengguna')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-primary">--</div>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{t('Total Pesanan')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-primary">--</div>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{t('Pendapatan')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-primary">Rp 0</div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    );
}
