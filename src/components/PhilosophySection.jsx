import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { EyebrowHeading } from './EyebrowHeading';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PhilosophySection = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imagesRef = useRef(null);

  const images = [
    "/assets/images/02-philosophy-nm-pride-gate.jpg",
    "/assets/images/04-mission-courtyard.jpg",
    "/assets/images/12-projects-london-villas.jpg"
  ];

  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    const ctx = gsap.context(() => {
      if (isDesktop) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: imagesRef.current,
          pinSpacing: false,
        });
      }

      // Animate images based on scroll progress of text
      const sections = gsap.utils.toArray('.text-block');
      
      sections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) {
              gsap.to('.phi-image', { opacity: 0, duration: 0.5 });
              gsap.to(`.phi-image-${index}`, { opacity: 1, duration: 0.5 });
            }
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-16 md:py-24 lg:py-32 bg-brand-base relative">
      {/* Section Divider */}
      <motion.div 
        initial={{ scaleX: 0 }} 
        whileInView={{ scaleX: 1 }} 
        viewport={{ once: true }} 
        transition={{ duration: 1.5, ease: "easeInOut" }} 
        className="absolute top-0 left-0 w-full h-[1px] bg-brand-accent origin-left" 
      />
      
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 relative">
          
          {/* Image Side (Sticky on Mobile, Pinned on Desktop) */}
          <div className="relative h-[45vh] md:h-[55vh] lg:h-[80vh] overflow-hidden rounded-sm sticky top-20 lg:top-0 z-10" ref={imagesRef}>
            {images.map((src, index) => (
              <img 
                key={index}
                src={src} 
                alt={`Philosophy ${index}`} 
                loading="lazy"
                className={`phi-image phi-image-${index} absolute inset-0 w-full h-full object-cover rounded-sm will-change-opacity ${index === 0 ? 'opacity-100' : 'opacity-0'}`} 
                data-cursor="view"
              />
            ))}
            <div className="absolute bottom-4 left-4 bg-brand-base px-4 py-2 shadow-sm">
               <span className="text-[10px] uppercase tracking-widest font-semibold text-brand-text">02 / PHILOSOPHY</span>
            </div>
          </div>

          {/* Scrolling Text Side */}
          <div className="lg:py-32" ref={textRef}>
            <div className="text-block min-h-[50vh] flex flex-col justify-center">
              <EyebrowHeading 
                eyebrow="OUR PHILOSOPHY"
                headingLines={[
                  { text: "Building more than real estate." },
                  { text: "Creating places people belong.", italic: true }
                ]}
              />
              <p className="text-brand-muted-light text-lg mb-10 leading-relaxed font-light mt-8">
                At The NM Group, every development begins with a simple belief — great real estate should improve the lives of the people who experience it every day.
              </p>
            </div>

            <div className="text-block min-h-[50vh] flex flex-col justify-center">
              <p className="text-brand-muted-light text-lg mb-10 leading-relaxed font-light">
                That philosophy shapes everything from location and community planning to architecture, open spaces, and amenities that encourage people to connect, grow, and create lasting memories.
              </p>
            </div>

            <div className="text-block flex flex-col justify-center">
              <div className="mb-10">
                <StickyQuote text='"Architecture creates buildings. Communities create belonging."' />
              </div>
              <Link to="/about" className="text-brand-text font-bold uppercase tracking-widest text-xs hover:text-brand-accent transition-colors inline-flex items-center group">
                Discover Our Story 
                <span className="ml-2 text-brand-accent transform group-hover:translate-x-2 transition-transform">&rarr;</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const StickyQuote = ({ text }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const words = text.split(' ');

  return (
    <div ref={containerRef} className="h-[150vh] relative">
      <div className="sticky top-[40vh] border-l-2 border-brand-accent pl-6 py-2">
        <p className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-brand-text leading-relaxed flex flex-wrap gap-2">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + (1 / words.length);
            const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
            return (
              <motion.span key={i} style={{ opacity }}>
                {word}
              </motion.span>
            );
          })}
        </p>
      </div>
    </div>
  );
};

export default PhilosophySection;
