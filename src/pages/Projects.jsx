import { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlobalParticles from '../components/GlobalParticles';
import { projects } from '../data/projects';
import MagneticButton from '../components/MagneticButton';

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);
  const filters = ['All', 'Delivered', 'Ongoing', 'Upcoming'];

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return projects;
    return projects.filter(p => p.status.toLowerCase() === filter.toLowerCase());
  }, [filter]);

  const displayedProjects = filteredProjects.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <>
      <GlobalParticles />
      <Navbar />
      <main className="mb-[80vh] bg-brand-surface-alt relative z-10 shadow-2xl min-h-screen">
        
        {/* Marquee Hero */}
        <section className="pt-32 pb-24 lg:pt-48 lg:pb-32 bg-brand-surface text-brand-text overflow-hidden relative flex items-center justify-center min-h-[50vh]">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-surface via-transparent to-brand-surface z-10 pointer-events-none" />
          <motion.div 
            className="flex whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-16 px-8 items-center">
                {projects.slice(0, 6).map((p, idx) => (
                  <span key={idx} className="font-serif text-6xl md:text-8xl lg:text-[10rem] uppercase tracking-tighter text-transparent" style={{ WebkitTextStroke: '2px #2a4a9f' }}>
                    {p.name} <span className="text-brand-accent text-4xl align-middle mx-8">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-center">
            <span className="uppercase tracking-widest text-xs font-bold text-brand-accent block mb-2">PORTFOLIO</span>
            <p className="text-brand-text/70 font-light max-w-md mx-auto text-sm">A collection of landmarks designed for life, built for generations.</p>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="sticky top-0 z-[60] bg-brand-surface-alt/95 backdrop-blur-xl border-b border-gray-300 py-6 shadow-sm">
          <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 flex flex-wrap items-center justify-center gap-8">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => { setFilter(f); setVisibleCount(6); }}
                className={`uppercase tracking-widest text-xs font-bold relative pb-2 transition-colors ${
                  filter === f ? 'text-brand-text' : 'text-brand-text opacity-70 hover:text-brand-accent'
                }`}
              >
                {f}
                {filter === f && (
                  <motion.div 
                    layoutId="filter-underline"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-accent"
                  />
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Project Grid */}
        <section className="py-16 lg:py-24 px-4 md:px-8 lg:px-12 max-w-[1920px] mx-auto">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 items-start"
          >
            <AnimatePresence>
              {displayedProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>

          {visibleCount < filteredProjects.length && (
            <div className="flex justify-center mt-24">
              <MagneticButton>
                <button 
                  onClick={handleLoadMore}
                  className="bg-brand-surface text-brand-surface uppercase tracking-widest text-xs font-bold px-12 py-5 hover:bg-brand-accent hover:text-brand-text transition-colors"
                >
                  Load More Projects
                </button>
              </MagneticButton>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax offset for masonry depth feel
  const yOffset = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // Adjust margin based on index for masonry effect on desktop (reduced spacing)
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
  const marginTop = isDesktop ? (index % 3 === 1 ? 'mt-12' : index % 3 === 2 ? 'mt-24' : 'mt-0') : 'mt-0';

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(5px)' }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      className={`group cursor-pointer relative overflow-hidden ${marginTop}`}
      data-cursor-text="VIEW"
    >
      <Link to={`/projects/${project.id}`} className="block overflow-hidden relative">
        <motion.div style={{ y: yOffset }} className="h-[60vh] md:h-[50vh] w-full">
          <img 
            src={project.image || project.coverImage || (project.images && project.images[0]) || '/assets/images/01-hero-township-dusk.jpg'} 
            alt={project.name} 
            loading="lazy"
            className="w-full h-[120%] object-cover -top-[10%] relative transition-transform duration-1000 ease-out group-hover:scale-110 will-change-transform" 
          />
        </motion.div>
        
        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-brand-surface/0 group-hover:bg-brand-surface/40 transition-colors duration-500" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 w-full p-8 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-10 flex justify-between items-end">
          <div>
            <h3 className="font-serif text-3xl text-brand-text mb-2">{project.name}</h3>
            <div className="flex items-center gap-3">
              <span className="uppercase tracking-widest text-[10px] font-bold text-brand-accent">{project.category}</span>
              <span className="w-1 h-1 rounded-full bg-white/50"></span>
              <span className="uppercase tracking-widest text-[10px] font-bold text-white/80">{project.location}</span>
            </div>
          </div>
          
          <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center overflow-hidden shrink-0">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <path d="M5 12h14"></path>
               <path d="M12 5l7 7-7 7"></path>
             </svg>
          </div>
        </div>

        {/* Default status tag (hidden on hover) */}
        <div className="absolute top-4 left-4 z-10 group-hover:opacity-0 transition-opacity duration-300">
           <span className="uppercase tracking-widest text-[10px] font-bold bg-white/90 text-brand-text px-4 py-2 shadow-sm backdrop-blur-md">
             {project.status}
           </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default Projects;
