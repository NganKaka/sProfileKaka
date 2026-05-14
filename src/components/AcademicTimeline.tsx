import { motion, AnimatePresence, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { profile } from '../data/profile';
import FadeInImage from '../lib/FadeInImage';
import SectionHeading from './ui/SectionHeading';

type TimelineItem = typeof profile.academicTimeline[number];
type ActiveTimelineImage = {
  src: string;
  alt: string;
  timelineIndex: number;
  imageIndex: number;
};

export default function AcademicTimeline({ onImageModalChange }: { onImageModalChange?: (open: boolean) => void }) {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [nodePoints, setNodePoints] = useState<number[]>([]);
  const [activeImage, setActiveImage] = useState<ActiveTimelineImage | null>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 80%', 'end 20%'] });
  const traceScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const galleryImages = useMemo(
    () =>
      profile.academicTimeline.flatMap((item, timelineIndex) =>
        item.images.map((src, imageIndex) => ({
          src,
          alt: `${item.title} ${imageIndex + 1}`,
          timelineIndex,
          imageIndex,
        })),
      ),
    [],
  );

  const activeImageIndex = useMemo(() => {
    if (!activeImage) return -1;
    return galleryImages.findIndex(
      (img) => img.src === activeImage.src && img.timelineIndex === activeImage.timelineIndex && img.imageIndex === activeImage.imageIndex,
    );
  }, [activeImage, galleryImages]);

  useEffect(() => {
    const measure = () => {
      const container = timelineRef.current;
      if (!container) return;
      const containerRect = container.getBoundingClientRect();
      const totalHeight = Math.max(containerRect.height, 1);
      const nextPoints = nodeRefs.current.map((node) => {
        if (!node) return 0;
        const nodeRect = node.getBoundingClientRect();
        const center = nodeRect.top - containerRect.top + nodeRect.height / 2;
        return Math.max(0, Math.min(1, center / totalHeight));
      });
      setNodePoints(nextPoints);
    };

    const frame = requestAnimationFrame(measure);
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', measure);
    };
  }, []);

  useEffect(() => {
    onImageModalChange?.(Boolean(activeImage));
  }, [activeImage, onImageModalChange]);

  useEffect(() => {
    if (!activeImage) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveImage(null);
      if (event.key === 'ArrowRight') navigateImage(1);
      if (event.key === 'ArrowLeft') navigateImage(-1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeImage, activeImageIndex, galleryImages]);

  const navigateImage = (direction: -1 | 1) => {
    if (activeImageIndex < 0) return;
    const nextIndex = (activeImageIndex + direction + galleryImages.length) % galleryImages.length;
    setActiveImage(galleryImages[nextIndex]);
  };

  return (
    <section id="academics" className="space-y-8 scroll-mt-28">
      <SectionHeading
        eyebrow="Academic Process"
        title="Learning timeline"
        subtitle="Milestones from study foundations to practical product-building, told through story and visual memory."
      />

      <div ref={timelineRef} className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/0 via-primary/35 to-cyan-300/0 md:left-1/2" />
        <motion.div
          style={{ scaleY: traceScale }}
          className="absolute left-4 top-0 bottom-0 w-[2px] origin-top bg-gradient-to-b from-primary via-cyan-300 to-transparent shadow-[0_0_14px_rgba(34,211,238,0.65)] md:left-1/2"
        />

        <div className="space-y-10 md:space-y-14">
          {profile.academicTimeline.map((item, index) => {
            const reversed = index % 2 === 1;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="relative grid gap-5 pl-12 md:pl-0 md:grid-cols-[1fr_72px_1fr] md:items-center"
              >
                <TimelineStory item={item} index={index} className={reversed ? 'md:col-start-3' : 'md:col-start-1'} />

                <div
                  ref={(node) => {
                    nodeRefs.current[index] = node;
                  }}
                  className="absolute left-0 top-6 md:static md:col-start-2 md:row-start-1 flex justify-center"
                >
                  <TimelineNode progress={scrollYProgress} nodePoint={nodePoints[index] ?? 0} index={index} />
                </div>

                <TimelineImageCollage
                  item={item}
                  timelineIndex={index}
                  className={reversed ? 'md:col-start-1 md:row-start-1' : 'md:col-start-3'}
                  onOpenImage={(imageIndex) =>
                    setActiveImage({
                      src: item.images[imageIndex],
                      alt: `${item.title} ${imageIndex + 1}`,
                      timelineIndex: index,
                      imageIndex,
                    })
                  }
                />
              </motion.article>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-background/92 backdrop-blur-md"
            onClick={() => setActiveImage(null)}
          >
            <div className="absolute inset-0 flex items-center justify-center p-4 md:p-10">
              <motion.button
                type="button"
                whileTap={{ scale: 0.96 }}
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveImage(null);
                }}
                className="absolute top-6 right-6 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-secondary/80 hover:text-white hover:border-cyan-300/40 transition-all"
                aria-label="Close image"
              >
                <X size={18} />
              </motion.button>

              <motion.button
                type="button"
                whileTap={{ scale: 0.96 }}
                onClick={(event) => {
                  event.stopPropagation();
                  navigateImage(-1);
                }}
                className="absolute left-4 md:left-8 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-secondary/80 hover:text-white hover:border-cyan-300/40 transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft size={18} />
              </motion.button>

              <motion.button
                type="button"
                whileTap={{ scale: 0.96 }}
                onClick={(event) => {
                  event.stopPropagation();
                  navigateImage(1);
                }}
                className="absolute right-4 md:right-8 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-secondary/80 hover:text-white hover:border-cyan-300/40 transition-all"
                aria-label="Next image"
              >
                <ChevronRight size={18} />
              </motion.button>

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                onClick={(event) => event.stopPropagation()}
                className="max-w-6xl w-full"
              >
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_0_40px_rgba(0,0,0,0.45)]">
                  <img src={activeImage.src} alt={activeImage.alt} className="w-full max-h-[82vh] object-contain bg-black/20" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function TimelineNode({ index, progress, nodePoint }: { index: number; progress: MotionValue<number>; nodePoint: number }) {
  const completed = useTransform(progress, (value) => (value >= nodePoint - 0.01 ? 1 : 0));
  const touch = useTransform(progress, (value) => {
    const radius = 0.02;
    if (value < nodePoint - radius || value > nodePoint + radius) return 0;
    const distance = Math.abs(value - nodePoint);
    return 1 - distance / radius;
  });

  const borderColor = useTransform(completed, [0, 1], ['rgba(187,201,208,0.18)', 'rgba(34,211,238,0.95)']);
  const baseShadow = useTransform(completed, [0, 1], ['0 0 0 rgba(0,0,0,0)', '0 0 14px rgba(34,211,238,0.4)']);
  const numberColor = useTransform(completed, [0, 1], ['rgba(233,195,73,0.72)', 'rgba(255,255,255,0.98)']);

  const touchScale = useTransform(touch, [0, 1], [1, 1.12]);
  const touchRingOpacity = useTransform(touch, [0, 1], [0, 1]);
  const sweepOpacity = useTransform(touch, [0, 1], [0, 0.95]);
  const sweepY = useTransform(touch, [0, 1], ['-130%', '130%']);

  return (
    <motion.div
      style={{ borderColor, boxShadow: baseShadow, scale: touchScale }}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border bg-background/90 overflow-hidden"
    >
      <motion.span
        style={{ opacity: touchRingOpacity }}
        className="absolute inset-0 rounded-full border border-cyan-200/85"
      />
      <motion.span
        style={{ opacity: sweepOpacity, y: sweepY }}
        className="node-sweep-overlay absolute left-0 right-0 h-[60%]"
      />
      <motion.span style={{ color: numberColor }} className="relative z-10 font-tech text-[10px] font-bold">
        {String(index + 1).padStart(2, '0')}
      </motion.span>
    </motion.div>
  );
}

function TimelineStory({ item, index, className }: { item: TimelineItem; index: number; className?: string }) {
  return (
    <div className={`glass-card rounded-2xl p-5 md:p-6 transition-all hover:border-cyan-300/35 hover:bg-white/[0.07] ${className || ''}`}>
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-tech text-[10px] uppercase tracking-[0.18em] text-primary">
          Step {String(index + 1).padStart(2, '0')}
        </span>
        <span className="font-tech text-[10px] uppercase tracking-[0.18em] text-secondary/60">{item.period}</span>
      </div>
      <h3 className="font-headline text-2xl font-bold text-on-surface tracking-tight">{item.title}</h3>
      <p className="mt-1 text-sm text-cyan-100/60 font-tech uppercase tracking-[0.14em]">{item.institution}</p>
      <p className="mt-4 text-secondary/85 leading-relaxed">{item.story}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {item.highlights.map((highlight) => (
          <span key={highlight} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-tech uppercase tracking-[0.14em] text-secondary/70">
            {highlight}
          </span>
        ))}
      </div>
    </div>
  );
}

function TimelineImageCollage({
  item,
  timelineIndex,
  className,
  onOpenImage,
}: {
  item: TimelineItem;
  timelineIndex: number;
  className?: string;
  onOpenImage: (imageIndex: number) => void;
}) {
  return (
    <div className={`grid grid-cols-2 gap-3 ${className || ''}`}>
      {item.images.map((src, imageIndex) => {
        const wrappers = [
          'col-span-2',
          'md:translate-y-2',
          'md:translate-y-7',
        ];
        const heights = ['h-48 md:h-52', 'h-32 md:h-36', 'h-32 md:h-36'];
        return (
          <button
            key={`${timelineIndex}-${imageIndex}`}
            type="button"
            onClick={() => onOpenImage(imageIndex)}
            className={`group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] ambient-shadow text-left ${wrappers[imageIndex]}`}
          >
            <div className={`relative ${heights[imageIndex]} overflow-hidden`}>
              <FadeInImage
                src={src}
                alt={`${item.title} ${imageIndex + 1}`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-cyan-400/8 opacity-0 group-hover:opacity-100 transition-opacity duration-250" />
              <div className="absolute left-4 bottom-4 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-250 font-tech text-[10px] uppercase tracking-[0.16em] text-cyan-100">
                Click to view full screen
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
