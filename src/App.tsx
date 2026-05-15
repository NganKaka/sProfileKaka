import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollProgress from './components/ScrollProgress';
import Spotlight from './components/Spotlight';
import SmoothScroll from './components/SmoothScroll';
import RouteTransition from './components/RouteTransition';
import CursorTrail from './components/CursorTrail';
import FilmGrain from './components/FilmGrain';
import ScrollVignette from './components/ScrollVignette';
import Home from './pages/Home';
import NotFound from './components/NotFound';

const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <RouteTransition>
      <Suspense fallback={null}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </RouteTransition>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <SmoothScroll />
        <ScrollProgress />
        <ScrollVignette />
        <FilmGrain />
        <Spotlight />
        <CursorTrail />
        <AnimatePresence mode="wait">
          <AnimatedRoutes />
        </AnimatePresence>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
