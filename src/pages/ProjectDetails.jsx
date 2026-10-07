import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import { projects } from '../data/projects';

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projects.find(p => p.id === id) || projects[0];

  const heroRef = useRef(null);
  const galleryRef = useRef(null);
  
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.2]); // Ken Burns

  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const images = project.images || [project.image || project.coverImage, '/assets/images/15-lifestyle-family-walk.jpg', '/assets/images/03-about-masterplan-aerial.jpg'];

  useEffect(() => {
    const handleScroll = () => {
      if (!galleryRef.current) return;
      const texts = galleryRef.current.querySelectorAll('.gallery-text');
      texts.forEach((text, i) => {
        const rect = text.getBoundingClientRect();
        if (rect.top > window.innerHeight * 0.2 && rect.top < window.innerHeight * 0.6) {
          setActiveGalleryIndex(i);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const amenities = [
    { title: "Grand Clubhouse", desc: "A 20,000 sq ft luxury clubhouse featuring an infinity pool, state-of-the-art gymnasium, and private screening room." },
    { title: "Landscaped Gardens", desc: "Acres of manicured greenery with walking trails, meditation pavilions, and dedicated children's play areas." },
    { title: "Concierge Services", desc: "24/7 dedicated concierge to assist with reservations, housekeeping, and event planning." },
    { title: "Smart Home Integration", desc: "Pre-wired for advanced home automation, climate control, and intelligent lighting systems." }
  ];

  return (
    <>
      <Navbar />
      <main className="mb-[80vh] bg-brand-surface-alt relative z-10 shadow-2xl min-h-screen">
        
        {/* Hero Section */}
        <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-surface">
          <motion.div style={{ scale: heroScale }} className="absolute inset-0 w-full h-full origin-center">
             <img src={images[0]} alt={project.name} className="w-full h-full object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-brand-surface/50" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 w-full flex flex-col items-center justify-center">
            <div className="flex overflow-hidden">
              <motion.h1 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                className="font-serif text-6xl md:text-8xl lg:text-9xl text-brand-text pr-4"
              >
                {project.name.split(' ')[0]}
              </motion.h1>
              <motion.h1 
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                className="font-serif text-6xl md:text-8xl lg:text-9xl text-brand-accent italic"
              >
                {project.name.split(' ').slice(1).join(' ')}
              </motion.h1>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="mt-8 flex gap-6 text-[10px] uppercase tracking-widest font-bold text-white/80"
            >
              <span>{project.category}</span>
              <span>·</span>
              <span>{project.location}</span>
              <span>·</span>
              <span>{project.status}</span>
            </motion.div>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-brand-text flex flex-col items-center"
          >
             <span className="text-[10px] uppercase tracking-widest font-bold mb-4">Scroll to Explore</span>
             <div className="w-[1px] h-12 bg-gradient-to-b from-brand-base to-transparent"></div>
          </motion.div>
        </section>

        {/* Project Overview */}
        <section className="py-24 lg:py-32 bg-brand-base">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col lg:flex-row gap-16 lg:gap-32">
            <div className="w-full lg:w-1/3">
               <h2 className="text-[10px] uppercase tracking-widest font-bold text-brand-accent mb-6 border-b border-gray-200 pb-4">The Vision</h2>
               <div className="space-y-6 text-brand-text text-sm font-semibold">
                 <div className="flex justify-between border-b border-gray-100 pb-4">
                   <span className="text-brand-text opacity-70">Typology</span>
                   <span>{project.category}</span>
                 </div>
                 <div className="flex justify-between border-b border-gray-100 pb-4">
                   <span className="text-brand-text opacity-70">Location</span>
                   <span>{project.location}</span>
                 </div>
                 <div className="flex justify-between border-b border-gray-100 pb-4">
                   <span className="text-brand-text opacity-70">Scale</span>
                   <span>25+ Acres</span>
                 </div>
                 <div className="flex justify-between border-b border-gray-100 pb-4">
                   <span className="text-brand-text opacity-70">Status</span>
                   <span>{project.status}</span>
                 </div>
               </div>
            </div>
            <div className="w-full lg:w-2/3">
              <h3 className="font-serif text-3xl md:text-5xl text-brand-text leading-tight mb-8">
                A masterpiece of planning, designed for those who appreciate the poetry of space.
              </h3>
              <p className="text-brand-muted-light font-light text-lg leading-relaxed max-w-2xl">
                {project.name} represents the pinnacle of our architectural philosophy. By marrying classical proportions with contemporary amenities, we have created an environment that feels both profoundly historic and effortlessly modern. Every detail, from the grand entrance to the private gardens, has been curated to deliver an unmatched living experience.
              </p>
            </div>
          </div>
        </section>

        {/* Sticky Image Gallery */}
        <section ref={galleryRef} className="bg-brand-surface flex flex-col md:flex-row relative">
          <div className="w-full md:w-1/2 h-[50vh] md:h-screen md:sticky top-0 overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeGalleryIndex}
                src={images[activeGalleryIndex % images.length]}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-brand-surface/20"></div>
          </div>
          
          <div className="w-full md:w-1/2 py-24 md:py-48 px-8 md:px-16 lg:px-24">
            {[
              { t: "The Architecture", d: "Inspired by European estates, the facades feature intricate detailing, tall windows, and sweeping terraces that blur the line between indoor and outdoor living." },
              { t: "The Landscape", d: "Designed as a series of outdoor rooms, the gardens offer quiet sanctuaries, active play spaces, and grand promenades for evening strolls." },
              { t: "The Interiors", d: "Volume is the ultimate luxury. Double-height ceilings, expansive galleries, and materials sourced from around the world define the interior experience." }
            ].map((item, i) => (
              <div key={i} className="gallery-text h-[50vh] md:h-[80vh] flex flex-col justify-center max-w-md">
                <span className="text-brand-accent font-serif italic text-3xl mb-4">0{i+1}</span>
                <h3 className="text-white text-2xl font-bold uppercase tracking-widest mb-6">{item.t}</h3>
                <p className="text-brand-text opacity-70 font-light text-lg leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Floor Plans & Amenities (Accordion) */}
        <section className="py-24 bg-brand-surface-alt">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col lg:flex-row gap-16">
            <div className="w-full lg:w-1/2">
              <h2 className="font-serif text-4xl text-brand-text mb-12">Life at {project.name}</h2>
              <div className="space-y-4">
                {amenities.map((item, idx) => (
                  <div key={idx} className="bg-brand-base border border-gray-200">
                    <button 
                      onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)}
                      className="w-full text-left px-8 py-6 flex justify-between items-center group"
                    >
                      <h3 className="font-serif text-xl text-brand-text group-hover:text-brand-accent transition-colors">{item.title}</h3>
                      <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center shrink-0">
                        <motion.div animate={{ rotate: activeAccordion === idx ? 45 : 0 }} transition={{ duration: 0.3 }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                        </motion.div>
                      </div>
                    </button>
                    <AnimatePresence>
                      {activeAccordion === idx && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-8 pb-8 pt-2">
                            <p className="text-brand-muted-light font-light leading-relaxed">{item.desc}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <div className="bg-brand-base p-8 border border-gray-200 h-full flex flex-col justify-center items-center relative group cursor-crosshair">
                <div className="absolute top-8 left-8">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-brand-accent block">Masterplan</span>
                </div>
                {/* Fake Floorplan Image */}
                <div className="w-full h-64 border-2 border-dashed border-gray-300 mt-12 flex items-center justify-center overflow-hidden relative">
                  <img src="/assets/images/15-lifestyle-pride-masterplan.jpg" className="w-full h-full object-cover opacity-50 grayscale group-hover:scale-150 group-hover:opacity-100 transition-all duration-700 origin-center" alt="Floorplan" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity">
                    <span className="bg-brand-surface text-white px-4 py-2 text-xs uppercase tracking-widest font-bold">Hover to Zoom</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-24 bg-brand-base">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 text-center">
            <h2 className="font-serif text-4xl text-brand-text mb-12">The Location</h2>
            <div className="w-full h-[60vh] bg-gray-200 relative overflow-hidden flex items-center justify-center border border-gray-300 group">
               {/* Map placeholder */}
               <img src="/assets/images/03-about-masterplan-aerial.jpg" alt="Map" className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
               
               {/* Animated Map Pin */}
               <motion.div 
                 initial={{ y: -100, opacity: 0 }}
                 whileInView={{ y: 0, opacity: 1 }}
                 viewport={{ once: true }}
                 transition={{ type: "spring", bounce: 0.5, duration: 1 }}
                 className="absolute text-brand-accent drop-shadow-xl"
               >
                 <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>
               </motion.div>
            </div>
          </div>
        </section>

      </main>
      
      {/* Enquiry Sticky Button & Modal */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={() => setModalOpen(true)}
          className="bg-brand-accent text-brand-surface uppercase tracking-widest text-xs font-bold px-8 py-4 rounded-full shadow-2xl hover:scale-105 transition-transform"
        >
          Enquire Now
        </button>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-surface/80 backdrop-blur-sm flex justify-end"
          >
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="w-full md:w-[600px] h-full bg-brand-surface-alt shadow-2xl flex flex-col relative"
            >
              <button 
                onClick={() => setModalOpen(false)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-brand-text hover:bg-brand-surface hover:text-white transition-colors z-10"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
              
              <div className="p-12 overflow-y-auto flex-grow bg-brand-surface text-white">
                 <h2 className="font-serif text-4xl mb-4 text-white">Register Interest</h2>
                 <p className="text-brand-text opacity-70 font-light mb-12">Submit your details to receive the brochure and floor plans for {project.name}.</p>
                 <ContactForm />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
};

export default ProjectDetails;
