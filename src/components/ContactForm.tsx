import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, Mail, Send, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mqejzdze';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — real users can't see/fill this field. Bots usually do.
    if (data.get('company')) {
      setStatus('success');
      return;
    }

    setStatus('sending');
    setErrorMsg(null);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        const json = await res.json().catch(() => null);
        setErrorMsg(json?.error ?? 'Something went wrong. Please try email instead.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please try email instead.');
      setStatus('error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
      className="mt-5 rounded-[28px] border border-primary/20 bg-slate-950/45 p-6 md:p-8 shadow-[0_18px_45px_rgba(15,23,42,0.35)] backdrop-blur-md"
    >
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-3 py-4 text-center"
          >
            <CheckCircle2 size={36} className="text-primary" />
            <p className="font-headline text-lg font-bold text-on-surface">Message sent</p>
            <p className="text-sm text-secondary/80">
              I'll reply as soon as I can. For anything urgent, my email is{' '}
              <span className="text-cyan-200">vohoangngan85@gmail.com</span>.
            </p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="mt-2 font-tech text-[10px] uppercase tracking-[0.18em] text-secondary/60 hover:text-cyan-300 transition-colors"
            >
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-4 text-left"
            noValidate
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Name" name="name" required type="text" autoComplete="name" />
              <Field label="Email" name="email" required type="email" autoComplete="email" />
            </div>
            <Field label="Subject" name="subject" type="text" placeholder="What's this about?" />
            <div className="space-y-1.5">
              <label htmlFor="message" className="font-tech text-[10px] uppercase tracking-[0.18em] text-secondary/60">
                Message <span className="text-primary">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Tell me what you're working on…"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-on-surface placeholder:text-secondary/40 transition-all focus:border-cyan-300/50 focus:bg-cyan-400/[0.04] focus:outline-none resize-y"
              />
            </div>

            {/* Honeypot — keep visually hidden, but accessible to no one. */}
            <label className="hidden" aria-hidden>
              Company
              <input type="text" name="company" tabIndex={-1} autoComplete="off" />
            </label>

            {status === 'error' && errorMsg && (
              <div className="flex items-start gap-2 rounded-lg border border-red-400/30 bg-red-500/5 p-3 text-xs text-red-300">
                <AlertCircle size={14} className="mt-0.5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <p className="text-[10px] font-tech uppercase tracking-[0.18em] text-secondary/45">
                Replies typically within 24 hours
              </p>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-5 py-2.5 text-xs font-tech uppercase tracking-[0.18em] text-primary transition-all hover:bg-primary/25 hover:shadow-[0_0_18px_rgba(233,195,73,0.32)] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    Send
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type: 'text' | 'email';
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}

function Field({ label, name, type, required, placeholder, autoComplete }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="font-tech text-[10px] uppercase tracking-[0.18em] text-secondary/60">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-on-surface placeholder:text-secondary/40 transition-all focus:border-cyan-300/50 focus:bg-cyan-400/[0.04] focus:outline-none"
      />
    </div>
  );
}

export { Mail };
