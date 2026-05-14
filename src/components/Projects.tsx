import { ArrowUpRight, CheckCircle2, Code2, ExternalLink, FileText } from 'lucide-react';
import { useContentList } from '../hooks/useContent';
import { projectSchema, type Project } from '../schemas/content';
import SectionHeading from './ui/SectionHeading';
import MagneticCard from './ui/MagneticCard';
import { trackProjectClick } from '../lib/analytics';
import { ProjectGridSkeleton } from './LoadingSkeleton';

function ProjectAction({ href, label, variant, projectTitle }: { href: string; label: string; variant: 'live' | 'code' | 'case'; projectTitle: string }) {
  const Icon = variant === 'live' ? ExternalLink : variant === 'code' ? Code2 : FileText;

  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      onClick={() => trackProjectClick(projectTitle, variant)}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-[10px] font-tech uppercase tracking-[0.16em] transition-all ${
        variant === 'live'
          ? 'border border-primary/40 bg-primary/15 text-primary hover:bg-primary/25 hover:shadow-[0_0_18px_rgba(233,195,73,0.28)]'
          : 'border border-cyan-300/20 bg-cyan-950/15 text-cyan-100/75 hover:border-cyan-300/40 hover:bg-cyan-400/10 hover:text-cyan-200'
      }`}
    >
      <Icon size={13} />
      {label}
    </a>
  );
}

function ProjectPreview({ project, featured }: { project: Project; featured: boolean }) {
  return (
    <div className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] ${featured ? 'min-h-[320px]' : 'min-h-[190px]'}`}>
      <img
        src={project.previewImage}
        alt={`${project.title} preview`}
        className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-700 group-hover:scale-105 group-hover:opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background/15 via-background/55 to-background/95" />
      <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-background/65 p-4 backdrop-blur-md">
        <p className="font-tech text-[10px] uppercase tracking-[0.2em] text-cyan-100/60">Preview</p>
        <p className="mt-1 font-headline text-xl font-bold text-on-surface">{project.title}</p>
      </div>
    </div>
  );
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <MagneticCard className={`h-full rounded-[28px] border transition-all ${featured ? 'border-primary/35 bg-primary/8 p-5 shadow-[0_0_34px_rgba(233,195,73,0.16)]' : 'glass-card p-5 hover:border-cyan-300/35'}`}>
      <div className={`grid h-full gap-6 ${featured ? 'lg:grid-cols-[1.08fr_0.92fr]' : ''}`}>
        <ProjectPreview project={project} featured={featured} />

        <div className="flex h-full flex-col space-y-5">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-tech text-[10px] uppercase tracking-[0.18em] text-secondary/60">{project.meta}</p>
              {project.featured && (
                <span className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 font-tech text-[9px] uppercase tracking-[0.16em] text-primary">
                  Featured
                </span>
              )}
            </div>
            <h3 className={`font-headline font-bold text-on-surface ${featured ? 'text-4xl' : 'text-2xl'}`}>{project.title}</h3>
            <p className="text-sm leading-relaxed text-secondary/85">{project.body}</p>
          </div>

          <div className="space-y-4 flex-1">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <p className="font-tech text-[10px] uppercase tracking-[0.18em] text-secondary/60">Role</p>
              <p className="mt-1 text-sm font-semibold text-on-surface">{project.role}</p>
            </div>

            <div>
              <p className="mb-2 font-tech text-[10px] uppercase tracking-[0.18em] text-secondary/60">Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="rounded-full border border-cyan-300/20 bg-cyan-950/15 px-3 py-1 text-[10px] font-tech uppercase tracking-[0.12em] text-cyan-100/75">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 font-tech text-[10px] uppercase tracking-[0.18em] text-secondary/60">Highlights</p>
              <div className="space-y-2">
                {project.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-start gap-2 text-sm text-secondary/85">
                    <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-primary" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {(project.outcome || project.proof) && (
              <div className="rounded-xl border border-primary/20 bg-primary/8 p-4">
                {project.outcome && <p className="text-sm font-semibold leading-relaxed text-on-surface">{project.outcome}</p>}
                {project.proof && <p className="mt-2 text-xs leading-relaxed text-secondary/70">{project.proof}</p>}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <ProjectAction href={project.liveUrl} label="Live" variant="live" projectTitle={project.title} />
            <ProjectAction href={project.codeUrl} label="Code" variant="code" projectTitle={project.title} />
            <ProjectAction href={project.caseStudyUrl} label="Case" variant="case" projectTitle={project.title} />
          </div>
        </div>
      </div>
    </MagneticCard>
  );
}

export default function Projects() {
  // Load projects from MDX files
  const { items: projects, loading, error } = useContentList<Project>(
    [
      '/content/projects/01-stripkaka.md',
      '/content/projects/02-portfolio-systems.md',
      '/content/projects/03-product-storytelling.md',
    ],
    projectSchema
  );

  // Show loading state
  if (loading) {
    return (
      <section id="projects" className="space-y-7 scroll-mt-28">
        <SectionHeading
          eyebrow="Projects"
          title="Featured work"
          subtitle="Selected projects and experiments with role, stack, execution details, and proof of delivery."
        />
        <ProjectGridSkeleton count={3} />
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section id="projects" className="space-y-7 scroll-mt-28">
        <SectionHeading
          eyebrow="Projects"
          title="Featured work"
          subtitle="Selected projects and experiments with role, stack, execution details, and proof of delivery."
        />
        <div className="glass-card rounded-2xl p-8 text-center">
          <p className="text-red-400">Failed to load projects. Please try again later.</p>
        </div>
      </section>
    );
  }

  const featuredProject = projects.find((p) => p.data.featured) ?? projects[0];
  const secondaryProjects = projects.filter((p) => p !== featuredProject);

  return (
    <section id="projects" className="space-y-7 scroll-mt-28">
      <SectionHeading
        eyebrow="Projects"
        title="Featured work"
        subtitle="Selected projects and experiments with role, stack, execution details, and proof of delivery."
      />

      <div className="space-y-6 perspective-1000">
        {featuredProject && <ProjectCard project={featuredProject.data} featured />}
        <div className="grid gap-6 md:grid-cols-2">
          {secondaryProjects.map((project) => (
            <ProjectCard key={project.data.title} project={project.data} />
          ))}
        </div>
      </div>
    </section>
  );
}
