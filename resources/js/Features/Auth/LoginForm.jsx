import { useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';

export function LoginForm({ status, canResetPassword }) {
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
        <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Admin Dashboard</CardTitle>
                <CardDescription className="text-center">
                    Masukkan email dan password untuk mengakses panel kontrol.
                </CardDescription>
            </CardHeader>
            
            <form onSubmit={submit}>
                <CardContent className="space-y-4">
                    {status && (
                        <div className="text-sm font-medium text-green-600 bg-green-50 p-3 rounded-md">
                            {status}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="adminecommerce@admin.laravel.id"
                            required
                        />
                        {errors.email && <span className="text-sm text-red-500 mt-2 block">{errors.email}</span>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                        {errors.password && <span className="text-sm text-red-500 mt-2 block">{errors.password}</span>}
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="remember"
                            id="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                        />
                        <Label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Ingat saya
                        </Label>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4">
                    <Button type="submit" className="w-full" disabled={processing}>
                        {processing ? "Memproses..." : "Masuk ke Dashboard"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
