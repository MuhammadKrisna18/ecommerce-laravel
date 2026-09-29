import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Shared top navigation bar for Admin and User layouts.
 *
 * @param {object}         props
 * @param {React.ReactNode} props.header       - Page title / breadcrumb node
 * @param {React.ReactNode} [props.right]      - Right-side badge / actions slot
 * @param {Function}       props.onMenuToggle  - Mobile sidebar toggle handler
 * @param {string}         [props.className]
 */
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
            {/* Left: hamburger + page header */}
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden text-slate-600 hover:bg-[#0093cb]/10 hover:text-[#0093cb]"
                    onClick={onMenuToggle}
                >
                    <Menu className="w-5 h-5" />
                </Button>
                <div>{header}</div>
            </div>

            {/* Right slot */}
            {right && (
                <div className="flex items-center gap-3">
                    {right}
                </div>
            )}
        </motion.header>
    );
}
