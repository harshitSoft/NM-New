import { motion } from 'framer-motion';

const ConstructionProgress = ({ progress }) => {
  const stages = ['PLAN', 'FOUNDATION', 'STRUCTURE', 'FACADE', 'COMPLETE'];
  
  // Calculate which stage we are actively in
  let activeIndex = 0;
  if (progress > 0.1 && progress <= 0.25) activeIndex = 1;
  else if (progress > 0.25 && progress <= 0.65) activeIndex = 2;
  else if (progress > 0.65 && progress <= 0.8) activeIndex = 3;
  else if (progress > 0.8) activeIndex = 4;

  return (
    <>
      {/* Mobile Top Progress Bar & Stage Indicator */}
      <div className="flex md:hidden flex-col items-center w-full px-6 pt-2 pointer-events-none">
        <div className="flex justify-between items-center w-full max-w-xs mb-1">
          <span className="text-[9px] uppercase tracking-widest font-bold text-brand-accent">
            0{activeIndex + 1} / 05 &mdash; {stages[activeIndex]}
          </span>
          <span className="text-[9px] uppercase tracking-widest font-bold text-brand-text opacity-70">
            {Math.round(progress * 100)}%
          </span>
        </div>
        <div className="w-full max-w-xs h-[2px] bg-white/10 rounded-full overflow-hidden relative">
          <motion.div 
            className="h-full bg-brand-accent"
            style={{ width: `${Math.max(progress * 100, 5)}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>

      {/* Desktop Vertical Progress Bar */}
      <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-end gap-8">
        {/* Dynamic line that fills based on progress */}
        <div className="absolute right-[3px] top-4 bottom-4 w-[1px] bg-white/10 z-0" />
        <motion.div 
          className="absolute right-[3px] top-4 w-[1px] bg-brand-accent z-0 origin-top"
          style={{ scaleY: progress, bottom: '1rem' }}
        />
        
        {stages.map((stage, idx) => {
          const isActive = activeIndex === idx;
          const isPast = progress > (idx === 0 ? 0 : idx === 1 ? 0.1 : idx === 2 ? 0.25 : idx === 3 ? 0.65 : 0.8);

          return (
            <div key={stage} className="flex items-center gap-4 relative z-10 group cursor-default">
              <span 
                className={`text-[8px] uppercase tracking-[0.2em] font-bold transition-colors duration-300 ${
                  isActive ? 'text-brand-accent' : 'text-brand-text opacity-70 opacity-0 group-hover:opacity-100'
                }`}
              >
                0{idx + 1} &mdash; {stage}
              </span>
              <div 
                className={`w-2 h-2 rounded-full border transition-all duration-300 ${
                  isActive 
                    ? 'bg-brand-accent border-brand-accent scale-125' 
                    : isPast 
                      ? 'bg-transparent border-brand-accent' 
                      : 'bg-transparent border-white/20'
                }`}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ConstructionProgress;
