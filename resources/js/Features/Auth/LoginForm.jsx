import { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';

export function LoginForm({ status, canResetPassword, onSwitchToRegister }) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[440px]"
        >
            <div className="relative rounded-2xl bg-white border border-slate-200/80 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-all duration-300">
                {/* Top Header Accent */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[3px] bg-gradient-to-r from-transparent via-brand-primary to-transparent" />

                {/* Brand / Title Icon */}
                <div className="flex flex-col items-center text-center mb-8">
                    <motion.div
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-accent shadow-[0_4px_20px_rgba(0,147,203,0.25)] flex items-center justify-center mb-4 text-white"
                    >
                        <ShieldCheck className="w-7 h-7 text-white" />
                    </motion.div>
                    
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                        Portal Admin
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-brand-accent/20 text-brand-primary border border-brand-primary/20">
                            v2.0
                        </span>
                    </h1>
                    <p className="text-sm text-slate-500 mt-1.5">
                        Masuk dengan akun terdaftar untuk mengelola sistem
                    </p>
                </div>

                {/* Status Alert (misal setelah logout / password reset) */}
                {status && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mb-6 p-3.5 rounded-xl bg-sky-50 border border-sky-200 flex items-start gap-3 text-sky-800 text-sm"
                    >
                        <Sparkles className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                        <span className="leading-snug">{status}</span>
                    </motion.div>
                )}

                <form onSubmit={submit} className="space-y-5">
                    {/* Email Input */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs font-semibold text-slate-700">
                            Alamat Email
                        </Label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-primary transition-colors">
                                <Mail className="w-4 h-4" />
                            </div>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="admin@ecommerce.id"
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

                    {/* Password Input */}
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-xs font-semibold text-slate-700">
                            Kata Sandi
                        </Label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-primary transition-colors">
                                <Lock className="w-4 h-4" />
                            </div>
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={data.password}
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                                required
                                className="pl-10 pr-10 h-11 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl transition-all shadow-sm"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition-colors focus:outline-none"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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

                    {/* Remember Me Checkbox */}
                    <div className="flex items-center justify-between pt-1">
                        <label className="flex items-center gap-2.5 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                name="remember"
                                id="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="w-4 h-4 rounded border-slate-300 bg-white text-brand-primary focus:ring-brand-primary focus:ring-offset-0 focus:ring-offset-transparent cursor-pointer"
                            />
                            <span className="text-sm text-slate-600 hover:text-slate-800 transition-colors">
                                Ingat sesi login
                            </span>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="pt-2"
                    >
                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full h-11 bg-gradient-to-r from-brand-primary to-brand-dark hover:opacity-95 text-white font-medium rounded-xl shadow-[0_4px_15px_rgba(0,147,203,0.3)] transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            {processing ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Memvalidasi...</span>
                                </div>
                            ) : (
                                <>
                                    <span>Masuk ke Dashboard</span>
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </Button>
                    </motion.div>
                </form>

                {/* Footer link to Register */}
                <div className="mt-6 pt-5 border-t border-slate-100 text-center">
                    <p className="text-xs text-slate-500">
                        Belum punya akun?{' '}
                        <button
                            type="button"
                            onClick={onSwitchToRegister}
                            className="text-brand-primary hover:text-brand-dark font-semibold hover:underline transition-colors focus:outline-none"
                        >
                            Daftar Akun User
                        </button>
                    </p>
                    <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5 mt-3">
                        <Lock className="w-3 h-3 text-slate-400" />
                        Autentikasi Terenkripsi & Proteksi Sesi Aktif
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
