import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface RouteTransitionProps {
  children: ReactNode;
}

export default function RouteTransition({ children }: RouteTransitionProps) {
  const location = useLocation();
  const [showCRT, setShowCRT] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Don't fire the CRT flash on initial mount - that scaled measurements
    // for ScrollTrigger and made the constellations look squashed during
    // the entry animation.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setShowCRT(true);
    const timer = setTimeout(() => setShowCRT(false), 700);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {/* CRT power-off scanline overlay (decoration only - does NOT transform the page) */}
      <AnimatePresence>
        {showCRT && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[9998] pointer-events-none flex items-center justify-center"
          >
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

      {/* Page content fades + slides slightly. Crucially does NOT scale,
          so child measurements (ScrollTrigger, canvas sizing) stay correct. */}
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
