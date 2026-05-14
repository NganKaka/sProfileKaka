import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'academics', label: 'Academics' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
];

export default function SectionNavIndicator() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const updateActive = () => {
      const marker = window.innerHeight / 2;
      let nextActive = 'hero';

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        if (rect.top <= marker) {
          nextActive = section.id;
        }
      }

      setActiveSection(nextActive);
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);

    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3"
    >
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-label={`Go to ${section.label}`}
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
              {section.label}
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
