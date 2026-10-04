import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, Link } from '@inertiajs/react';
import { useTranslation } from '@/Hooks/useTranslation';
import { 
    User, Mail, Calendar, MapPin, ShieldCheck, 
    AtSign, Clock, AlertTriangle, Snowflake, Trash2, ArrowLeft, Package
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/Components/ui/card';

export default function Show({ user }) {
    const { t } = useTranslation();



    return (
        <AdminLayout
            header={
                <div className="flex flex-col">
                    <div className="flex items-center gap-3">
                        <Link href={route('admin.dashboard')} className="p-2 rounded-full hover:bg-slate-200 transition-colors">
                            <ArrowLeft className="w-5 h-5 text-slate-600" />
                        </Link>
                        <h2 className="text-xl font-bold tracking-tight text-slate-800 flex items-center gap-2">
                            {t('Detail Pengguna')}
                        </h2>
                    </div>
                    <span className="text-xs text-slate-500 font-normal ml-10">
                        Informasi lengkap akun dan aksi manajerial
                    </span>
                </div>
            }
        >
            <Head title={`${t('Detail User')} - ${user.name}`} />

            <div className="space-y-6">
                {/* Header Profile Section */}
                <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/60 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10 relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-[80px] pointer-events-none" />
                    
                    {/* Avatar */}
                    <div className="relative shrink-0">
                        {user.avatar_url ? (
                            <img 
                                src={user.avatar_url} 
                                alt={user.name} 
                                className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl object-cover shadow-md border-4 border-white"
                            />
                        ) : (
                            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-brand-primary to-brand-accent text-white flex items-center justify-center font-bold text-4xl shadow-md border-4 border-white">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-full shadow-sm">
                            <div className={`w-4 h-4 rounded-full ${user.is_frozen ? 'bg-rose-500' : 'bg-emerald-500'}`} title={user.is_frozen ? 'Dibekukan' : 'Aktif'} />
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="flex-1 text-center sm:text-left space-y-3 z-10">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                                {user.name}
                            </h1>
                            <p className="text-brand-primary font-medium flex items-center justify-center sm:justify-start gap-1 mt-1">
                                <AtSign className="w-4 h-4" />
                                {user.nickname || t('Belum diatur')}
                            </p>
                        </div>
                        
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                Role: <span className="capitalize">{user.role}</span>
                            </span>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${user.is_frozen ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'}`}>
                                {user.is_frozen ? (
                                    <>
                                        <Snowflake className="w-3.5 h-3.5" />
                                        Dibekukan
                                    </>
                                ) : (
                                    <>
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        Aktif
                                    </>
                                )}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Detail Cards */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <User className="w-5 h-5 text-brand-primary" />
                                    {t('Informasi Pribadi')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                        <div className="text-xs text-slate-500 mb-1 flex items-center gap-1.5">
                                            <Mail className="w-3.5 h-3.5" /> Email
                                        </div>
                                        <div className="font-semibold text-slate-800 break-all">{user.email}</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                        <div className="text-xs text-slate-500 mb-1 flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" /> Tanggal Lahir
                                        </div>
                                        <div className="font-semibold text-slate-800">
                                            {user.birth_date ? user.birth_date : <span className="text-slate-400 italic">Belum diatur</span>}
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                        <div className="text-xs text-slate-500 mb-1 flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5" /> Tempat Lahir
                                        </div>
                                        <div className="font-semibold text-slate-800">
                                            {user.birth_place ? user.birth_place : <span className="text-slate-400 italic">Belum diatur</span>}
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                        <div className="text-xs text-slate-500 mb-1 flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" /> Terdaftar Pada
                                        </div>
                                        <div className="font-semibold text-slate-800">{user.created_at}</div>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                    <div className="text-xs text-slate-500 mb-1 flex items-center gap-1.5">
                                        <MapPin className="w-3.5 h-3.5" /> Alamat Lengkap
                                    </div>
                                    <div className="font-semibold text-slate-800">
                                        {user.address ? user.address : <span className="text-slate-400 italic">Alamat belum diatur oleh pengguna.</span>}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Action Cards */}
                    <div className="space-y-6">
                        {user.role === 'seller' && user.store && (
                            <Card className="shadow-sm border-brand-primary/20">
                                <CardHeader className="pb-3 border-b border-slate-100 bg-brand-primary/5">
                                    <CardTitle className="text-brand-primary text-base flex items-center gap-2">
                                        <Package className="w-4 h-4" />
                                        {t('Produk Seller')} ({user.store.products?.length || 0})
                                    </CardTitle>
                                    <CardDescription className="text-slate-500 text-xs">
                                        Daftar produk yang dijual oleh akun ini.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-4 max-h-64 overflow-y-auto custom-scrollbar">
                                    {!user.store.products || user.store.products.length === 0 ? (
                                        <div className="text-center py-6 text-slate-400">
                                            <Package className="w-8 h-8 mx-auto mb-2 opacity-30" />
                                            <p className="text-sm">Belum ada produk</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {user.store.products.map(product => (
                                                <div key={product.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50 hover:border-brand-primary/30 transition-colors">
                                                    {product.images && product.images.length > 0 ? (
                                                        <img src={product.images[0].url} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-lg bg-slate-200 flex items-center justify-center shrink-0">
                                                            <Package className="w-5 h-5 text-slate-400" />
                                                        </div>
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-semibold text-slate-800 truncate" title={product.name}>{product.name}</p>
                                                        <p className="text-xs text-brand-primary font-medium">Rp {product.price?.toLocaleString('id-ID')}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
