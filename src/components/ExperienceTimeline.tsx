import { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { loadExperience } from '../lib/contentLoader';
import { experienceSchema, type Experience } from '../schemas/content';
import SectionHeading from './ui/SectionHeading';

const experienceEntries = loadExperience(experienceSchema);
const railStops: Experience[] = experienceEntries.map((entry) => entry.data);

export default function ExperienceTimeline() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const desktopRef = useRef<HTMLDivElement | null>(null);

  const nodeXs = railStops.map((_, index) => {
    if (railStops.length === 1) return 450;
    return 5 + index * (890 / (railStops.length - 1));
  });
  const railPath = nodeXs
    .map((x, index) => {
      if (index === 0) return `M${x} 5`;
      return `H${x}`;
    })
    .join(' ');

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    if (!mediaQuery.matches || !trackRef.current || !desktopRef.current || railStops.length === 0) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled || !desktopRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const panels = gsap.utils.toArray<HTMLElement>('.experience-panel');
        if (panels.length <= 1) return;

        gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: desktopRef.current,
            pin: true,
            scrub: 1,
            end: `+=${panels.length * 900}`,
          },
        });

        gsap.to('.experience-progress-mask', {
          width: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: desktopRef.current,
            start: 'top top',
            end: `+=${panels.length * 900}`,
            scrub: 1,
          },
        });
      }, desktopRef);

      cleanup = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <section id="experience" className="space-y-8 scroll-mt-28">
      <SectionHeading
        eyebrow="Experience"
        title="Work timeline"
        subtitle="Professional milestones across product delivery, frontend engineering, and interface storytelling."
      />

      <div className="hidden md:block" ref={desktopRef}>
        <div ref={wrapperRef} className="overflow-x-hidden relative">
          <div className="absolute top-[28vh] left-1/2 -translate-x-1/2 w-[52vw] z-20 drop-shadow-[0_0_14px_rgba(34,211,238,0.45)] pointer-events-none">
            <svg viewBox="0 0 900 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full overflow-visible">
              <path d={railPath} stroke="rgba(34,211,238,0.22)" strokeWidth="2" strokeLinecap="round" />
              {nodeXs.map((x, index) => (
                <circle key={`rail-node-${index}`} cx={x} cy="5" r="5" fill="#0d1b2a" stroke="#22d3ee" strokeWidth="1.5" />
              ))}
              <mask id="experience-mask" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="900" height="10">
                <path d={railPath} stroke="white" strokeWidth="2" strokeLinecap="round" />
                {nodeXs.map((x, index) => (
                  <circle key={`mask-node-${index}`} cx={x} cy="5" r="5" fill="white" />
                ))}
              </mask>
              <g mask="url(#experience-mask)">
                <rect className="experience-progress-mask" y="-49" height="99" width="0" fill="url(#experienceProgressGradient)"/>
              </g>
              <defs>
                <linearGradient id="experienceProgressGradient" x1="0" y1="0" x2="900" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#e9c349" />
                  <stop offset="0.5" stopColor="#22d3ee" />
                  <stop offset="1" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute inset-0 pointer-events-none">
              {railStops.map((item, index) => {
                const x = nodeXs[index] ?? 450;
                const left = `${(x / 900) * 100}%`;
                return (
                  <div key={`${item.period}-${index}`} className="absolute top-1/2" style={{ left }}>
                    <div className="-translate-x-1/2 -translate-y-[calc(100%+12px)]">
                      <div className="rounded-full border border-white/10 bg-background/80 px-3 py-1 text-[10px] font-tech uppercase tracking-[0.16em] text-cyan-100/75 backdrop-blur-sm whitespace-nowrap shadow-[0_0_14px_rgba(0,0,0,0.35)]">
                        {item.period}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background via-background/80 to-transparent" />

          <div ref={trackRef} className="flex" style={{ width: `${railStops.length * 100}vw` }}>
            {railStops.map((item, index) => (
              <section key={`${item.business}-${item.role}-${index}`} className="experience-panel w-screen shrink-0 min-h-screen px-[8vw] pt-[34vh] pb-16 flex items-start">
                <div className="glass-card rounded-3xl p-7 md:p-8 max-w-4xl w-full space-y-5 ambient-shadow border border-white/10">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-tech text-[10px] uppercase tracking-[0.18em] text-primary">
                      Step {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-tech text-[10px] uppercase tracking-[0.18em] text-secondary/60">{item.period}</span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-headline text-3xl md:text-4xl font-bold text-on-surface tracking-tight">{item.business}</h3>
                    <p className="text-sm text-cyan-100/60 font-tech uppercase tracking-[0.14em]">{item.role}</p>
                  </div>

                  {item.details && item.details.length > 0 && (
                    <div className="grid md:grid-cols-2 gap-4 text-secondary/85">
                      {item.details.map((detail) => (
                        <p key={detail} className="leading-relaxed">{detail}</p>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {item.highlights.map((highlight) => (
                      <span key={highlight} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-tech uppercase tracking-[0.14em] text-secondary/70">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-8 md:hidden">
        {railStops.map((item, index) => (
          <motion.article
            key={`${item.business}-${item.role}-${index}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="glass-card rounded-2xl p-5"
          >
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-tech text-[10px] uppercase tracking-[0.18em] text-primary">
                Step {String(index + 1).padStart(2, '0')}
              </span>
              <span className="font-tech text-[10px] uppercase tracking-[0.18em] text-secondary/60">{item.period}</span>
            </div>
            <h3 className="font-headline text-2xl font-bold text-on-surface tracking-tight">{item.business}</h3>
            <p className="mt-1 text-sm text-cyan-100/60 font-tech uppercase tracking-[0.14em]">{item.role}</p>
            {item.details && item.details.length > 0 && (
              <div className="mt-4 space-y-2 text-secondary/85">
                {item.details.map((detail) => (
                  <p key={detail} className="leading-relaxed">• {detail}</p>
                ))}
              </div>
            )}
            <div className="mt-5 flex flex-wrap gap-2">
              {item.highlights.map((highlight) => (
                <span key={highlight} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-tech uppercase tracking-[0.14em] text-secondary/70">
                  {highlight}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
