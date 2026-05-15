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
      // 0.35 instead of 0.18: snappier response so scroll-tied animations
      // (academic trace, scroll progress bar, useScroll-based effects)
      // track user input within ~3 frames instead of ~6. Smooth feel is
      // preserved on slow scrolls; fast scrolls now resolve quickly.
      lerp: 0.35,
      smoothWheel: true,
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
