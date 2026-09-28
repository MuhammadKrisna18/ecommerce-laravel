export default function AuthLayout({ children }) {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden px-4 sm:px-6 lg:px-8 selection:bg-rose-900 selection:text-white">
            {/* Ambient Maroon/Dark Glow Background Effects */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-950/40 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-rose-950/40 rounded-full blur-[130px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-red-900/15 rounded-full blur-[160px] pointer-events-none" />
            
            {/* Subtle Grid Pattern Overlay */}
            <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
                    backgroundSize: '32px 32px'
                }}
            />

            {/* Content Container */}
            <div className="relative z-10 w-full flex items-center justify-center">
                {children}
            </div>
        </div>
    );
}
