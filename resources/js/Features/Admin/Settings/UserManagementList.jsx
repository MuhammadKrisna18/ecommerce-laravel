import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    Search,
    ShieldAlert,
    Trash2,
    Clock,
    AlertTriangle,
    UserCheck,
    X,
    Filter,
    KeyRound,
    RefreshCw,
    CheckCircle2,
} from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { CleanModal } from '@/Components/ui/CleanModal';
import { useTranslation } from '@/Hooks/useTranslation';
import { cn } from '@/lib/utils';
import { useUserModeration } from '@/Features/Admin/Settings/Hooks/useUserModeration';
import { FreezeUserModal } from '@/Features/Admin/Settings/Modals/FreezeUserModal';
import { VerificationCodeModal } from '@/Features/Admin/Settings/Modals/VerificationCodeModal';

export function UserManagementList({ users: initialUsers }) {
    const { t } = useTranslation();

    const rawList = initialUsers?.data || (Array.isArray(initialUsers) ? initialUsers : []);

    const userList = rawList.filter((u) => u.role !== 'admin');

    const [users, setUsers] = useState(userList);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (initialUsers?.data) {
            setUsers(initialUsers.data.filter((u) => u.role !== 'admin'));
        }
    }, [initialUsers]);

    const {
        freezeModalOpen,
        setFreezeModalOpen,
        selectedUser,
        freezeDurationValue,
        setFreezeDurationValue,
        freezeDurationUnit,
        setFreezeDurationUnit,
        freezeReason,
        setFreezeReason,
        codeModalOpen,
        setCodeModalOpen,
        actionType,
        targetUser,
        generatedCode,
        inputCode,
        setInputCode,
        codeError,
        setCodeError,
        isSubmitting,
        openFreezeModal,
        handleFreezeStep1,
        handleDeleteStep1,
        handleUnfreeze,
        handleVerifyAndExecute,
        regenerateCode,
    } = useUserModeration(setUsers);

    const filteredUsers = users.filter((u) => {
        const query = searchQuery.toLowerCase();
        return (
            (u.name && u.name.toLowerCase().includes(query)) ||
            (u.email && u.email.toLowerCase().includes(query))
        );
    });

    return (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="p-6 sm:p-7 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100 shadow-sm">
                        <Users className="w-5 h-5 text-brand-primary" />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-slate-800 tracking-tight">
                            {t('Manajemen Pengguna')}
                        </h3>
                        <p className="text-xs text-slate-500">
                            {t(
                                'Kelola akun pengguna, tindakan bekukan akun dengan durasi kustom, serta hapus akun'
                            )}
                        </p>
                    </div>
                </div>

                <div className="relative w-full md:w-72">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <Input
                        type="text"
                        placeholder={t('Cari nama atau email...')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 pr-3 h-10 bg-white border-slate-200 text-xs rounded-xl focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-3.5 font-medium">{t('Pengguna & Detail')}</th>
                            <th className="px-6 py-3.5 font-medium">{t('Email')}</th>
                            <th className="px-6 py-3.5 font-medium">{t('Status')}</th>
                            <th className="px-6 py-3.5 text-right font-medium">{t('Aksi')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredUsers.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="px-6 py-12 text-center text-slate-400 text-xs"
                                >
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <Filter className="w-6 h-6 text-slate-300" />
                                        <span>
                                            {t('Tidak ada pengguna yang sesuai dengan pencarian.')}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            filteredUsers.map((user) => (
                                <tr
                                    key={user.id}
                                    className="hover:bg-slate-50/60 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-sky-50 text-sky-600 font-semibold text-xs flex items-center justify-center uppercase border border-sky-100 shadow-xs">
                                                {user.name ? user.name.slice(0, 2) : 'US'}
                                            </div>
                                            <div>
                                                <div className="font-medium text-slate-800 text-xs sm:text-sm">
                                                    {user.name}
                                                </div>
                                                <div className="text-[11px] text-slate-400 font-normal">
                                                    ID: #{user.id}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs text-slate-600 font-normal">
                                            {user.email}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.is_frozen ? (
                                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200">
                                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                                                {t('Dibekukan')}
                                                {user.frozen_duration_text && (
                                                    <span className="text-[10px] text-rose-600/80 font-normal">
                                                        ({user.frozen_duration_text})
                                                    </span>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                {t('Aktif')}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {user.is_frozen ? (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleUnfreeze(user)}
                                                    className="h-8 px-3 text-xs font-normal border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 rounded-lg gap-1.5 transition-all shadow-none"
                                                    title={t('Buka pembekuan akun')}
                                                >
                                                    <UserCheck className="w-3.5 h-3.5" />
                                                    <span>{t('Buka Beku')}</span>
                                                </Button>
                                            ) : (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => openFreezeModal(user)}
                                                    className="h-8 px-3 text-xs font-normal border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800 rounded-lg gap-1.5 transition-all shadow-none"
                                                    title={t('Bekukan akun')}
                                                >
                                                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                                                    <span>{t('Bekukan Akun')}</span>
                                                </Button>
                                            )}

                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleDeleteStep1(user)}
                                                className="h-8 px-3 text-xs font-normal border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 rounded-lg gap-1.5 transition-all shadow-none"
                                                title={t('Hapus akun permanen')}
                                            >
                                                <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                                                <span>{t('Hapus Akun')}</span>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="p-4 px-6 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div>
                    {t('Menampilkan')}{' '}
                    <span className="font-semibold text-slate-700">{filteredUsers.length}</span>{' '}
                    {t('pengguna')}
                </div>
                <div className="text-[11px] text-slate-400 font-normal">
                    {t('Proteksi keamanan: Verifikasi 4-digit acak sebelum eksekusi')}
                </div>
            </div>

            <FreezeUserModal
                isOpen={freezeModalOpen}
                onClose={() => setFreezeModalOpen(false)}
                selectedUser={selectedUser}
                freezeDurationValue={freezeDurationValue}
                setFreezeDurationValue={setFreezeDurationValue}
                freezeDurationUnit={freezeDurationUnit}
                setFreezeDurationUnit={setFreezeDurationUnit}
                freezeReason={freezeReason}
                setFreezeReason={setFreezeReason}
                onSubmit={handleFreezeStep1}
            />

            <VerificationCodeModal
                isOpen={codeModalOpen}
                onClose={() => setCodeModalOpen(false)}
                isSubmitting={isSubmitting}
                actionType={actionType}
                targetUser={targetUser}
                generatedCode={generatedCode}
                regenerateCode={regenerateCode}
                inputCode={inputCode}
                setInputCode={setInputCode}
                codeError={codeError}
                setCodeError={setCodeError}
                onSubmit={handleVerifyAndExecute}
            />
        </div>
    );
}
