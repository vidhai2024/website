import { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import ParticleBackground from '@/components/ParticleBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PartnersParallax from '@/components/PartnersParallax';
import ProblemSolution from '@/components/ProblemSolution';
import TechnologyStack from '@/components/TechnologyStack';
import Vision from '@/components/Vision';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

const Index = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-px bg-primary z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Animated Particle Background */}
      <ParticleBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Partners Horizontal Parallax */}
        <PartnersParallax />

        {/* Why Vidhai & What We Do */}
        <ProblemSolution />

        {/* Programs / Offerings */}
        <TechnologyStack />

        {/* Vision & Investment Strategy */}
        <Vision />

        {/* Final CTA */}
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
