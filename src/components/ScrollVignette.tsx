import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Radial vignette overlay whose intensity scales with how far you've scrolled
 * relative to the document. Adds focus on long pages without taking attention.
 */
export default function ScrollVignette() {
  const { scrollYProgress } = useScroll();
  // 0 at top, ramps up to ~0.45 at the bottom of the page
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.32, 0.45]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[40]"
      style={{
        opacity,
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.85) 100%)',
      }}
    />
  );
}
