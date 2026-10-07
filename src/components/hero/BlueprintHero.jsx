import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, animate } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import AnimatedHeroIllustration from './AnimatedHeroIllustration';
import { heroConfig } from '../../config/heroConfig';

gsap.registerPlugin(ScrollTrigger);

const BlueprintHero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  
  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  // Syncing writing state
  const writingProgress = useMotionValue(0);
  const [isWritingComplete, setIsWritingComplete] = useState(false);

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const scaleHero = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.2, 0]);

  // Mouse move handler for parallax and coordinates
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20; // range -10 to 10
      const y = (clientY / window.innerHeight - 0.5) * 20;
      
      mouseX.set(x);
      mouseY.set(y);
      setCoords({ x: clientX, y: clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Entrance writing animation
  useEffect(() => {
    // Reveal "Building" immediately
    const t1 = setTimeout(() => {
      // Then start writing "Legacies."
      animate(writingProgress, 1, {
        duration: heroConfig.writingDuration,
        ease: [0.25, 1, 0.5, 1],
        onComplete: () => setIsWritingComplete(true)
      });
    }, 1000);

    return () => clearTimeout(t1);
  }, [writingProgress]);

  // Clip path driven by writing progress
  const clipWidth = useTransform(writingProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-brand-base overflow-hidden flex items-center">
      
      {/* Blueprint Grid Background */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ 
          y: yBg,
          x: useTransform(mouseX, [-10, 10], [4, -4]), // slight parallax opposite to mouse
          y: useTransform(mouseY, [-10, 10], [4, -4])
        }} 
      >
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: 'linear-gradient(#2B4C9B 1px, transparent 1px), linear-gradient(90deg, #2B4C9B 1px, transparent 1px)', 
          backgroundSize: '40px 40px'
        }} />
        
        {/* Animated drawing lines */}
        <svg className="absolute inset-0 w-full h-full opacity-60">
          <motion.path 
            d="M 0 160 L 2000 160 M 240 0 L 240 2000 M 0 400 L 2000 400 M 600 0 L 600 2000" 
            stroke="#2B4C9B" 
            strokeWidth="1" 
            fill="none" 
            initial={{ pathLength: 0 }} 
            animate={{ pathLength: 1 }} 
            transition={{ duration: 3, ease: "easeInOut" }} 
          />
        </svg>
      </motion.div>

      {/* Top UI Overlays (Coordinates) */}
      <div className="absolute top-24 left-8 md:left-12 z-20 font-mono text-[10px] md:text-xs text-brand-accent tracking-widest uppercase font-bold">
        X {coords.x.toFixed(2).padStart(6, '0')} <br />
        Y {coords.y.toFixed(2).padStart(6, '0')}
      </div>

      {/* Parallax Container for Hero Art & Content */}
      <motion.div 
        className="relative z-10 w-full max-w-[1440px] mx-auto px-4 md:px-12 flex flex-col justify-center h-full pt-16"
        style={{
          rotateX: mouseY,
          rotateY: mouseX,
          scale: scaleHero,
          opacity: opacityHero,
          transformStyle: "preserve-3d"
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full relative">
          
          {/* Left: Typography & Reveal */}
          <div className="flex flex-col justify-center translate-z-20 relative z-20">
            
            {/* Hand-drawn Annotation */}
            <motion.div 
              initial={{ opacity: 0, pathLength: 0 }}
              animate={isWritingComplete ? { opacity: 1, pathLength: 1 } : {}}
              transition={{ duration: 1 }}
              className="absolute -top-12 left-10 text-brand-accent font-handwriting text-2xl md:text-3xl rotate-[-5deg] opacity-0"
            >
              Architectural &rarr;
            </motion.div>

            {/* Headline with Sync Reveal */}
            <div className="relative font-sans font-bold text-5xl md:text-7xl lg:text-[6.5rem] uppercase tracking-tighter leading-[0.9] text-brand-surface-alt/20 mb-8" ref={textRef}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-brand-text"
              >
                Building
              </motion.div>
              <span className="font-handwriting capitalize font-normal">Legacies.</span>
              
              {/* Overlay Text revealed by clip-path */}
              <motion.div 
                className="absolute inset-0 w-full h-full overflow-hidden whitespace-nowrap"
                style={{ width: clipWidth, top: '1em' }}
              >
                <span className="text-brand-accent font-handwriting capitalize font-normal">Legacies.</span>
              </motion.div>
            </div>

            {/* Subtitle & CTA Staggered Fade Up */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isWritingComplete ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <p className="font-mono text-brand-text/70 text-sm md:text-base max-w-md leading-relaxed border-l-2 border-brand-accent pl-4 mb-10">
                Engineering architectural masterpieces that define the future of luxury living and modern communities.
              </p>

              <div className="flex items-center gap-6">
                <Link to="/projects" className="group relative overflow-hidden bg-brand-surface text-brand-accent font-mono font-bold text-xs uppercase tracking-widest px-8 py-4 border border-brand-accent transition-colors flex items-center gap-2">
                  <span className="absolute inset-0 bg-brand-accent transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 z-0"></span>
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-brand-surface">Explore Projects</span>
                  <span className="relative z-10 transform transition-transform duration-300 group-hover:translate-x-2 group-hover:text-brand-surface">&rarr;</span>
                </Link>
                <div className="font-handwriting text-brand-accent text-xl rotate-[2deg]">
                  Not just buildings.
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: The Animated Character */}
          <div className="relative h-[60vh] lg:h-[80vh] w-full translate-z-10 pointer-events-none hidden md:block">
            {heroConfig.type === 'svg' && (
              <AnimatedHeroIllustration 
                writingProgress={writingProgress} 
                isWritingComplete={isWritingComplete} 
                mouseX={mouseX}
                mouseY={mouseY}
              />
            )}
            
            {/* Fallbacks for user assets */}
            {heroConfig.type === 'video' && (
              <video src={heroConfig.videoSrc} autoPlay muted loop playsInline className="w-full h-full object-contain" />
            )}
            
            {heroConfig.type === 'lottie' && (
              <div className="w-full h-full border-2 border-dashed border-brand-accent/30 flex items-center justify-center font-mono text-brand-accent text-sm">
                [Lottie Placeholder - Install lottie-react to use]
              </div>
            )}
          </div>

        </div>
      </motion.div>

      {/* Bottom Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={isWritingComplete ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1 }}
      >
        <span className="font-mono text-[9px] uppercase tracking-widest font-bold text-brand-accent">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-brand-accent/30 relative overflow-hidden">
          <motion.div 
            className="w-full h-full bg-brand-accent absolute top-0"
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>

    </div>
  );
};

export default BlueprintHero;
