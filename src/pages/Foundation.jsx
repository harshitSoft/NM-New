import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlobalParticles from '../components/GlobalParticles';
import { EyebrowHeading } from '../components/EyebrowHeading';

const Foundation = () => {
  return (
    <>
      <GlobalParticles />
      <Navbar />
      <main className="mb-[80vh] bg-brand-base relative z-10 shadow-2xl">
        
        {/* Dark Hero Section with Circular Connections */}
        <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-brand-base">
          <div className="absolute inset-0 bg-brand-base/20 z-0" />
          
          {/* Animated Circular Connection Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60 z-0">
            {/* Ring 1 (Outer) */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full border border-brand-accent/40"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-brand-accent rounded-full shadow-[0_0_20px_rgba(205,164,58,0.9)]" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-brand-base rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
            </motion.div>
            
            {/* Ring 2 */}
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full border border-brand-accent/60"
            >
              <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-brand-accent rounded-full shadow-[0_0_15px_rgba(205,164,58,0.9)]" />
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-brand-accent rounded-full shadow-[0_0_15px_rgba(205,164,58,0.9)]" />
            </motion.div>
            
            {/* Ring 3 */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-full border border-brand-accent/50"
            >
              <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-brand-base rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
              <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-3 h-3 bg-brand-base rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </motion.div>
            
            {/* Ring 4 (Inner) */}
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-full border border-brand-accent/80 flex items-center justify-center"
            >
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-brand-accent rounded-full shadow-[0_0_10px_rgba(205,164,58,1)]" />
               <div className="w-4 h-4 bg-brand-accent rounded-full animate-pulse shadow-[0_0_20px_rgba(205,164,58,1)]" />
            </motion.div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-20">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-brand-accent uppercase text-xs font-bold mb-6 tracking-[0.2em]"
            >
              PNM Foundation
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
              className="font-serif text-5xl md:text-7xl lg:text-[7rem] text-brand-text mb-6 leading-tight"
            >
              <span className="italic">Giving</span> Back.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-brand-text opacity-70 font-light max-w-lg mx-auto text-lg"
            >
              Connecting communities, building futures, and extending our legacy beyond architecture.
            </motion.p>
          </div>
        </section>

        {/* Intro */}
        <section className="bg-brand-base py-16 lg:py-24">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative overflow-hidden group">
                <img src="/assets/images/21-foundation-classroom.jpg" alt="Classroom" className="w-full h-auto group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-brand-surface/10 group-hover:bg-transparent transition-colors duration-500" />
                <p className="text-[10px] uppercase tracking-widest font-bold text-brand-muted-light mt-4">PNM FOUNDATION · EDUCATION PROGRAMME</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <EyebrowHeading 
                eyebrow="GIVING BACK"
                headingLines={[{ text: "PNM Foundation." }]}
              />
              <p className="font-serif italic text-3xl text-brand-accent mb-8">
                Building a better tomorrow — beyond real estate.
              </p>
              <p className="text-brand-muted-light text-lg font-light leading-relaxed mb-8 lg:mb-12">
                The PNM Foundation is the CSR arm of The NM Group, dedicated to creating positive impact in the communities we are privileged to serve — because true development is measured not only in landmarks, but in lives touched.
              </p>

              <div className="border-l-2 border-brand-accent pl-6 py-2 mb-8 lg:mb-12">
                <p className="font-serif italic text-2xl text-brand-text">
                  "Communities are strongest when the people who build them also help lift them."
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <button 
                  onClick={() => document.getElementById('initiatives')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-brand-accent text-brand-surface uppercase tracking-widest text-[10px] font-bold px-8 py-4 hover:bg-brand-surface hover:text-brand-text transition-colors w-full sm:w-auto"
                >
                  Read More About PNM Foundation &rarr;
                </button>
                <Link 
                  to="/contact"
                  onClick={() => window.scrollTo(0, 0)}
                  className="bg-transparent border border-brand-surface text-brand-text uppercase tracking-widest text-[10px] font-bold px-8 py-4 hover:bg-brand-surface hover:text-brand-text transition-colors w-full sm:w-auto text-center"
                >
                  Support an Initiative
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Initiatives */}
        <section id="initiatives" className="py-16 lg:py-24 bg-brand-surface-alt">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* 1 */}
              <motion.div 
                className="bg-brand-base p-6 md:p-10 border-t-4 border-brand-accent shadow-sm hover:-translate-y-2 transition-transform duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center mb-6">
                  <span className="font-serif italic text-brand-accent text-3xl mr-4">01</span>
                  <div>
                    <span className="uppercase tracking-widest text-[10px] font-bold text-brand-text opacity-60 block">Education</span>
                    <span className="font-bold text-brand-text uppercase tracking-widest text-xs block">Supporting Needy Children</span>
                  </div>
                </div>
                <p className="text-brand-muted-light font-light text-sm leading-relaxed">
                  Sponsoring school supplies, tuition and learning resources for children who need them most.
                </p>
              </motion.div>
              
              {/* 2 */}
              <motion.div 
                className="bg-brand-base p-6 md:p-10 border-t-4 border-brand-accent shadow-sm hover:-translate-y-2 transition-transform duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center mb-6">
                  <span className="font-serif italic text-brand-accent text-3xl mr-4">02</span>
                  <div>
                    <span className="uppercase tracking-widest text-[10px] font-bold text-brand-text opacity-60 block">Community</span>
                    <span className="font-bold text-brand-text uppercase tracking-widest text-xs block">Local Police Initiatives</span>
                  </div>
                </div>
                <p className="text-brand-muted-light font-light text-sm leading-relaxed">
                  Partnering on public-safety, awareness campaigns and neighbourhood well-being drives.
                </p>
              </motion.div>
              
              {/* 3 */}
              <motion.div 
                className="bg-brand-surface text-brand-text p-6 md:p-10 border-t-4 border-brand-accent shadow-md hover:-translate-y-2 transition-transform duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="flex items-center mb-6">
                  <span className="font-serif italic text-brand-accent text-3xl mr-4">03</span>
                  <div>
                    <span className="uppercase tracking-widest text-[10px] font-bold text-brand-text opacity-70 block">Environment</span>
                    <span className="font-bold text-brand-text uppercase tracking-widest text-xs block">Plantation & Green Drives</span>
                  </div>
                </div>
                <p className="text-brand-text opacity-80 font-light text-sm leading-relaxed">
                  Tree-planting, sustainability programmes and green cover for the neighbourhoods we build in.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Education Details */}
        <section className="py-16 lg:py-24 bg-brand-base">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <EyebrowHeading 
                eyebrow="OUR FLAGSHIP INITIATIVE"
                headingLines={[
                  { text: "Building opportunity" },
                  { text: "through education.", italic: true }
                ]}
              />
              <p className="text-brand-muted-light text-lg font-light leading-relaxed mb-8 lg:mb-12">
                The most durable thing NM Group can build is not a structure — it is a child's education. Through PNM Foundation, the group sponsors schooling for children of employees, site workers and families in the neighbourhoods where it develops.
              </p>
              
              <div className="space-y-8 pl-6 border-l border-brand-accent/30">
                 <motion.div 
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5, delay: 0.1 }}
                 >
                   <div className="flex items-baseline mb-2">
                     <span className="font-serif italic text-brand-accent text-xl mr-3">01</span>
                     <span className="font-bold text-brand-text uppercase tracking-widest text-xs">School Sponsorship</span>
                   </div>
                   <p className="text-brand-muted-light font-light text-sm ml-8">Tuition support for children of employees and site workers.</p>
                 </motion.div>
                 
                 <motion.div 
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5, delay: 0.2 }}
                 >
                   <div className="flex items-baseline mb-2">
                     <span className="font-serif italic text-brand-accent text-xl mr-3">02</span>
                     <span className="font-bold text-brand-text uppercase tracking-widest text-xs">Learning Resources</span>
                   </div>
                   <p className="text-brand-muted-light font-light text-sm ml-8">Books, uniforms, stationery and study materials.</p>
                 </motion.div>
                 
                 <motion.div 
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5, delay: 0.3 }}
                 >
                   <div className="flex items-baseline mb-2">
                     <span className="font-serif italic text-brand-accent text-xl mr-3">03</span>
                     <span className="font-bold text-brand-text uppercase tracking-widest text-xs">School Support</span>
                   </div>
                   <p className="text-brand-muted-light font-light text-sm ml-8">Assistance to local schools serving these neighbourhoods.</p>
                 </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-brand-surface-alt p-12 shadow-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
               <h3 className="font-serif text-3xl text-brand-text mb-6">Impact by the numbers</h3>
               <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="font-serif text-5xl text-brand-accent mb-2">50+</div>
                    <div className="text-[10px] uppercase tracking-widest font-bold text-brand-text opacity-60">Schools Supported</div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="font-serif text-5xl text-brand-accent mb-2">10,000+</div>
                    <div className="text-[10px] uppercase tracking-widest font-bold text-brand-text opacity-60">Trees Planted</div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <div className="font-serif text-5xl text-brand-accent mb-2">20+</div>
                    <div className="text-[10px] uppercase tracking-widest font-bold text-brand-text opacity-60">Villages Reached</div>
                  </motion.div>
               </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default Foundation;
