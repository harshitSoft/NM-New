import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiInstagram, FiLinkedin, FiFacebook, FiYoutube, FiArrowUp } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const CONFIG = {
  brand: "NM GROUP",
  tagline: "Creating places people belong. Premium villas, townships and residences across Indore.",
  explore: [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Business", path: "/business" },
    { name: "Projects", path: "/projects" },
    { name: "Leadership", path: "/leadership" },
    { name: "Foundation", path: "/foundation" },
    { name: "Media", path: "/media" },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" }
  ],
  projects: [
    { name: "NM London Villas", status: "Delivered", dot: "#7fe0a3", path: "/projects" },
    { name: "NM Grande", status: "Upcoming", dot: "#ffd27a", path: "/projects" },
    { name: "NM Heritage", status: "Ongoing", dot: "#8fb0ff", path: "/projects" },
    { name: "NM Pride", status: "Ongoing", dot: "#8fb0ff", path: "/projects" }
  ],
  contact: {
    address: ["NM Group Headquarters", "AB Road, Indore", "Madhya Pradesh 452010"],
    email: "info@thenmgroup.in",
    phone: "+91 98765 43210"
  },
  socials: [
    { name: "LinkedIn", url: "#", icon: FiLinkedin },
    { name: "Instagram", url: "#", icon: FiInstagram },
    { name: "Facebook", url: "#", icon: FiFacebook },
    { name: "YouTube", url: "#", icon: FiYoutube }
  ]
};

