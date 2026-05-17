import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import SectionHeading from './ui/SectionHeading';
import SpecSheet from './ui/SpecSheet';
import { profile } from '../data/profile';

// Note: About component still uses profile.ts for now
// This component displays profile.about, profile.personalNote, profile.stats, and profile.languageSkills
// These could be migrated to MDX in the future if needed

type LanguageStrengthRowProps = {
  name: string;
  level: number;
  inView: boolean;
  index: number;
};

function LanguageStrengthRow({ name, level, inView, index }: LanguageStrengthRowProps) {
  const reducedMotion = useReducedMotion();
  const target = Math.min(100, Math.max(0, Number(level) || 0));
  const progress = useMotionValue(0);
  const rounded = useTransform(progress, (value) => Math.round(value));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayValue(latest);
    });

    return unsubscribe;
  }, [rounded]);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      progress.set(target);
      return;
    }

    const controls = animate(progress, target, {
      duration: 1,
      delay: index * 0.12,
      ease: [0.22, 1, 0.36, 1],
    });

    return () => controls.stop();
  }, [inView, target, index, progress, reducedMotion]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <p className="font-headline text-sm font-bold text-on-surface">{name}</p>
        <p className="font-tech text-[10px] uppercase tracking-[0.16em] text-cyan-100/70">{displayValue}%</p>
      </div>

      <div
        className="h-3 overflow-hidden rounded-full border border-white/10 bg-white/[0.06]"
        role="progressbar"
        aria-valuenow={target}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name} proficiency`}
      >
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: inView ? `${target}%` : '0%' }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : {
                  duration: 1,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }
          }
          className="h-full rounded-full bg-gradient-to-r from-primary/80 via-cyan-300/80 to-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.35)]"
        />
      </div>
    </div>
  );
}

export default function About() {
  const languageRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(languageRef, { once: true, margin: '-80px' });

  return (
    <section id="about" className="space-y-6 scroll-mt-28">
      <SectionHeading
        eyebrow="About"
        title="Who I am"
        subtitle="A quick profile snapshot and what I care about when building products."
      />

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="glass-card rounded-2xl p-6 md:p-8 grid md:grid-cols-[1.1fr_0.9fr] gap-8"
        >
          <div className="space-y-5">
            <p className="text-secondary/90 leading-loose">{profile.about}</p>
            <div className="rounded-2xl border border-primary/15 bg-primary/8 p-4">
              <p className="font-tech text-[10px] uppercase tracking-[0.2em] text-primary">Personal note</p>
              <p className="mt-2 text-sm leading-relaxed text-secondary/85">{profile.personalNote}</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="font-tech text-[10px] uppercase tracking-[0.2em] text-primary">Spec sheet</p>
            <SpecSheet
              rows={[
                { label: 'NAME', value: profile.name, accent: 'gold' },
                { label: 'ROLE', value: profile.title, accent: 'cyan' },
                { label: 'LOC', value: profile.location, accent: 'gold' },
                { label: 'LANG', value: 'Vi · En (IELTS 7.0)', accent: 'cyan' },
                { label: 'FOCUS', value: 'Frontend · Backend · Product', accent: 'gold' },
                { label: 'STATUS', value: profile.availability.replace(/\.$/, ''), accent: 'cyan' },
              ]}
            />
          </div>
        </motion.div>

        {profile.languageSkills.length > 0 && (
          <div ref={languageRef} className="glass-card relative rounded-2xl p-6 md:p-8 overflow-hidden">
            <p className="font-tech text-[10px] uppercase tracking-[0.2em] text-primary">Technical strengths</p>
            <h3 className="mt-2 font-headline text-2xl font-bold text-on-surface">Programming Language</h3>
            <p className="mt-2 text-sm text-secondary/80">A quick view of my current comfort level across core programming and CS fundamentals.</p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {profile.languageSkills.map((language, index) => (
                <LanguageStrengthRow
                  key={language.name}
                  name={language.name}
                  level={language.level}
                  inView={inView}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
