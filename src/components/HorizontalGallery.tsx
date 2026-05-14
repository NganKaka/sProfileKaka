import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';

interface GalleryItem {
  src: string;
  title: string;
  caption?: string;
}

interface HorizontalGalleryProps {
  items: GalleryItem[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

/**
 * Pinned section that translates a horizontal strip of images leftward
 * as the user scrolls vertically. Total scroll distance scales with
 * the number of items so each gets ~80vh of "screen time".
 */
export default function HorizontalGallery({
  items,
  eyebrow = 'Snapshots',
  title = 'A look around',
  subtitle = 'Scroll to slide through the highlights.',
}: HorizontalGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Slide track left by (items - 1) * card width as you scroll through.
  // We use percentages of the track itself so it always lines up.
  const trackTranslate = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${((items.length - 1) / items.length) * 100}%`],
  );

  return (
    <section className="relative">
      <div className="space-y-7 pb-12">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
      </div>

      <div ref={containerRef} className="relative" style={{ height: `${items.length * 80}vh` }}>
        <div className="sticky top-24 h-[calc(100vh-8rem)] overflow-hidden">
          <motion.div
            style={{ x: trackTranslate, width: `${items.length * 100}%` }}
            className="flex h-full"
          >
            {items.map((item, i) => (
              <div
                key={i}
                className="relative h-full flex items-center justify-center px-4 md:px-8"
                style={{ width: `${100 / items.length}%` }}
              >
                <div className="relative w-full h-[70%] max-w-3xl rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="font-tech text-[10px] uppercase tracking-[0.22em] text-primary mb-1">
                      {String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                    </p>
                    <h3 className="font-headline text-2xl md:text-3xl font-bold text-on-surface">
                      {item.title}
                    </h3>
                    {item.caption && (
                      <p className="mt-1 text-sm text-secondary/85 max-w-md">{item.caption}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
