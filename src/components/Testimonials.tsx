import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useContentList } from '../hooks/useContent';
import { testimonialSchema, type Testimonial } from '../schemas/content';
import SectionHeading from './ui/SectionHeading';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const { items: testimonials, loading, error } = useContentList<Testimonial>(
    [
      '/content/testimonials/01-sarah-chen.md',
      '/content/testimonials/02-michael-tran.md',
      '/content/testimonials/03-linh-nguyen.md',
    ],
    testimonialSchema
  );

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const navigate = (newDirection: 1 | -1) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const next = prev + newDirection;
      if (next < 0) return testimonials.length - 1;
      if (next >= testimonials.length) return 0;
      return next;
    });
  };

  if (loading) {
    return (
      <section id="testimonials" className="space-y-7 scroll-mt-28">
        <SectionHeading
          eyebrow="Testimonials"
          title="What people say"
          subtitle="Words from teammates and collaborators."
        />
        <div className="glass-card rounded-2xl p-12 min-h-[300px] animate-pulse" />
      </section>
    );
  }

  if (error || testimonials.length === 0) return null;

  const current = testimonials[currentIndex].data;

  return (
    <section id="testimonials" className="space-y-7 scroll-mt-28">
      <SectionHeading
        eyebrow="Testimonials"
        title="What people say"
        subtitle="Words from teammates and collaborators I've had the pleasure to work with."
      />

      <div className="relative">
        <div className="glass-card rounded-3xl p-8 md:p-10 relative overflow-hidden">
          <Quote
            className="absolute top-6 right-6 text-primary/15"
            size={80}
            strokeWidth={1}
          />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="space-y-6 relative z-10"
            >
              {current.rating && (
                <div className="flex gap-1">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-primary text-primary" />
                  ))}
                </div>
              )}

              <blockquote className="text-lg md:text-xl leading-relaxed text-on-surface font-light">
                "{current.quote}"
              </blockquote>

              <div className="flex items-center gap-4 pt-4">
                {current.avatar && (
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="h-12 w-12 rounded-full border-2 border-primary/30 object-cover"
                  />
                )}
                <div>
                  <p className="font-headline font-bold text-on-surface">{current.name}</p>
                  <p className="text-sm text-secondary/70 font-tech tracking-wide">
                    {current.role} · {current.company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {testimonials.length > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1);
                    setCurrentIndex(i);
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    i === currentIndex
                      ? 'w-8 bg-primary'
                      : 'w-1.5 bg-secondary/30 hover:bg-secondary/50'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => navigate(-1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-secondary/70 transition-all hover:border-cyan-300/40 hover:bg-cyan-400/10 hover:text-cyan-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => navigate(1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-secondary/70 transition-all hover:border-cyan-300/40 hover:bg-cyan-400/10 hover:text-cyan-300"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
