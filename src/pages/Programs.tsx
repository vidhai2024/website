import { useEffect } from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import Navbar from '@/components/Navbar';
import TechnologyStack from '@/components/TechnologyStack';
import Footer from '@/components/Footer';

const Programs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Animated Particle Background */}
      <ParticleBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="pt-20">
        {/* Programs Section */}
        <TechnologyStack />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Programs;
