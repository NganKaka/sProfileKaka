import { motion } from 'framer-motion';
import { profile } from '../data/profile';
import FadeInImage from '../lib/FadeInImage';
import SectionHeading from './ui/SectionHeading';

export default function AcademicTimeline() {
  return (
    <section id="academics" className="space-y-8 scroll-mt-28">
      <SectionHeading
        eyebrow="Academic Process"
        title="Learning timeline"
        subtitle="Milestones from study foundations to practical product-building, told through story and visual memory."
      />

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/0 via-primary/40 to-cyan-300/0 md:left-1/2" />

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

                <div className="absolute left-0 top-6 md:static md:col-start-2 md:row-start-1 flex justify-center">
                  <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 bg-background shadow-[0_0_22px_rgba(233,195,73,0.35)]">
                    <span className="font-tech text-[10px] font-bold text-primary">{String(index + 1).padStart(2, '0')}</span>
                    <span className="absolute inset-0 rounded-full border border-cyan-300/20 animate-ping" />
                  </div>
                </div>

                <TimelineImage item={item} className={reversed ? 'md:col-start-1 md:row-start-1' : 'md:col-start-3'} />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

type TimelineItem = typeof profile.academicTimeline[number];

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

function TimelineImage({ item, className }: { item: TimelineItem; className?: string }) {
  return (
    <div className={`group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] ambient-shadow ${className || ''}`}>
      <div className="relative h-64 md:h-72 overflow-hidden">
        <FadeInImage
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        <div className="absolute left-4 bottom-4 font-tech text-[10px] uppercase tracking-[0.18em] text-primary/85">
          Academic archive
        </div>
      </div>
    </div>
  );
}
