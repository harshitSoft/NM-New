import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlobalParticles from '../components/GlobalParticles';
import { EyebrowHeading } from '../components/EyebrowHeading';

const Business = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const verticals = [
    { title: "Premium Villas", description: "Exclusive gated communities offering privacy, luxury, and bespoke design for the discerning few." },
    { title: "Luxury Apartments", description: "High-rise residences with world-class amenities, redefining urban living in the heart of the city." },
    { title: "Plotted Townships", description: "Integrated mega-developments designed as self-sustaining ecosystems with residential, retail, and recreational spaces." },
    { title: "Commercial Destinations", description: "State-of-the-art office spaces and retail hubs built to foster business growth and innovation." },
    { title: "Farm House Development", description: "Sprawling estates amidst nature, providing a serene escape without compromising on modern comforts." },
    { title: "Industrial Development", description: "Strategically located industrial parks with robust infrastructure to support large-scale manufacturing and logistics." },
    { title: "Investment", description: "Structured opportunities for institutional and private capital in prime real estate assets." }
  ];

  return (
    <>
      <GlobalParticles />
      <Navbar />
      <main className="bg-brand-base relative z-10">
        
        {/* Animated Dark Hero Section */}
        <section ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-brand-base">
          <motion.div 
            style={{ y: bgY }} 
            className="absolute inset-0 w-full h-[120%] -top-[10%] opacity-20"
          >
            <img src="/assets/images/05-business-nm-verge.jpg" alt="Commercial Real Estate" className="w-full h-full object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/40 to-[#050505]" />

          <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 overflow-hidden leading-tight">
              <motion.span 
                initial={{ y: 150 }} 
                animate={{ y: 0 }} 
                transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} 
                className="block"
              >
                Diversified.
              </motion.span>
              <motion.span 
                initial={{ y: 150 }} 
                animate={{ y: 0 }} 
                transition={{ duration: 1.2, delay: 0.1, ease: [0.76, 0, 0.24, 1] }} 
                className="block italic text-brand-accent"
              >
                Integrated. Proven.
              </motion.span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-white opacity-90 max-w-xl mx-auto text-lg font-light"
            >
              Spanning seven unique verticals, our portfolio is engineered to drive growth, foster community, and deliver enduring value.
            </motion.p>
          </div>
        </section>

        {/* Intro / Verticals Section */}
        <section className="pt-24 pb-24 bg-brand-surface-alt relative z-10 text-brand-text">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12">
            
            {/* Top Row: Heading and Images */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col justify-center"
              >
                <EyebrowHeading 
                  eyebrow="OUR BUSINESS"
                  headingLines={[
                    { text: "Seven verticals." },
                    { text: "One standard.", italic: true }
                  ]}
                  className="[&_h2]:text-brand-text"
                />
                <p className="text-brand-text opacity-80 text-lg font-light leading-relaxed mb-8 max-w-md mt-6">
                  From premium residences to industrial catchments, every NM Group vertical is held to the same benchmark of planning, architecture and governance.
                </p>
                <Link to="/projects" className="text-brand-text font-bold uppercase tracking-widest text-[10px] hover:text-brand-accent transition-colors inline-flex items-center w-max">
                  Explore All Verticals <span className="ml-2 text-brand-accent">&rarr;</span>
                </Link>
              </motion.div>

              <motion.div 
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="group overflow-hidden border border-brand-accent/20 relative">
                  <img src="/assets/images/05-business-nm-verge.jpg" alt="NM Verge" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <p className="absolute bottom-4 left-4 right-4 text-center text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-brand-text">COMMERCIAL</p>
                </div>
                <div className="group overflow-hidden border border-brand-accent/20 relative">
                  <img src="/assets/images/12-projects-london-villas.jpg" alt="London Villas" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <p className="absolute bottom-4 left-4 right-4 text-center text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-brand-text">VILLAS</p>
                </div>
              </motion.div>
            </div>

            {/* Bottom Row: 7 Verticals in a grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {verticals.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="bg-brand-base p-6 border border-brand-accent/20 shadow-md text-brand-text hover:-translate-y-2 transition-transform duration-500"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <span className="font-serif italic text-brand-accent text-2xl mb-4 block">0{index + 1}</span>
                  <h4 className="font-serif text-xl text-brand-text mb-3">{item.title}</h4>
                  <p className="text-brand-text opacity-80 text-sm font-light leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Business Opportunities */}
        <section className="py-16 lg:py-24 bg-transparent text-brand-text relative z-10 border-t border-brand-accent/20">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12">
            
            {/* Top Row: Heading and Images */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col justify-center"
              >
                <EyebrowHeading 
                  eyebrow="BUSINESS OPPORTUNITIES"
                  headingLines={[
                    { text: "Building partnerships" },
                    { text: "that create lasting value.", italic: true }
                  ]}
                  className="[&_h2]:text-brand-text"
                />
                <p className="text-brand-text opacity-80 text-lg font-light leading-relaxed max-w-md mt-6">
                  NM Group works with investors, institutions, landowners and businesses on structured, mutually beneficial opportunities across its development portfolio.
                </p>
              </motion.div>

              <motion.div 
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="group overflow-hidden border border-brand-accent/20 relative h-full">
                  <img src="/assets/images/06-opportunities-verge-wide.jpg" alt="Verge Wide" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                </div>
                <div className="group overflow-hidden border border-brand-accent/20 relative h-full">
                  <img src="/assets/images/06-opportunities-grande.jpg" alt="Grande" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                </div>
              </motion.div>
            </div>

            {/* Bottom Row: 3 Opportunity Points in a grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                className="bg-brand-surface-alt text-brand-text p-6 border border-brand-accent/20 shadow-lg hover:-translate-y-2 transition-transform duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex flex-col">
                  <span className="font-serif italic text-brand-accent text-3xl mb-4 block">01</span>
                  <span className="uppercase tracking-widest text-sm font-bold text-brand-text mb-3">Partner <span className="text-brand-text opacity-70 font-normal mx-2">·</span> Joint Investor</span>
                  <p className="text-brand-text opacity-80 text-sm font-light leading-relaxed">For investors and strategic partners interested in participating in suitable NM Group opportunities.</p>
                </div>
              </motion.div>

              <motion.div 
                className="bg-brand-surface-alt text-brand-text p-6 border border-brand-accent/20 shadow-lg hover:-translate-y-2 transition-transform duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex flex-col">
                  <span className="font-serif italic text-brand-accent text-3xl mb-4 block">02</span>
                  <span className="uppercase tracking-widest text-sm font-bold text-brand-text mb-3">Occupy <span className="text-brand-text opacity-70 font-normal mx-2">·</span> Leasing</span>
                  <p className="text-brand-text opacity-80 text-sm font-light leading-relaxed">For businesses looking for premium commercial spaces and development opportunities.</p>
                </div>
              </motion.div>

              <motion.div 
                className="bg-brand-surface-alt text-brand-text p-6 border border-brand-accent/20 shadow-lg hover:-translate-y-2 transition-transform duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex flex-col">
                  <span className="font-serif italic text-brand-accent text-3xl mb-4 block">03</span>
                  <span className="uppercase tracking-widest text-sm font-bold text-brand-text mb-3">Collaborate <span className="text-brand-text opacity-70 font-normal mx-2">·</span> Investment</span>
                  <p className="text-brand-text opacity-80 text-sm font-light leading-relaxed">For investors, institutions, landowners and strategic partners seeking collaborative opportunities.</p>
                </div>
              </motion.div>
            </div>

            <motion.p 
              className="text-brand-text opacity-70 text-xs mt-10 text-right"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              Specific commercial terms, structures and returns are discussed directly with the NM Group leadership team.
            </motion.p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default Business;
