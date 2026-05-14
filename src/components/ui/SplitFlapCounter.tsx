import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface SplitFlapDigitProps {
  target: string;
  delay?: number;
}

function SplitFlapDigit({ target, delay = 0 }: SplitFlapDigitProps) {
  const [current, setCurrent] = useState('0');
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    // Non-digit characters (like '+', '%', spaces) lock immediately
    if (!/^\d$/.test(target)) {
      setCurrent(target);
      return;
    }

    let frame = 0;
    const total = parseInt(target, 10) + 8; // overshoot a bit for the flip feel
    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        frame++;
        if (frame >= total) {
          setCurrent(target);
          clearInterval(interval);
        } else {
          setCurrent(String(frame % 10));
        }
      }, 70);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [target, isInView, delay]);

  return (
    <span
      ref={ref}
      className="relative inline-block overflow-hidden rounded-md bg-on-surface/10 px-1.5 py-0.5 mx-[1px] font-mono align-baseline"
      style={{ minWidth: '0.7em', textAlign: 'center' }}
    >
      <motion.span
        key={current}
        initial={{ rotateX: -90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="inline-block"
        style={{ transformOrigin: 'center top' }}
      >
        {current}
      </motion.span>
    </span>
  );
}

interface SplitFlapCounterProps {
  value: string;
  className?: string;
}

/**
 * Airport-style split-flap counter. Each character flips through digits
 * until landing on the target. Non-digit characters render as static.
 */
export default function SplitFlapCounter({ value, className = '' }: SplitFlapCounterProps) {
  const chars = value.split('');

  return (
    <span className={className}>
      {chars.map((char, i) => (
        <SplitFlapDigit key={i} target={char} delay={i * 60} />
      ))}
    </span>
  );
}
