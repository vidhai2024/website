import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const Vision = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.3, 0.5], [50, 0]);

  const visionText = "We believe the next leap in AI won't come from scaling existing paradigms, but from fundamental breakthroughs in how systems learn, reason, and adapt.";
  const words = visionText.split(' ');

  return (
    <section id="vision" ref={sectionRef} className="relative py-32 md:py-48 overflow-hidden">
      {/* Calm background gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 100% 70% at 50% 50%, hsl(220 30% 8%) 0%, hsl(220 20% 4%) 100%)',
          opacity: backgroundOpacity,
        }}
      />

      {/* Subtle grain */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section Label */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm uppercase tracking-widest text-primary font-medium">Our Vision</span>
        </motion.div>

        {/* Large Typography Quote */}
        <motion.div
          className="text-center"
          style={{ y: textY }}
        >
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold leading-[1.3] text-foreground">
            {words.map((word, index) => (
              <motion.span
                key={index}
                className={`inline-block mr-[0.25em] ${
                  word === 'breakthroughs' || word === 'learn,' || word === 'reason,' || word === 'adapt.'
                    ? 'text-gradient'
                    : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.02 * index,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </motion.div>

        {/* Decorative Line */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
            initial={{ width: 0 }}
            animate={isInView ? { width: 200 } : {}}
            transition={{ duration: 1, delay: 1 }}
          />
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          className="mt-16 grid md:grid-cols-2 gap-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div>
            <h3 className="font-display text-xl font-semibold mb-4 text-foreground">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To build the foundational infrastructure that enables AI systems to operate safely, 
              efficiently, and autonomously—accelerating human progress while maintaining alignment 
              with human values.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold mb-4 text-foreground">Our Approach</h3>
            <p className="text-muted-foreground leading-relaxed">
              We combine rigorous theoretical research with practical engineering, publishing openly 
              while building production-ready systems. Safety isn't an afterthought—it's embedded 
              in every layer of our architecture.
            </p>
          </div>
        </motion.div>

        {/* Team Attribution */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
        >
          <p className="text-sm text-muted-foreground">
            Founded by researchers from <span className="text-foreground">DeepMind</span>, <span className="text-foreground">OpenAI</span>, and <span className="text-foreground">MIT CSAIL</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Vision;
