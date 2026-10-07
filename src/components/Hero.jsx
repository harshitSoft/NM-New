import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from './MagneticButton';
import CountUp from './CountUp';

const Hero = ({ 
  image,
  images, 
  eyebrow,
  headingLines = [], 
  body, 
  primaryCtaText, 
  primaryCtaLink, 
  secondaryCtaText, 
  secondaryCtaLink,
  large = false,
  footerTagLeft,
  footerTagRight,
  sidePanel
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroImages = images || (image ? [image] : []);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  useEffect(() => {
    if (heroImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [heroImages.length]);

  return (
    <div ref={containerRef} className={`relative flex items-center justify-start ${large ? 'min-h-screen' : 'min-h-[70vh]'} bg-brand-surface overflow-hidden`}>
      {/* Background Images with Parallax */}
      {heroImages.map((img, idx) => (
        <motion.div 
          key={img}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            idx === currentImageIndex ? 'opacity-50' : 'opacity-0'
          }`}
          style={{ 
            backgroundImage: `url('${img}')`,
            y: yBackground,
            scale: 1.1 // to prevent edge showing during parallax
          }}
        />
      ))}
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-surface/90 via-brand-surface/50 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 flex justify-between items-end pb-24 pt-24 lg:pt-32">
        <div className="max-w-2xl">
          {eyebrow && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mb-6 inline-block"
            >
              <span className="uppercase tracking-widest text-xs font-semibold text-brand-accent block">
                {eyebrow}
              </span>
              <span className="block w-8 h-[2px] bg-brand-accent mt-2"></span>
            </motion.div>
          )}
          
          <h1 className="font-serif text-4xl md:text-6xl lg:text-[5rem] text-brand-text leading-[1.1] mb-8">
            {headingLines.map((line, idx) => (
              <div key={idx} className="overflow-hidden">
                <motion.span 
                  className={`block ${line.italic ? 'italic text-brand-accent' : ''}`}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ 
                    duration: 1, 
                    ease: [0.76, 0, 0.24, 1], 
                    delay: 1.2 + (idx * 0.2) // staggered reveal
                  }}
                >
                  {line.text}
                </motion.span>
              </div>
            ))}
          </h1>
          
          {body && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.8 }}
              className="text-brand-text opacity-80 text-lg md:text-xl mb-8 lg:mb-12 font-light leading-relaxed max-w-xl"
            >
              {body}
            </motion.p>
          )}
          
          {(primaryCtaText || secondaryCtaText) && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              {primaryCtaText && (
                <MagneticButton>
                  <Link 
                    to={primaryCtaLink || "#"} 
                    className="block bg-brand-accent text-brand-surface uppercase tracking-widest text-xs font-bold px-8 py-4 hover:bg-brand-text transition-colors"
                  >
                    {primaryCtaText} &rarr;
                  </Link>
                </MagneticButton>
              )}
              
              {secondaryCtaText && (
                <MagneticButton>
                  <Link 
                    to={secondaryCtaLink || "#"} 
                    className="block bg-transparent border border-brand-base text-brand-text uppercase tracking-widest text-xs font-bold px-8 py-4 hover:bg-brand-base hover:text-brand-text transition-colors"
                  >
                    {secondaryCtaText}
                  </Link>
                </MagneticButton>
              )}
            </motion.div>
          )}
        </div>

        {sidePanel && (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 2 }}
            className="hidden lg:flex flex-col items-end space-y-8 bg-white/10 p-8 border-l border-white/20 backdrop-blur-md rounded-xl shadow-2xl"
          >
            <h4 className="text-[10px] uppercase tracking-widest text-brand-accent font-bold mb-4">{sidePanel.title}</h4>
            {sidePanel.stats.map((stat, idx) => (
              <div key={idx} className="text-right">
                <div className="font-serif text-4xl text-brand-accent mb-1">
                  <CountUp to={parseInt(stat.number)} suffix={stat.number.replace(/[0-9]/g, '')} />
                </div>
                <div className="text-[10px] uppercase tracking-widest text-brand-text font-semibold">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Footer Tags */}
      {(footerTagLeft || footerTagRight) && (
        <div className="absolute bottom-8 left-0 w-full z-10 px-4 md:px-8 lg:px-12 flex justify-between">
          <div className="text-[10px] uppercase tracking-widest text-brand-text/70 font-semibold">{footerTagLeft}</div>
          <div className="text-[10px] uppercase tracking-widest text-brand-accent font-bold">{footerTagRight}</div>
        </div>
      )}
    </div>
  );
};

export default Hero;
