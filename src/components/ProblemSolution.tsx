import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, Lightbulb, Rocket, Users, TrendingUp, Handshake } from 'lucide-react';

const whyVidhai = [
  {
    icon: Target,
    title: 'Identify What Matters',
    description: 'We explore and identify founders and their ideas that matter—not just in outcome, but in spirit. Every meaningful startup begins with a moment of insight.',
    shortDesc: 'Finding founders with vision and conviction.',
  },
  {
    icon: Lightbulb,
    title: 'Deep Conviction',
    description: 'We believe in backing teams with grit, clarity of vision, and strong execution capabilities—often over product maturity or early metrics.',
    shortDesc: 'Backing grit over early metrics.',
  },
  {
    icon: Rocket,
    title: 'Springboard for Growth',
    description: 'We function as a springboard for early-stage startups by providing structured support, curated access, and specialized tools.',
    shortDesc: 'Structured support & curated access.',
  },
];

const whatWeDo = [
  {
    icon: Users,
    title: 'Founder Enablement',
    description: 'Product sessions, workshops, and structured training programs with one-on-one and group mentorship from experienced founders.',
    shortDesc: 'Workshops & expert mentorship.',
  },
  {
    icon: TrendingUp,
    title: 'Growth & Investor Readiness',
    description: 'Pitch practice, storytelling refinement, direct investor access, cloud credits, and startup tooling support.',
    shortDesc: 'Pitch prep & investor access.',
  },
  {
    icon: Handshake,
    title: 'Ecosystem & Capital',
    description: 'Follow-on funding support, industry collaborations, hackathons, innovation sprints, and co-founder matching.',
    shortDesc: 'Funding & partnerships.',
  },
];

const ProblemSolution = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-16 md:py-32 overflow-hidden pb-24 md:pb-32">
      {/* Section transition gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Why Vidhai Section */}
        <motion.div
          className="mb-16 md:mb-24"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-center mb-10 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs md:text-sm uppercase tracking-widest text-primary font-medium">Why Vidhai?</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 md:mt-4 mb-4 md:mb-6 text-foreground">
              Building with Clarity
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground text-sm md:text-lg hidden md:block">
              At Vidhai, we don't just accelerate startups—we help founders build with clarity, confidence, and long-term vision.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {whyVidhai.map((item, index) => (
              <motion.div
                key={item.title}
                className="group relative p-6 md:p-8 rounded-2xl bg-card/50 border border-border hover:border-primary/50 transition-all duration-500 card-lift gradient-border"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at center, hsl(358 87% 53% / 0.1) 0%, transparent 70%)',
                  }}
                />
                
                <motion.div className="relative z-10">
                  <motion.div
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 5 }}
                  >
                    <item.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </motion.div>
                  
                  <h3 className="font-display text-lg md:text-xl font-semibold mb-2 md:mb-3 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    <span className="md:hidden">{item.shortDesc}</span>
                    <span className="hidden md:inline">{item.description}</span>
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Visual Separator - Hidden on mobile */}
        <motion.div
          className="relative h-16 md:h-32 hidden md:flex items-center justify-center mb-16 md:mb-24"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            className="absolute w-px h-full bg-gradient-to-b from-primary/50 via-primary to-primary/50"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          />
          <motion.div
            className="relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-card border border-primary flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <motion.div
              className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-primary"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>

        {/* What We Do Section */}
        <motion.div
          className="mt-12 md:mt-0"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div
            className="text-center mb-10 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <span className="text-xs md:text-sm uppercase tracking-widest text-primary font-medium">What We Do</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 md:mt-4 mb-4 md:mb-6 text-foreground">
              Our Offerings
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground text-sm md:text-lg hidden md:block">
              We support founders across the early stages of their startup journey by combining mentorship, capital access, and ecosystem support.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {whatWeDo.map((item, index) => (
              <motion.div
                key={item.title}
                className="group relative p-6 md:p-8 rounded-2xl bg-card/50 border border-border hover:border-primary/50 transition-all duration-500 card-lift gradient-border"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              >
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at center, hsl(358 87% 53% / 0.1) 0%, transparent 70%)',
                  }}
                />
                
                <motion.div className="relative z-10">
                  <motion.div
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: -5 }}
                  >
                    <item.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </motion.div>
                  
                  <h3 className="font-display text-lg md:text-xl font-semibold mb-2 md:mb-3 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    <span className="md:hidden">{item.shortDesc}</span>
                    <span className="hidden md:inline">{item.description}</span>
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSolution;
