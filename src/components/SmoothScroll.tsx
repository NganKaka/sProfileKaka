import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Stop Lenis when image modal opens (modals need normal scroll containment)
    const originalScrollTo = window.scrollTo.bind(window);
    window.scrollTo = ((options?: ScrollToOptions | number, y?: number) => {
      if (typeof options === 'number') {
        lenis.scrollTo(y ?? 0, { immediate: false });
      } else if (options && typeof options === 'object') {
        lenis.scrollTo(options.top ?? 0, { immediate: options.behavior !== 'smooth' });
      } else {
        originalScrollTo(options as ScrollToOptions);
      }
    }) as typeof window.scrollTo;

    return () => {
      window.scrollTo = originalScrollTo;
      lenis.destroy();
    };
  }, []);

  return null;
}
