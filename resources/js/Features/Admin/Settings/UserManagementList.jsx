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
    CheckCircle2
} from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { CleanModal } from '@/Components/ui/CleanModal';
import { useTranslation } from '@/Hooks/useTranslation';

// Helper to generate a 4-character alphanumeric code (e.g. 7K2B)
function generateRandomCode() {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // exclude confusing chars like 0, 1, I, O
    let result = '';
    for (let i = 0; i < 4; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export function UserManagementList({ users: initialUsers }) {
    const { t } = useTranslation();

    // Default mock data if users props is empty/not provided (exclude admin)
    const rawList = initialUsers?.data || (Array.isArray(initialUsers) ? initialUsers : [
        {
            id: 1,
            name: 'Budi Santoso',
            email: 'budi.santoso@example.com',
            role: 'user',
            is_frozen: false,
            created_at: '2026-01-15',
        },
        {
            id: 2,
            name: 'Siti Rahmawati',
            email: 'siti.rahma@example.com',
            role: 'user',
            is_frozen: true,
            frozen_until: '2026-10-15 12:00:00',
            frozen_reason: 'Pelanggaran syarat & ketentuan transaksi berulang',
            created_at: '2026-02-01',
        },
        {
            id: 3,
            name: 'Ahmad Fauzan',
            email: 'ahmad.fauzan@example.com',
            role: 'user',
            is_frozen: false,
            created_at: '2026-03-10',
        },
    ]);

    // Ensure no admin is included in user list
    const userList = rawList.filter((u) => u.role !== 'admin');

    const [users, setUsers] = useState(userList);
    const [searchQuery, setSearchQuery] = useState('');

    // Keep state updated if initialUsers changes from inertia visits
    useEffect(() => {
        if (initialUsers?.data) {
            setUsers(initialUsers.data.filter((u) => u.role !== 'admin'));
        }
    }, [initialUsers]);

    // Modal state for Freeze Account configuration
    const [freezeModalOpen, setFreezeModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [freezeDurationValue, setFreezeDurationValue] = useState(1);
    const [freezeDurationUnit, setFreezeDurationUnit] = useState('days'); // hours, days, weeks, months, years
    const [freezeReason, setFreezeReason] = useState('');

    // Modal state for Delete Account configuration
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    // ── 4-Digit Confirmation Code Modal State ─────────────────────────────
    const [codeModalOpen, setCodeModalOpen] = useState(false);
    const [actionType, setActionType] = useState(''); // 'freeze' | 'delete'
    const [targetUser, setTargetUser] = useState(null);
    const [generatedCode, setGeneratedCode] = useState('');
    const [inputCode, setInputCode] = useState('');
    const [codeError, setCodeError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Filter users by name or email
    const filteredUsers = users.filter((u) => {
        const query = searchQuery.toLowerCase();
        return (
            (u.name && u.name.toLowerCase().includes(query)) ||
            (u.email && u.email.toLowerCase().includes(query))
        );
    });

    const openFreezeModal = (user) => {
        setSelectedUser(user);
        setFreezeDurationValue(1);
        setFreezeDurationUnit('days');
        setFreezeReason('');
        setFreezeModalOpen(true);
    };

    // Step 1 Freeze: Close config modal and open 4-digit code confirmation
    const handleFreezeStep1 = (e) => {
        e.preventDefault();
        if (!selectedUser) return;

        setTargetUser(selectedUser);
        setActionType('freeze');
        const code = generateRandomCode();
        setGeneratedCode(code);
        setInputCode('');
        setCodeError('');
        setFreezeModalOpen(false);
        setCodeModalOpen(true);
    };

    // Step 1 Delete: Close config modal and open 4-digit code confirmation
    const handleDeleteStep1 = (user) => {
        setUserToDelete(user);
        setTargetUser(user);
        setActionType('delete');
        const code = generateRandomCode();
        setGeneratedCode(code);
        setInputCode('');
        setCodeError('');
        setDeleteModalOpen(false);
        setCodeModalOpen(true);
    };

    // Direct Unfreeze
    const handleUnfreeze = (user) => {
        router.post(
            route('admin.users.unfreeze', user.id),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    setUsers((prev) =>
                        prev.map((u) =>
                            u.id === user.id
                                ? {
                                      ...u,
                                      is_frozen: false,
                                      frozen_duration: null,
                                      frozen_reason: null,
                                  }
                                : u
                        )
                    );
                },
                onError: () => {
                    // Fallback local update
                    setUsers((prev) =>
                        prev.map((u) =>
                            u.id === user.id
                                ? { ...u, is_frozen: false, frozen_duration: null, frozen_reason: null }
                                : u
                        )
                    );
                },
            }
        );
    };

    // Step 2: Final Verification via 4-Digit Code
    const handleVerifyAndExecute = (e) => {
        e.preventDefault();
        setCodeError('');

        if (inputCode.trim().toUpperCase() !== generatedCode.toUpperCase()) {
            setCodeError(t('Kode verifikasi tidak cocok. Silakan coba lagi.'));
            return;
        }

        if (!targetUser) return;
        setIsSubmitting(true);

        if (actionType === 'freeze') {
            router.post(
                route('admin.users.freeze', targetUser.id),
                {
                    duration_value: freezeDurationValue,
                    duration_unit: freezeDurationUnit,
                    reason: freezeReason,
                    confirmation_code: inputCode.trim().toUpperCase(),
                    expected_code: generatedCode.toUpperCase(),
                },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        setIsSubmitting(false);
                        setCodeModalOpen(false);
                        setSelectedUser(null);
                        setTargetUser(null);
                    },
                    onError: (errors) => {
                        setIsSubmitting(false);
                        setCodeError(errors?.confirmation_code || t('Gagal memproses pembekuan akun.'));
                    },
                }
            );
        } else if (actionType === 'delete') {
            router.delete(
                route('admin.users.destroy', targetUser.id),
                {
                    data: {
                        confirmation_code: inputCode.trim().toUpperCase(),
                        expected_code: generatedCode.toUpperCase(),
                    },
                    preserveScroll: true,
                    onSuccess: () => {
                        setIsSubmitting(false);
                        setCodeModalOpen(false);
                        setUserToDelete(null);
                        setTargetUser(null);
                    },
                    onError: (errors) => {
                        setIsSubmitting(false);
                        setCodeError(errors?.confirmation_code || t('Gagal menghapus akun pengguna.'));
                    },
                }
            );
        }
    };

    const regenerateCode = () => {
        const newCode = generateRandomCode();
        setGeneratedCode(newCode);
        setInputCode('');
        setCodeError('');
    };

    const durationUnitLabels = {
        hours: t('Jam'),
        days: t('Hari'),
        weeks: t('Minggu'),
        months: t('Bulan'),
        years: t('Tahun'),
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
            {/* Header section */}
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
                            {t('Kelola akun pengguna, tindakan bekukan akun dengan durasi kustom, serta hapus akun')}
                        </p>
                    </div>
                </div>

                {/* Search Bar */}
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

            {/* User List Table */}
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
                                <td colSpan="4" className="px-6 py-12 text-center text-slate-400 text-xs">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <Filter className="w-6 h-6 text-slate-300" />
                                        <span>{t('Tidak ada pengguna yang sesuai dengan pencarian.')}</span>
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
                                            {/* Bekukan / Buka Bekukan */}
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

                                            {/* Hapus Akun */}
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

            {/* Footer / Info */}
            <div className="p-4 px-6 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div>
                    {t('Menampilkan')} <span className="font-semibold text-slate-700">{filteredUsers.length}</span> {t('pengguna')}
                </div>
                <div className="text-[11px] text-slate-400 font-normal">
                    {t('Proteksi keamanan: Verifikasi 4-digit acak sebelum eksekusi')}
                </div>
            </div>

            {/* ── MODAL 1: ATUR DURASI BEKUKAN AKUN ────────────────────────────── */}
            <CleanModal
                open={freezeModalOpen}
                onClose={() => setFreezeModalOpen(false)}
                title={t('Bekukan Akun Pengguna')}
                description={t('Atur batas waktu durasi pembekuan akun')}
                icon={ShieldAlert}
                size="md"
            >
                <form onSubmit={handleFreezeStep1} className="p-6 space-y-4">
                    {selectedUser && (
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary font-bold flex items-center justify-center text-xs">
                                {selectedUser.name?.slice(0, 2).toUpperCase()}
                            </div>
                            <div className="text-xs">
                                <div className="font-semibold text-slate-800">{selectedUser.name}</div>
                                <div className="text-slate-500">{selectedUser.email}</div>
                            </div>
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-brand-primary" />
                            {t('Durasi Pembekuan')}
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Input
                                    type="number"
                                    min="1"
                                    max="365"
                                    value={freezeDurationValue}
                                    onChange={(e) => setFreezeDurationValue(e.target.value)}
                                    className="h-10 text-xs rounded-xl bg-white border-slate-200"
                                    required
                                />
                            </div>
                            <div>
                                <select
                                    value={freezeDurationUnit}
                                    onChange={(e) => setFreezeDurationUnit(e.target.value)}
                                    className="w-full h-10 px-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary cursor-pointer shadow-xs"
                                >
                                    <option value="hours">{t('Jam')}</option>
                                    <option value="days">{t('Hari')}</option>
                                    <option value="weeks">{t('Minggu')}</option>
                                    <option value="months">{t('Bulan')}</option>
                                    <option value="years">{t('Tahun')}</option>
                                </select>
                            </div>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">
                            {t('Pengguna akan dibekukan selama')} <strong>{freezeDurationValue} {durationUnitLabels[freezeDurationUnit]}</strong>. {t('Saat login, akun akan dialihkan ke halaman pemberitahuan pembekuan.')}
                        </p>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700">
                            {t('Alasan Pembekuan (Opsional)')}
                        </label>
                        <textarea
                            rows={3}
                            placeholder={t('Contoh: Pelanggaran transaksi berulang, spamming, dll.')}
                            value={freezeReason}
                            onChange={(e) => setFreezeReason(e.target.value)}
                            className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary resize-none"
                        />
                    </div>

                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/60 flex items-start gap-2.5 text-[11px] text-amber-800">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                            {t('Langkah berikutnya akan memunculkan pop-up kode 4-digit untuk konfirmasi keamanan.')}
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setFreezeModalOpen(false)}
                            className="text-xs text-slate-500 hover:text-slate-800"
                        >
                            {t('Batal')}
                        </Button>
                        <Button
                            type="submit"
                            className="h-9 px-4 bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium rounded-xl shadow-xs"
                        >
                            {t('Lanjut ke Verifikasi Kode')}
                        </Button>
                    </div>
                </form>
            </CleanModal>

            {/* ── MODAL 2: POP-UP CARD KONFIRMASI KODE 4-DIGIT RANDOM ───────────── */}
            <CleanModal
                open={codeModalOpen}
                onClose={() => !isSubmitting && setCodeModalOpen(false)}
                title={actionType === 'freeze' ? t('Verifikasi Pembekuan Akun') : t('Verifikasi Hapus Akun')}
                description={t('Masukkan 4 kode verifikasi acak untuk memastikan tindakan Anda')}
                icon={actionType === 'freeze' ? ShieldAlert : Trash2}
                size="sm"
            >
                <form onSubmit={handleVerifyAndExecute} className="p-6 space-y-5">
                    {/* User info target */}
                    {targetUser && (
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                            <div className="text-xs">
                                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                                    {t('Target Pengguna')}:
                                </span>
                                <span className="font-semibold text-slate-800">{targetUser.name}</span>
                                <span className="text-slate-500 block text-[11px]">{targetUser.email}</span>
                            </div>
                            <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                    actionType === 'freeze'
                                        ? 'bg-amber-100 text-amber-800'
                                        : 'bg-rose-100 text-rose-800'
                                }`}
                            >
                                {actionType === 'freeze' ? t('Bekukan') : t('Hapus Permanen')}
                            </span>
                        </div>
                    )}

                    {/* Pop-up Card displaying random 4-code */}
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white text-center shadow-md relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-24 h-24 bg-brand-primary/20 rounded-full blur-xl pointer-events-none" />
                        <div className="text-[11px] text-slate-300 font-medium tracking-wide uppercase flex items-center justify-center gap-1.5 mb-2">
                            <KeyRound className="w-3.5 h-3.5 text-brand-accent" />
                            {t('Ketik Ulang Kode Keamanan')}
                        </div>

                        {/* Large 4-code display badge */}
                        <div className="inline-flex items-center justify-center gap-3 px-6 py-2.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md shadow-inner my-1">
                            {generatedCode.split('').map((char, index) => (
                                <span
                                    key={index}
                                    className="text-2xl font-black font-mono tracking-widest text-brand-accent drop-shadow-sm select-none"
                                >
                                    {char}
                                </span>
                            ))}
                        </div>

                        <div className="mt-2.5 flex items-center justify-center">
                            <button
                                type="button"
                                onClick={regenerateCode}
                                className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
                            >
                                <RefreshCw className="w-3 h-3" />
                                <span>{t('Ganti Kode Baru')}</span>
                            </button>
                        </div>
                    </div>

                    {/* Input box for 4 code */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                            <span>{t('Masukkan 4 Karakter di Atas')}</span>
                            <span className="text-[11px] text-slate-400 font-normal">
                                {inputCode.length}/4
                            </span>
                        </label>
                        <Input
                            type="text"
                            maxLength={4}
                            autoFocus
                            value={inputCode}
                            onChange={(e) => {
                                setInputCode(e.target.value.toUpperCase());
                                setCodeError('');
                            }}
                            placeholder="Contoh: 7K2B"
                            className="h-12 text-center text-lg font-mono font-bold tracking-widest uppercase rounded-xl border-slate-300 focus:border-brand-primary focus:ring-brand-primary"
                        />
                        {codeError && (
                            <p className="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1">
                                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                                {codeError}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                        <Button
                            type="button"
                            variant="ghost"
                            disabled={isSubmitting}
                            onClick={() => setCodeModalOpen(false)}
                            className="text-xs text-slate-500 hover:text-slate-800"
                        >
                            {t('Batal')}
                        </Button>
                        <Button
                            type="submit"
                            disabled={inputCode.length < 4 || isSubmitting}
                            className={`h-9 px-5 text-white text-xs font-medium rounded-xl shadow-xs transition-all ${
                                actionType === 'freeze'
                                    ? 'bg-amber-600 hover:bg-amber-700'
                                    : 'bg-rose-600 hover:bg-rose-700'
                            }`}
                        >
                            {isSubmitting ? (
                                <span>{t('Memproses...')}</span>
                            ) : actionType === 'freeze' ? (
                                t('Konfirmasi Bekukan')
                            ) : (
                                t('Konfirmasi Hapus Akun')
                            )}
                        </Button>
                    </div>
                </form>
            </CleanModal>
        </div>
    );
}
