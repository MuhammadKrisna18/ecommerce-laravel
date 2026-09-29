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
                'h-20 bg-[#0c0809]/90 backdrop-blur-md border-b border-red-950/30',
                'flex items-center justify-between px-4 sm:px-8 sticky top-0 z-10',
                className
            )}
        >
            {/* Left: hamburger + page header */}
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden text-zinc-300 hover:bg-zinc-800"
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
