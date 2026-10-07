import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './PageTransition';

import Home from '../pages/Home';
import About from '../pages/About';
import Business from '../pages/Business';
import Projects from '../pages/Projects';
import ProjectDetails from '../pages/ProjectDetails';
import Leadership from '../pages/Leadership';
import Foundation from '../pages/Foundation';
import Media from '../pages/Media';
import Careers from '../pages/Careers';
import Contact from '../pages/Contact';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/business" element={<PageTransition><Business /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
        <Route path="/projects/:id" element={<PageTransition><ProjectDetails /></PageTransition>} />
        <Route path="/leadership" element={<PageTransition><Leadership /></PageTransition>} />
        <Route path="/foundation" element={<PageTransition><Foundation /></PageTransition>} />
        <Route path="/media" element={<PageTransition><Media /></PageTransition>} />
        <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
