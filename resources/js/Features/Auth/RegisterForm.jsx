import { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { UserPlus, User, AtSign, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { signInWithGoogle } from '@/lib/firebase';

export function RegisterForm({ onSwitchToLogin }) {
    const [showPassword, setShowPassword] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [firebaseError, setFirebaseError] = useState('');

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        nickname: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true);
        setFirebaseError('');

        try {
            const { user, idToken, error } = await signInWithGoogle();
            if (error) {
                if (!error.includes('popup-closed-by-user')) {
                    setFirebaseError('Gagal daftar via Google: ' + error);
                }
                setIsGoogleLoading(false);
                return;
            }

            if (!user) {
                setIsGoogleLoading(false);
                return;
            }

            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute('content');
            const res = await fetch(route('auth.firebase'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    id_token: idToken,
                    email: user.email,
                    name: user.displayName,
                    avatar: user.photoURL,
                    firebase_uid: user.uid,
                }),
            });

            const rawText = await res.text();
            let data;
            try {
                data = JSON.parse(rawText);
            } catch (parseError) {
                throw new Error(
                    'Respons server bukan JSON (Status ' +
                        res.status +
                        '): ' +
                        rawText.slice(0, 120)
                );
            }

            if (res.ok && data.redirect_url) {
                window.location.href = data.redirect_url;
            } else {
                setFirebaseError(data.message || 'Terjadi kesalahan saat membuat sesi akun.');
                setIsGoogleLoading(false);
            }
        } catch (err) {
            setFirebaseError('Koneksi ke Firebase gagal: ' + err.message);
            setIsGoogleLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[460px]"
        >
            <div className="relative rounded-2xl bg-white border border-slate-200/80 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-all duration-300">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[3px] bg-gradient-to-r from-transparent via-brand-primary to-transparent" />

                <div className="flex flex-col items-center text-center mb-6">
                    <motion.div
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-accent shadow-[0_4px_20px_rgba(0,147,203,0.25)] flex items-center justify-center mb-4 text-white"
                    >
                        <UserPlus className="w-7 h-7 text-white" />
                    </motion.div>

                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                        Daftar Akun Baru
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-brand-accent/20 text-brand-primary border border-brand-primary/20">
                            User
                        </span>
                    </h1>
                    <p className="text-sm text-slate-500 mt-1.5">
                        Lengkapi informasi di bawah untuk membuat akun baru
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="name" className="text-xs font-semibold text-slate-700">
                            Nama Lengkap
                        </Label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-primary transition-colors">
                                <User className="w-4 h-4" />
                            </div>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Contoh: Muhammad Krisna"
                                required
                                className="pl-10 h-11 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl transition-all shadow-sm"
                            />
                        </div>
                        {errors.name && (
                            <motion.p
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xs text-rose-500 mt-1 font-medium"
                            >
                                {errors.name}
                            </motion.p>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="nickname" className="text-xs font-semibold text-slate-700">
                            Nama Panggilan
                        </Label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-primary transition-colors">
                                <AtSign className="w-4 h-4" />
                            </div>
                            <Input
                                id="nickname"
                                type="text"
                                name="nickname"
                                value={data.nickname}
                                onChange={(e) => setData('nickname', e.target.value)}
                                placeholder="Contoh: Krisna"
                                required
                                className="pl-10 h-11 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl transition-all shadow-sm"
                            />
                        </div>
                        {errors.nickname && (
                            <motion.p
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xs text-rose-500 mt-1 font-medium"
                            >
                                {errors.nickname}
                            </motion.p>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="reg-email" className="text-xs font-semibold text-slate-700">
                            Alamat Email
                        </Label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-primary transition-colors">
                                <Mail className="w-4 h-4" />
                            </div>
                            <Input
                                id="reg-email"
                                type="email"
                                name="email"
                                value={data.email}
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="nama@email.com"
                                required
                                className="pl-10 h-11 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl transition-all shadow-sm"
                            />
                        </div>
                        {errors.email && (
                            <motion.p
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xs text-rose-500 mt-1 font-medium"
                            >
                                {errors.email}
                            </motion.p>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <Label
                            htmlFor="reg-password"
                            className="text-xs font-semibold text-slate-700"
                        >
                            Kata Sandi
                        </Label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-primary transition-colors">
                                <Lock className="w-4 h-4" />
                            </div>
                            <Input
                                id="reg-password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={data.password}
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Minimal 8 karakter"
                                required
                                className="pl-10 pr-10 h-11 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl transition-all shadow-sm"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition-colors focus:outline-none"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <motion.p
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xs text-rose-500 mt-1 font-medium"
                            >
                                {errors.password}
                            </motion.p>
                        )}
                    </div>

                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="pt-2"
                    >
                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full h-11 bg-brand-primary hover:bg-brand-dark text-white font-medium rounded-xl shadow-[0_4px_15px_rgba(0,147,203,0.25)] transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                            {processing ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Mendaftarkan akun...</span>
                                </div>
                            ) : (
                                <>
                                    <span>Buat Akun User</span>
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </Button>
                    </motion.div>
                </form>

                <div className="mt-5 space-y-4">
                    <div className="relative flex items-center justify-center">
                        <div className="border-t border-slate-200 w-full" />
                        <span className="bg-white px-3 text-xs text-slate-400 font-medium">
                            atau daftar dengan
                        </span>
                        <div className="border-t border-slate-200 w-full" />
                    </div>

                    {firebaseError && (
                        <p className="text-xs text-rose-500 text-center font-medium">
                            {firebaseError}
                        </p>
                    )}

                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={isGoogleLoading}
                        className="w-full h-11 px-4 border border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 active:bg-slate-100 rounded-xl text-slate-700 text-sm font-semibold flex items-center justify-center gap-3 transition-colors shadow-sm disabled:opacity-60 cursor-pointer"
                    >
                        {isGoogleLoading ? (
                            <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                                />
                            </svg>
                        )}
                        <span>{isGoogleLoading ? 'Menghubungkan...' : 'Daftar dengan Google'}</span>
                    </button>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 text-center">
                    <p className="text-xs text-slate-500">
                        Sudah memiliki akun?{' '}
                        <button
                            type="button"
                            onClick={onSwitchToLogin}
                            className="text-brand-primary hover:text-brand-dark font-semibold hover:underline transition-colors focus:outline-none"
                        >
                            Masuk di sini
                        </button>
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
