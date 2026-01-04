import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const headlineWords = "Seeding young entrepreneurs & disruptive ideas".split(' ');
  const subheadline = "We explore, identify, and support founders building ideas that truly matter—driven by passion, purpose, and those defining 'Aha!' moments. Vidhai exists to empower early-stage innovators with the right ecosystem to turn bold ideas into scalable ventures.";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      rotateX: -45,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-32"
      style={{ opacity: heroOpacity }}
    >
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
        style={{ y: heroY, scale: heroScale }}
      >
        {/* Main Headline */}
        <motion.h1
          className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight mb-6 md:mb-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {headlineWords.map((word, index) => (
            <motion.span
              key={index}
              className={`inline-block mr-[0.3em] ${
                word === 'entrepreneurs' || word === 'disruptive' 
                  ? 'text-gradient' 
                  : 'text-foreground'
              }`}
              variants={wordVariants}
              style={{ perspective: 1000 }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subheadline - Simplified for mobile */}
        <motion.p
          className="max-w-3xl mx-auto text-base md:text-xl text-muted-foreground leading-relaxed mb-8 md:mb-12 px-2"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <span className="hidden md:inline">{subheadline}</span>
          <span className="md:hidden">Empowering early-stage innovators to turn bold ideas into scalable ventures.</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Link to="/apply">
            <Button variant="hero" size="xl" className="group">
              <span>Apply for Funding</span>
              <motion.div
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </Button>
          </Link>
          
          <Button variant="heroOutline" size="xl">
            Learn About Vidhai
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto mt-12 md:mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {[
            { value: '50+', label: 'Startups', fullLabel: 'Startups Supported' },
            { value: '100+', label: 'Founders', fullLabel: 'Founders Mentored' },
            { value: '₹10Cr+', label: 'Funded', fullLabel: 'Funding Facilitated' },
          ].map((stat, index) => (
            <motion.div
              key={stat.fullLabel}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
            >
              <motion.div
                className="text-2xl md:text-4xl font-display font-bold text-gradient mb-1 md:mb-2"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-xs md:text-sm text-muted-foreground">
                <span className="md:hidden">{stat.label}</span>
                <span className="hidden md:inline">{stat.fullLabel}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

    </motion.section>
  );
};

export default Hero;
