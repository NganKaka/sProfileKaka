import { motion } from 'framer-motion';
import { useActiveSection, SECTION_IDS, type SectionId } from '../contexts/ActiveSectionContext';
import { smoothScrollTo } from './SmoothScroll';

const LABELS: Record<SectionId, string> = {
  hero: 'Home',
  about: 'About',
  academics: 'Academics',
  experience: 'Experience',
  skills: 'Skills',
  projects: 'Projects',
  testimonials: 'Testimonials',
};

export default function SectionNavIndicator() {
  const { activeId, lockTo } = useActiveSection();
  const visibleSections = SECTION_IDS.filter((id) => id !== 'testimonials');

  return (
    <nav
      aria-label="Section navigation"
      className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3"
    >
      {visibleSections.map((id) => {
        const isActive = activeId === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              const el = document.getElementById(id);
              if (!el) return;
              lockTo(id);
              e.preventDefault();
              smoothScrollTo(el, { offset: -100 });
            }}
            aria-label={`Go to ${LABELS[id]}`}
            className="group relative flex items-center justify-end gap-3"
          >
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{
                opacity: isActive ? 1 : 0,
                x: isActive ? 0 : 10,
              }}
              transition={{ duration: 0.2 }}
              className="font-tech text-[10px] uppercase tracking-[0.18em] text-primary group-hover:opacity-100 group-hover:translate-x-0"
            >
              {LABELS[id]}
            </motion.span>
            <motion.span
              animate={{
                width: isActive ? 24 : 12,
                backgroundColor: isActive ? 'var(--color-primary)' : 'rgba(187, 201, 208, 0.3)',
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="block h-[2px] rounded-full"
            />
          </a>
        );
      })}
    </nav>
  );
}
