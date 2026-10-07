import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CircularHero() {
  const containerRef = useRef(null);
  const emblemWrapperRef = useRef(null);
  
  // Outer Wrappers for Intro Scale & Fade
  const ringOuterWrapperRef = useRef(null);
  const ringMiddleWrapperRef = useRef(null);
  const ringInnerWrapperRef = useRef(null);
  const discWrapperRef = useRef(null);
  
  // Inner Groups for Infinite Rotation
  const ringOuterRotRef = useRef(null);
  const ringMiddleRotRef = useRef(null);
  const ringInnerRotRef = useRef(null);
  const orbit1RotRef = useRef(null);
  const orbit2RotRef = useRef(null);

  const buttonRef = useRef(null);
  
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Spotlight and cursor
    const xToDot = gsap.quickTo(cursorDotRef.current, "x", { duration: 0.1, ease: "power3" });
    const yToDot = gsap.quickTo(cursorDotRef.current, "y", { duration: 0.1, ease: "power3" });
    const xToRing = gsap.quickTo(cursorRingRef.current, "x", { duration: 0.5, ease: "power3" });
    const yToRing = gsap.quickTo(cursorRingRef.current, "y", { duration: 0.5, ease: "power3" });

    const handleMouseMove = (e) => {
      setCoords({ x: e.clientX, y: e.clientY });
      document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
      document.documentElement.style.setProperty('--my', `${e.clientY}px`);
      
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Magnetic Button
    const xToBtn = gsap.quickTo(buttonRef.current, "x", { duration: 0.4, ease: "power3" });
    const yToBtn = gsap.quickTo(buttonRef.current, "y", { duration: 0.4, ease: "power3" });
    
    const handleBtnMove = (e) => {
      if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width/2) * 0.3;
      const y = (e.clientY - rect.top - rect.height/2) * 0.3;
      xToBtn(x);
      yToBtn(y);
    };
    const handleBtnLeave = () => { xToBtn(0); yToBtn(0); };
    
    if (buttonRef.current) {
      buttonRef.current.addEventListener('mousemove', handleBtnMove);
      buttonRef.current.addEventListener('mouseleave', handleBtnLeave);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (buttonRef.current) {
        buttonRef.current.removeEventListener('mousemove', handleBtnMove);
        buttonRef.current.removeEventListener('mouseleave', handleBtnLeave);
      }
    };
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const wrappers = [ringOuterWrapperRef.current, ringMiddleWrapperRef.current, ringInnerWrapperRef.current, discWrapperRef.current];

      // Initial Setup
      gsap.set(wrappers, { scale: 0.6, opacity: 0, svgOrigin: "300 300" });
      
      const rotElements = [
        ringOuterRotRef.current, ringMiddleRotRef.current, ringInnerRotRef.current,
        orbit1RotRef.current, orbit2RotRef.current
      ].filter(Boolean);
      gsap.set(rotElements, { svgOrigin: "300 300" });
      
      gsap.set('.hero-tower', { scaleY: 0, transformOrigin: 'bottom center' });
      gsap.set('.hero-text-line', { yPercent: 115 });
      gsap.set('.hero-fade-up', { opacity: 0, y: 20 });
      gsap.set('.stat-chip', { scale: 0, opacity: 0 });

      // Intro Timeline
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(wrappers, {
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: "expo.out",
        stagger: 0.18
      }, 0)
      .to('.hero-tower', {
        scaleY: 1,
        duration: 1.2,
        ease: "back.out(1.2)",
        stagger: 0.15
      }, 0.5)
      .to('.hero-text-line', {
        yPercent: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.12
      }, 0.6)
      .to('.hero-fade-up', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1
      }, 1.2)
      .to('.stat-chip', {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.5)",
        stagger: 0.2
      }, 1.5);

      if (!isReduced) {
        // Infinite Rotations
        const outerAnim = gsap.to(ringOuterRotRef.current, { rotation: 360, duration: 40, ease: "none", repeat: -1 });
        const middleAnim = gsap.to(ringMiddleRotRef.current, { rotation: -360, duration: 30, ease: "none", repeat: -1 });
        const innerAnim = gsap.to(ringInnerRotRef.current, { rotation: 360, duration: 20, ease: "none", repeat: -1 });
        const orbit1Anim = gsap.to(orbit1RotRef.current, { rotation: 360, duration: 25, ease: "none", repeat: -1 });
        const orbit2Anim = gsap.to(orbit2RotRef.current, { rotation: -360, duration: 15, ease: "none", repeat: -1 });

        const rotTweens = [outerAnim, middleAnim, innerAnim, orbit1Anim, orbit2Anim];
        
        // Initial TimeScale effect
        gsap.fromTo(rotTweens, { timeScale: 8 }, { timeScale: 1, duration: 2.5, ease: "expo.out" });

        // Hover Speed up
        const emblemEl = emblemWrapperRef.current;
        emblemEl.addEventListener('mouseenter', () => {
          gsap.to(rotTweens, { timeScale: 4, duration: 1, ease: "power2.out" });
        });
        emblemEl.addEventListener('mouseleave', () => {
          gsap.to(rotTweens, { timeScale: 1, duration: 1, ease: "power2.out" });
        });

        // Stat Chips Floating
        gsap.to('.stat-chip', {
          y: -15,
          duration: 2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: { each: 0.5, from: "random" }
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Helpers for exact drawing
  const renderRingText = (text, R, fontSize, color) => {
    const chars = text.split('');
    const N = chars.length;
    return chars.map((char, i) => (
      <text 
        key={i} 
        x="300" 
        y={300 - R} 
        textAnchor="middle" 
        dominantBaseline="central" 
        transform={`rotate(${(i * 360) / N} 300 300)`}
        fontSize={fontSize}
        fill={color}
        fontFamily="'Space Mono', monospace"
        fontWeight="bold"
      >
        {char === ' ' ? '\u00A0' : char}
      </text>
    ));
  };

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-brand-base overflow-hidden font-sans pt-24 pb-0 flex flex-col">
      
      {/* Custom Cursor */}
      <div ref={cursorDotRef} className="fixed top-0 left-0 w-[10px] h-[10px] bg-brand-accent rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9999] hidden md:block"></div>
      <div ref={cursorRingRef} className="fixed top-0 left-0 w-[38px] h-[38px] border border-brand-accent rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9998] hidden md:block"></div>

      {/* Spotlight Grid Layer */}
      <div 
        className="absolute inset-0 pointer-events-none z-0" 
        style={{
          backgroundImage: 'linear-gradient(rgba(42,74,159,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(42,74,159,0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          WebkitMaskImage: 'radial-gradient(180px circle at var(--mx, 50%) var(--my, 50%), black 0%, transparent 100%)',
          maskImage: 'radial-gradient(180px circle at var(--mx, 50%) var(--my, 50%), black 0%, transparent 100%)'
        }}
      ></div>

      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 h-[3px] bg-brand-accent z-[100] w-full origin-left scale-x-0" id="scroll-progress"></div>

      {/* Coordinate Readout */}
      <div className="absolute top-24 left-6 md:left-12 font-mono text-[10px] md:text-xs text-brand-accent font-bold z-20">
        X {(coords.x).toFixed(2).padStart(6,'0')} / Y {(coords.y).toFixed(2).padStart(6,'0')}
      </div>

      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center max-w-[1400px] w-full mx-auto px-6 md:px-12 relative z-10 gap-12 lg:gap-0 mt-12 lg:mt-0">
        
        {/* Left Column (Text) */}
        <div className="flex-1 w-full flex flex-col justify-center relative z-20">
          <span className="font-script text-brand-accent text-3xl md:text-4xl -rotate-3 origin-left hero-fade-up">Architectural &rarr;</span>
          
          <div className="font-bold text-brand-text uppercase tracking-tighter leading-[0.85] mt-4 mb-2">
            <div className="overflow-hidden inline-block"><div className="hero-text-line text-[clamp(3.4rem,8vw,7.5rem)]">BUILDING</div></div>
          </div>
          
          <div className="font-script text-brand-accent text-[clamp(4rem,9vw,8.5rem)] leading-[0.7] mb-8 relative left-4">
            <div className="overflow-hidden inline-block"><div className="hero-text-line pb-4">Legacies.</div></div>
          </div>

          <p className="font-mono text-brand-text/70 text-xs md:text-sm max-w-sm leading-relaxed border-l-2 border-brand-accent pl-4 mb-10 hero-fade-up">
            Engineering architectural masterpieces that define the future of luxury living and modern communities.
          </p>

          <div className="flex items-center gap-6 hero-fade-up">
            <button ref={buttonRef} className="bg-brand-accent text-white font-mono text-[11px] font-bold uppercase tracking-[0.2em] px-8 py-4 hover:bg-brand-text transition-colors whitespace-nowrap border-none rounded-none outline-none">
              EXPLORE PROJECTS &rarr;
            </button>
            <span className="font-script text-brand-accent text-xl md:text-2xl rotate-2">Not just buildings.</span>
          </div>
        </div>

        {/* Right Column (Circular Emblem) */}
        <div className="flex-1 flex justify-center items-center relative w-full h-[60vh] lg:h-[85vh]">
          
          {/* Floating Stats - kept safely away from the rings */}
          <div className="stat-chip absolute top-[10%] left-[0%] lg:-left-[10%] bg-[#ebe5d9] border border-brand-accent/20 px-5 py-3 font-mono text-[10px] font-bold text-brand-text shadow-xl z-30">
            15+ YEARS OF TRUST
          </div>
          <div className="stat-chip absolute bottom-[10%] right-[0%] lg:-right-[5%] bg-[#ebe5d9] border border-brand-accent/20 px-5 py-3 font-mono text-[10px] font-bold text-brand-text shadow-xl z-30">
            3,200 HOMES DELIVERED
          </div>

          {/* Wrapper for 3D Tilt */}
          <div ref={emblemWrapperRef} className="w-full max-w-[500px] w-[min(70vmin,500px)] aspect-square relative cursor-pointer mx-auto">
            
            <svg viewBox="0 0 600 600" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" className="overflow-visible block">
              
              {/* Outer Ring Wrapper */}
              <g ref={ringOuterWrapperRef} style={{ transformBox: 'view-box', transformOrigin: '300px 300px' }}>
                <circle cx="300" cy="300" r="280" fill="none" stroke="#2a4a9f" strokeWidth="1" strokeDasharray="4,4" opacity="0.3"/>
                <g ref={ringOuterRotRef} style={{ transformBox: 'view-box', transformOrigin: '300px 300px' }}>
                  {renderRingText("BUILDING LEGACIES • NM GROUP • BUILDING LEGACIES • NM GROUP • ", 262, 21, "#2a4a9f")}
                </g>
                
                {/* Guide Circle 1 */}
                <circle cx="300" cy="300" r="242" fill="none" stroke="#2a4a9f" strokeWidth="1" strokeDasharray="8,8" opacity="0.6"/>
                <g ref={orbit1RotRef} style={{ transformBox: 'view-box', transformOrigin: '300px 300px' }}>
                  <circle cx="300" cy="58" r="6" fill="#2a4a9f" />
                </g>
              </g>

              {/* Ring 2 (Inner) Wrapper */}
              <g ref={ringMiddleWrapperRef} style={{ transformBox: 'view-box', transformOrigin: '300px 300px' }}>
                <g ref={ringMiddleRotRef} style={{ transformBox: 'view-box', transformOrigin: '300px 300px' }}>
                  {renderRingText("INDORE • EST. 2009 • INDORE • EST. 2009 • INDORE • EST. 2009 • ", 210, 14, "#26231f")}
                </g>
                
                {/* Guide Circle 2 */}
                <circle cx="300" cy="300" r="190" fill="none" stroke="#2a4a9f" strokeWidth="0.5" opacity="0.6"/>
                <g ref={orbit2RotRef} style={{ transformBox: 'view-box', transformOrigin: '300px 300px' }}>
                  <circle cx="300" cy="110" r="4" fill="#2a4a9f" />
                </g>
              </g>

              {/* Inner Disc & Buildings Wrapper */}
              <g ref={discWrapperRef} style={{ transformBox: 'view-box', transformOrigin: '300px 300px' }}>
                <circle cx="300" cy="300" r="150" fill="#f3efe7" stroke="#2a4a9f" strokeWidth="2" />
                <circle cx="300" cy="300" r="138" fill="none" stroke="#2a4a9f" strokeWidth="0.5" opacity="0.3" />
                
                {/* Towers Group - Base at Y=410 so it's centered in the 300x300 circle */}
                <g transform="translate(300, 410)">
                  
                  {/* Left Tower */}
                  <g className="hero-tower" transform="translate(-40, -10)">
                    {/* Left Face */}
                    <path d="M 0 0 L -25 -12.5 L -25 -82.5 L 0 -70 Z" fill="#2a4a9f" stroke="#f3efe7" strokeWidth="1" strokeLinejoin="round"/>
                    {/* Windows dashed */}
                    <path d="M -5 -65 L -15 -70 M -5 -50 L -15 -55 M -5 -35 L -15 -40 M -5 -20 L -15 -25" stroke="#f3efe7" strokeWidth="2" strokeDasharray="3,3" opacity="0.6"/>
                    {/* Right Face */}
                    <path d="M 0 0 L 25 -12.5 L 25 -82.5 L 0 -70 Z" fill="#1d357a" stroke="#f3efe7" strokeWidth="1" strokeLinejoin="round"/>
                    {/* Top Face */}
                    <path d="M 0 -70 L -25 -82.5 L 0 -95 L 25 -82.5 Z" fill="#e9eefb" stroke="#f3efe7" strokeWidth="1" strokeLinejoin="round"/>
                  </g>

                  {/* Right Tower */}
                  <g className="hero-tower" transform="translate(45, 0)">
                    <path d="M 0 0 L -20 -10 L -20 -70 L 0 -60 Z" fill="#2a4a9f" stroke="#f3efe7" strokeWidth="1" strokeLinejoin="round"/>
                    <path d="M -5 -55 L -12 -58.5 M -5 -40 L -12 -43.5 M -5 -25 L -12 -28.5" stroke="#f3efe7" strokeWidth="2" strokeDasharray="2,2" opacity="0.6"/>
                    <path d="M 0 0 L 20 -10 L 20 -70 L 0 -60 Z" fill="#1d357a" stroke="#f3efe7" strokeWidth="1" strokeLinejoin="round"/>
                    <path d="M 0 -60 L -20 -70 L 0 -80 L 20 -70 Z" fill="#e9eefb" stroke="#f3efe7" strokeWidth="1" strokeLinejoin="round"/>
                  </g>

                  {/* Center Tall Tower */}
                  <g className="hero-tower" transform="translate(0, -30)">
                    <path d="M 0 0 L -30 -15 L -30 -145 L 0 -130 Z" fill="#2a4a9f" stroke="#f3efe7" strokeWidth="1" strokeLinejoin="round"/>
                    <path d="M -8 -120 L -20 -126 M -8 -100 L -20 -106 M -8 -80 L -20 -86 M -8 -60 L -20 -66 M -8 -40 L -20 -46 M -8 -20 L -20 -26" stroke="#f3efe7" strokeWidth="2" strokeDasharray="4,4" opacity="0.6"/>
                    <path d="M 0 0 L 30 -15 L 30 -145 L 0 -130 Z" fill="#1d357a" stroke="#f3efe7" strokeWidth="1" strokeLinejoin="round"/>
                    <path d="M 0 -130 L -30 -145 L 0 -160 L 30 -145 Z" fill="#e9eefb" stroke="#f3efe7" strokeWidth="1" strokeLinejoin="round"/>
                  </g>

                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Scroll Text */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 hero-fade-up">
        <span className="font-mono text-[9px] font-bold text-brand-accent tracking-[0.3em]">SCROLL TO EXPLORE</span>
        <div className="w-[1px] h-12 bg-brand-accent/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-brand-accent animate-[scrollDrop_1.5s_infinite_linear]" style={{ animationName: 'scrollDrop' }}></div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scrollDrop { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
        .transform-style-3d { transform-style: preserve-3d; }
      `}}/>
      
      {/* Marquee Base Section */}
      <div className="w-full mt-20 relative z-30 overflow-hidden bg-brand-base border-t border-b border-brand-accent/30 py-4">
        <div className="flex whitespace-nowrap w-[200%] animate-[marqueeScroll_30s_linear_infinite]" style={{ animationName: 'marqueeScroll' }}>
          {/* Content duplicated for infinite seamless scroll */}
          {/* TEXT EDITS: ARCHITECTURAL DESIGN, URBAN PLANNING, etc. */}
          <div className="flex-1 flex justify-around items-center font-mono text-sm md:text-base font-bold tracking-[0.2em] uppercase text-transparent" style={{ WebkitTextStroke: '1px #2a4a9f' }}>
            <span>ARCHITECTURAL DESIGN •</span>
            <span>URBAN PLANNING •</span>
            <span>COMMUNITY BUILDING •</span>
            <span>SUSTAINABLE DEVELOPMENT •</span>
            <span>LUXURY RESIDENCES •</span>
            <span>COMMERCIAL SPACES •</span>
          </div>
          <div className="flex-1 flex justify-around items-center font-mono text-sm md:text-base font-bold tracking-[0.2em] uppercase text-transparent" style={{ WebkitTextStroke: '1px #2a4a9f' }}>
            <span>ARCHITECTURAL DESIGN •</span>
            <span>URBAN PLANNING •</span>
            <span>COMMUNITY BUILDING •</span>
            <span>SUSTAINABLE DEVELOPMENT •</span>
            <span>LUXURY RESIDENCES •</span>
            <span>COMMERCIAL SPACES •</span>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[marqueeScroll_30s_linear_infinite\\] { animation: none !important; }
        }
      `}}/>
    </section>
  );
}
