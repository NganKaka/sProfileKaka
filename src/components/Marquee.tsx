import { motion } from 'framer-motion';

interface MarqueeProps {
  items: string[];
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
  separator?: string;
}

export default function Marquee({
  items,
  speed = 30,
  direction = 'left',
  className = '',
  separator = '·',
}: MarqueeProps) {
  // Duplicate items to create seamless loop
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
    >
      <motion.div
        animate={{
          x: direction === 'left' ? ['0%', '-33.333%'] : ['-33.333%', '0%'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="flex gap-8 whitespace-nowrap"
      >
        {duplicatedItems.map((item, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-8 font-headline text-3xl md:text-5xl font-black tracking-tight text-on-surface/30 hover:text-primary transition-colors"
          >
            {item}
            <span className="text-primary">{separator}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
