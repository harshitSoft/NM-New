import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlobalParticles from '../components/GlobalParticles';

const Media = () => {
  const containerRef = useRef(null);
  
  // Reading Progress Bar
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const featuredArticle = {
    title: "The Evolution of Neoclassical Architecture in Modern Indore",
    category: "Insights",
    date: "October 12, 2025",
    image: "/assets/images/12-projects-heritage-wide.jpg",
    excerpt: "How classical proportions and timeless materials are reshaping the residential skyline, prioritizing permanence over fleeting trends."
  };

  const articles = [
    { title: "NM Group Announces 50-Acre Master-Planned Township", category: "News", date: "September 28, 2025", image: "/assets/images/11-journey-nm-pride.jpg" },
    { title: "Sustainable Landscaping: The Invisible Infrastructure", category: "Insights", date: "September 15, 2025", image: "/assets/images/03-about-masterplan-aerial.jpg" },
    { title: "Q3 2025 Market Report: Real Estate Trends in Central India", category: "Reports", date: "August 30, 2025", image: "/assets/images/01-hero-township-dusk.jpg" },
    { title: "CA Priya Bindal Mangal Speaks at NAREDCO Summit", category: "Events", date: "August 12, 2025", image: "/assets/images/10-ceo-priya-mangal.jpg" },
    { title: "The Return of the Villa: Why Families Are Moving Away from High-Rises", category: "Insights", date: "July 24, 2025", image: "/assets/images/12-projects-london-villas.jpg" },
    { title: "NM Verge Reaches 80% Occupancy Ahead of Schedule", category: "News", date: "July 05, 2025", image: "/assets/images/12-projects-verge.jpg" }
  ];

  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'News', 'Insights', 'Reports', 'Events'];

  const filteredArticles = activeCategory === 'All' 
    ? articles 
    : articles.filter(a => a.category === activeCategory);

  return (
    <div ref={containerRef}>
      <GlobalParticles />
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-brand-accent origin-left z-[100]" 
        style={{ scaleX }} 
      />

      <Navbar />
      <main className="mb-[80vh] bg-brand-surface-alt relative z-10 shadow-2xl min-h-screen">
        
        {/* Dark Hero Section with Line Connections */}
        <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-brand-base">
          <div className="absolute inset-0 bg-brand-base/80 z-0" />
          
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden flex items-center justify-center">
             <svg viewBox="0 0 1000 500" className="w-full h-full object-cover">
               <motion.path 
                 d="M 100 250 L 300 150 L 500 350 L 700 200 L 900 300"
                 fill="transparent"
                 stroke="#C6F432"
                 strokeWidth="2"
                 strokeDasharray="1000"
                 initial={{ strokeDashoffset: 1000 }}
                 animate={{ strokeDashoffset: 0 }}
                 transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse', ease: "linear" }}
               />
               <motion.path 
                 d="M 50 100 L 400 450 L 800 100 L 950 400"
                 fill="transparent"
                 stroke="#C6F432"
                 strokeWidth="1"
                 strokeDasharray="1500"
                 initial={{ strokeDashoffset: 1500 }}
                 animate={{ strokeDashoffset: 0 }}
                 transition={{ duration: 7, repeat: Infinity, repeatType: 'reverse', ease: "linear", delay: 1 }}
               />
               <motion.circle cx="100" cy="250" r="4" fill="#C6F432" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
               <motion.circle cx="300" cy="150" r="4" fill="#C6F432" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} />
               <motion.circle cx="500" cy="350" r="4" fill="#C6F432" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 1 }} />
               <motion.circle cx="700" cy="200" r="4" fill="#C6F432" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 1.5 }} />
               <motion.circle cx="900" cy="300" r="4" fill="#C6F432" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 2 }} />
             </svg>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-20">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-brand-accent uppercase text-xs font-bold mb-6 tracking-[0.2em]"
            >
              Media & Press
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
              className="font-serif text-5xl md:text-7xl lg:text-[7rem] text-brand-text mb-6 leading-tight"
            >
              Our <span className="italic text-brand-accent">Stories.</span>
            </motion.h1>
          </div>
        </section>

        {/* Featured Article Hero */}
        <section className="px-4 md:px-8 lg:px-12 max-w-[1920px] mx-auto py-24">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center bg-brand-base p-6 md:p-12 shadow-sm border border-gray-100">
            <div className="w-full lg:w-1/2 relative overflow-hidden group h-[400px] lg:h-[600px]">
              <img src={featuredArticle.image} alt={featuredArticle.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
            </div>
            
            <div className="w-full lg:w-1/2">
              <div className="flex items-center gap-4 mb-6">
                <span className="uppercase tracking-widest text-[10px] font-bold bg-brand-surface text-brand-text px-3 py-1">
                  {featuredArticle.category}
                </span>
                <span className="uppercase tracking-widest text-[10px] font-bold text-brand-text opacity-70">
                  {featuredArticle.date}
                </span>
              </div>
              
              <h1 className="font-serif text-4xl lg:text-6xl text-brand-text mb-6 leading-tight">
                {featuredArticle.title}
              </h1>
              
              <p className="text-brand-muted-light font-light text-lg mb-10 leading-relaxed max-w-xl">
                {featuredArticle.excerpt}
              </p>
              
              <button 
                onClick={() => window.open('https://timesofindia.indiatimes.com', '_blank')} 
                className="group relative inline-flex items-center uppercase tracking-widest text-xs font-bold text-brand-text pb-2"
              >
                Read Full Article
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-accent origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-300 ease-out"></span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-surface origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out delay-75"></span>
              </button>
            </div>
          </div>
        </section>

        {/* Filter */}
        <section className="py-12 border-b border-gray-200">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex flex-wrap justify-center gap-8">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`uppercase tracking-widest text-[10px] font-bold transition-colors ${activeCategory === cat ? 'text-brand-accent' : 'text-brand-text opacity-70 hover:text-brand-text'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Article Grid */}
        <section className="py-24 max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {filteredArticles.map((article, idx) => (
              <motion.article 
                key={idx}
                onClick={() => window.open('https://timesofindia.indiatimes.com', '_blank')}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group cursor-pointer flex flex-col h-full bg-brand-base p-4 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 border border-transparent hover:border-gray-100"
              >
                <div className="w-full h-64 overflow-hidden mb-6 relative">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4">
                    <span className="uppercase tracking-widest text-[10px] font-bold bg-white/90 text-brand-surface px-3 py-1 backdrop-blur-md group-hover:bg-brand-accent group-hover:text-white transition-colors">
                      {article.category}
                    </span>
                  </div>
                </div>
                
                <span className="uppercase tracking-widest text-[10px] font-bold text-brand-text opacity-70 mb-3 block">
                  {article.date}
                </span>
                
                <h3 className="font-serif text-2xl text-brand-text mb-4 group-hover:text-brand-accent transition-colors line-clamp-3">
                  {article.title}
                </h3>
                
                <div className="mt-auto pt-6">
                  <span className="uppercase tracking-widest text-[10px] font-bold text-brand-text inline-flex items-center gap-2 group-hover:gap-4 transition-all">
                    Read Article <span>&rarr;</span>
                  </span>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="text-center mt-24">
            <button 
              onClick={() => alert("All currently available articles are displayed!")}
              className="border border-brand-surface text-brand-text uppercase tracking-widest text-[10px] font-bold px-12 py-5 hover:bg-brand-surface hover:text-brand-text transition-colors"
            >
              Load More Articles
            </button>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Media;
