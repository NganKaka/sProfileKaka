import { AnimatePresence, motion } from 'framer-motion';
import { Facebook, Github, Mail, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { profile } from '../data/profile';
import TerminalBoot from './ui/TerminalBoot';
import FadeInImage from '../lib/FadeInImage';

export default function Hero({ onImageModalChange }: { onImageModalChange?: (open: boolean) => void }) {
  const [showProfileImage, setShowProfileImage] = useState(false);

  useEffect(() => {
    onImageModalChange?.(showProfileImage);
  }, [showProfileImage, onImageModalChange]);

  useEffect(() => {
    if (!showProfileImage) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowProfileImage(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showProfileImage]);

  const profileImageSrc = profile.profileImage ?? profile.heroImage;
  const profileImageAlt = `Portrait of ${profile.name}`;


  return (
    <section id="hero" className="pt-12 md:pt-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
      <div className="space-y-7">
        <div className="space-y-2">
          <h1 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tight text-on-surface leading-tight">
            {profile.name}
          </h1>
          <p className="text-lg md:text-2xl font-headline font-bold text-primary/90">{profile.title}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            {profile.socials.map((social) => {
              const Icon = social.label === 'GitHub' ? Github : social.label === 'Facebook' ? Facebook : Mail;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={social.label}
                  className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-secondary/70 transition-all hover:scale-110 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-300"
                >
                  <Icon size={16} className="transition-all group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
                </a>
              );
            })}
          </div>
        </div>

        <TerminalBoot />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {profile.stats.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left transition-all hover:border-cyan-300/35 hover:bg-cyan-400/10 hover:shadow-[0_0_18px_rgba(34,211,238,0.22)]"
            >
              <p className="text-[10px] uppercase tracking-[0.14em] text-secondary/60 font-tech">{stat.label}</p>
              <p className="mt-1 font-headline text-lg font-bold text-on-surface">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <a href="#projects" className="shimmer-sweep bg-primary text-background px-6 py-3 rounded-xl text-xs font-bold tracking-[0.14em] uppercase border border-primary/50 shadow-[0_0_24px_rgba(233,195,73,0.55)] hover:shadow-[0_0_32px_rgba(233,195,73,0.9)] transition-shadow">
            View Projects
          </a>
        </div>

      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [0, -16, 0] }}
        transition={{ opacity: { duration: 0.6, ease: 'easeOut' }, y: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
        className="relative mx-auto w-full max-w-md"
      >
        <div className="glass-card rounded-3xl p-4 md:p-5 ambient-shadow">
          <button
            type="button"
            onClick={() => setShowProfileImage(true)}
            className="group block w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left"
            aria-label="Open profile photo"
          >
            <FadeInImage
              src={profileImageSrc}
              alt={profileImageAlt}
              loading="eager"
              fetchPriority="high"
              className="h-[390px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          </button>
          <div className="pt-4 space-y-2">
            <p className="font-headline text-xl font-bold text-on-surface">{profile.title}</p>
            <p className="text-sm text-secondary/75">{profile.location}</p>
          </div>
        </div>
        <div className="absolute -z-10 -top-10 -left-10 w-40 h-40 bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute -z-10 -bottom-12 -right-10 w-44 h-44 bg-cyan-400/15 rounded-full blur-3xl" />
      </motion.div>

      <AnimatePresence>
        {showProfileImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-background/92 backdrop-blur-md"
            onClick={() => setShowProfileImage(false)}
          >
            <div className="absolute inset-0 flex items-center justify-center p-4 md:p-10">
              <motion.button
                type="button"
                whileTap={{ scale: 0.96 }}
                onClick={(event) => {
                  event.stopPropagation();
                  setShowProfileImage(false);
                }}
                className="absolute top-6 right-6 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-secondary/80 hover:text-white hover:border-cyan-300/40 transition-all"
                aria-label="Close image"
              >
                <X size={18} />
              </motion.button>

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                onClick={(event) => event.stopPropagation()}
                className="max-w-5xl w-full"
              >
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_0_40px_rgba(0,0,0,0.45)]">
                  <img src={profileImageSrc} alt={profileImageAlt} className="w-full max-h-[82vh] object-contain bg-black/20" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
