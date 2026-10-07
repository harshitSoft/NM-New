import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisitedNM');
    
    if (hasVisited) {
      setIsLoading(false);
      return;
    }

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          sessionStorage.setItem('hasVisitedNM', 'true');
          setTimeout(() => setIsLoading(false), 500); // Wait a bit after reaching 100%
          return 100;
        }
        return prev + 2; // Adjust speed as needed
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-brand-surface text-brand-cream overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100vh',
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          {/* Top Half (for split effect if we want to split in the middle, but here we slide the whole thing up, or we can split) */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/2 bg-brand-surface border-b border-white/5 z-10 origin-top"
            exit={{ scaleY: 0, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-full h-1/2 bg-brand-surface border-t border-white/5 z-10 origin-bottom"
            exit={{ scaleY: 0, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
          />

          <div className="relative z-20 flex flex-col items-center">
            {/* Logo Drawing Effect */}
            <div className="mb-12 relative w-32 h-32 flex items-center justify-center">
               <motion.svg 
                 width="100" height="100" viewBox="0 0 100 100" 
                 initial="hidden" animate="visible"
                 className="text-brand-accent"
               >
                 <motion.path
                   d="M20,80 L20,20 L50,60 L80,20 L80,80" // Simple abstract NM logo representation, you can replace with actual SVG
                   fill="transparent"
                   stroke="currentColor"
                   strokeWidth="2"
                   variants={{
                     hidden: { pathLength: 0, opacity: 0 },
                     visible: { 
                       pathLength: 1, 
                       opacity: 1,
                       transition: { duration: 2, ease: "easeInOut" }
                     }
                   }}
                 />
               </motion.svg>
            </div>
            
            {/* Progress Bar container */}
            <div className="w-64 h-[1px] bg-white/20 relative overflow-hidden mt-8">
              <motion.div
                className="absolute top-0 left-0 h-full bg-brand-accent"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
            </div>
            
            <div className="mt-4 font-sans text-xs tracking-[0.2em] text-white/50 uppercase">
              {progress}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
