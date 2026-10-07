import { motion } from 'framer-motion';

export const EyebrowHeading = ({ eyebrow, headingLines = [], className = '' }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`mb-10 ${className}`}
    >
      {eyebrow && (
        <div className="mb-6 inline-block relative">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="absolute inset-0 border border-brand-accent/30 origin-left"
          />
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="uppercase font-mono tracking-widest text-xs font-bold text-brand-accent block px-3 py-1 relative z-10"
          >
            // {eyebrow}
          </motion.span>
        </div>
      )}
      <h2 className="font-sans font-bold uppercase tracking-tighter text-3xl md:text-5xl lg:text-6xl text-brand-text leading-tight">
        {headingLines.map((line, idx) => (
          <span key={idx} className={`block ${line.italic ? 'font-handwriting text-brand-accent capitalize font-normal text-4xl md:text-6xl lg:text-7xl mt-2' : ''}`}>
            {line.text}
          </span>
        ))}
      </h2>
    </motion.div>
  );
};
