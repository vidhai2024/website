import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const FinalCTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={sectionRef} className="relative py-16 md:py-24 overflow-hidden">
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
            background: 'radial-gradient(circle, hsl(358 87% 53% / 0.1) 0%, transparent 60%)',
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
            Start Your Journey
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h2
          className="font-display text-4xl md:text-6xl font-bold mt-6 mb-8 text-foreground"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Ready to Build Something{' '}
          <span className="text-gradient">Meaningful</span>?
        </motion.h2>

        {/* Description */}
        <motion.p
          className="max-w-2xl mx-auto text-lg text-muted-foreground mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          We are looking for passionate founders with bold ideas and the determination 
          to turn them into scalable ventures. Let us build the future together.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link to="/apply">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button 
                variant="hero" 
                size="xl"
                className="group pulse-glow"
              >
                <span>Pitch to Us</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.div>
              </Button>
            </motion.div>
          </Link>

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
            href="mailto:connect@vidhai.io" 
            className="text-sm text-primary hover:underline underline-offset-4"
          >
            connect@vidhai.io
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
