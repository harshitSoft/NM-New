import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollIndicator() {
  const indicatorRef = useRef(null);

  useEffect(() => {
    const el = indicatorRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Entrance animation
    gsap.fromTo(el,
      { opacity: 0, y: prefersReducedMotion ? 0 : 10 },
      { opacity: 1, y: 0, duration: 0.8, delay: 1.5, ease: 'power2.out' }
    );

    // Bounce animation for the arrow
    let bounceAnim;
    if (!prefersReducedMotion) {
      bounceAnim = gsap.to(el.querySelector('.scroll-arrow'), {
        y: 8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }

    // Exit on scroll
    const scrollTrigger = ScrollTrigger.create({
      trigger: '.hero-section',
      start: 'top top',
      end: '+=300%',
      onUpdate: (self) => {
        // Fade out smoothly between 10% and 12%
        if (self.progress > 0.10) {
          gsap.to(el, { opacity: 0, y: prefersReducedMotion ? 0 : 10, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
        } else {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
        }
      },
    });

    return () => {
      if (bounceAnim) bounceAnim.kill();
      if (scrollTrigger) scrollTrigger.kill();
    };
  }, []);

  return (
    <div
      ref={indicatorRef}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-[20]"
      aria-hidden="true"
    >
      <div className="bg-[#FDF9F3]/90 backdrop-blur-sm px-4 py-1.5 rounded-full mb-2 shadow-lg border border-[#C6A15B]/30">
        <span className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#2B2622]">SCROLL TO EXPLORE</span>
      </div>
      <div className="scroll-arrow mt-1 drop-shadow-md">
        <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
          <rect x="1" y="1" width="22" height="38" rx="11" stroke="#C6A15B" strokeWidth="2" />
          <circle cx="12" cy="12" r="3" fill="#C6A15B" />
        </svg>
      </div>
    </div>
  );
}
