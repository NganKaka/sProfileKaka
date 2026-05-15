import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Subtle hue shift overlay tied to scroll progress. Top of page is gold-warm,
 * middle drifts cyan, bottom drifts purple. Sits above background but below
 * the vignette and content. ~3% opacity max so it never reads as a tint
 * filter, just a color undertone.
 */
export default function ScrollHueTint() {
  const { scrollYProgress } = useScroll();
  const color = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [
      'rgba(233, 195, 73, 0.04)', // gold (hero/about)
      'rgba(34, 211, 238, 0.05)', // cyan (academic/experience)
      'rgba(168, 85, 247, 0.045)', // purple (projects)
      'rgba(244, 114, 182, 0.04)', // pink (testimonials)
    ],
  );

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[35] mix-blend-screen"
      style={{ backgroundColor: color }}
    />
  );
}
