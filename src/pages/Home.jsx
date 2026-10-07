import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlobalParticles from '../components/GlobalParticles';
import CircularHero from '../components/hero/CircularHero';
import FeaturedDevelopments from '../components/FeaturedDevelopments';
import ByTheNumbers from '../components/ByTheNumbers';
import PhilosophySection from '../components/PhilosophySection';
import { projects } from '../data/projects';

const Home = () => {
  const featuredProjects = projects.filter(p => ['heritage', 'grande', 'london-villas'].includes(p.id));

  return (
    <>
      <GlobalParticles />
      <Navbar />
      <main className="mb-[80vh] bg-brand-surface shadow-2xl relative z-10">
        <CircularHero />
        <PhilosophySection />
        <FeaturedDevelopments projects={featuredProjects} />
        <ByTheNumbers />
      </main>
      <Footer />
    </>
  );
};

export default Home;
