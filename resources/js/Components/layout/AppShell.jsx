import { cn } from '@/lib/utils';

/**
 * Shared outer shell: full-screen dark background + ambient glow + main area.
 *
 * @param {object}          props
 * @param {React.ReactNode} props.sidebar   - Sidebar node (AppSidebar)
 * @param {React.ReactNode} props.topbar    - Topbar node (AppTopbar)
 * @param {React.ReactNode} props.children  - Page content
 * @param {string}          [props.className]
 */
export function AppShell({ sidebar, topbar, children, className }) {
    return (
        <div
            className={cn(
                'min-h-screen bg-slate-50 text-slate-900 flex overflow-hidden selection:bg-brand-accent/40 selection:text-slate-900',
                className
            )}
        >
            {sidebar}

            {/* Main area */}
            <main className="flex-1 flex flex-col min-w-0 bg-[#f8fafc] relative overflow-y-auto">
                {/* Ambient glow */}
                <div className="absolute top-0 right-1/4 w-96 h-64 bg-brand-accent/20 blur-[130px] pointer-events-none" />

                {topbar}

                {/* Page content */}
                <div className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full relative z-0">
                    {children}
                </div>
            </main>
        </div>
    );
}
