import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { profile } from '../data/profile';
import ThemeToggle from './ThemeToggle';
import GlitchText from './ui/GlitchText';
import LiveClock from './LiveClock';
import { smoothScrollTo } from './SmoothScroll';
import { useActiveSection, type SectionId } from '../contexts/ActiveSectionContext';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Academics', href: '#academics' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills&Hobbies', href: '#skills' },
  { label: 'Projects', href: '#projects' },
];

export default function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const { activeId, lockTo } = useActiveSection();
  const activeSection = activeId ? `#${activeId}` : '';
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Generate href - prepend "/" if not on home page
  const getNavHref = (hash: string) => {
    return isHomePage ? hash : `/${hash}`;
  };

  const handleSectionClick = (target: string, event?: { preventDefault: () => void }) => {
    setOpen(false);

    if (!isHomePage) return;
    if (!event) return;

    event.preventDefault();
    const id = (target.startsWith('#') ? target.slice(1) : target) as SectionId;
    const el = document.getElementById(id);
    if (!el) return;

    lockTo(id);
    smoothScrollTo(el, { offset: -100 });
  };

  const handleLogoClick = (event: { preventDefault: () => void }) => {
    setOpen(false);
    if (!isHomePage) return;

    event.preventDefault();
    smoothScrollTo(0);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/60 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              onClick={handleLogoClick}
              className="text-xl font-black text-primary tracking-tighter cursor-pointer"
            >
              sProfileKaka
            </Link>
            <LiveClock />
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
              }}
              aria-label="Open command palette"
              className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-tech text-[10px] uppercase tracking-[0.16em] text-secondary/55 hover:border-cyan-300/40 hover:text-cyan-200 transition-colors"
            >
              <span>Press</span>
              <kbd className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] text-cyan-200">⌘K</kbd>
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => {
              const isActive = isHomePage && activeSection === link.href;
              return (
                <motion.a
                  key={link.href}
                  href={getNavHref(link.href)}
                  whileTap={{ scale: 0.96 }}
                  onClick={(e) => isHomePage && handleSectionClick(link.href, e)}
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
                  <span className="relative z-10">
                    <GlitchText>{link.label}</GlitchText>
                  </span>
                </motion.a>
              );
            })}
            <Link
              to="/blog"
              className="font-headline tracking-tighter uppercase text-[12px] font-bold transition-all duration-300 px-2 py-1 rounded-md text-secondary/60 hover:text-cyan-300 hover:bg-cyan-400/10 cursor-pointer"
            >
              <GlitchText>Blog</GlitchText>
            </Link>
            <ThemeToggle />
          </div>

          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex md:hidden h-10 w-10 items-center justify-center rounded-full text-secondary hover:text-primary hover:bg-primary/10 border border-white/10 hover:border-primary/30 transition-all cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-site-menu"
          >
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </motion.div>
          </motion.button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-site-menu"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden mt-4 rounded-xl border dark:border-white/10 light:border-black/[0.15] bg-background/90 backdrop-blur-md p-2 shadow-xl"
            >
              <motion.div
                className="grid gap-1"
                initial="closed"
                animate="open"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.04, delayChildren: 0.05 },
                  },
                  closed: {},
                }}
              >
                {links.map((link) => {
                  const isActive = isHomePage && activeSection === link.href;
                  return (
                    <motion.a
                      key={link.href}
                      href={getNavHref(link.href)}
                      onClick={(e) => isHomePage && handleSectionClick(link.href, e)}
                      aria-current={isActive ? 'page' : undefined}
                      variants={{
                        open: { opacity: 1, x: 0 },
                        closed: { opacity: 0, x: -10 },
                      }}
                      transition={{ duration: 0.2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-[12px] font-bold uppercase tracking-widest transition-colors ${
                        isActive
                          ? 'text-primary bg-primary/10 border border-primary/25'
                          : 'text-secondary hover:text-cyan-200 hover:bg-cyan-500/10 border border-transparent'
                      }`}
                    >
                      {link.label}
                    </motion.a>
                  );
                })}
                <Link
                  to="/blog"
                  onClick={() => setOpen(false)}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-[12px] font-bold uppercase tracking-widest text-secondary hover:text-cyan-200 hover:bg-cyan-500/10 border border-transparent transition-colors"
                >
                  Blog
                </Link>
                <a
                  href={profile.tripSiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-left px-3 py-2.5 rounded-lg text-[12px] font-bold uppercase tracking-widest text-primary border border-primary/25 bg-primary/10"
                >
                  Visit sTripKaka
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
