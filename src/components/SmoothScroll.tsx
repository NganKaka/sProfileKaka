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
      // smoothWheel disabled: native wheel scroll has 0 lag, which keeps
      // scroll-tied animations (academic trace, scroll progress, useScroll
      // hooks) glued to user input. Lenis stays loaded only for explicit
      // scrollTo calls (navbar clicks, hero CTA) where we still want the
      // smooth animation + lock:true to prevent input mid-flight.
      smoothWheel: false,
      smoothTouch: false,
      lerp: 0.35,
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
