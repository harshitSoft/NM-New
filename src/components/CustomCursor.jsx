import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
  const [cursorState, setCursorState] = useState('idle'); // idle, hover-link, hover-project, hidden
  const [ripples, setRipples] = useState([]);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring configuration for soft lerp / trail
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const mouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const mouseDown = (e) => {
      setRipples(prev => [...prev, { id: Date.now(), x: e.clientX, y: e.clientY }]);
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mousedown', mouseDown);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      if (target.closest('.project-card')) {
        setCursorState('hover-project');
      } else if (target.closest('a') || target.closest('button')) {
        setCursorState('hover-link');
      } else if (target.closest('input') || target.closest('textarea')) {
        setCursorState('hidden');
      } else {
        setCursorState('idle');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  const variants = {
    idle: { 
      scale: 1, 
      rotate: [-8, 8, -8], 
      filter: 'drop-shadow(0px 0px 0px rgba(43,76,155,0))', 
      transition: { rotate: { repeat: Infinity, duration: 3, ease: "easeInOut" } } 
    },
    'hover-link': { 
      scale: 1.3, 
      rotate: 0, 
      filter: 'drop-shadow(0px 0px 8px rgba(43,76,155,0.6))' 
    },
    'hover-project': { 
      scale: 1.5, 
      rotate: 90, 
      filter: 'drop-shadow(0px 0px 10px rgba(43,76,155,0.8))' 
    },
    hidden: { opacity: 0, scale: 0 }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: smoothX, y: smoothY, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div variants={variants} animate={cursorState} className="relative flex items-center justify-center">
          
          {/* Isometric House Keychain SVG */}
          <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transformOrigin: '20px 20px' }}>
            {/* Key Ring & Chain */}
            <circle cx="25" cy="25" r="14" stroke="#D4AF37" strokeWidth="4" />
            <path d="M 35 35 L 50 50" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" />
            <circle cx="50" cy="50" r="3" fill="#D4AF37" />
            
            {/* Isometric House Charm */}
            <g transform="translate(45, 45)">
              {/* Left Wall */}
              <path d="M 0 15 L 20 25 L 20 50 L 0 40 Z" fill="#2B4C9B" />
              {/* Right Wall */}
              <path d="M 20 25 L 40 15 L 40 40 L 20 50 Z" fill="#1D3F84" />
              {/* Roof Left */}
              <path d="M -4 16 L 20 4 L 24 29 L 0 41 Z" fill="#F4EFE6" stroke="#2B4C9B" strokeWidth="1" strokeLinejoin="round" />
              {/* Roof Right */}
              <path d="M 20 4 L 44 16 L 24 41 L 0 29 Z" fill="#FFFFFF" stroke="#2B4C9B" strokeWidth="1" strokeLinejoin="round" />
              
              {/* Door - Animates on hover-project */}
              <motion.path 
                d="M 24 33 L 32 29 L 32 40 L 24 44 Z" 
                fill="#D4AF37"
                animate={cursorState === 'hover-project' ? { 
                  d: "M 24 33 L 27 27 L 27 38 L 24 44 Z",
                  fill: "#111"
                } : {
                  d: "M 24 33 L 32 29 L 32 40 L 24 44 Z",
                  fill: "#D4AF37"
                }}
                transition={{ duration: 0.3 }}
              />
            </g>
          </svg>
          
        </motion.div>
      </motion.div>

      {/* Ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ width: 0, height: 0, opacity: 0.8 }}
            animate={{ width: 100, height: 100, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed pointer-events-none z-[9998] rounded-full border border-brand-accent/50"
            style={{
              left: ripple.x,
              top: ripple.y,
              transform: 'translate(-50%, -50%)'
            }}
            onAnimationComplete={() => {
              setRipples(prev => prev.filter(r => r.id !== ripple.id));
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
};

export default CustomCursor;
