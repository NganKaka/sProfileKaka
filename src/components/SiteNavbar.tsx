import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/profile';
import ThemeToggle from './ThemeToggle';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Academics', href: '#academics' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills&Hobbies', href: '#skills' },
  { label: 'Projects', href: '#projects' },
];

export default function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const lockedTargetRef = useRef<string | null>(null);
  const lockTimeoutRef = useRef<number | null>(null);

  const lockActiveSection = (target: string) => {
    lockedTargetRef.current = target;
    setActiveSection(target);
    if (lockTimeoutRef.current) {
      window.clearTimeout(lockTimeoutRef.current);
    }
    lockTimeoutRef.current = window.setTimeout(() => {
      lockedTargetRef.current = null;
      lockTimeoutRef.current = null;
    }, 700);
  };

  const handleSectionClick = (target: string) => {
    lockActiveSection(target);
    setOpen(false);
  };

  const handleLogoClick = () => {
    lockedTargetRef.current = null;
    if (lockTimeoutRef.current) {
      window.clearTimeout(lockTimeoutRef.current);
      lockTimeoutRef.current = null;
    }
    setActiveSection('');
    setOpen(false);
  };

  const handleScrollEnd = () => {
    if (!lockedTargetRef.current) return;
    const targetElement = document.getElementById(lockedTargetRef.current.slice(1));
    if (!targetElement) {
      lockedTargetRef.current = null;
      return;
    }

    const { top } = targetElement.getBoundingClientRect();
    if (Math.abs(top - 112) < 24) {
      lockedTargetRef.current = null;
      if (lockTimeoutRef.current) {
        window.clearTimeout(lockTimeoutRef.current);
        lockTimeoutRef.current = null;
      }
    }
  };

  useEffect(() => {
    return () => {
      if (lockTimeoutRef.current) {
        window.clearTimeout(lockTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((section): section is HTMLElement => Boolean(section));

    const updateActiveSection = () => {
      if (lockedTargetRef.current) {
        handleScrollEnd();
        return;
      }

      const marker = 140;
      let nextActive = '';

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= marker) {
          nextActive = `#${section.id}`;
        }
      }

      if (window.scrollY < 120) {
        setActiveSection('');
        return;
      }

      setActiveSection(nextActive);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/60 backdrop-blur-lg border-b dark:border-white/5 light:border-black/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
        <div className="flex justify-between items-center">
          <a
            href="#hero"
            onClick={handleLogoClick}
            className="text-xl font-black text-primary tracking-tighter cursor-pointer"
          >
            sProfileKaka
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleSectionClick(link.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`font-headline tracking-tighter uppercase text-[12px] font-bold transition-all duration-300 relative pb-1 px-2 py-1 rounded-md cursor-pointer ${
                    isActive
                      ? 'text-primary border-b-2 border-primary shadow-[0_0_14px_rgba(233,195,73,0.18)]'
                      : 'text-secondary/60 hover:text-cyan-300 hover:bg-cyan-400/10'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-md bg-primary/10"
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </motion.a>
              );
            })}
            <ThemeToggle />
            <motion.a
              href={profile.tripSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="hidden sm:inline-flex shimmer-sweep bg-primary text-background px-6 py-2 rounded-lg text-xs font-bold tracking-wide shadow-[0_0_20px_rgba(233,195,73,0.6)] hover:shadow-[0_0_30px_rgba(233,195,73,1)] border border-primary/50 transition-shadow cursor-pointer"
            >
              <span className="relative z-10">Visit sTripKaka</span>
            </motion.a>
          </div>

          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex md:hidden h-9 w-9 items-center justify-center rounded-full text-secondary hover:text-primary hover:bg-primary/10 transition-all cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-site-menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-site-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="md:hidden mt-4 rounded-xl border dark:border-white/10 light:border-black/10 bg-background/90 backdrop-blur-md p-2"
            >
              <div className="grid gap-1">
                {links.map((link) => {
                  const isActive = activeSection === link.href;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => handleSectionClick(link.href)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-[12px] font-bold uppercase tracking-widest transition-colors ${
                        isActive
                          ? 'text-primary bg-primary/10 border border-primary/25'
                          : 'text-secondary hover:text-cyan-200 hover:bg-cyan-500/10 border border-transparent'
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                })}
                <a
                  href={profile.tripSiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-left px-3 py-2.5 rounded-lg text-[12px] font-bold uppercase tracking-widest text-primary border border-primary/25 bg-primary/10"
                >
                  Visit sTripKaka
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
