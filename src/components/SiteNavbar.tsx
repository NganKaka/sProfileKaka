import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ExternalLinkButton from './ui/ExternalLinkButton';
import { profile } from '../data/profile';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function SiteNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/60 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5">
        <div className="flex items-center justify-between gap-4">
          <a href="#" className="font-headline text-xl font-black tracking-tighter text-primary">sProfileKaka</a>

          <div className="hidden md:flex items-center gap-7">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="font-headline text-[11px] uppercase tracking-[0.16em] text-secondary/70 hover:text-cyan-300 transition-colors">
                {link.label}
              </a>
            ))}
            <ExternalLinkButton
              href={profile.tripSiteUrl}
              label="Visit sTripKaka"
              className="shimmer-sweep bg-primary text-background px-4 py-2 rounded-lg text-[11px] font-bold tracking-wide shadow-[0_0_18px_rgba(233,195,73,0.45)] border border-primary/50"
            />
          </div>

          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => setOpen((prev) => !prev)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full text-secondary hover:text-primary hover:bg-primary/10 transition-all"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>

        {open && (
          <div className="md:hidden pt-4 pb-2 space-y-2">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="block rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs uppercase tracking-[0.12em] text-secondary/80 hover:text-primary hover:border-primary/35 transition-all">
                {link.label}
              </a>
            ))}
            <ExternalLinkButton
              href={profile.tripSiteUrl}
              label="Visit sTripKaka"
              className="block text-center rounded-lg border border-primary/45 bg-primary text-background px-3 py-2 text-xs uppercase tracking-[0.12em] font-bold"
            />
          </div>
        )}
      </div>
    </nav>
  );
}
