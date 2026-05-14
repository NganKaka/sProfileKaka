import { useRef } from 'react';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { Lightbulb, Pencil, Hammer, Rocket, LucideIcon } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';

type Beat = {
  icon: LucideIcon;
  label: string;
  title: string;
  body: string;
};

const beats: Beat[] = [
  {
    icon: Lightbulb,
    label: 'Research',
    title: 'Understand the problem',
    body: 'I start by asking what already works, what doesnt, and why. Constraints first, ideas second. Most "feature requests" turn out to be the wrong question.',
  },
  {
    icon: Pencil,
    label: 'Design',
    title: 'Sketch the smallest cut',
    body: 'I look for the simplest version that proves the idea. If a bug fix doesnt need a rewrite, it doesnt get one. Plan visible to the team before code begins.',
  },
  {
    icon: Hammer,
    label: 'Build',
    title: 'Ship in tight loops',
    body: 'Type-safe, tested, reviewed. I write the smallest piece that earns feedback, then iterate. Working code on day one beats perfect code on day five.',
  },
  {
    icon: Rocket,
    label: 'Ship',
    title: 'Land it, then learn',
    body: 'Production data is the only honest critic. I instrument, watch, and fix what reality reveals. Small, frequent releases beat big launches every time.',
  },
];

function RailItem({
  beat,
  index,
  scrollYProgress,
}: {
  beat: Beat;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = index / beats.length;
  const end = (index + 1) / beats.length;
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.05), start, end, Math.min(1, end + 0.05)],
    [0.25, 1, 1, 0.25],
  );
  const x = useTransform(scrollYProgress, [start, end], [0, 4]);
  const Icon = beat.icon;

  return (
    <motion.div style={{ opacity, x }} className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
        <Icon size={16} />
      </div>
      <div>
        <p className="font-tech text-[10px] uppercase tracking-[0.18em] text-secondary/60">
          Step {String(index + 1).padStart(2, '0')}
        </p>
        <p className="font-headline text-sm font-bold text-on-surface">{beat.label}</p>
      </div>
    </motion.div>
  );
}

function BeatPanel({
  beat,
  index,
  scrollYProgress,
}: {
  beat: Beat;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = index / beats.length;
  const end = (index + 1) / beats.length;
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.04), start, end - 0.04, end],
    [0, 1, 1, 0],
  );
  const y = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.04), start, end - 0.04, end],
    [40, 0, 0, -40],
  );
  const Icon = beat.icon;

  return (
    <motion.article
      style={{ opacity, y }}
      className="absolute inset-0 glass-card rounded-3xl p-6 md:p-10 flex flex-col justify-center"
    >
      <div className="flex items-center gap-3 mb-5 md:hidden">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
          <Icon size={18} />
        </div>
        <p className="font-tech text-[10px] uppercase tracking-[0.18em] text-primary">
          Step {String(index + 1).padStart(2, '0')} · {beat.label}
        </p>
      </div>
      <p className="hidden md:block font-tech text-[11px] uppercase tracking-[0.22em] text-primary mb-3">
        Step {String(index + 1).padStart(2, '0')} · {beat.label}
      </p>
      <h3 className="font-headline text-2xl md:text-4xl font-bold text-on-surface tracking-tight mb-4">
        {beat.title}
      </h3>
      <p className="text-base md:text-lg leading-relaxed text-secondary/85 max-w-2xl">{beat.body}</p>
    </motion.article>
  );
}

export default function ProcessScrollytell() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section id="process" className="relative scroll-mt-28">
      <div className="space-y-7 pb-16">
        <SectionHeading
          eyebrow="How I Work"
          title="From problem to production"
          subtitle="A four-step rhythm I keep coming back to. Scroll through to see each step."
        />
      </div>

      <div ref={containerRef} className="relative" style={{ height: `${beats.length * 100}vh` }}>
        <div className="sticky top-24 h-[calc(100vh-8rem)] flex items-center">
          <div className="grid w-full gap-6 md:gap-10 md:grid-cols-[1fr_2fr]">
            <div className="hidden md:flex flex-col gap-6 self-stretch justify-center">
              {beats.map((beat, index) => (
                <RailItem key={beat.label} beat={beat} index={index} scrollYProgress={scrollYProgress} />
              ))}
            </div>

            <div className="relative min-h-[280px] md:min-h-[360px]">
              {beats.map((beat, index) => (
                <BeatPanel key={beat.label} beat={beat} index={index} scrollYProgress={scrollYProgress} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
