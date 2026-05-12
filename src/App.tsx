import { motion } from 'framer-motion';
import Constellations from './components/Constellations';
import SiteNavbar from './components/SiteNavbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import SiteFooter from './components/SiteFooter';

function AppBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#1a364a] via-background to-background" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(233,195,73,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(233,195,73,0.03)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />
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

export default function App() {
  return (
    <div className="min-h-screen relative text-on-surface selection:bg-primary/30 selection:text-primary overflow-hidden">
      <SiteNavbar />
      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20 space-y-24">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <div className="relative z-10">
        <SiteFooter />
      </div>
      <AppBackground />
    </div>
  );
}
