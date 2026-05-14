import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollProgress from './components/ScrollProgress';
import Spotlight from './components/Spotlight';
import SmoothScroll from './components/SmoothScroll';
import RouteTransition from './components/RouteTransition';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import NotFound from './components/NotFound';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <RouteTransition>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </RouteTransition>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <SmoothScroll />
        <ScrollProgress />
        <Spotlight />
        <AnimatePresence mode="wait">
          <AnimatedRoutes />
        </AnimatePresence>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
