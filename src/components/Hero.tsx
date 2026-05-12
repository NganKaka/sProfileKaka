import { motion } from 'framer-motion';
import { profile } from '../data/profile';
import Typewriter from './ui/Typewriter';
import ExternalLinkButton from './ui/ExternalLinkButton';
import FadeInImage from '../lib/FadeInImage';

export default function Hero() {
  return (
    <section id="hero" className="pt-12 md:pt-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
      <div className="space-y-7">
        <p className="font-tech text-[10px] uppercase tracking-[0.28em] text-secondary/60">Personal profile / Portfolio</p>

        <div className="space-y-4">
          <h1 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tight text-on-surface leading-tight">
            {profile.name}
          </h1>
          <p className="text-lg md:text-2xl font-display text-secondary/90">
            <Typewriter words={profile.tagline} />
          </p>
          <p className="text-secondary/80 max-w-xl leading-relaxed">{profile.summary}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a href="#projects" className="shimmer-sweep bg-primary text-background px-6 py-3 rounded-xl text-xs font-bold tracking-[0.14em] uppercase border border-primary/50 shadow-[0_0_24px_rgba(233,195,73,0.55)] hover:shadow-[0_0_32px_rgba(233,195,73,0.9)] transition-shadow">
            View Projects
          </a>
          <ExternalLinkButton
            href={profile.tripSiteUrl}
            label="Visit sTripKaka"
            className="px-6 py-3 rounded-xl text-xs font-bold tracking-[0.14em] uppercase border border-cyan-300/40 bg-cyan-950/20 text-cyan-100 hover:border-cyan-300/70 hover:bg-cyan-900/30 transition-all"
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative mx-auto w-full max-w-md"
      >
        <div className="glass-card rounded-3xl p-4 md:p-5 ambient-shadow">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <FadeInImage
              src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=1200&q=80"
              alt={profile.name}
              loading="eager"
              fetchPriority="high"
              className="w-full h-[390px] object-cover"
            />
          </div>
          <div className="pt-4 space-y-2">
            <p className="font-headline text-xl font-bold text-on-surface">{profile.title}</p>
            <p className="text-sm text-secondary/75">{profile.location}</p>
          </div>
        </div>
        <div className="absolute -z-10 -top-10 -left-10 w-40 h-40 bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute -z-10 -bottom-12 -right-10 w-44 h-44 bg-cyan-400/15 rounded-full blur-3xl" />
      </motion.div>
    </section>
  );
}
