import { useEffect } from 'react';
import { motion } from 'framer-motion';
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
      <main className="pt-24">
        {/* Page Header */}
        <motion.div
          className="text-center py-12 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs md:text-sm uppercase tracking-widest text-primary font-medium">
            What We Offer
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold mt-4 text-foreground">
            Our Programs
          </h1>
          <p className="max-w-2xl mx-auto text-muted-foreground mt-4 text-sm md:text-lg">
            Comprehensive programs designed to help startups validate ideas, strengthen execution, and prepare for growth.
          </p>
        </motion.div>

        {/* Programs Section */}
        <TechnologyStack />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Programs;