// Seeded random for skyline
const generateSkyline = () => {
  let seed = 7;
  const random = () => {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
  
  const buildings = [];
  let currentX = 0;
  const totalWidth = 1200;
  let maxHeight = 0;
  let tallestIndex = -1;
  let currentIndex = 0;
  
  while (currentX < totalWidth) {
    if (currentX >= 510 && currentX < 690) {
      currentX = 690;
      continue;
    }
    
    let w = 34 + random() * 40;
    if (currentX < 510 && currentX + w > 510) w = 510 - currentX;
    if (currentX + w > totalWidth) w = totalWidth - currentX;
    
    let h = 50 + random() * 110;
    let color = random() > 0.5 ? '#1d357a' : '#22409a';
    let hasSpire = random() > 0.8;
    
    let windows = [];
    const rows = 14;
    const cols = 12;
    const winW = (w / cols) - 1.5;
    const winH = (h / rows) - 2;
    
    for(let r=1; r<rows-1; r++) {
      for(let c=1; c<cols-1; c++) {
        if (random() > 0.3) {
          let isLit = random() < 0.38;
          windows.push({
            id: `win-${currentIndex}-${r}-${c}`,
            x: currentX + (w / cols) * c,
            y: 200 - h + (h / rows) * r,
            w: Math.max(1, winW),
            h: Math.max(1, winH),
            isLit
          });
        }
      }
    }
    
    buildings.push({ x: currentX, y: 200 - h, w, h, color, hasSpire, windows, index: currentIndex });
    
    if (currentX > totalWidth / 2 && h > maxHeight) {
      maxHeight = h;
      tallestIndex = buildings.length - 1;
    }
    currentX += w;
    currentIndex++;
  }
  return { buildings, tallestIndex };
};

const Footer = () => {
  const containerRef = useRef(null);
  const skylineRef = useRef(null);
  const craneRef = useRef(null);
  const siteBtnRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [timeStr, setTimeStr] = useState('');
  const [email, setEmail] = useState('');
  const [subState, setSubState] = useState('idle'); // idle, error, success
  const inputRef = useRef(null);
  
  const skylineData = useMemo(() => generateSkyline(), []);

  useEffect(() => {
    // Clock
    const tick = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false }));
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Mouse coords for grid mask
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCoords({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Magnetic Button
    const xToBtn = gsap.quickTo(siteBtnRef.current, "x", { duration: 0.4, ease: "power3" });
    const yToBtn = gsap.quickTo(siteBtnRef.current, "y", { duration: 0.4, ease: "power3" });
    const handleBtnMove = (e) => {
      if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const rect = siteBtnRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width/2) * 0.3;
      const y = (e.clientY - rect.top - rect.height/2) * 0.3;
      xToBtn(x);
      yToBtn(y);
    };
    const handleBtnLeave = () => { xToBtn(0); yToBtn(0); };
    
    if (siteBtnRef.current) {
      siteBtnRef.current.addEventListener('mousemove', handleBtnMove);
      siteBtnRef.current.addEventListener('mouseleave', handleBtnLeave);
    }
    return () => {
      if (siteBtnRef.current) {
        siteBtnRef.current.removeEventListener('mousemove', handleBtnMove);
        siteBtnRef.current.removeEventListener('mouseleave', handleBtnLeave);
      }
    };
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Entrance Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          once: true
        }
      });

      if (!isReduced) {
        gsap.set('.ft-headline-line', { yPercent: 115 });
        gsap.set('.ft-script, .ft-btn-row, .ft-col, .ft-crane, .ft-bottom', { opacity: 0 });
        gsap.set('.ft-badge', { scale: 0.5, rotation: -90, opacity: 0 });
        gsap.set('.ft-building', { scaleY: 0, transformOrigin: 'bottom' });

        tl.to('.ft-script', { opacity: 1, duration: 1 })
          .to('.ft-headline-line', { yPercent: 0, duration: 1, stagger: 0.12, ease: "expo.out" }, "-=0.8")
          .to('.ft-btn-row', { opacity: 1, duration: 0.8 }, "-=0.6")
          .to('.ft-badge', { scale: 1, rotation: 0, opacity: 1, duration: 1.2, ease: "back.out(1.5)" }, "-=1")
          .to('.ft-col', { opacity: 1, duration: 0.8, stagger: 0.12 }, "-=0.6")
          .to('.ft-building', { scaleY: 1, duration: 1, stagger: { amount: 0.5, from: "random" }, ease: "power3.out" }, "-=0.5")
          .to('.ft-crane', { opacity: 1, duration: 0.8 }, "-=0.2")
          .to('.ft-bottom', { opacity: 1, duration: 0.8 }, "-=0.4");

        // Parallax Skyline
        gsap.fromTo(skylineRef.current, 
          { y: 50 },
          { 
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "top 20%",
              scrub: true
            }
          }
        );

        // Window Twinkling Loop
        const twinkling = setInterval(() => {
          for(let i=0; i<8; i++) {
            const bIdx = Math.floor(Math.random() * skylineData.buildings.length);
            const b = skylineData.buildings[bIdx];
            if(b && b.windows.length > 0) {
              const wIdx = Math.floor(Math.random() * b.windows.length);
              const winEl = document.getElementById(b.windows[wIdx].id);
              if (winEl) {
                const currentOp = winEl.getAttribute('opacity');
                gsap.to(winEl, { opacity: currentOp === '1' ? 0.35 : 1, duration: 0.5 });
                if (currentOp === '1') {
                  gsap.set(winEl, { fill: '#6f8fe0' });
                } else {
                  gsap.set(winEl, { fill: '#ffd27a' });
                }
              }
            }
          }
        }, 500);

        return () => clearInterval(twinkling);
      }
    }, containerRef);

    // After fonts load, refresh ScrollTrigger
    document.fonts.ready.then(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, [skylineData]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setSubState('error');
      gsap.fromTo(inputRef.current, 
        { x: -5 }, 
        { x: 5, duration: 0.1, yoyo: true, repeat: 5, onComplete: () => setSubState('idle') }
      );
    } else {
      setSubState('success');
      setEmail('');
      // TODO: Connect to actual newsletter API
      setTimeout(() => setSubState('idle'), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      ref={containerRef}
      className="relative bg-[#2a4a9f] text-[#f3efe7] overflow-hidden"
      style={{ 
        borderRadius: '36px 36px 0 0', 
        padding: '90px 5vw 18px',
        '--mx': `${coords.x}px`,
        '--my': `${coords.y}px`
      }}
    >
      {/* CSS for complex loops and specific styles */}
      <style>{`
        .ft-grid-bg {
          background-image: linear-gradient(rgba(243,239,231,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(243,239,231,0.2) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .ft-grid-bright {
          background-image: linear-gradient(rgba(243,239,231,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(243,239,231,0.8) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(190px circle at var(--mx) var(--my), black 0%, transparent 100%);
          -webkit-mask-image: radial-gradient(190px circle at var(--mx) var(--my), black 0%, transparent 100%);
        }
        @media (prefers-reduced-motion: no-preference) {
          .crane-jib {
            animation: sway 3.2s sine-in-out infinite alternate;
            transform-origin: 3px 3px;
          }
          .crane-hook {
            animation: dropHook 2.6s ease-in-out infinite alternate;
          }
          .badge-spin {
            animation: badgeSpin 18s linear infinite;
          }
        }
        @keyframes sway {
          0% { transform: rotate(-2.5deg); }
          100% { transform: rotate(2.5deg); }
        }
        @keyframes dropHook {
          0% { transform: translateY(0); }
          100% { transform: translateY(34px); }
        }
        @keyframes badgeSpin {
          100% { transform: rotate(360deg); }
        }
        .link-hover:hover span {
          transform: translateX(8px);
          color: white;
        }
        .link-hover .arrow {
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s;
        }
        .link-hover:hover .arrow {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>

      {/* Grid Backgrounds */}
      <div className="absolute inset-0 ft-grid-bg opacity-[0.07] pointer-events-none z-0"></div>
      <div className="absolute inset-0 ft-grid-bright opacity-40 pointer-events-none z-0"></div>

      <div className="relative z-10">
        
        {/* TOP CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-16 lg:gap-8 items-center">
          
          <div className="flex flex-col">
            <span className="font-script text-[#ffd27a] text-2xl md:text-3xl lg:text-[2rem] -rotate-3 origin-left mb-6 ft-script">
              Let's build together
            </span>
            <h2 className="font-serif text-[clamp(2.4rem,6vw,6rem)] font-bold tracking-[-0.045em] leading-[0.92] text-white">
              <div className="overflow-hidden"><div className="ft-headline-line">YOUR NEXT</div></div>
              <div className="overflow-hidden"><div className="ft-headline-line text-[#ffd27a] italic">ADDRESS</div></div>
              <div className="overflow-hidden"><div className="ft-headline-line">STARTS HERE.</div></div>
            </h2>
            <div className="mt-10 flex flex-wrap items-center gap-6 ft-btn-row">
              <button 
                ref={siteBtnRef}
                className="group flex items-center gap-4 bg-[#f3efe7] text-[#26231f] rounded-full px-8 py-4 font-mono text-xs font-bold tracking-widest hover:bg-white transition-colors"
              >
                BOOK A SITE VISIT
                <div className="w-8 h-8 rounded-full bg-[#2a4a9f] flex items-center justify-center text-white group-hover:-rotate-45 transition-transform duration-300">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </button>
              <a href={`tel:${CONFIG.contact.phone.replace(/\s+/g,'')}`} className="font-mono text-sm underline underline-offset-4 hover:text-white transition-colors text-[#f3efe7]/90">
                {CONFIG.contact.phone}
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end items-center relative h-48 lg:h-full">
            <div className="relative w-48 h-48 ft-badge">
              <svg viewBox="0 0 200 200" className="w-full h-full badge-spin pointer-events-none">
                <path id="textPath" d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0" fill="none" />
                <text fill="#f3efe7" fontSize="13.5" fontWeight="bold" fontFamily="'Space Mono', monospace" letterSpacing="0.1em">
                  <textPath href="#textPath" startOffset="0%">
                    BUILDING LEGACIES • NM GROUP • INDORE • 
                  </textPath>
                </text>
              </svg>
              <Link to="/contact" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#f3efe7] text-[#2a4a9f] flex items-center justify-center text-2xl hover:scale-110 hover:-rotate-45 transition-all duration-300 z-10 shadow-xl">
                ↗
              </Link>
            </div>
          </div>
          
        </div>

        {/* LINK COLUMNS */}
        <div className="mt-16 pt-9 border-t border-[#f3efe7]/30 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.4fr] gap-12 lg:gap-8">
          
          {/* Brand Col */}
          <div className="ft-col flex flex-col gap-6">
            <h3 className="font-serif text-3xl font-bold tracking-tight text-white">{CONFIG.brand}</h3>
            <p className="font-mono text-xs leading-relaxed text-[#f3efe7]/80 max-w-[250px]">{CONFIG.tagline}</p>
            <div className="font-mono text-xs text-[#f3efe7]/80 leading-loose mt-2">
              {CONFIG.contact.address.map((line, i) => <div key={i}>{line}</div>)}
              <a href={`mailto:${CONFIG.contact.email}`} className="block mt-4 hover:text-white underline underline-offset-4">{CONFIG.contact.email}</a>
            </div>
            <div className="flex gap-4 mt-2">
              {CONFIG.socials.map(s => {
                const Icon = s.icon;
                return (
                  <a key={s.name} href={s.url} aria-label={s.name} className="w-[38px] h-[38px] rounded-full border border-[#f3efe7]/30 flex items-center justify-center text-[#f3efe7] hover:bg-[#f3efe7] hover:text-[#2a4a9f] hover:-translate-y-[5px] transition-all duration-300">
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Explore */}
          <div className="ft-col flex flex-col gap-4">
            <h4 className="font-mono text-[10px] tracking-[0.2em] font-bold text-[#ffd27a] mb-2">// EXPLORE</h4>
            <ul className="flex flex-col gap-3">
              {CONFIG.explore.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="link-hover group flex items-center font-mono text-[12px] text-[#f3efe7]/75">
                    <span className="arrow mr-2 text-[#ffd27a] text-[10px]">→</span>
                    <span className="transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div className="ft-col flex flex-col gap-4">
            <h4 className="font-mono text-[10px] tracking-[0.2em] font-bold text-[#ffd27a] mb-2">// PROJECTS</h4>
            <ul className="flex flex-col gap-3">
              {CONFIG.projects.map(proj => (
                <li key={proj.name}>
                  <Link to={proj.path} className="link-hover group flex items-center font-mono text-[12px] text-[#f3efe7]/75">
                    <span className="w-1.5 h-1.5 rounded-full mr-3 shrink-0" style={{ backgroundColor: proj.dot }}></span>
                    <span className="arrow mr-2 text-[#ffd27a] text-[10px]">→</span>
                    <span className="transition-transform duration-300 whitespace-nowrap">{proj.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Updated */}
          <div className="ft-col flex flex-col gap-4">
            <h4 className="font-mono text-[10px] tracking-[0.2em] font-bold text-[#ffd27a] mb-2">// STAY UPDATED</h4>
            <p className="font-mono text-xs text-[#f3efe7]/75 leading-relaxed mb-2">Subscribe to our newsletter for the latest updates, launches, and insights.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <input 
                ref={inputRef}
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className={`bg-[#1d357a]/50 border ${subState === 'error' ? 'border-red-400' : 'border-[#f3efe7]/30'} rounded-full px-6 py-3.5 font-mono text-[11px] text-white focus:outline-none focus:border-[#ffd27a] transition-colors w-full`}
              />
              <button 
                type="submit"
                className="bg-[#f3efe7] text-[#26231f] rounded-full px-6 py-3.5 font-mono text-[11px] font-bold tracking-widest hover:bg-white transition-colors w-full"
              >
                {subState === 'success' ? 'SUBSCRIBED ✓' : 'SUBSCRIBE →'}
              </button>
            </form>
          </div>

        </div>

        {/* SKYLINE */}
        <div className="mt-14 -mx-[5vw] mb-0 relative" ref={skylineRef}>
          <svg viewBox="0 30 1200 200" preserveAspectRatio="none" className="w-full h-[18vw] min-h-[120px] max-h-[220px] block" aria-hidden="true">
            {/* Background skyline elements */}
            {skylineData.buildings.map((b, i) => (
              <g key={i} className="ft-building">
                <rect x={b.x} y={b.y} width={b.w} height={b.h} fill={b.color} />
                {b.hasSpire && (
                  <polygon points={`${b.x},${b.y} ${b.x + b.w/2},${b.y - 15} ${b.x + b.w},${b.y}`} fill={b.color} />
                )}
                {/* Windows */}
                {b.windows.map(win => (
                  <rect 
                    key={win.id} 
                    id={win.id}
                    x={win.x} 
                    y={win.y} 
                    width={win.w} 
                    height={win.h} 
                    fill={win.isLit ? '#ffd27a' : '#6f8fe0'} 
                    opacity={win.isLit ? 1 : 0.35} 
                  />
                ))}
              </g>
            ))}
            
            {/* NM Pride Arch Gate in the gap */}
            <g className="ft-building">
              <path d="M 530 200 L 530 120 C 530 80, 670 80, 670 120 L 670 200 L 650 200 L 650 120 C 650 95, 550 95, 550 120 L 550 200 Z" fill="#f3efe7" opacity="0.9" />
              <rect x="585" y="100" width="30" height="10" fill="#f3efe7" opacity="0.9" />
            </g>

            {/* Crane on tallest building */}
            {skylineData.tallestIndex >= 0 && (
              <g className="ft-crane" transform={`translate(${skylineData.buildings[skylineData.tallestIndex].x + skylineData.buildings[skylineData.tallestIndex].w/2 - 3}, ${skylineData.buildings[skylineData.tallestIndex].y - 40})`}>
                {/* Mast */}
                <rect x="0" y="0" width="6" height="40" fill="#ffd27a" />
                <path d="M 0 0 L 6 10 M 0 10 L 6 20 M 0 20 L 6 30 M 0 30 L 6 40" stroke="#1d357a" strokeWidth="1" />
                
                {/* Rotating Jib Group */}
                <g className="crane-jib">
                  {/* Counter jib */}
                  <rect x="-30" y="-3" width="30" height="6" fill="#ffd27a" />
                  <path d="M -30 -3 L 3 -15 L 3 -3" stroke="#ffd27a" strokeWidth="1" fill="none" />
                  <rect x="-28" y="3" width="8" height="8" fill="#1d357a" /> {/* Counterweight */}
                  
                  {/* Jib */}
                  <rect x="6" y="-3" width="80" height="6" fill="#ffd27a" />
                  <path d="M 6 -3 L 80 3 M 6 3 L 80 -3" stroke="#1d357a" strokeWidth="0.5" />
                  <path d="M 3 -15 L 60 -3" stroke="#ffd27a" strokeWidth="1" fill="none" />
                  
                  {/* Cab */}
                  <rect x="3" y="3" width="10" height="10" fill="#f3efe7" rx="2" />
                  
                  {/* Hook & Cable */}
                  <g transform="translate(65, 3)">
                    <line x1="0" y1="0" x2="0" y2="20" stroke="#f3efe7" strokeWidth="1" className="crane-hook" />
                    <path d="M -3 20 L 3 20 L 0 25 Z" fill="#ffd27a" className="crane-hook" />
                  </g>
                </g>
              </g>
            )}

            {/* Ground Line */}
            <rect x="0" y="198" width="1200" height="2" fill="#f3efe7" opacity="0.5" />
          </svg>
        </div>

        {/* BOTTOM BAR */}
        <div className="ft-bottom mt-2 pt-4 border-t border-[#f3efe7]/20 flex flex-wrap justify-between items-center gap-4 font-mono text-[11px] text-[#f3efe7]/75 relative z-10 pb-[env(safe-area-inset-bottom)]">
          <div className="flex gap-4">
            <span>&copy; {new Date().getFullYear()} {CONFIG.brand} · ALL RIGHTS RESERVED</span>
          </div>
          <div className="hidden md:block">
            INDORE <span className="text-[#ffd27a] font-bold mx-1">{timeStr}</span> IST · 22.7196°N 75.8577°E
          </div>
          <div className="flex items-center gap-6">
            <Link to="#" className="hover:text-white underline-offset-4 hover:underline">Privacy</Link>
            <Link to="#" className="hover:text-white underline-offset-4 hover:underline">Terms</Link>
            <Link to="#" className="hover:text-white underline-offset-4 hover:underline">RERA</Link>
            <button 
              onClick={scrollToTop} 
              aria-label="Back to top"
              className="w-11 h-11 rounded-full border border-[#f3efe7]/30 flex items-center justify-center text-[#f3efe7] hover:bg-[#f3efe7] hover:text-[#2a4a9f] hover:-translate-y-[5px] transition-all duration-300 ml-2 shrink-0"
            >
              <FiArrowUp size={16} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
