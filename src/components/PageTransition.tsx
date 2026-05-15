import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export type SectionTransitionDirection = 'up' | 'left' | 'right';

export function SectionTransition({
  children,
  delay = 0,
  direction = 'up',
}: {
  children: ReactNode;
  delay?: number;
  direction?: SectionTransitionDirection;
}) {
  const initial =
    direction === 'left'
      ? { opacity: 0, x: -40, y: 0 }
      : direction === 'right'
      ? { opacity: 0, x: 40, y: 0 }
      : { opacity: 0, x: 0, y: 30 };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
