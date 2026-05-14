import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface RouteTransitionProps {
  children: ReactNode;
}

export default function RouteTransition({ children }: RouteTransitionProps) {
  const location = useLocation();
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayLetter, setOverlayLetter] = useState('');

  useEffect(() => {
    // Determine the page label based on path
    let label = '';
    if (location.pathname === '/') label = 'H';
    else if (location.pathname === '/blog') label = 'B';
    else if (location.pathname.startsWith('/blog/')) label = 'P';
    else label = '4';

    setOverlayLetter(label);
    setShowOverlay(true);

    const timer = setTimeout(() => setShowOverlay(false), 600);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9998] pointer-events-none flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [0.5, 12], opacity: [0, 0.08, 0] }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], times: [0, 0.4, 1] }}
              className="font-headline font-black text-primary"
              style={{ fontSize: '20vmin' }}
            >
              {overlayLetter}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.98 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
