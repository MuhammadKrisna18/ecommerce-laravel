import { cn } from '@/lib/utils';
import { Toaster } from 'sonner';

export function AppShell({ sidebar, topbar, children, className }) {
    return (
        <div
            className={cn(
                'min-h-screen bg-slate-50 text-slate-900 flex overflow-hidden selection:bg-brand-accent/40 selection:text-slate-900',
                className
            )}
        >
            <Toaster position="top-right" richColors />
            {sidebar}

            <main className="flex-1 flex flex-col min-w-0 bg-[#f8fafc] relative overflow-y-auto">
                <div className="absolute top-0 right-1/4 w-96 h-64 bg-brand-accent/20 blur-[130px] pointer-events-none" />

                {topbar}

                <div className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full relative z-0">
                    {children}
                </div>
            </main>
        </div>
    );
}
