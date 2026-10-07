import { motion } from 'framer-motion';

const MeasurementMarks = ({ progress }) => {
  // Only show early in the animation (0-30%)
  const opacity = progress > 0.05 && progress < 0.3 ? 1 : 0;
  
  return (
    <motion.div 
      className="absolute inset-0 z-10 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute top-[30%] left-[25%] font-mono text-[10px] text-brand-accent/60 tracking-widest hidden md:block">
        <div className="flex items-center gap-2">
          <span className="w-16 h-[1px] bg-brand-accent/30"></span>
          <span>+12.500 M</span>
        </div>
      </div>

      <div className="absolute bottom-[40%] right-[20%] font-mono text-[10px] text-brand-accent/60 tracking-widest hidden md:block">
        <div className="flex items-center gap-2">
          <span>GRID A3</span>
          <span className="w-16 h-[1px] bg-brand-accent/30"></span>
        </div>
      </div>

      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 font-mono text-[10px] text-brand-accent/60 tracking-widest flex flex-col items-center gap-2">
        <span>LEVEL 02</span>
        <span className="w-[1px] h-8 bg-brand-accent/30"></span>
      </div>
      
      {/* Target Crosshairs */}
      <div className="absolute top-[40%] left-[35%] opacity-40">
        <div className="w-4 h-[1px] bg-brand-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="w-[1px] h-4 bg-brand-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      <div className="absolute top-[60%] right-[35%] opacity-40">
        <div className="w-4 h-[1px] bg-brand-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="w-[1px] h-4 bg-brand-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </motion.div>
  );
};

export default MeasurementMarks;
