import SectionHeading from './ui/SectionHeading';
import { profile } from '../data/profile';

export default function About() {
  return (
    <section id="about" className="space-y-6">
      <SectionHeading
        eyebrow="About"
        title="Who I am"
        subtitle="A quick profile snapshot and what I care about when building products."
      />

      <div className="glass-card rounded-2xl p-6 md:p-8 grid md:grid-cols-[1.2fr_0.8fr] gap-6">
        <p className="text-secondary/90 leading-loose">{profile.about}</p>

        <div className="space-y-3">
          <p className="font-tech text-[10px] uppercase tracking-[0.2em] text-primary">Quick facts</p>
          <div className="space-y-2">
            {profile.stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <p className="text-xs uppercase tracking-[0.12em] text-secondary/60 font-tech">{stat.label}</p>
                <p className="font-headline text-xl font-bold text-on-surface mt-1">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
