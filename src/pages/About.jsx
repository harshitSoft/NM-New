import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlobalParticles from '../components/GlobalParticles';
import { Timeline } from '../components/Timeline';
import CountUp from '../components/CountUp';

const About = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const journeyEntries = [
    { title: "NM Diamond City", subtitle: "2010 · Chapter I", description: "The pioneering development that laid the foundation for future growth." },
    { title: "NM London Villas", subtitle: "2015 · Chapter II", description: "Elegant villas inspired by timeless European residential planning." },
    { title: "NM Verge", subtitle: "2018 · Chapter III", description: "A premium commercial destination designed for growing businesses." },
    { title: "NM Grande", subtitle: "2021 · Chapter IV", description: "Expanding the vision of thoughtfully planned neighbourhoods." },
    { title: "NM Pride", subtitle: "2023 · Chapter V", description: "A master-planned township celebrating classical Roman architecture.", image: "/assets/images/11-journey-nm-pride.jpg" },
    { title: "NM Heritage", subtitle: "2024 · Chapter VI", description: "Luxury neoclassical residences meeting contemporary living.", image: "/assets/images/11-journey-nm-heritage.jpg" },
  ];

  return (
    <>
      <GlobalParticles />
      <Navbar />
      <main className="mb-[80vh] bg-brand-base shadow-2xl relative z-10">
        
        {/* Story Hero with Parallax */}
        <section ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-brand-base">
          <motion.div 
            style={{ y: bgY }} 
            className="absolute inset-0 w-full h-[120%] -top-[10%]"
          >
            <img src="/assets/images/03-about-heritage-facade.jpg" alt="Blueprint" className="w-full h-full object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/40 to-[#050505]" />

          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <h1 className="font-sans font-bold text-6xl md:text-8xl lg:text-9xl text-white mb-6 overflow-hidden tracking-tighter uppercase">
              <motion.span 
                initial={{ y: 150 }} 
                animate={{ y: 0 }} 
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} 
                className="block"
              >
                Building
              </motion.span>
              <motion.span 
                initial={{ y: 150 }} 
                animate={{ y: 0 }} 
                transition={{ duration: 1, delay: 0.1, ease: [0.76, 0, 0.24, 1] }} 
                className="block font-handwriting text-brand-accent capitalize font-normal"
              >
                Legacy.
              </motion.span>
            </h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-white opacity-90 max-w-lg mx-auto text-lg font-light"
            >
              Every city deserves landmarks that future generations will be proud to inherit. We build for permanence.
            </motion.p>
          </div>
        </section>

        {/* Values / Numbers Section */}
        <section className="py-24 bg-transparent">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-gray-800">
              <div className="pt-8 md:pt-0">
                <div className="font-sans font-bold text-5xl lg:text-6xl text-brand-accent mb-2">
                  <CountUp to={13} suffix="+" />
                </div>
                <p className="text-[11px] font-mono uppercase tracking-widest font-bold text-brand-text opacity-60">Years of Trust</p>
              </div>
              <div className="pt-8 md:pt-0">
                <div className="font-sans font-bold text-5xl lg:text-6xl text-brand-accent mb-2">
                  <CountUp to={15} suffix="+" />
                </div>
                <p className="text-[11px] font-mono uppercase tracking-widest font-bold text-brand-text opacity-60">Projects Delivered</p>
              </div>
              <div className="pt-8 md:pt-0">
                <div className="font-sans font-bold text-5xl lg:text-6xl text-brand-accent mb-2">
                  <CountUp to={3000} suffix="+" />
                </div>
                <p className="text-[11px] font-mono uppercase tracking-widest font-bold text-brand-text opacity-60">Happy Families</p>
              </div>
              <div className="pt-8 md:pt-0">
                <div className="font-sans font-bold text-5xl lg:text-6xl text-brand-accent mb-2">
                  <CountUp to={5} suffix="M+" />
                </div>
                <p className="text-[11px] font-mono uppercase tracking-widest font-bold text-brand-text opacity-60">Sq. Ft. Developed</p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-24 bg-brand-surface-alt overflow-hidden relative z-10">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12">
            <div className="text-center mb-16 border-b border-brand-accent/20 pb-8">
              <span className="text-[11px] font-mono uppercase tracking-widest font-bold text-brand-accent block mb-4">// OUR JOURNEY</span>
              <h2 className="font-sans font-bold uppercase tracking-tighter text-4xl lg:text-5xl text-brand-text">Milestones in time.</h2>
            </div>
            <Timeline entries={journeyEntries} />
          </div>
        </section>

        {/* Leadership Team (3D Flip Cards) */}
        <section className="py-24 bg-transparent text-brand-text perspective-1000">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12">
            <div className="text-center mb-20 border-b border-brand-accent/20 pb-8">
              <span className="text-[11px] font-mono uppercase tracking-widest font-bold text-brand-accent block mb-4">// LEADERSHIP</span>
              <h2 className="font-sans font-bold uppercase tracking-tighter text-4xl lg:text-5xl text-brand-text">The visionaries.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {/* Founder */}
              <div className="group perspective-1000 h-[500px] cursor-pointer">
                <div className="relative preserve-3d group-hover:rotate-y-180 w-full h-full transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]">
                  {/* Front */}
                  <div className="absolute inset-0 backface-hidden bg-brand-surface-alt border border-brand-accent/20">
                    <img src="/assets/images/09-founder-niket-mangal.jpg" alt="Niket Mangal" className="w-full h-[350px] object-cover" />
                    <div className="p-8 text-center bg-brand-surface-alt text-brand-text">
                      <h3 className="font-serif text-2xl mb-1">Niket Mangal</h3>
                      <p className="uppercase tracking-widest text-[10px] font-bold text-brand-accent">Managing Director</p>
                    </div>
                  </div>
                  {/* Back */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-brand-surface-alt text-brand-text p-8 flex flex-col justify-center border border-brand-accent items-center text-center">
                    <div className="w-12 h-12 mb-6 text-brand-accent">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </div>
                    <p className="font-serif italic text-xl text-brand-text mb-6">
                      "Every city deserves landmarks that future generations will be proud to inherit."
                    </p>
                    <p className="text-sm font-light text-brand-text opacity-80 mb-6 px-4">
                      Before building communities, he built conversations in journalism. Now he builds enduring physical legacies for the city of Indore.
                    </p>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="uppercase tracking-widest text-[10px] font-bold text-brand-accent hover:text-brand-text transition-colors">Connect on LinkedIn</a>
                  </div>
                </div>
              </div>

              {/* CEO */}
              <div className="group perspective-1000 h-[500px] cursor-pointer">
                <div className="relative preserve-3d group-hover:rotate-y-180 w-full h-full transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]">
                  {/* Front */}
                  <div className="absolute inset-0 backface-hidden bg-brand-base border border-brand-accent/20 p-2">
                    <img src="/assets/images/10-ceo-priya-mangal.jpg" alt="CA Priya Mangal" className="w-full h-[350px] object-cover" />
                    <div className="p-4 text-center bg-brand-base text-brand-text">
                      <h3 className="font-sans font-bold uppercase text-xl mb-1">CA Priya Bindal Mangal</h3>
                      <p className="uppercase tracking-widest font-mono text-[10px] font-bold text-brand-accent">Chief Executive Officer</p>
                    </div>
                  </div>
                  {/* Back */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-brand-surface text-brand-text p-8 flex flex-col justify-center border border-brand-accent items-center text-center">
                    <div className="w-12 h-12 mb-6 text-brand-accent">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </div>
                    <p className="font-handwriting text-3xl text-brand-accent mb-6">
                      "Great architecture deserves equally great governance and discipline."
                    </p>
                    <p className="text-sm font-mono text-brand-text opacity-80 mb-6 px-4">
                      Bringing financial integrity, operational excellence, and responsible governance to every NM Group development.
                    </p>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="uppercase font-mono tracking-widest text-[10px] font-bold text-brand-accent hover:text-brand-text transition-colors">Connect on LinkedIn</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default About;
