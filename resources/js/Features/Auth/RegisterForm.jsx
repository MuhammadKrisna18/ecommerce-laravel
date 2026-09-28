import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, User, AtSign, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';

export function RegisterForm({ onSwitchToLogin }) {
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        namaLengkap: '',
        namaPanggilan: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.namaLengkap.trim()) {
            newErrors.namaLengkap = 'Nama lengkap wajib diisi.';
        }
        if (!formData.namaPanggilan.trim()) {
            newErrors.namaPanggilan = 'Nama panggilan wajib diisi.';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email wajib diisi.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Format email tidak valid.';
        }
        if (!formData.password) {
            newErrors.password = 'Kata sandi wajib diisi.';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Kata sandi minimal 8 karakter.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Frontend only demonstration
            setIsSubmitted(true);
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
            <div className="relative rounded-2xl bg-[#0d090a]/85 backdrop-blur-xl border border-red-900/30 p-8 shadow-[0_0_50px_-12px_rgba(153,27,27,0.35)] hover:border-red-800/50 transition-all duration-300">
                {/* Top Glowing Header Accent */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent shadow-[0_0_12px_#dc2626]" />

                {/* Brand / Title Icon */}
                <div className="flex flex-col items-center text-center mb-6">
                    <motion.div
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-700 via-rose-900 to-black border border-red-500/30 shadow-[0_0_20px_rgba(225,29,72,0.3)] flex items-center justify-center mb-4 text-white"
                    >
                        <UserPlus className="w-7 h-7 text-red-100" />
                    </motion.div>

                    <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                        Daftar Akun Baru
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-red-950/80 text-rose-300 border border-red-800/40">
                            User
                        </span>
                    </h1>
                    <p className="text-sm text-zinc-400 mt-1.5">
                        Lengkapi informasi di bawah untuk membuat akun baru
                    </p>
                </div>

                {isSubmitted ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-6 rounded-xl bg-red-950/30 border border-red-800/40 text-center space-y-4"
                    >
                        <div className="w-12 h-12 mx-auto rounded-full bg-red-500/20 text-rose-400 flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-base font-semibold text-white">Akun Berhasil Disiapkan (Demo)</h3>
                            <p className="text-xs text-zinc-400 mt-1">
                                Data pendaftaran akun user Anda ({formData.namaPanggilan || formData.namaLengkap}) telah tersimpan secara frontend.
                            </p>
                        </div>
                        <Button
                            type="button"
                            onClick={onSwitchToLogin}
                            className="w-full h-10 bg-red-700 hover:bg-red-600 text-white font-medium rounded-xl text-sm"
                        >
                            Kembali ke Halaman Masuk
                        </Button>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Nama Lengkap */}
                        <div className="space-y-1.5">
                            <Label htmlFor="namaLengkap" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                                Nama Lengkap
                            </Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-rose-400 transition-colors">
                                    <User className="w-4 h-4" />
                                </div>
                                <Input
                                    id="namaLengkap"
                                    type="text"
                                    name="namaLengkap"
                                    value={formData.namaLengkap}
                                    onChange={handleChange}
                                    placeholder="Contoh: Muhammad Krisna"
                                    className="pl-10 h-11 bg-zinc-950/60 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-xl transition-all"
                                />
                            </div>
                            {errors.namaLengkap && (
                                <motion.p
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-xs text-rose-400 mt-1"
                                >
                                    {errors.namaLengkap}
                                </motion.p>
                            )}
                        </div>

                        {/* Nama Panggilan */}
                        <div className="space-y-1.5">
                            <Label htmlFor="namaPanggilan" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                                Nama Panggilan
                            </Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-rose-400 transition-colors">
                                    <AtSign className="w-4 h-4" />
                                </div>
                                <Input
                                    id="namaPanggilan"
                                    type="text"
                                    name="namaPanggilan"
                                    value={formData.namaPanggilan}
                                    onChange={handleChange}
                                    placeholder="Contoh: Krisna"
                                    className="pl-10 h-11 bg-zinc-950/60 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-xl transition-all"
                                />
                            </div>
                            {errors.namaPanggilan && (
                                <motion.p
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-xs text-rose-400 mt-1"
                                >
                                    {errors.namaPanggilan}
                                </motion.p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <Label htmlFor="reg-email" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                                Alamat Email
                            </Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-rose-400 transition-colors">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <Input
                                    id="reg-email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    autoComplete="username"
                                    onChange={handleChange}
                                    placeholder="nama@email.com"
                                    className="pl-10 h-11 bg-zinc-950/60 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-xl transition-all"
                                />
                            </div>
                            {errors.email && (
                                <motion.p
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-xs text-rose-400 mt-1"
                                >
                                    {errors.email}
                                </motion.p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <Label htmlFor="reg-password" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                                Kata Sandi
                            </Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-rose-400 transition-colors">
                                    <Lock className="w-4 h-4" />
                                </div>
                                <Input
                                    id="reg-password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    autoComplete="new-password"
                                    onChange={handleChange}
                                    placeholder="Minimal 8 karakter"
                                    className="pl-10 pr-10 h-11 bg-zinc-950/60 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-xl transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.password && (
                                <motion.p
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-xs text-rose-400 mt-1"
                                >
                                    {errors.password}
                                </motion.p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="pt-2"
                        >
                            <Button
                                type="submit"
                                className="w-full h-11 bg-gradient-to-r from-red-700 via-rose-800 to-red-900 hover:from-red-600 hover:via-rose-700 hover:to-red-800 text-white font-medium rounded-xl shadow-[0_0_25px_rgba(225,29,72,0.3)] transition-all duration-300 flex items-center justify-center gap-2 border border-red-500/20"
                            >
                                <span>Buat Akun User</span>
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </motion.div>
                    </form>
                )}

                {/* Switch to Login Link */}
                <div className="mt-6 pt-5 border-t border-zinc-800/60 text-center">
                    <p className="text-xs text-zinc-400">
                        Sudah memiliki akun?{' '}
                        <button
                            type="button"
                            onClick={onSwitchToLogin}
                            className="text-rose-400 hover:text-rose-300 font-medium hover:underline transition-colors focus:outline-none"
                        >
                            Masuk di sini
                        </button>
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
