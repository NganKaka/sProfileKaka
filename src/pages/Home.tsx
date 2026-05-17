import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';
import { SectionTransition } from '../components/PageTransition';
import SectionNavIndicator from '../components/SectionNavIndicator';
import ChapterLabel from '../components/ChapterLabel';
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
import MeshGradient from '../components/MeshGradient';
import LiquidDivider from '../components/LiquidDivider';
import ScrollSkew from '../components/ui/ScrollSkew';
import SiteFooter from '../components/SiteFooter';
import ScrollCompass from '../components/ScrollCompass';
import BackToTopButton from '../components/BackToTopButton';
import { useBackToTop } from '../hooks/useBackToTop';

function AppBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] dark:from-[#1a364a] dark:via-background dark:to-background light:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] light:from-[#e3f2fd] light:via-background light:to-background" />
      <div className="absolute inset-0 dark:bg-[linear-gradient(rgba(233,195,73,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(233,195,73,0.03)_1px,transparent_1px)] light:bg-[linear-gradient(rgba(184,134,11,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(184,134,11,0.08)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />

      <MeshGradient />
      <Constellations />
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
      <ChapterLabel />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-primary focus:text-background focus:rounded-lg focus:font-bold"
      >
        Skip to main content
      </a>

      <SiteNavbar />
      <main id="main-content" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20 space-y-24">
        <ErrorBoundary>
          <SectionTransition direction="up">
            <Hero onImageModalChange={setHeroImageModalOpen} />
          </SectionTransition>
        </ErrorBoundary>
        <ErrorBoundary>
          <SectionTransition delay={0.1} direction="left">
            <About />
          </SectionTransition>
        </ErrorBoundary>
      </main>

      {/* Marquee tech stack */}
      <ScrollSkew className="relative z-10 my-16" maxSkew={3} maxScale={1.03}>
        <Marquee
          showLogos
          items={[
            { label: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
            { label: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
            { label: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB' },
            { label: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
            { label: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED' },
            { label: 'Java', icon: 'https://cdn.simpleicons.org/openjdk/F58219' },
            { label: 'Vite', icon: 'https://cdn.simpleicons.org/vite/646CFF' },
            { label: 'Tailwind', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
            { label: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/5FA04E' },
            { label: 'Git', icon: 'https://cdn.simpleicons.org/git/F05032' },
          ]}
          speed={40}
          separator=""
        />
      </ScrollSkew>

      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-20 space-y-24">
        <ErrorBoundary>
          <SectionTransition delay={0.2} direction="right">
            <AcademicTimeline onImageModalChange={setAcademicImageModalOpen} />
          </SectionTransition>
        </ErrorBoundary>
        <ErrorBoundary>
          <SectionTransition delay={0.1} direction="left">
            <ExperienceTimeline />
          </SectionTransition>
        </ErrorBoundary>
        <ErrorBoundary>
          <SectionTransition delay={0.1} direction="up">
            <Skills />
          </SectionTransition>
        </ErrorBoundary>
      </main>

      {/* Values marquee — opposite direction, italic, plain text */}
      <ScrollSkew className="relative z-10 my-12" maxSkew={3} maxScale={1.03}>
        <Marquee
          items={['Curious', 'Crafted', 'Pragmatic', 'Reliable', 'Honest', 'Iterative', 'Direct', 'Thoughtful']}
          speed={50}
          direction="right"
          separator="—"
          variant="subtle"
        />
      </ScrollSkew>

      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-20 space-y-24">
        <ErrorBoundary>
          <SectionTransition delay={0.1} direction="right">
            <Projects />
          </SectionTransition>
        </ErrorBoundary>
        <ErrorBoundary>
          <LiquidDivider color="rgba(233, 195, 73, 0.35)" height={160} />
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
