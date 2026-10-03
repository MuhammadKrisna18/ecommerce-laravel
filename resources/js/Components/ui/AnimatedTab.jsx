import { motion } from 'framer-motion';

export function AnimatedTab({ children, tabKey }) {
    return (
        <motion.div
            key={tabKey}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
        >
            {children}
        </motion.div>
    );
}
