import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Code2, ExternalLink, FileText, X } from 'lucide-react';
import { useEffect } from 'react';
import type { Project } from '../schemas/content';
import { trackProjectClick } from '../lib/analytics';

interface ProjectDetailProps {
  project: Project;
  layoutKey: string;
  onClose: () => void;
}

export default function ProjectDetail({ project, layoutKey, onClose }: ProjectDetailProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  return (
    <motion.div
      key="project-detail"
      className="fixed inset-0 z-[150] overflow-y-auto"
      initial="closed"
      animate="open"
      exit="closed"
    >
      <motion.div
        aria-hidden
        className="fixed inset-0 bg-background/85 backdrop-blur-md"
        variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-12 md:py-16">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project detail"
          className="fixed right-6 top-6 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-background/80 text-secondary/80 hover:text-white hover:border-cyan-300/40 transition-all"
        >
          <X size={18} />
        </button>

        <motion.div
          layoutId={`project-image-${layoutKey}`}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_24px_64px_rgba(0,0,0,0.55)]"
          style={{ aspectRatio: '16 / 9' }}
        >
          <img
            src={project.previewImage}
            alt={`${project.title} preview`}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent" />
          <div className="absolute inset-x-6 bottom-6 md:inset-x-10 md:bottom-10">
            <p className="font-tech text-[10px] uppercase tracking-[0.2em] text-cyan-100/70">{project.meta}</p>
            <h2 className="mt-2 font-headline text-3xl md:text-5xl font-extrabold tracking-tight text-on-surface">
              {project.title}
            </h2>
          </div>
        </motion.div>

        <motion.div
          variants={{
            open: { opacity: 1, y: 0, transition: { delay: 0.18, duration: 0.3, ease: 'easeOut' } },
            closed: { opacity: 0, y: 16, transition: { duration: 0.15 } },
          }}
          className="mt-8 grid gap-8 md:grid-cols-[1.4fr_1fr]"
        >
          <div className="space-y-6">
            {project.body && (
              <p className="text-base md:text-lg leading-relaxed text-secondary/90">{project.body}</p>
            )}

            <div>
              <p className="mb-3 font-tech text-[10px] uppercase tracking-[0.2em] text-primary">Highlights</p>
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
              <div className="rounded-2xl border border-primary/20 bg-primary/8 p-5">
                {project.outcome && (
                  <p className="text-sm font-semibold leading-relaxed text-on-surface">{project.outcome}</p>
                )}
                {project.proof && (
                  <p className="mt-2 text-xs leading-relaxed text-secondary/70">{project.proof}</p>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-2 pt-2">
              <DetailAction href={project.liveUrl} label="View Live" variant="live" projectTitle={project.title} />
              <DetailAction href={project.codeUrl} label="Source Code" variant="code" projectTitle={project.title} />
              <DetailAction href={project.caseStudyUrl} label="Case Study" variant="case" projectTitle={project.title} />
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="font-tech text-[10px] uppercase tracking-[0.18em] text-secondary/60">Role</p>
              <p className="mt-1 text-sm font-semibold text-on-surface">{project.role}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="font-tech text-[10px] uppercase tracking-[0.18em] text-secondary/60">Stack</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-cyan-300/20 bg-cyan-950/15 px-3 py-1 text-[10px] font-tech uppercase tracking-[0.12em] text-cyan-100/75"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </motion.div>
      </div>
    </motion.div>
  );
}

function DetailAction({
  href,
  label,
  variant,
  projectTitle,
}: {
  href: string;
  label: string;
  variant: 'live' | 'code' | 'case';
  projectTitle: string;
}) {
  const Icon = variant === 'live' ? ExternalLink : variant === 'code' ? Code2 : FileText;
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      onClick={() => trackProjectClick(projectTitle, variant)}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-[11px] font-tech uppercase tracking-[0.16em] transition-all ${
        variant === 'live'
          ? 'border border-primary/40 bg-primary/15 text-primary hover:bg-primary/25 hover:shadow-[0_0_18px_rgba(233,195,73,0.28)]'
          : 'border border-cyan-300/20 bg-cyan-950/15 text-cyan-100/75 hover:border-cyan-300/40 hover:bg-cyan-400/10 hover:text-cyan-200'
      }`}
    >
      <Icon size={14} />
      {label}
    </a>
  );
}

export { AnimatePresence };
