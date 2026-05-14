import { motion } from 'framer-motion';
import { useState } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import PageTransition, { SectionTransition } from './components/PageTransition';
import ScrollProgress from './components/ScrollProgress';
import SectionNavIndicator from './components/SectionNavIndicator';
import Constellations from './components/Constellations';
import SiteNavbar from './components/SiteNavbar';
import Hero from './components/Hero';
import About from './components/About';
import AcademicTimeline from './components/AcademicTimeline';
import ExperienceTimeline from './components/ExperienceTimeline';
import Skills from './components/Skills';
import Projects from './components/Projects';
import SiteFooter from './components/SiteFooter';
import ScrollCompass from './components/ScrollCompass';
import BackToTopButton from './components/BackToTopButton';
import { useBackToTop } from './hooks/useBackToTop';

function AppBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Radial gradient - theme aware */}
      <div className="absolute inset-0 dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] dark:from-[#1a364a] dark:via-background dark:to-background light:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] light:from-[#e3f2fd] light:via-background light:to-background" />

      {/* Grid pattern - theme aware */}
      <div className="absolute inset-0 dark:bg-[linear-gradient(rgba(233,195,73,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(233,195,73,0.03)_1px,transparent_1px)] light:bg-[linear-gradient(rgba(184,134,11,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(184,134,11,0.08)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />

      <Constellations />

      {/* Ambient blobs */}
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

export default function App() {
  const showBackToTop = useBackToTop();
  const [heroImageModalOpen, setHeroImageModalOpen] = useState(false);
  const [academicImageModalOpen, setAcademicImageModalOpen] = useState(false);
  const imageModalOpen = heroImageModalOpen || academicImageModalOpen;

  return (
    <ErrorBoundary>
      <PageTransition>
        <div className="min-h-screen relative text-on-surface selection:bg-primary/30 selection:text-primary overflow-hidden">
          <ScrollProgress />
          <SectionNavIndicator />

          {/* Skip Navigation */}
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
          </main>
          <div className="relative z-10">
            <SiteFooter />
          </div>
          {!imageModalOpen && <ScrollCompass />}
          <BackToTopButton visible={showBackToTop && !imageModalOpen} />
          <AppBackground />
        </div>
      </PageTransition>
    </ErrorBoundary>
  );
}
