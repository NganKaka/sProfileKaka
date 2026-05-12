import { Code2, Palette, Sparkles } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import MagneticCard from './ui/MagneticCard';
import { profile } from '../data/profile';

const icons = [Code2, Palette, Sparkles];

export default function Skills() {
  return (
    <section id="skills" className="space-y-6">
      <SectionHeading
        eyebrow="Skills"
        title="What I build"
        subtitle="Core capabilities I use to turn ideas into polished products."
      />

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
    </section>
  );
}
