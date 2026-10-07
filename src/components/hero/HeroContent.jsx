import React from 'react';

const HeroContent = ({ progress }) => {
  // Fade out between 40% and 55% scroll progress
  let opacity = 1;
  if (progress > 0.40) {
    opacity = Math.max(1 - (progress - 0.40) / 0.15, 0);
  }
  
  // Parallax translation
  const translateY = progress * 150;

  return (
    <div 
      className="flex flex-col justify-center h-screen px-8 md:px-16 lg:px-24 pointer-events-none"
      style={{ 
        opacity,
        transform: `translateY(-${translateY}px)`
      }}
    >
      <div className="max-w-[1280px] w-full mx-auto relative z-10 px-4 md:px-8">
        <p className="uppercase font-mono tracking-widest text-[11px] md:text-xs text-brand-accent font-bold mb-6 border border-brand-accent px-4 py-2 inline-block">
          // THE NM GROUP
        </p>
        <h1 className="font-sans font-bold text-5xl md:text-7xl lg:text-[8rem] text-brand-text leading-[0.9] mb-8 tracking-tighter uppercase">
          Building <br />
          <span className="text-brand-accent font-handwriting capitalize font-normal text-6xl md:text-[7rem] lg:text-[9rem]">Legacies.</span>
        </h1>
        <p className="font-mono text-brand-text/70 text-sm md:text-base max-w-md leading-relaxed border-l-2 border-brand-accent pl-4">
          Engineering architectural masterpieces that define the future of luxury living and modern communities.
        </p>
      </div>
    </div>
  );
};

export default HeroContent;
