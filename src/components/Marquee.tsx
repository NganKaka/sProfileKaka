import { motion } from 'framer-motion';

interface MarqueeItem {
  label: string;
  icon?: string; // Image URL for the logo
}

interface MarqueeProps {
  items: (string | MarqueeItem)[];
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
  separator?: string;
  showLogos?: boolean;
}

export default function Marquee({
  items,
  speed = 30,
  direction = 'left',
  className = '',
  separator = '·',
  showLogos = false,
}: MarqueeProps) {
  // Normalize items
  const normalized: MarqueeItem[] = items.map((item) =>
    typeof item === 'string' ? { label: item } : item
  );

  // Duplicate items to create seamless loop
  const duplicatedItems = [...normalized, ...normalized, ...normalized];

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
        className="flex gap-12 whitespace-nowrap"
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-12 group"
          >
            {showLogos && item.icon ? (
              <div className="flex items-center transition-all duration-300 group-hover:scale-110">
                <img
                  src={item.icon}
                  alt={item.label}
                  title={item.label}
                  className="h-12 w-12 md:h-16 md:w-16 object-contain opacity-60 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              </div>
            ) : (
              <span className="font-headline text-3xl md:text-5xl font-black tracking-tight text-on-surface/30 hover:text-primary transition-colors">
                {item.label}
              </span>
            )}
            {separator && separator !== '' && (
              <span className="text-primary text-3xl md:text-5xl font-black opacity-40">{separator}</span>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
