import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Timeline = ({ entries }) => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <div ref={containerRef} className="relative mt-24 py-12 max-w-4xl mx-auto">
      {/* Background Line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-gray-200 -translate-x-1/2"></div>
      
      {/* Animated Gold Line */}
      <motion.div 
        style={{ scaleY: scrollYProgress }}
        className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-brand-accent origin-top -translate-x-1/2 z-0"
      ></motion.div>

      <div className="space-y-24">
        {entries.map((entry, idx) => (
          <TimelineEntry key={idx} entry={entry} idx={idx} />
        ))}
      </div>
    </div>
  );
};

const TimelineEntry = ({ entry, idx }) => {
  const isEven = idx % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className={`relative flex flex-col md:flex-row items-center w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Central Circular Node */}
      <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-brand-base border-2 border-brand-accent -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(198,161,91,0.5)] flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-brand-accent"></div>
      </div>

      {/* Year/Subtitle (Left side for even, Right side for odd, but on mobile always left padding) */}
      <div className={`w-full md:w-1/2 pl-24 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'} mb-4 md:mb-0`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="font-serif italic text-4xl lg:text-5xl text-brand-accent block">{entry.subtitle.split(' ')[0]}</span>
          <span className="uppercase tracking-widest text-[10px] font-bold text-brand-text opacity-60 block mt-2">{entry.subtitle.split(' ').slice(1).join(' ')}</span>
        </motion.div>
      </div>

      {/* Content Box (Right side for even, Left side for odd) */}
      <div className={`w-full md:w-1/2 pl-24 md:pl-0 ${isEven ? 'md:pl-16 text-left' : 'md:pr-16 md:text-right'}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
          className="bg-brand-base p-8 shadow-xl border border-gray-100 group hover:-translate-y-2 transition-transform duration-500"
        >
          <h4 className="font-serif text-2xl text-brand-text mb-4">{entry.title}</h4>
          <p className="text-sm text-brand-text opacity-80 leading-relaxed font-light mb-6">{entry.description}</p>
          
          {entry.image && (
            <div className="w-full h-40 overflow-hidden">
              <img src={entry.image} alt={entry.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};
