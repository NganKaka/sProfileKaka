import { useEffect } from 'react';
import Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.18,
      smoothWheel: true,
      // Don't smooth-animate anchor / programmatic scrolls - jump directly
      // so scroll-tied animations don't visibly run through every section
      // on the way to the target.
      anchors: { offset: -100, duration: 0 },
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Expose for components that need to scroll programmatically
    window.__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      delete window.__lenis;
      lenis.destroy();
    };
  }, []);

  return null;
}
