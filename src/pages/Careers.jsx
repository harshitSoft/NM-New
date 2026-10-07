import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Careers = () => {
  const heroRef = useRef(null);
  const galleryRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const yOffset = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  const titleText = "Build Your Career With Us";
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 }
    }
  };
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, y: 0,
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const jobs = [
    { title: "Senior Architect", type: "Full Time", location: "Indore", exp: "8-12 Years", description: "Lead the design and master-planning of our flagship developments. You will be responsible for conceptualising luxury residential layouts and ensuring architectural integrity from blueprint to execution." },
    { title: "Project Manager (Construction)", type: "Full Time", location: "Indore", exp: "10+ Years", description: "Oversee on-site execution, contractor management, and project timelines for large-scale township projects. Strong background in high-rise and villa construction required." },
    { title: "Interior Design Lead", type: "Full Time", location: "Indore", exp: "5-8 Years", description: "Design premium common areas, clubhouses, and sample apartments. Work closely with procurement to source high-end materials and finishes." },
    { title: "Digital Marketing Manager", type: "Full Time", location: "Indore", exp: "4-6 Years", description: "Drive online lead generation, brand positioning, and performance marketing campaigns for upcoming launches." }
  ];

  const [activeJob, setActiveJob] = useState(null);

  return (
    <>
      <Navbar />
      <main className="mb-[80vh] bg-brand-surface-alt shadow-2xl relative z-10 min-h-screen">
        
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-surface">
          <motion.div style={{ y: yOffset }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
             {/* Using an image as placeholder for video/timelapse */}
             <div 
               className="absolute inset-0 bg-cover bg-center grayscale opacity-30" 
               style={{ backgroundImage: "url('/assets/images/01-hero-township-dusk.jpg')" }} 
             />
          </motion.div>
          <div className="absolute inset-0 bg-brand-surface/50" />
          
          <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
            <motion.h1 
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className="font-serif text-5xl md:text-7xl lg:text-8xl text-brand-text mb-6 overflow-hidden flex flex-wrap justify-center gap-x-4"
            >
              {titleText.split(" ").map((word, wordIdx) => (
                <span key={wordIdx} className="inline-flex overflow-hidden">
                  {word.split("").map((char, charIdx) => (
                    <motion.span key={charIdx} variants={letterVariants} className="inline-block">
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-brand-text opacity-80 font-light max-w-xl mx-auto"
            >
              Join a team that values precision, architecture, and enduring quality. We are always looking for passionate people to help shape the skyline.
            </motion.p>
          </div>
        </section>

        {/* Perks & Benefits */}
        <section className="py-24 bg-brand-base border-b border-gray-200">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12">
            <div className="text-center mb-16">
              <span className="text-[10px] uppercase tracking-widest font-bold text-brand-accent block mb-4">Why NM Group</span>
              <h2 className="font-serif text-3xl md:text-4xl text-brand-text">Culture & Benefits</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { title: "Health & Wellness", desc: "Comprehensive medical coverage for you and your family.", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
                { title: "Growth Path", desc: "Continuous learning, mentorship, and clear career progression.", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
                { title: "Work-Life Balance", desc: "Respect for personal time and flexible arrangements when needed.", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
                { title: "Inspiring Workspace", desc: "Work in premium, architecturally designed corporate offices.", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" }
              ].map((perk, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-brand-surface-alt flex items-center justify-center mb-6 text-brand-accent border border-brand-accent/20">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={perk.icon} />
                    </svg>
                  </div>
                  <h3 className="font-serif text-xl text-brand-text mb-3">{perk.title}</h3>
                  <p className="text-sm font-light text-brand-muted-light">{perk.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Culture Gallery (Horizontal Scroll) */}
        <section className="py-24 bg-brand-surface text-brand-text overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-brand-accent block mb-4">LIFE AT NM</span>
              <h2 className="font-serif text-3xl md:text-4xl">More than just work.</h2>
            </div>
            <button 
              onClick={() => galleryRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="border border-brand-accent text-brand-accent uppercase tracking-widest text-[10px] font-bold px-8 py-3 hover:bg-brand-accent hover:text-brand-text transition-colors w-max"
            >
              See All Photos &rarr;
            </button>
          </div>
          
          <div ref={galleryRef} className="w-full pl-4 md:pl-8 lg:pl-12">
            <div className="flex gap-8 w-full overflow-x-auto pb-12 pr-12 snap-x snap-mandatory scrollbar-hide">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="w-[80vw] md:w-[450px] h-[300px] md:h-[400px] bg-gray-800 shrink-0 relative overflow-hidden group snap-center">
                  <img src={`/assets/images/0${((item - 1) % 5) + 1}-about-legacy-arch.jpg`} alt="Culture" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions (Accordion) */}
        <section className="py-24 bg-brand-surface-alt min-h-screen">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12">
            <div className="text-center mb-16">
              <span className="text-[10px] uppercase tracking-widest font-bold text-brand-accent block mb-4">JOIN US</span>
              <h2 className="font-serif text-4xl lg:text-5xl text-brand-text">Open Positions</h2>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {jobs.map((job, idx) => (
                <div key={idx} className="bg-brand-base border border-gray-200">
                  <button 
                    onClick={() => setActiveJob(activeJob === idx ? null : idx)}
                    className="w-full text-left px-8 py-6 flex justify-between items-center group"
                  >
                    <div>
                      <h3 className="font-serif text-2xl text-brand-text group-hover:text-brand-accent transition-colors">{job.title}</h3>
                      <div className="flex gap-4 mt-2 text-xs uppercase tracking-widest font-bold text-brand-text opacity-70">
                        <span>{job.type}</span>
                        <span>·</span>
                        <span>{job.location}</span>
                        <span>·</span>
                        <span>{job.exp}</span>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center shrink-0">
                      <motion.div 
                        animate={{ rotate: activeJob === idx ? 45 : 0 }} 
                        transition={{ duration: 0.3 }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                      </motion.div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {activeJob === idx && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-8 pt-4 border-t border-gray-100 flex flex-col md:flex-row gap-8 justify-between items-start">
                          <p className="text-brand-muted-light font-light leading-relaxed max-w-xl">
                            {job.description}
                          </p>
                          <motion.button 
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            onClick={() => window.open(`mailto:careers@nmgroup.in?subject=${encodeURIComponent('Application for ' + job.title)}`, '_blank')}
                            className="bg-brand-accent text-brand-surface uppercase tracking-widest text-[10px] font-bold px-8 py-4 hover:bg-brand-surface hover:text-white transition-colors shrink-0"
                          >
                            Apply Now &rarr;
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="mt-20 text-center text-sm font-light text-brand-muted-light">
              Don't see a role that fits? Send your resume to <a href="mailto:careers@nmgroup.in" className="text-brand-accent font-semibold hover:underline">careers@nmgroup.in</a> and we'll keep you in mind for future openings.
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default Careers;
