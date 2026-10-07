import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlobalParticles from '../components/GlobalParticles';
import { EyebrowHeading } from '../components/EyebrowHeading';
import TestimonialCard from '../components/TestimonialCard';
import { team } from '../data/team';

const Leadership = () => {
  const testimonials = [
    { quote: "What stood out wasn't just the architecture. It was the honesty and professionalism throughout the journey.", rating: 5, author: "Rajesh & Meera Agarwal (Residents · NM Heritage)", dark: false },
    { quote: "A developer who actually delivers what was promised in the brochure.", rating: 5, author: "Sandeep Jain (Plot Owner · NM Pride)", dark: false },
    { quote: "The attention to detail in the classical design is unmatched in the city.", rating: 5, author: "Dr. Anjali Verma (Resident · NM Heritage)", dark: true },
    { quote: "A community that truly feels like home since day one.", rating: 5, author: "Vikram Chouhan (Resident · NM Diamond City)", dark: false },
    { quote: "European living made a reality in Indore.", rating: 5, author: "Priyanka & Amit Soni (Residents · NM London Villas)", dark: false }
  ];

  const awards = [
    { id: 1, year: '2024', name: 'Pride of Central India', desc: 'Excellence in Residential Development', auth: 'Central India Business Excellence Awards', reason: 'for the delivery standard set across the NM Pride township.', img: '/assets/images/20-awards-pride.jpg' },
    { id: 2, year: '2023', name: 'Best Luxury Residential Project', desc: 'Neoclassical Residences · NM Veda', auth: 'Madhya Pradesh Real Estate Excellence Awards', reason: 'for proportion, materiality and finish quality on the AB Bypass corridor.', img: '/assets/images/20-awards-veda.jpg' },
    { id: 3, year: '2023', name: 'Landmark Design Award', desc: 'Gateway Architecture · NM London Villas', auth: 'Indian Architecture & Design Forum', reason: 'for a gateway that gave the township an identity visible from the highway.', img: '/assets/images/20-awards-london-villas.jpg' },
    { id: 4, year: '2024', name: 'Green Community Award', desc: 'Landscape & Open Space Planning', auth: 'NAREDCO Madhya Pradesh Recognition', reason: 'for treating landscape as structure rather than leftover area.', img: '/assets/images/20-awards-heritage-garden.jpg' }
  ];

  const titleWords = "The Visionaries".split(" ");
  
  return (
    <>
      <GlobalParticles />
      <Navbar />
      <main className="mb-[80vh] bg-brand-base relative z-10 shadow-2xl">
        
        {/* Dark Hero Section with Unique Animation */}
        <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-brand-base">
          <div className="absolute inset-0 bg-brand-base/40 z-0" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-20">
            <motion.p 
              initial={{ opacity: 0, tracking: "1em" }}
              animate={{ opacity: 1, tracking: "0.2em" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-brand-accent uppercase text-xs font-bold mb-8"
            >
              NM Group Leadership
            </motion.p>
            <h1 className="font-serif text-[12vw] md:text-7xl lg:text-[7rem] text-brand-text flex justify-center flex-wrap gap-x-4 md:gap-x-8">
              {titleWords.map((word, wIdx) => (
                <span key={wIdx} className="inline-flex whitespace-nowrap">
                  {word.split("").map((char, cIdx) => {
                    const globalIndex = wIdx * 10 + cIdx;
                    return (
                      <motion.span
                        key={cIdx}
                        initial={{ opacity: 0, rotateX: -90, y: 50, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, rotateX: 0, y: 0, filter: 'blur(0px)' }}
                        transition={{ 
                          duration: 0.8, 
                          delay: globalIndex * 0.05 + 0.5,
                          ease: [0.215, 0.61, 0.355, 1]
                        }}
                        className="inline-block"
                        style={{ transformOrigin: "bottom" }}
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </span>
              ))}
            </h1>
          </div>
        </section>
        
        {/* Team Grid */}
        <section className="pt-12 pb-24 bg-brand-base">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <EyebrowHeading 
                eyebrow="LEADERSHIP"
                headingLines={[
                  { text: "The people behind" },
                  { text: "NM Group.", italic: true }
                ]}
              />
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 mt-16">
              {team.map((member, index) => (
                <motion.div 
                  key={member.id} 
                  className="group relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="relative mb-6">
                    {/* Corner accents on hover */}
                    <div className="absolute -top-2 -left-2 w-8 h-8 border-t border-l border-brand-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b border-r border-brand-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                    
                    <div className="aspect-[3/4] overflow-hidden bg-gray-200 relative z-0">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105" />
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl text-brand-text mb-1">{member.name}</h3>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-brand-accent mb-3">{member.title}</p>
                  <p className="text-sm text-brand-text opacity-60 font-light leading-relaxed">
                    {member.bio}
                  </p>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
               <Link to="/about" className="text-brand-text font-bold uppercase tracking-widest text-[10px] hover:text-brand-accent transition-colors inline-flex items-center">
                  Read Founder & CEO Profiles <span className="ml-2 text-brand-accent">&rarr;</span>
               </Link>
            </div>
          </div>
        </section>

        {/* Trust & Recognition */}
        <section className="py-16 lg:py-24 bg-brand-surface-alt">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12">
            <motion.div 
              className="text-center mb-10 lg:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <EyebrowHeading 
                eyebrow="TRUST & RECOGNITION"
                headingLines={[
                  { text: "Relationships built on" },
                  { text: "trust.", italic: true }
                ]}
                className="mx-auto"
              />
              <p className="text-brand-muted-light text-lg font-light leading-relaxed max-w-2xl mx-auto">
                At The NM Group, every relationship is built on transparency, thoughtful planning and long-term commitment. The confidence of our customers, professional community and industry partners continues to inspire everything we do.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* 1 */}
               <motion.div 
                 className="bg-brand-base p-8 shadow-sm hover:-translate-y-2 transition-transform duration-500"
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: 0.1 }}
               >
                 <img src="/assets/images/15-lifestyle-family-walk.jpg" alt="Walk" className="w-full h-48 object-cover mb-8" />
                 <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-accent mb-6 border-b border-gray-200 pb-2">Customer Experience</h4>
                 <div className="flex text-brand-accent mb-4">★★★★★</div>
                 <p className="font-serif italic text-xl text-brand-text mb-4">"What stood out wasn't just the architecture. It was the honesty and professionalism throughout the journey."</p>
                 <p className="text-[10px] uppercase tracking-widest font-bold text-brand-text opacity-60">NM Heritage Resident</p>
               </motion.div>
               {/* 2 */}
               <motion.div 
                 className="bg-brand-base p-8 shadow-sm hover:-translate-y-2 transition-transform duration-500"
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: 0.2 }}
               >
                 <img src="/assets/images/09-founder-niket-mangal.jpg" alt="Founder" className="w-full h-48 object-cover object-top mb-8 grayscale" />
                 <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-accent mb-6 border-b border-gray-200 pb-2">Leadership & Industry</h4>
                 <p className="font-serif text-xl text-brand-text mb-1">Niket Mangal</p>
                 <p className="text-[10px] uppercase tracking-widest font-bold text-brand-text opacity-60 mb-6">Managing Director · The NM Group</p>
                 <ul className="space-y-3 text-xs font-light text-brand-muted-light">
                   <li><span className="text-brand-accent mr-2">◆</span> Joint Secretary (NAREDCO MP)</li>
                   <li><span className="text-brand-accent mr-2">◆</span> President (VHP, Indore)</li>
                   <li><span className="text-brand-accent mr-2">◆</span> Ex-Chairman (Round Table 268)</li>
                 </ul>
               </motion.div>
               {/* 3 */}
               <motion.div 
                 className="bg-brand-base p-8 shadow-sm hover:-translate-y-2 transition-transform duration-500"
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: 0.3 }}
               >
                 <img src="/assets/images/20-awards-pride.jpg" alt="Awards" className="w-full h-48 object-cover mb-8" />
                 <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-accent mb-6 border-b border-gray-200 pb-2">Our Commitment</h4>
                 <ul className="space-y-4 text-sm font-semibold uppercase tracking-widest text-brand-text mb-8 lg:mb-12">
                   <li><span className="text-brand-accent mr-3">01</span> Thoughtful Planning</li>
                   <li><span className="text-brand-accent mr-3">02</span> Timeless Design</li>
                   <li><span className="text-brand-accent mr-3">03</span> Transparent Governance</li>
                   <li><span className="text-brand-accent mr-3">04</span> Long-Term Relationships</li>
                 </ul>
                 <p className="font-serif italic text-xl text-brand-text">"The greatest recognition is the confidence people place in us."</p>
               </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 lg:py-24 bg-brand-base">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12">
            <motion.div 
              className="flex flex-col md:flex-row justify-between items-end mb-10 lg:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <EyebrowHeading 
                  eyebrow="CUSTOMER TESTIMONIALS"
                  headingLines={[
                    { text: "Trust, spoken aloud" },
                    { text: "by the people who live it.", italic: true }
                  ]}
                />
                <p className="text-brand-muted-light max-w-xl text-lg font-light">
                  Over 5,000 families have chosen an NM Group address. These are a few of the voices that matter most to us.
                </p>
              </div>
              <div className="flex items-center text-brand-text font-bold mt-8 md:mt-0">
                 <div className="flex text-brand-accent mr-3 text-xl">★★★★★</div>
                 <span className="text-2xl font-serif">4.8</span>
                 <span className="text-xs text-brand-text opacity-60 ml-2 uppercase tracking-widest">Avg Rating</span>
              </div>
            </motion.div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
               {testimonials.map((t, idx) => (
                 <motion.div 
                   key={idx} 
                   className="break-inside-avoid"
                   initial={{ opacity: 0, scale: 0.95 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5, delay: idx * 0.1 }}
                 >
                   <TestimonialCard {...t} />
                 </motion.div>
               ))}
               
               {/* Video Card */}
               <motion.div 
                 onClick={() => window.open('https://youtube.com', '_blank')}
                 className="break-inside-avoid relative overflow-hidden group cursor-pointer bg-brand-surface"
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: 0.5 }}
               >
                 <img src="/assets/images/19-testimonial-video-poster.jpg" alt="Video" className="w-full h-[300px] object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                   <div className="w-16 h-16 rounded-full border border-brand-base flex items-center justify-center text-brand-text mb-6 group-hover:bg-brand-base group-hover:text-brand-text transition-colors">
                     &#9658;
                   </div>
                   <h4 className="font-serif text-2xl text-brand-text">Watch Resident Stories</h4>
                   <p className="text-[10px] uppercase tracking-widest font-bold text-brand-accent mt-2">12 Video Testimonials</p>
                 </div>
               </motion.div>
            </div>
            
            <div className="mt-16 text-center">
               <button 
                 onClick={() => window.scrollTo({ top: 1200, behavior: 'smooth' })}
                 className="text-brand-text font-bold uppercase tracking-widest text-[10px] hover:text-brand-accent transition-colors inline-flex items-center"
               >
                  Read All Reviews <span className="ml-2 text-brand-accent">&rarr;</span>
               </button>
            </div>
          </div>
        </section>

        {/* Awards */}
        <section className="py-16 lg:py-24 bg-brand-surface text-brand-text">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <EyebrowHeading 
                eyebrow="AWARDS & RECOGNITION"
                headingLines={[
                  { text: "Recognised for" },
                  { text: "how we build, not how loudly.", italic: true }
                ]}
                className="[&_h2]:text-brand-text"
              />
              <p className="text-brand-text opacity-70 max-w-2xl text-lg font-light mb-10 lg:mb-16">
                Industry recognition across design, delivery and governance — awarded by regional development bodies and architecture forums.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 lg:mb-16">
              {awards.map((award, idx) => (
                <motion.div 
                  key={award.id} 
                  className="border border-gray-800 p-6 hover:-translate-y-2 transition-transform duration-500 bg-[#0a0a0a]"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                   <img src={award.img} alt={award.name} className="w-full h-40 object-cover mb-6 grayscale hover:grayscale-0 transition-all duration-500" />
                   <div className="flex items-center mb-4">
                     <span className="font-serif italic text-brand-accent text-xl mr-3">{String(idx+1).padStart(2,'0')}</span>
                     <span className="text-[10px] uppercase tracking-widest font-bold text-brand-text opacity-60">{award.year}</span>
                   </div>
                   <h4 className="font-serif text-xl text-brand-text mb-2">{award.name}</h4>
                   <p className="text-[10px] uppercase tracking-widest font-bold text-brand-accent mb-4">{award.desc}</p>
                   <p className="text-sm font-light text-brand-text opacity-70 leading-relaxed">
                     <strong className="text-brand-text opacity-80 font-semibold">{award.auth}</strong> — {award.reason}
                   </p>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="border-t border-b border-gray-800 py-8 flex flex-wrap justify-between items-center text-[10px] uppercase tracking-widest font-bold text-brand-text opacity-70 gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
               <span>NAREDCO Madhya Pradesh</span>
               <span>Indore United Round Table</span>
               <span>MP-RERA Registered</span>
               <span>CREDAI Member</span>
            </motion.div>
            
            <p className="text-xs text-brand-text opacity-70 mt-8 font-light">
              Indicative award set shown for design approval — final citations and certificates to be confirmed before publication.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Leadership;
