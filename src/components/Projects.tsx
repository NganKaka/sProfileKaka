import { ArrowUpRight } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import MagneticCard from './ui/MagneticCard';
import { profile } from '../data/profile';

export default function Projects() {
  return (
    <section id="projects" className="space-y-6">
      <SectionHeading
        eyebrow="Projects"
        title="Featured work"
        subtitle="Selected projects and experiments that reflect my design-engineering style."
      />

      <div className="grid md:grid-cols-2 gap-6 perspective-1000">
        {profile.projects.map((project) => (
          <MagneticCard key={project.title} className={`rounded-2xl p-6 h-full border transition-all ${project.featured ? 'border-primary/35 bg-primary/8 shadow-[0_0_26px_rgba(233,195,73,0.14)]' : 'glass-card hover:border-cyan-300/35'}`}>
            <div className="space-y-4 h-full flex flex-col">
              <div>
                <p className="font-tech text-[10px] uppercase tracking-[0.18em] text-secondary/60">{project.meta}</p>
                <h3 className="font-headline text-2xl font-bold text-on-surface mt-2">{project.title}</h3>
              </div>
              <p className="text-secondary/85 text-sm leading-relaxed flex-1">{project.body}</p>
              <a
                href={project.href}
                target={project.href.startsWith('http') ? '_blank' : undefined}
                rel={project.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-2 text-primary font-tech text-[11px] uppercase tracking-[0.14em] hover:text-cyan-300 transition-colors"
              >
                {project.cta}
                <ArrowUpRight size={14} />
              </a>
            </div>
          </MagneticCard>
        ))}
      </div>
    </section>
  );
}
