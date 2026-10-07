import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { name: 'NM LONDON VILLAS', typology: 'Premium Villas', location: 'Indore', scale: '25+ Acres', status: 'Delivered', image: '/assets/images/12-projects-london-villas.jpg' },
  { name: 'NM GRANDE', typology: 'Luxury Apartments', location: 'Indore', scale: '6 Acres', status: 'Upcoming', image: '/assets/images/13-grande-elevation.jpg' },
  { name: 'NM HERITAGE', typology: 'Premium Villas', location: 'Indore', scale: '25+ Acres', status: 'Ongoing', image: '/assets/images/12-projects-heritage-wide.jpg' },
  { name: 'NM PRIDE', typology: 'Gated Township', location: 'Indore', scale: '40+ Acres', status: 'Ongoing', image: '/assets/images/12-projects-pride.jpg' }
];

export default function FeaturedDevelopments() {
  const sectionRef = useRef(null);
  const stackRef = useRef(null);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let currentIndex = 0;

      // Ensure heights are calculated before pinning
      ScrollTrigger.refresh();

      // Pin section
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=320%",
        pin: true,
        onUpdate: (self) => {
          let newIndex = Math.floor(self.progress * 4);
          if (newIndex >= 4) newIndex = 3;
          
          if (newIndex !== currentIndex) {
            changeRow(currentIndex, newIndex, isReduced);
            currentIndex = newIndex;
            setActiveIndex(newIndex);
          }
        }
      });

      // Mouse Parallax on images
      if (!isReduced && stackRef.current) {
        const xTo = gsap.quickTo(stackRef.current, "x", { duration: 0.6, ease: "power3" });
        const yTo = gsap.quickTo(stackRef.current, "y", { duration: 0.6, ease: "power3" });
        
        sectionRef.current.addEventListener("mousemove", (e) => {
          const rect = sectionRef.current.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          xTo(x * -22); // ±11px
          yTo(y * -16); // ±8px
        });
      }

      // Initial state setup
      gsap.set('.image-layer', { zIndex: 0, clipPath: 'inset(100% 0 0 0)' });
      gsap.set('.layer-0', { zIndex: 1, clipPath: 'inset(0% 0 0 0)' });
      gsap.set('.row-content', { height: 0 });
      gsap.set('.row-0 .row-content', { height: 'auto' });
      gsap.set('.active-line', { width: '0%' });
      gsap.set('.row-0 .active-line', { width: '100%' });
      
      // Init progress bar
      gsap.set('.progress-segment', { width: '0%' });
      gsap.set('.segment-0', { width: '100%' });

      // Intro Fade
      gsap.from('.section-fade', {
        y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      setIsMounted(true);

      return () => {
        st.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate caption content when activeIndex changes
  useEffect(() => {
    if (isMounted) {
      gsap.fromTo('.caption-content > *', 
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.05, overwrite: true }
      );
      gsap.fromTo('.counter-text', { opacity: 0 }, { opacity: 1, duration: 0.3, overwrite: true });
    }
  }, [activeIndex, isMounted]);

  const changeRow = (oldIndex, newIndex, isReduced) => {
    if (isReduced) {
       gsap.set(`.layer-${oldIndex}`, { zIndex: 0, clipPath: 'inset(100% 0 0 0)' });
       gsap.set(`.layer-${newIndex}`, { zIndex: 1, clipPath: 'inset(0% 0 0 0)' });
       gsap.set(`.row-${oldIndex} .row-content`, { height: 0 });
       gsap.set(`.row-${newIndex} .row-content`, { height: 'auto' });
       return;
    }

    const tl = gsap.timeline();
    // Collapse old row
    tl.to(`.row-${oldIndex} .row-content`, { height: 0, duration: 0.6, ease: "power3.out" }, 0);
    tl.to(`.row-${oldIndex} .active-line`, { width: '0%', duration: 0.4 }, 0);
    tl.to(`.row-${oldIndex} .row-title`, { x: 0, color: '#8d867b', duration: 0.4 }, 0);
    tl.to(`.row-${oldIndex} .row-indicator`, { borderColor: '#8d867b', color: '#8d867b', rotate: 0 }, 0);
    
    // Expand new row
    tl.to(`.row-${newIndex} .row-content`, { height: 'auto', duration: 0.6, ease: "power3.out" }, 0);
    tl.to(`.row-${newIndex} .active-line`, { width: '100%', duration: 0.6, ease: "power3.out" }, 0);
    tl.to(`.row-${newIndex} .row-title`, { x: 14, color: '#26231f', duration: 0.6, ease: "power3.out" }, 0);
    tl.to(`.row-${newIndex} .row-indicator`, { borderColor: '#26231f', color: '#26231f', rotate: 180 }, 0);
    
    // Animate details inside new row
    tl.fromTo(`.row-${newIndex} .detail-cell`, 
      { y: 15, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: "power2.out" }, 
    0.3);

    // Image reveal
    gsap.set(`.layer-${newIndex}`, { zIndex: 2 });
    gsap.set(`.layer-${oldIndex}`, { zIndex: 1 });
    
    tl.fromTo(`.layer-${newIndex}`, 
      { clipPath: 'inset(100% 0 0 0)' }, 
      { clipPath: 'inset(0% 0 0 0)', duration: 1.1, ease: "expo.inOut" }, 
    0);
    
    tl.fromTo(`.layer-${newIndex} .image-inner`,
      { scale: 1.25 },
      { scale: 1, duration: 1.8, ease: "power3.out" },
    0);

    // Reset old image clip
    tl.set(`.layer-${oldIndex}`, { clipPath: 'inset(100% 0 0 0)' }, 1.2);
    
    // Progress bar
    gsap.to(`.progress-segment`, { width: '0%', duration: 0.3 });
    for(let i=0; i<=newIndex; i++) {
       gsap.to(`.segment-${i}`, { width: '100%', duration: 0.4, delay: i===newIndex ? 0.2 : 0 });
    }
  };

  const handleRowClick = (i) => {
    const st = ScrollTrigger.getAll().find(s => s.trigger === sectionRef.current);
    if (st) {
      const scrollPos = st.start + ((st.end - st.start) * (i / 4)) + 10;
      window.scrollTo({ top: scrollPos, behavior: 'smooth' });
    }
  };

  const activeProject = projects[activeIndex] || projects[0];

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-[#f3efe7] text-[#26231f] overflow-hidden" style={{
      backgroundImage: 'linear-gradient(rgba(42,74,159,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(42,74,159,0.13) 1px, transparent 1px)',
      backgroundSize: '40px 40px'
    }}>
      
      {/* Header (Absolute Top) */}
      <div className="absolute top-6 md:top-10 left-0 w-full px-6 md:px-12 flex justify-between items-end z-30 pointer-events-none">
        <h2 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-[#26231f] tracking-tighter uppercase section-fade pb-2">
          FEATURED<br/>DEVELOPMENTS
        </h2>
        <Link to="/projects" className="section-fade text-[#2a4a9f] font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold flex items-center gap-2 bg-[#f3efe7] border border-[#2a4a9f]/30 px-5 md:px-6 py-3 hover:bg-[#26231f] hover:text-[#f3efe7] transition-colors shadow-sm pointer-events-auto">
          VIEW ALL &rarr;
        </Link>
      </div>

      {/* Main Grid Content */}
      <div className="w-full h-[100vh] pt-[150px] md:pt-[190px] pb-6 md:pb-8 px-6 md:px-12 grid grid-cols-1 md:grid-cols-[0.8fr_1fr] gap-6 md:gap-[5vw] z-20 relative max-w-[1400px] mx-auto items-center">
        
        {/* LEFT: Stacked Images */}
        <div className="relative w-full h-[35vh] md:h-[65vh] max-h-[650px] border border-[#2a4a9f] overflow-hidden group">
          {/* Corner Brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#f3efe7]/70 z-30 m-4 pointer-events-none" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#f3efe7]/70 z-30 m-4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#f3efe7]/70 z-30 m-4 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#f3efe7]/70 z-30 m-4 pointer-events-none" />
          
          {/* Image Stack */}
          <div ref={stackRef} className="absolute inset-[-4%] w-[108%] h-[108%]">
            {projects.map((p, i) => (
              <div key={i} className={`image-layer layer-${i} absolute inset-0 overflow-hidden ${i===0 ? 'z-10' : 'z-0'}`}>
                {p.image ? (
                  <div className="image-inner absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${p.image})` }} alt={p.name} />
                ) : (
                  <div className="image-inner absolute inset-0 bg-[#ebe5d9] flex items-center justify-center font-mono text-[#8d867b]">{p.name}</div>
                )}
                {/* Dark gradient overlay for legibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />
              </div>
            ))}
          </div>

          {/* Caption & Counter overlay (z-20) */}
          <div className="absolute inset-0 z-20 flex flex-col justify-between p-4 md:p-6 pointer-events-none">
            <div className="font-mono text-white text-xs md:text-sm font-bold tracking-widest counter-text drop-shadow-md">
              0{activeIndex + 1} / 04
            </div>
            
            <div className="w-full bg-[#f3efe7]/90 backdrop-blur-md p-4 md:p-6 flex justify-between items-end border border-[#2a4a9f]/20 pointer-events-auto">
              <div className="caption-content">
                <div className="mb-1 md:mb-2 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${activeProject.status === 'Ongoing' ? 'bg-[#2a4a9f] animate-pulse' : 'bg-[#8d867b]'}`}></span>
                  <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-[#2a4a9f] font-bold">{activeProject.status}</span>
                </div>
                <h3 className="font-sans text-xl md:text-3xl font-bold uppercase tracking-tight text-[#26231f]">{activeProject.name}</h3>
                <p className="font-mono text-[#8d867b] text-[9px] md:text-[10px] uppercase tracking-widest mt-1">
                  {activeProject.typology} · {activeProject.location} · {activeProject.scale}
                </p>
              </div>
              <Link to={`/projects/${activeProject.name.toLowerCase().replace(/ /g, '-')}`} className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#2a4a9f] flex items-center justify-center text-[#2a4a9f] hover:bg-[#2a4a9f] hover:text-[#f3efe7] transition-all -rotate-45 hover:rotate-0">
                 &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT: Accordion */}
        <div className="flex flex-col justify-center h-full relative z-20 section-fade">
          {projects.map((p, i) => (
            <div key={i} className={`accordion-row row-${i} border-t border-[#2a4a9f]/30 ${i===3 ? 'border-b' : ''} relative`}>
               <div className="active-line absolute top-0 left-0 h-[1px] bg-[#2a4a9f] w-0" />
               <button 
                 onClick={() => handleRowClick(i)} 
                 className="w-full py-4 md:py-5 flex items-center justify-between text-left group cursor-pointer"
                 aria-expanded={activeIndex === i}
               >
                 <div className="flex items-center gap-4 md:gap-6">
                   <span className="font-mono text-[#2a4a9f] text-xs md:text-sm font-bold">0{i+1}</span>
                   <h3 className={`row-title font-sans font-bold text-[clamp(1.1rem,2vw,2rem)] tracking-tight uppercase transition-all duration-500 ${i===0 ? 'text-[#26231f] translate-x-[14px]' : 'text-[#8d867b]'}`}>
                     {p.name}
                   </h3>
                 </div>
                 <div className={`row-indicator w-6 h-6 md:w-8 md:h-8 rounded-full border flex items-center justify-center transition-colors ${i===0 ? 'border-[#26231f] text-[#26231f]' : 'border-[#8d867b] text-[#8d867b]'}`}>
                   {i === activeIndex ? '-' : '+'}
                 </div>
               </button>

               <div className={`row-content overflow-hidden ${i===0 ? 'h-auto' : 'h-0'}`} aria-hidden={activeIndex !== i}>
                  <div className="pb-4 md:pb-6 pl-8 md:pl-12 grid grid-cols-2 gap-y-3 md:gap-y-4 gap-x-2 md:gap-x-4">
                     <div className="detail-cell opacity-100 translate-y-0">
                       <p className="font-mono text-[8px] md:text-[9px] text-[#8d867b] uppercase tracking-[0.2em] mb-1">Typology</p>
                       <p className="font-mono text-[#2a4a9f] font-bold text-xs md:text-sm uppercase">{p.typology}</p>
                     </div>
                     <div className="detail-cell opacity-100 translate-y-0">
                       <p className="font-mono text-[8px] md:text-[9px] text-[#8d867b] uppercase tracking-[0.2em] mb-1">Location</p>
                       <p className="font-mono text-[#2a4a9f] font-bold text-xs md:text-sm uppercase">{p.location}</p>
                     </div>
                     <div className="detail-cell opacity-100 translate-y-0">
                       <p className="font-mono text-[8px] md:text-[9px] text-[#8d867b] uppercase tracking-[0.2em] mb-1">Scale</p>
                       <p className="font-mono text-[#2a4a9f] font-bold text-xs md:text-sm uppercase">{p.scale}</p>
                     </div>
                     <div className="detail-cell opacity-100 translate-y-0">
                       <p className="font-mono text-[8px] md:text-[9px] text-[#8d867b] uppercase tracking-[0.2em] mb-1">Status</p>
                       <div className="flex items-center gap-2">
                         <span className={`w-1.5 h-1.5 rounded-full ${p.status==='Ongoing' ? 'bg-[#2a4a9f] animate-pulse' : p.status==='Upcoming' ? 'bg-[#8d867b]' : 'bg-[#1d357a]'}`}></span>
                         <p className="font-mono text-[#2a4a9f] font-bold text-xs md:text-sm uppercase">{p.status}</p>
                       </div>
                     </div>
                  </div>
                  <div className="pl-8 md:pl-12 pb-4 detail-cell">
                     <Link to={`/projects/${p.name.toLowerCase().replace(/ /g, '-')}`} className="font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-[0.1em] text-[#26231f] border-b border-[#26231f] pb-1 hover:text-[#2a4a9f] hover:border-[#2a4a9f] transition-colors">
                       VIEW PROJECT &rarr;
                     </Link>
                  </div>
               </div>
            </div>
          ))}
          
          {/* Progress Strip */}
          <div className="w-full flex gap-2 mt-4 md:mt-8 section-fade">
            {projects.map((_, i) => (
              <div key={i} className="flex-1 h-[2px] bg-[#2a4a9f]/20 overflow-hidden">
                <div className={`progress-segment segment-${i} h-full bg-[#2a4a9f]`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
