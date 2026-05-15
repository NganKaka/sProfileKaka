import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface RouteTransitionProps {
  children: ReactNode;
}

export default function RouteTransition({ children }: RouteTransitionProps) {
  const location = useLocation();
  const [showCRT, setShowCRT] = useState(false);

  useEffect(() => {
    setShowCRT(true);
    const timer = setTimeout(() => setShowCRT(false), 700);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {/* CRT power-off overlay: page collapses to a horizontal line, then a single dot */}
      <AnimatePresence>
        {showCRT && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[9998] pointer-events-none flex items-center justify-center bg-black/0"
          >
            {/* Horizontal scanline that briefly flashes across */}
            <motion.div
              initial={{ scaleY: 0, scaleX: 1, opacity: 0 }}
              animate={{
                scaleY: [0, 1, 1, 0.04, 0],
                scaleX: [1, 1, 1, 0.04, 0],
                opacity: [0, 0.95, 0.95, 0.85, 0],
              }}
              transition={{
                duration: 0.7,
                ease: [0.7, 0, 0.3, 1],
                times: [0, 0.18, 0.45, 0.75, 1],
              }}
              className="h-[2px] w-full bg-cyan-200/85 shadow-[0_0_18px_rgba(34,211,238,0.9),0_0_40px_rgba(233,195,73,0.6)]"
              style={{ transformOrigin: 'center' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, scaleY: 0.04, filter: 'brightness(2.5)' }}
        animate={{ opacity: 1, scaleY: 1, filter: 'brightness(1)' }}
        exit={{ opacity: 0, scaleY: 0.04, filter: 'brightness(2.5)' }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
          scaleY: { duration: 0.45, ease: [0.34, 1.5, 0.64, 1] },
        }}
        style={{ transformOrigin: 'center' }}
      >
        {children}
      </motion.div>
    </>
  );
}
