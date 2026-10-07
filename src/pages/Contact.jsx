import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import MagneticButton from '../components/MagneticButton';
import { motion } from 'framer-motion';
import { FiInstagram, FiLinkedin, FiYoutube, FiFacebook } from 'react-icons/fi';
import GlobalParticles from '../components/GlobalParticles';

const Contact = () => {
  return (
    <>
      <GlobalParticles />
      <Navbar />
      <main className="mb-[80vh] bg-brand-surface-alt relative z-10 shadow-2xl min-h-screen">
        
        {/* Dark Hero Section */}
        <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-brand-base">
          <div className="absolute inset-0 bg-brand-base/40 z-0" />
          
          {/* Animated Calling Circles Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
             <motion.div
               animate={{ scale: [1, 2.5, 4], opacity: [0.8, 0.3, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
               className="absolute w-[150px] h-[150px] md:w-[250px] md:h-[250px] rounded-full border-2 border-brand-accent/60"
             />
             <motion.div
               animate={{ scale: [1, 2.5, 4], opacity: [0.8, 0.3, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 1.33 }}
               className="absolute w-[150px] h-[150px] md:w-[250px] md:h-[250px] rounded-full border-2 border-brand-accent/60"
             />
             <motion.div
               animate={{ scale: [1, 2.5, 4], opacity: [0.8, 0.3, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 2.66 }}
               className="absolute w-[150px] h-[150px] md:w-[250px] md:h-[250px] rounded-full border-2 border-brand-accent/60"
             />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-20">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-brand-accent uppercase text-xs font-bold mb-6 tracking-[0.2em]"
            >
              Get in Touch
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
              className="font-serif text-5xl md:text-7xl lg:text-[7rem] text-brand-text mb-6 leading-tight"
            >
              Connect <span className="italic text-brand-accent">With Us.</span>
            </motion.h1>
          </div>
        </section>

        {/* Split Screen Form */}
        <section className="flex flex-col lg:flex-row">
          
          {/* Left Side: Let's Talk */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[45%] bg-brand-surface-alt p-8 md:p-12 lg:p-24 flex flex-col justify-center border-r border-gray-300 relative overflow-hidden"
          >
            <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl text-brand-text mb-6 tracking-tighter" style={{ lineHeight: '0.85' }}>
              Let's <br/><span className="text-brand-accent italic pl-12">Talk.</span>
            </h2>
            <p className="text-brand-muted-light font-light max-w-sm text-lg leading-relaxed mb-12">
              Whether you're looking for your next home, an investment, or a partnership, we're here to help you build something enduring.
            </p>
            
            <div className="space-y-6 text-sm text-brand-text">
              <div className="flex items-start group">
                <span className="w-6 font-serif italic text-brand-accent text-lg mr-4">E</span>
                <a href="mailto:info@nmgroup.in" className="group-hover:text-brand-accent transition-colors font-semibold">info@nmgroup.in</a>
              </div>
              <div className="flex items-start group">
                <span className="w-6 font-serif italic text-brand-accent text-lg mr-4">T</span>
                <a href="tel:+919669600031" className="group-hover:text-brand-accent transition-colors font-semibold">096696 00031</a>
              </div>
              <div className="flex items-start group">
                <span className="w-6 font-serif italic text-brand-accent text-lg mr-4">A</span>
                <p className="font-semibold max-w-[200px]">4th Floor, NM Verge,<br/>8/5, Yeshwant Niwas Road,<br/>Indore, MP 452003</p>
              </div>
            </div>

            {/* Decorative element */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              className="absolute -bottom-32 -left-32 w-96 h-96 border border-brand-accent/20 rounded-full flex items-center justify-center pointer-events-none"
            >
              <div className="w-64 h-64 border border-brand-accent/30 rounded-full"></div>
            </motion.div>
          </motion.div>

          {/* Right Side: Interactive Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[55%] bg-brand-surface-alt p-8 md:p-12 lg:p-24 flex flex-col justify-center"
          >
            <div className="max-w-xl mx-auto w-full">
              <ContactForm />
            </div>
          </motion.div>
        </section>

        {/* Office Locations */}
        <section className="py-24 bg-brand-base">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12"
          >
            <h2 className="text-[10px] uppercase tracking-widest font-bold text-brand-accent mb-16 text-center">Our Offices</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              
              {/* HQ */}
              <motion.div 
                whileHover={{ y: -8 }}
                className="group border border-gray-200 p-10 hover:shadow-2xl transition-all duration-500 bg-brand-base"
              >
                <div className="w-12 h-12 rounded-full bg-brand-surface-alt flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <div className="w-2 h-2 rounded-full bg-brand-accent group-hover:animate-ping"></div>
                </div>
                <h3 className="font-serif text-2xl text-brand-text mb-4">Corporate Headquarters</h3>
                <p className="text-brand-text opacity-60 font-light text-sm mb-8 line-clamp-3 h-16">
                  4th Floor, NM Verge, 8/5, Yeshwant Niwas Road, Maan Sarovar, Indore, MP 452003
                </p>
                <MagneticButton onClick={() => window.open('https://maps.google.com/?q=NM+Verge+Indore', '_blank')}>
                  <button className="text-[10px] uppercase tracking-widest font-bold text-brand-text group-hover:text-brand-accent transition-colors">
                    Get Directions &rarr;
                  </button>
                </MagneticButton>
              </motion.div>

              {/* Sales Office 1 */}
              <motion.div 
                whileHover={{ y: -8 }}
                className="group border border-gray-200 p-10 hover:shadow-2xl transition-all duration-500 bg-brand-base"
              >
                <div className="w-12 h-12 rounded-full bg-brand-surface-alt flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <div className="w-2 h-2 rounded-full bg-brand-accent group-hover:animate-ping"></div>
                </div>
                <h3 className="font-serif text-2xl text-brand-text mb-4">NM Heritage Gallery</h3>
                <p className="text-brand-text opacity-60 font-light text-sm mb-8 line-clamp-3 h-16">
                  NM Heritage Experience Centre, AB Bypass Road, Indore, MP
                </p>
                <MagneticButton onClick={() => window.open('https://maps.google.com/?q=AB+Bypass+Road+Indore', '_blank')}>
                  <button className="text-[10px] uppercase tracking-widest font-bold text-brand-text group-hover:text-brand-accent transition-colors">
                    Get Directions &rarr;
                  </button>
                </MagneticButton>
              </motion.div>

              {/* Sales Office 2 */}
              <motion.div 
                whileHover={{ y: -8 }}
                className="group border border-gray-200 p-10 hover:shadow-2xl transition-all duration-500 bg-brand-base"
              >
                <div className="w-12 h-12 rounded-full bg-brand-surface-alt flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <div className="w-2 h-2 rounded-full bg-brand-accent group-hover:animate-ping"></div>
                </div>
                <h3 className="font-serif text-2xl text-brand-text mb-4">NM Pride Enclave</h3>
                <p className="text-brand-text opacity-60 font-light text-sm mb-8 line-clamp-3 h-16">
                  Township Sales Pavilion, Main AB Road, Indore, MP
                </p>
                <MagneticButton onClick={() => window.open('https://maps.google.com/?q=AB+Road+Indore', '_blank')}>
                  <button className="text-[10px] uppercase tracking-widest font-bold text-brand-text group-hover:text-brand-accent transition-colors">
                    Get Directions &rarr;
                  </button>
                </MagneticButton>
              </motion.div>

            </div>
          </motion.div>
        </section>

        {/* Social Section */}
        <section className="py-24 bg-brand-surface text-brand-text">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto px-4 text-center"
          >
            <h2 className="font-serif text-4xl mb-12 text-brand-accent">Join our digital community.</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { name: 'Instagram', icon: <FiInstagram size={40} />, url: 'https://instagram.com' },
                { name: 'LinkedIn', icon: <FiLinkedin size={40} />, url: 'https://linkedin.com' },
                { name: 'YouTube', icon: <FiYoutube size={40} />, url: 'https://youtube.com' },
                { name: 'Facebook', icon: <FiFacebook size={40} />, url: 'https://facebook.com' }
              ].map((social) => (
                <MagneticButton key={social.name} onClick={() => window.open(social.url, '_blank')}>
                  <div className="text-brand-text hover:text-brand-accent transition-colors cursor-pointer animate-pulse" style={{ animationDuration: '3s' }}>
                    {social.icon}
                  </div>
                </MagneticButton>
              ))}
            </div>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default Contact;
