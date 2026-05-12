import { Mail, Github, Facebook } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import { profile } from '../data/profile';

const iconMap = {
  GitHub: Github,
  Facebook: Facebook,
  Email: Mail,
} as const;

export default function Contact() {
  return (
    <section id="contact" className="space-y-6">
      <SectionHeading
        eyebrow="Contact"
        title="Let’s build something memorable"
        subtitle="I’m open to collaboration on product UI, frontend systems, and creative web experiences."
      />

      <div className="glass-card rounded-2xl p-6 md:p-8 space-y-5">
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-secondary/90 hover:border-cyan-300/45 hover:text-cyan-200 transition-all"
        >
          <Mail size={16} />
          {profile.email}
        </a>

        <div className="flex flex-wrap gap-3">
          {profile.socials.map((social) => {
            const Icon = iconMap[social.label as keyof typeof iconMap] || Mail;
            return (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-secondary/70 hover:border-cyan-300/45 hover:text-cyan-200 transition-all"
                aria-label={social.label}
              >
                <Icon size={16} />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
