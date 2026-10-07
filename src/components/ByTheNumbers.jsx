import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// TODO: Replace placeholders with real figures
const statsData = [
  { id: 1, value: 25, suffix: "+", label: "Years of experience" },
  { id: 2, value: 120, suffix: "+", label: "Projects delivered" },
  { id: 3, value: 8, suffix: "M", label: "Sq ft developed" },
  { id: 4, value: 4500, suffix: "+", label: "Happy families" }
];

// Generates an array of buildings for the skyline
const buildingsData = [
  { id: 1, x: 2, w: 6, h: 35, type: 'neutral', windows: 3 },
  { id: 2, x: 10, w: 8, h: 60, type: 'neutral', windows: 5 },
  { id: 3, x: 20, w: 5, h: 40, type: 'neutral', windows: 3 },
  { id: 4, x: 27, w: 9, h: 75, type: 'neutral', windows: 6 },
  { id: 5, x: 38, w: 6, h: 50, type: 'neutral', windows: 4 },
  { id: 6, x: 46, w: 8, h: 85, type: 'accent', windows: 8 }, // Highlighted building
  { id: 7, x: 56, w: 6, h: 35, type: 'neutral', windows: 3 },
  { id: 8, x: 64, w: 8, h: 65, type: 'neutral', windows: 5 },
  { id: 9, x: 74, w: 10, h: 55, type: 'neutral', windows: 4 },
  { id: 10, x: 86, w: 6, h: 30, type: 'neutral', windows: 2 },
  { id: 11, x: 94, w: 4, h: 45, type: 'neutral', windows: 3 }
];

export default function ByTheNumbers() {
  const sectionRef = useRef(null);
  const numberRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Initial States
      if (!isReduced) {
        gsap.set('.btn-label', { y: 20, opacity: 0 });
        gsap.set('.btn-word', { y: 30, opacity: 0 });
        gsap.set('.btn-stat', { y: 30, opacity: 0 });
        gsap.set('.btn-building', { scaleY: 0, transformOrigin: 'bottom' });
        gsap.set('.btn-window', { opacity: 0 });
      } else {
        // Reduced motion: ensure everything is visible
        gsap.set(['.btn-label', '.btn-word', '.btn-stat', '.btn-building', '.btn-window'], { opacity: 1, y: 0, scaleY: 1 });
      }

      // Main Animation Sequence
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%", // Triggers when ~25% of section enters
        once: true,
        onEnter: () => {
          if (isReduced) {
            // For reduced motion, just instantly set numbers to final values
            numberRefs.current.forEach((el, i) => {
              if (el) el.innerText = formatNumber(statsData[i].value) + statsData[i].suffix;
            });
            return;
          }

          const tl = gsap.timeline();

          // 1. Label fades and slides up
          tl.to('.btn-label', { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0);

          // 2. Headline splits into words
          tl.to('.btn-word', { 
            y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.07 
          }, 0.2);

          // 3. Stat blocks fade and slide up
          tl.to('.btn-stat', { 
            y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.12 
          }, 0.4);

          // 4. Numbers count up
          statsData.forEach((stat, i) => {
            const obj = { val: 0 };
            tl.to(obj, {
              val: stat.value,
              duration: 1.8,
              ease: "power2.out",
              onUpdate: () => {
                if (numberRefs.current[i]) {
                  numberRefs.current[i].innerText = formatNumber(Math.floor(obj.val)) + stat.suffix;
                }
              }
            }, 0.6 + (i * 0.1));
          });

          // 5. Skyline buildings grow
          tl.to('.btn-building', {
            scaleY: 1, duration: 1.2, ease: "expo.out", stagger: 0.08
          }, 0.8);

          // 6. Window lines fade in
          tl.to('.btn-window', {
            opacity: 1, duration: 0.6, ease: "power2.out"
          }, 1.4);
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Formats numbers with thousands separators
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const headlineStr = "Built on trust, proven in steel and stone";
  const headlineWords = headlineStr.split(" ");

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-[#f3efe7] text-[#26231f] pt-24 pb-[200px] md:pt-32 md:pb-[300px] overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(rgba(42,74,159,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(42,74,159,0.13) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}
      aria-labelledby="numbers-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-20">
        
        {/* Header */}
        <div className="max-w-4xl mb-16 md:mb-24">
          <p className="btn-label font-mono text-[#2a4a9f] text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold mb-4">
            Our track record
          </p>
          <h2 id="numbers-heading" className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl tracking-tighter uppercase leading-[0.95]">
            {headlineWords.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.3em] align-top">
                <span className="btn-word inline-block">{word}</span>
              </span>
            ))}
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
          {statsData.map((stat, i) => (
            <div key={stat.id} className="btn-stat border-b border-[#2a4a9f]/30 pb-4 flex flex-col justify-end">
              {/* Screen reader only text so it reads the final number natively */}
              <span className="sr-only">{formatNumber(stat.value)}{stat.suffix} {stat.label}</span>
              <div 
                className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-[#26231f] tracking-tighter mb-1"
                aria-hidden="true"
                ref={el => numberRefs.current[i] = el}
              >
                0{stat.suffix}
              </div>
              <p className="font-mono text-[#8d867b] text-[10px] md:text-xs uppercase tracking-[0.1em]" aria-hidden="true">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Skyline Graphic across the bottom */}
      <div className="btn-skyline-wrapper absolute bottom-0 left-0 w-full h-[200px] md:h-[300px] z-10 pointer-events-none origin-bottom">
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-full block">
          
          {/* Baseline */}
          <line x1="0" y1="99.5" x2="1000" y2="99.5" stroke="#2a4a9f" strokeWidth="1" />

          {/* Buildings */}
          {buildingsData.map((b) => {
            const fillColor = '#2a4a9f';
            const strokeColor = '#1d357a';
            
            // X and W are percentages mapped to 1000 viewBox width
            const bx = (b.x / 100) * 1000;
            const bw = (b.w / 100) * 1000;
            // H is percentage mapped to 100 viewBox height
            const bh = b.h;
            const by = 100 - bh;

            return (
              <g key={b.id} className="btn-building" style={{ transformOrigin: `${bx + bw/2}px 100px` }}>
                <rect 
                  x={bx} 
                  y={by} 
                  width={bw} 
                  height={bh} 
                  fill={fillColor} 
                  stroke={strokeColor}
                  strokeWidth="0.5"
                />
                
                {/* Windows */}
                {Array.from({ length: b.windows }).map((_, wi) => {
                  // Distribute windows vertically
                  const windowY = by + 5 + (wi * ((bh - 10) / b.windows));
                  const windowColor = '#e9eefb';
                  return (
                    <line 
                      key={wi}
                      className="btn-window"
                      x1={bx + 10} 
                      y1={windowY} 
                      x2={bx + bw - 10} 
                      y2={windowY} 
                      stroke={windowColor} 
                      strokeWidth="0.5"
                      strokeDasharray="4 2"
                      opacity="0.6"
                    />
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
}
