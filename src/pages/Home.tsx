import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';
import { SectionTransition } from '../components/PageTransition';
import SectionNavIndicator from '../components/SectionNavIndicator';
import Constellations from '../components/Constellations';
import SiteNavbar from '../components/SiteNavbar';
import Hero from '../components/Hero';
import About from '../components/About';
import AcademicTimeline from '../components/AcademicTimeline';
import ExperienceTimeline from '../components/ExperienceTimeline';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Testimonials from '../components/Testimonials';
import Marquee from '../components/Marquee';
import SiteFooter from '../components/SiteFooter';
import ScrollCompass from '../components/ScrollCompass';
import BackToTopButton from '../components/BackToTopButton';
import { useBackToTop } from '../hooks/useBackToTop';

function AppBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] dark:from-[#1a364a] dark:via-background dark:to-background light:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] light:from-[#e3f2fd] light:via-background light:to-background" />
      <div className="absolute inset-0 dark:bg-[linear-gradient(rgba(233,195,73,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(233,195,73,0.03)_1px,transparent_1px)] light:bg-[linear-gradient(rgba(184,134,11,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(184,134,11,0.08)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />

      <Constellations />

      <motion.div
        animate={{ y: [0, -30, 0], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]"
      />
      <motion.div
        animate={{ y: [0, 40, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]"
      />
    </div>
  );
}

export default function Home() {
  const showBackToTop = useBackToTop();
  const [heroImageModalOpen, setHeroImageModalOpen] = useState(false);
  const [academicImageModalOpen, setAcademicImageModalOpen] = useState(false);
  const imageModalOpen = heroImageModalOpen || academicImageModalOpen;
  const location = useLocation();

  // Scroll to section when navigating from another page with hash
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen relative text-on-surface selection:bg-primary/30 selection:text-primary overflow-hidden">
      <SectionNavIndicator />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-primary focus:text-background focus:rounded-lg focus:font-bold"
      >
        Skip to main content
      </a>

      <SiteNavbar />
      <main id="main-content" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20 space-y-24">
        <ErrorBoundary>
          <SectionTransition>
            <Hero onImageModalChange={setHeroImageModalOpen} />
          </SectionTransition>
        </ErrorBoundary>
        <ErrorBoundary>
          <SectionTransition delay={0.1}>
            <About />
          </SectionTransition>
        </ErrorBoundary>
      </main>

      {/* Marquee tech stack */}
      <div className="relative z-10 my-16">
        <Marquee
          showLogos
          items={[
            { label: 'React', icon: 'https://skillicons.dev/icons?i=react' },
            { label: 'TypeScript', icon: 'https://skillicons.dev/icons?i=ts' },
            { label: 'Python', icon: 'https://skillicons.dev/icons?i=python' },
            { label: 'PostgreSQL', icon: 'https://skillicons.dev/icons?i=postgres' },
            { label: 'Docker', icon: 'https://skillicons.dev/icons?i=docker' },
            { label: 'Java', icon: 'https://skillicons.dev/icons?i=java' },
            { label: 'Vite', icon: 'https://skillicons.dev/icons?i=vite' },
            { label: 'Tailwind', icon: 'https://skillicons.dev/icons?i=tailwind' },
            { label: 'Node.js', icon: 'https://skillicons.dev/icons?i=nodejs' },
            { label: 'Git', icon: 'https://skillicons.dev/icons?i=git' },
          ]}
          speed={40}
          separator=""
        />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-20 space-y-24">
        <ErrorBoundary>
          <SectionTransition delay={0.2}>
            <AcademicTimeline onImageModalChange={setAcademicImageModalOpen} />
          </SectionTransition>
        </ErrorBoundary>
        <ErrorBoundary>
          <SectionTransition delay={0.1}>
            <ExperienceTimeline />
          </SectionTransition>
        </ErrorBoundary>
        <ErrorBoundary>
          <SectionTransition delay={0.1}>
            <Skills />
          </SectionTransition>
        </ErrorBoundary>
        <ErrorBoundary>
          <SectionTransition delay={0.1}>
            <Projects />
          </SectionTransition>
        </ErrorBoundary>
        <ErrorBoundary>
          <SectionTransition delay={0.1}>
            <Testimonials />
          </SectionTransition>
        </ErrorBoundary>
      </main>
      <div className="relative z-10">
        <SiteFooter />
      </div>
      {!imageModalOpen && <ScrollCompass />}
      <BackToTopButton visible={showBackToTop && !imageModalOpen} />
      <AppBackground />
    </div>
  );
}
