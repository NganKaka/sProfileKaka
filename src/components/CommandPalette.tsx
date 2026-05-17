import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Hash, FileText, Mail, Github, Sun, Moon, Monitor, Download, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { loadBlog } from '../lib/contentLoader';
import { blogPostSchema } from '../schemas/content';
import { useTheme } from '../contexts/ThemeContext';
import { profile } from '../data/profile';
import { smoothScrollTo } from './SmoothScroll';

type Action = {
  id: string;
  label: string;
  hint?: string;
  group: 'Navigate' | 'Theme' | 'Reading' | 'Contact';
  icon: React.ComponentType<{ size?: number }>;
  keywords?: string[];
  run: () => void;
};

const sections: Array<{ id: string; label: string }> = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'academics', label: 'Academics' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills & Hobbies' },
  { id: 'projects', label: 'Projects' },
  { id: 'testimonials', label: 'Testimonials' },
];

function fuzzyScore(query: string, target: string): number {
  if (!query) return 1;
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  if (t.includes(q)) return 100 - t.indexOf(q);
  // simple subsequence match
  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti += 1) {
    if (t[ti] === q[qi]) qi += 1;
  }
  return qi === q.length ? 30 - (t.length - q.length) * 0.2 : 0;
}

export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const { setTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  const actions: Action[] = useMemo(() => {
    const base: Action[] = [
      ...sections.map((s) => ({
        id: `nav-${s.id}`,
        label: `Go to ${s.label}`,
        hint: `#${s.id}`,
        group: 'Navigate' as const,
        icon: Hash,
        keywords: [s.id, s.label],
        run: () => {
          onClose();
          if (window.location.pathname !== '/') {
            navigate(`/#${s.id}`);
          } else {
            const el = document.getElementById(s.id);
            if (el) smoothScrollTo(el, { offset: -100 });
          }
        },
      })),
      {
        id: 'nav-blog',
        label: 'Open Blog',
        group: 'Navigate',
        icon: FileText,
        keywords: ['blog', 'writing', 'posts'],
        run: () => {
          onClose();
          navigate('/blog');
        },
      },
      {
        id: 'theme-light',
        label: 'Theme: Light',
        group: 'Theme',
        icon: Sun,
        keywords: ['light', 'day', 'bright'],
        run: () => {
          setTheme('light');
          onClose();
        },
      },
      {
        id: 'theme-dark',
        label: 'Theme: Dark',
        group: 'Theme',
        icon: Moon,
        keywords: ['dark', 'night'],
        run: () => {
          setTheme('dark');
          onClose();
        },
      },
      {
        id: 'theme-system',
        label: 'Theme: System',
        group: 'Theme',
        icon: Monitor,
        keywords: ['system', 'auto'],
        run: () => {
          setTheme('system');
          onClose();
        },
      },
      {
        id: 'cv',
        label: 'Download CV',
        hint: 'PDF',
        group: 'Contact',
        icon: Download,
        keywords: ['cv', 'resume', 'pdf'],
        run: () => {
          window.open(profile.resumeUrl, '_blank');
          onClose();
        },
      },
      {
        id: 'email',
        label: `Email — ${profile.email}`,
        group: 'Contact',
        icon: Mail,
        keywords: ['email', 'contact', 'mail'],
        run: () => {
          window.location.href = `mailto:${profile.email}`;
          onClose();
        },
      },
      {
        id: 'github',
        label: 'Open GitHub',
        group: 'Contact',
        icon: Github,
        keywords: ['github', 'code', 'repository'],
        run: () => {
          window.open('https://github.com/NganKaka', '_blank');
          onClose();
        },
      },
      {
        id: 'trip',
        label: 'Visit sTripKaka',
        group: 'Contact',
        icon: Globe,
        keywords: ['stripkaka', 'travel'],
        run: () => {
          window.open(profile.tripSiteUrl, '_blank');
          onClose();
        },
      },
    ];

    const blogPosts = loadBlog(blogPostSchema).map((entry) => ({
      id: `post-${entry.data.slug}`,
      label: entry.data.title,
      hint: `${entry.data.readTime} min read`,
      group: 'Reading' as const,
      icon: FileText,
      keywords: [...entry.data.tags, entry.data.excerpt],
      run: () => {
        onClose();
        navigate(`/blog/${entry.data.slug}`);
      },
    }));

    return [...base, ...blogPosts];
  }, [navigate, onClose, setTheme]);

  const filtered = useMemo(() => {
    if (!query) return actions;
    return actions
      .map((action) => {
        const haystack = [action.label, action.hint ?? '', ...(action.keywords ?? [])].join(' ');
        return { action, score: fuzzyScore(query, haystack) };
      })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((entry) => entry.action);
  }, [actions, query]);

  const grouped = useMemo(() => {
    const groups: Record<string, Action[]> = {};
    for (const action of filtered) {
      (groups[action.group] ||= []).push(action);
    }
    return groups;
  }, [filtered]);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setActive(0);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        filtered[active]?.run();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, filtered, active, onClose]);

  // keep selection in range when filtering
  useEffect(() => {
    if (active >= filtered.length) setActive(Math.max(0, filtered.length - 1));
  }, [filtered.length, active]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[200] bg-background/70 backdrop-blur-md flex items-start justify-center pt-[14vh] px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl glass-card rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.55)] overflow-hidden"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <Search size={16} className="text-secondary/60" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to section, switch theme, find a post…"
                className="flex-1 bg-transparent text-sm text-on-surface placeholder:text-secondary/45 focus:outline-none"
              />
              <span className="font-tech text-[10px] uppercase tracking-[0.16em] text-secondary/55">esc</span>
            </div>

            <div className="max-h-[55vh] overflow-y-auto py-2">
              {filtered.length === 0 && (
                <p className="px-4 py-8 text-center text-sm text-secondary/60">No matches.</p>
              )}
              {Object.entries(grouped).map(([group, items]) => (
                <div key={group} className="px-2 pb-2">
                  <p className="px-3 pt-3 pb-1 font-tech text-[9px] uppercase tracking-[0.2em] text-secondary/45">
                    {group}
                  </p>
                  {items.map((item) => {
                    const globalIndex = filtered.indexOf(item);
                    const isActive = globalIndex === active;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onMouseEnter={() => setActive(globalIndex)}
                        onClick={item.run}
                        className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                          isActive
                            ? 'bg-cyan-400/10 border border-cyan-300/30'
                            : 'border border-transparent hover:bg-white/[0.04]'
                        }`}
                      >
                        <Icon size={14} />
                        <span className="flex-1 text-sm text-on-surface">{item.label}</span>
                        {item.hint && (
                          <span className="font-tech text-[10px] uppercase tracking-[0.14em] text-secondary/55">
                            {item.hint}
                          </span>
                        )}
                        {isActive && <ArrowRight size={12} className="text-cyan-300" />}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 px-4 py-2 flex items-center justify-between font-tech text-[10px] uppercase tracking-[0.16em] text-secondary/45">
              <span>↑ ↓ navigate · ↵ select</span>
              <span>{filtered.length} action{filtered.length === 1 ? '' : 's'}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
