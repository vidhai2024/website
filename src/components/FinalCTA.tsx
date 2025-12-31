import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, FileText } from 'lucide-react';

const FinalCTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Intensified background glow */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
          style={{
            background: 'radial-gradient(circle, hsl(185 100% 50% / 0.1) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
      </motion.div>

      {/* Animated orbital decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-primary/15"
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm uppercase tracking-widest text-primary font-medium">
            Join the Future
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h2
          className="font-display text-4xl md:text-6xl font-bold mt-6 mb-8 text-foreground"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Ready to Build the Future of{' '}
          <span className="text-gradient">Autonomous AI</span>?
        </motion.h2>

        {/* Description */}
        <motion.p
          className="max-w-2xl mx-auto text-lg text-muted-foreground mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          We're looking for exceptional researchers, engineers, and visionaries to help us 
          push the boundaries of what's possible.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button 
              variant="hero" 
              size="xl"
              className="group pulse-glow"
            >
              <span>Get Early Access</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.div>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button variant="heroOutline" size="xl" className="gap-2">
              <FileText className="w-5 h-5" />
              <span>View Research Papers</span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Contact Email */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-2 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <Mail className="w-4 h-4" />
          <span className="text-sm">For partnerships: </span>
          <a 
            href="mailto:research@nexusai.dev" 
            className="text-sm text-primary hover:underline underline-offset-4"
          >
            research@nexusai.dev
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
