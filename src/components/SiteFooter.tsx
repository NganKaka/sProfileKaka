import { profile } from '../data/profile';

export default function SiteFooter() {
  return (
    <footer className="w-full border-t border-white/10 bg-background/50 py-10 mt-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm text-secondary/70">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href={profile.tripSiteUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Visit sTripKaka</a>
          <a href={`mailto:${profile.email}`} className="hover:text-cyan-200 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
