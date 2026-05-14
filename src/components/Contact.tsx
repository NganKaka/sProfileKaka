import { motion } from ‘framer-motion’;
import { Mail, Send, CheckCircle2, AlertCircle, Github, Facebook } from ‘lucide-react’;
import { useForm } from ‘react-hook-form’;
import { zodResolver } from ‘@hookform/resolvers/zod’;
import { z } from ‘zod’;
import { useState } from ‘react’;
import SectionHeading from ‘./ui/SectionHeading’;
import { profile } from ‘../data/profile’;
import { trackContactFormSubmit } from ‘../lib/analytics’;
import { useToast } from ‘../contexts/ToastContext’;

const contactSchema = z.object({
  name: z.string().min(2, ‘Name must be at least 2 characters’),
  email: z.string().email(‘Invalid email address’),
  subject: z.string().min(5, ‘Subject must be at least 5 characters’),
  message: z.string().min(20, ‘Message must be at least 20 characters’),
});

type ContactFormData = z.infer<typeof contactSchema>;

const iconMap = {
  GitHub: Github,
  Facebook: Facebook,
  Email: Mail,
} as const;

export default function Contact() {
  const [submitStatus, setSubmitStatus] = useState<’idle’ | ‘loading’ | ‘success’ | ‘error’>(‘idle’);
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus(‘loading’);

    try {
      // TODO: Replace with your Formspree form ID
      // Sign up at https://formspree.io and create a form
      const response = await fetch(‘https://formspree.io/f/YOUR_FORM_ID’, {
        method: ‘POST’,
        headers: { ‘Content-Type’: ‘application/json’ },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus(‘success’);
        trackContactFormSubmit(true);
        showToast(‘Message sent successfully! I\’ll get back to you soon.’, ‘success’);
        reset();
        setTimeout(() => setSubmitStatus(‘idle’), 5000);
      } else {
        setSubmitStatus(‘error’);
        trackContactFormSubmit(false);
        showToast(‘Failed to send message. Please try again.’, ‘error’);
      }
    } catch (error) {
      setSubmitStatus(‘error’);
      trackContactFormSubmit(false);
      showToast(‘Failed to send message. Please try again.’, ‘error’);
    }
  };

  return (
    <section id="contact" className="space-y-8 scroll-mt-28">
      <SectionHeading
        eyebrow="Get in Touch"
        title="Let’s work together"
        subtitle="Have a project in mind or want to collaborate? Drop me a message and I’ll get back to you soon."
      />

      <div className="grid md:grid-cols-[1fr_1.2fr] gap-8">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-6 md:p-8 space-y-6"
        >
          <div>
            <h3 className="font-headline text-2xl font-bold text-on-surface mb-4">Contact Information</h3>
            <div className="space-y-4">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-secondary/85 hover:text-primary transition-colors group"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 group-hover:border-primary/40 group-hover:bg-primary/10 transition-all">
                  <Mail size={18} />
                </div>
                <span>{profile.email}</span>
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm font-tech uppercase tracking-wider text-secondary/70 mb-3">Connect with me</p>
            <div className="flex flex-wrap gap-3">
              {profile.socials.map((social) => {
                const Icon = iconMap[social.label as keyof typeof iconMap] || Mail;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith(‘http’) ? ‘_blank’ : undefined}
                    rel={social.href.startsWith(‘http’) ? ‘noopener noreferrer’ : undefined}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-secondary/70 hover:border-cyan-300/45 hover:bg-cyan-400/10 hover:text-cyan-200 transition-all"
                    aria-label={social.label}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border border-primary/20 bg-primary/8 p-4">
            <p className="text-sm text-secondary/85 leading-relaxed">
              I’m currently open to frontend opportunities and UI-focused collaborations.
              Let’s create something amazing together!
            </p>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-6 md:p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-tech uppercase tracking-wider text-secondary/70 mb-2">
                Name
              </label>
              <input
                {...register(‘name’)}
                type="text"
                id="name"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-on-surface placeholder:text-secondary/40 focus:border-primary/40 focus:bg-white/8 focus:outline-none transition-all"
                placeholder="Your name"
              />
              {errors.name && (
                <p className="mt-2 text-xs text-red-400">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-tech uppercase tracking-wider text-secondary/70 mb-2">
                Email
              </label>
              <input
                {...register(‘email’)}
                type="email"
                id="email"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-on-surface placeholder:text-secondary/40 focus:border-primary/40 focus:bg-white/8 focus:outline-none transition-all"
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="mt-2 text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-tech uppercase tracking-wider text-secondary/70 mb-2">
                Subject
              </label>
              <input
                {...register(‘subject’)}
                type="text"
                id="subject"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-on-surface placeholder:text-secondary/40 focus:border-primary/40 focus:bg-white/8 focus:outline-none transition-all"
                placeholder="What’s this about?"
              />
              {errors.subject && (
                <p className="mt-2 text-xs text-red-400">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-tech uppercase tracking-wider text-secondary/70 mb-2">
                Message
              </label>
              <textarea
                {...register(‘message’)}
                id="message"
                rows={5}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-on-surface placeholder:text-secondary/40 focus:border-primary/40 focus:bg-white/8 focus:outline-none transition-all resize-none"
                placeholder="Tell me about your project or idea..."
              />
              {errors.message && (
                <p className="mt-2 text-xs text-red-400">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitStatus === ‘loading’}
              className="shimmer-sweep w-full bg-primary text-background px-6 py-3 rounded-xl text-xs font-bold tracking-wider uppercase border border-primary/50 shadow-[0_0_24px_rgba(233,195,73,0.55)] hover:shadow-[0_0_32px_rgba(233,195,73,0.9)] transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitStatus === ‘loading’ ? (
                <>
                  <div className="h-4 w-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
            </button>

            {submitStatus === ‘success’ && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400"
              >
                <CheckCircle2 size={18} />
                Message sent successfully! I’ll get back to you soon.
              </motion.div>
            )}

            {submitStatus === ‘error’ && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
              >
                <AlertCircle size={18} />
                Failed to send message. Please try again or email me directly.
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
