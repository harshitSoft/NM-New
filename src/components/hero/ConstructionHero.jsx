import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ConstructionScene from './ConstructionScene';
import HeroContent from './HeroContent';
import ConstructionProgress from './ConstructionProgress';
import MeasurementMarks from './MeasurementMarks';
import ScrollIndicator from './ScrollIndicator';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import './construction-hero.css';

gsap.registerPlugin(ScrollTrigger);

const ConstructionHero = () => {
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  
  const { scrollProgress, setScrollProgress } = useScrollProgress();

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%",
        pin: pinRef.current,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [setScrollProgress]);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-brand-base">
      {/* Pinned Section */}
      <div ref={pinRef} className="hero-section">

        {/* Blueprint Measurement Overlay (Z: 4) */}
        <div className="absolute inset-0 z-[4] pointer-events-none mix-blend-overlay opacity-50">
          <MeasurementMarks progress={scrollProgress} />
        </div>

        {/* 3D Scene (Z: 2) */}
        <div className="hero-canvas-wrapper z-[2]">
          <ConstructionScene progress={scrollProgress} />
        </div>

        {/* Overlay Content (Z: 10) */}
        <div className="hero-content z-[10]">
          <HeroContent progress={scrollProgress} />
        </div>

        {/* Progress Indicator (Z: 10) */}
        <div className="absolute inset-x-0 top-20 md:top-0 md:bottom-0 md:left-auto md:right-0 z-[10] pointer-events-none">
          <ConstructionProgress progress={scrollProgress} />
        </div>
        
        {/* Scroll Indicator (Z: 20) */}
        <ScrollIndicator />

      </div>
    </div>
  );
};

export default ConstructionHero;
