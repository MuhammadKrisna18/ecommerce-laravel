import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Clock } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { cn } from '@/lib/utils';

function LiveClock() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const timeString = currentTime.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
    const dateString = currentTime.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/80 border border-slate-200/60 text-xs text-slate-600 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-brand-primary" />
            <span className="font-medium capitalize">{dateString}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300 mx-0.5" />
            <span className="font-bold text-slate-700 font-mono tracking-tight">{timeString}</span>
        </div>
    );
}

export function AppTopbar({ header, right, onMenuToggle, className }) {
    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={cn(
                'h-20 bg-white/90 backdrop-blur-md border-b border-slate-200/80',
                'flex items-center justify-between px-4 sm:px-8 sticky top-0 z-10 shadow-sm',
                className
            )}
        >
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden text-slate-600 hover:bg-brand-primary/10 hover:text-brand-primary"
                    onClick={onMenuToggle}
                >
                    <Menu className="w-5 h-5" />
                </Button>
                <div>{header}</div>
            </div>

            <div className="flex items-center gap-4">
                <LiveClock />

                {right && <div className="flex items-center gap-3">{right}</div>}
            </div>
        </motion.header>
    );
}
