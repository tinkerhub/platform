import { motion } from 'framer-motion';
import { Child } from '../../types';

export const Pulse = ({ children }: Child) => (
  <motion.div
    initial={{ opacity: 0.5, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);
