import { motion } from 'framer-motion';

/**
 * Closing chapter banner that sits above the existing footer content.
 * Mirrors the section heading aesthetic used elsewhere on the page so the
 * footer reads as a deliberate ending rather than boilerplate.
 */
export default function FooterChapterBanner() {
  return (
    <div className="w-full mb-8 md:mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-4"
      >
        <div className="flex items-center gap-3 font-tech text-[10px] uppercase tracking-[0.32em]">
          <span className="block h-px w-12 bg-gradient-to-r from-transparent to-primary/60" />
          <span className="text-primary/85 tabular-nums">07</span>
          <span className="text-secondary/40">/</span>
          <span className="text-cyan-200/85">END</span>
          <span className="block h-px w-12 bg-gradient-to-l from-transparent to-cyan-300/50" />
        </div>

        <h3 className="font-headline text-2xl md:text-4xl font-extrabold tracking-tight text-on-surface text-center">
          <span className="italic font-light text-secondary/85">Built with care, in</span>{' '}
          <span className="text-primary">HCMC</span>
          <span className="text-secondary/85">.</span>
        </h3>

        <p className="font-tech text-[10px] uppercase tracking-[0.22em] text-secondary/45 max-w-md text-center">
          Press <kbd className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] text-cyan-200">⌘K</kbd> any time to jump anywhere
        </p>
      </motion.div>
    </div>
  );
}
