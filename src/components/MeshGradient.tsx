import { motion } from 'framer-motion';

interface MeshGradientProps {
  className?: string;
}

/**
 * Animated mesh gradient using overlapping radial gradients
 * that slowly drift and pulse for an organic flow effect.
 */
export default function MeshGradient({ className = '' }: MeshGradientProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Layer 1 - Gold blob */}
      <motion.div
        animate={{
          x: ['-10%', '10%', '-10%'],
          y: ['0%', '15%', '0%'],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[10%] left-[10%] w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(233, 195, 73, 0.4), transparent 60%)' }}
      />

      {/* Layer 2 - Cyan blob */}
      <motion.div
        animate={{
          x: ['5%', '-15%', '5%'],
          y: ['-5%', '10%', '-5%'],
          scale: [1.1, 0.9, 1.1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[40%] right-[10%] w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(34, 211, 238, 0.35), transparent 60%)' }}
      />

      {/* Layer 3 - Purple accent */}
      <motion.div
        animate={{
          x: ['0%', '20%', '0%'],
          y: ['10%', '-10%', '10%'],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-[20%] left-[20%] w-[45vw] h-[45vw] rounded-full blur-[120px] opacity-25"
        style={{ background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3), transparent 60%)' }}
      />
    </div>
  );
}
