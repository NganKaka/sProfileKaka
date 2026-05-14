import { Code2, Palette, Sparkles } from 'lucide-react';
import { profile } from '../data/profile';
import FadeInImage from '../lib/FadeInImage';
import MagneticCard from './ui/MagneticCard';
import SectionHeading from './ui/SectionHeading';

const icons = [Code2, Palette, Sparkles];

export default function Skills() {
  return (
    <section id="skills" className="space-y-10 scroll-mt-28">
      <SectionHeading
        eyebrow="Skills & Hobbies"
        title="What I build and what inspires me"
        subtitle="The mix of professional craft and personal interests that shapes how I design, build, and tell stories through interfaces."
      />

      <div className="space-y-6">
        <div>
          <p className="mb-4 font-tech text-[10px] uppercase tracking-[0.2em] text-primary">Core skills</p>
          <div className="grid md:grid-cols-3 gap-6 perspective-1000">
            {profile.skills.map((skill, index) => {
              const Icon = icons[index % icons.length];
              return (
                <MagneticCard key={skill.title} className="glass-card rounded-2xl p-6 h-full hover:border-cyan-300/35 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="draw-icon text-cyan-300"><Icon size={20} /></div>
                    <h3 className="font-headline text-xl font-bold text-on-surface">{skill.title}</h3>
                  </div>
                  <p className="text-secondary/80 leading-relaxed text-sm">{skill.body}</p>
                </MagneticCard>
              );
            })}
          </div>
        </div>

        <div>
          <p className="mb-4 font-tech text-[10px] uppercase tracking-[0.2em] text-primary">Hobbies</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 perspective-1000">
            {profile.hobbies.map((hobby) => (
              <MagneticCard key={hobby.title} className="group glass-card rounded-2xl overflow-hidden h-full hover:border-cyan-300/35 hover:bg-white/[0.07] transition-colors ambient-shadow">
                <div className="relative h-52 sm:h-56 overflow-hidden">
                  <FadeInImage
                    src={hobby.image}
                    alt={hobby.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-background/10 to-transparent" />
                  <div className="absolute inset-0 bg-cyan-400/8 opacity-0 group-hover:opacity-100 transition-opacity duration-250" />
                  <div className="absolute left-4 bottom-4 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-tech text-[10px] uppercase tracking-[0.18em] text-primary">
                    {hobby.accent}
                  </div>
                </div>

                <div className="p-5 md:p-6 space-y-3">
                  <h3 className="font-headline text-xl font-bold text-on-surface">{hobby.title}</h3>
                  <p className="text-secondary/80 text-sm leading-relaxed">{hobby.body}</p>
                </div>
              </MagneticCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
