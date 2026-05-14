import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollProgress from './components/ScrollProgress';
import Spotlight from './components/Spotlight';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import NotFound from './components/NotFound';

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollProgress />
        <Spotlight />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
