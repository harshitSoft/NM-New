import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import ScrambleText from './ScrambleText';

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > 100) {
      setIsScrolled(true);
      if (latest > previous) {
        setHidden(true); // Scroll down
      } else {
        setHidden(false); // Scroll up
      }
    } else {
      setIsScrolled(false);
      setHidden(false);
    }
  });

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'BUSINESS', path: '/business' },
    { name: 'PROJECTS', path: '/projects' },
    { name: 'LEADERSHIP', path: '/leadership' },
    { name: 'MEDIA', path: '/media' },
    { name: 'CONTACT', path: '/contact' },
  ];

  const navbarClasses = `fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 rounded-full border border-brand-accent/20 flex items-center justify-between px-6 py-3 mt-6 w-[94%] max-w-[1100px] ${
    isScrolled ? 'bg-[rgba(243,239,231,0.8)] backdrop-blur-md shadow-lg py-2 mt-2' : 'bg-[rgba(243,239,231,0.8)] backdrop-blur-md mt-6'
  }`;

  const linkClasses = (path) => `uppercase font-mono text-[11px] tracking-wider font-semibold transition-colors relative group ${
    location.pathname === path ? 'text-brand-accent' : 'text-brand-text hover:text-brand-accent'
  }`;

  return (
    <motion.nav 
      className={navbarClasses}
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <div className="flex-1 flex items-center">
        <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center space-x-3">
          <span className="font-sans font-bold text-lg tracking-tight text-brand-text">NM GROUP</span>
        </Link>
      </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex flex-1 justify-center items-center space-x-8">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} onClick={() => window.scrollTo(0, 0)} className={linkClasses(link.path)}>
              <ScrambleText text={link.name} />
              <span className={`absolute -bottom-1 left-0 h-[1px] transition-all duration-300 ${location.pathname === link.path ? 'bg-brand-accent w-full' : 'bg-brand-accent w-0 group-hover:w-full'}`}></span>
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex flex-1 justify-end items-center">
          <Link
            to="/projects"
            onClick={() => window.scrollTo(0, 0)}
            className="bg-brand-accent text-brand-surface font-mono text-[11px] uppercase tracking-wider px-5 py-2.5 rounded-full font-bold hover:bg-brand-text transition-colors shadow-sm"
          >
            Explore
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden text-brand-text" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-0 left-0 w-full bg-brand-surface/95 backdrop-blur-xl shadow-xl py-24 flex flex-col items-center space-y-6 h-screen overflow-y-auto pb-32 z-40">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="uppercase tracking-wider font-mono text-sm font-semibold text-brand-text hover:text-brand-accent"
              onClick={() => {
                setMobileMenuOpen(false);
                window.scrollTo(0, 0);
              }}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/projects"
            className="bg-brand-accent text-brand-surface font-mono text-[11px] uppercase tracking-wider px-6 py-3 rounded-full font-bold hover:bg-brand-text mt-8"
            onClick={() => {
              setMobileMenuOpen(false);
              window.scrollTo(0, 0);
            }}
          >
            Explore Opportunities
          </Link>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
