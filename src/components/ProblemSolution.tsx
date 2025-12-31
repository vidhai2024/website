import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, Lightbulb, Rocket, Users, TrendingUp, Handshake } from 'lucide-react';

const whyVidhai = [
  {
    icon: Target,
    title: 'Identify What Matters',
    description: 'We explore and identify founders and their ideas that matter—not just in outcome, but in spirit. Every meaningful startup begins with a moment of insight.',
  },
  {
    icon: Lightbulb,
    title: 'Deep Conviction',
    description: 'We believe in backing teams with grit, clarity of vision, and strong execution capabilities—often over product maturity or early metrics.',
  },
  {
    icon: Rocket,
    title: 'Springboard for Growth',
    description: 'We function as a springboard for early-stage startups by providing structured support, curated access, and specialized tools.',
  },
];

const whatWeDo = [
  {
    icon: Users,
    title: 'Founder Enablement',
    description: 'Product sessions, workshops, and structured training programs with one-on-one and group mentorship from experienced founders.',
  },
  {
    icon: TrendingUp,
    title: 'Growth & Investor Readiness',
    description: 'Pitch practice, storytelling refinement, direct investor access, cloud credits, and startup tooling support.',
  },
  {
    icon: Handshake,
    title: 'Ecosystem & Capital',
    description: 'Follow-on funding support, industry collaborations, hackathons, innovation sprints, and co-founder matching.',
  },
];

const ProblemSolution = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Section transition gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Why Vidhai Section */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm uppercase tracking-widest text-primary font-medium">Why Vidhai?</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6 text-foreground">
              Building with Clarity & Vision
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
              At Vidhai, we don't just accelerate startups—we help founders build with clarity, confidence, and long-term vision.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {whyVidhai.map((item, index) => (
              <motion.div
                key={item.title}
                className="group relative p-8 rounded-2xl bg-card/50 border border-border hover:border-primary/50 transition-all duration-500 card-lift gradient-border"
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
                    className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 5 }}
                  >
                    <item.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  
                  <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Visual Separator */}
        <motion.div
          className="relative h-32 flex items-center justify-center mb-24"
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
            className="relative z-10 w-12 h-12 rounded-full bg-card border border-primary flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <motion.div
              className="w-3 h-3 rounded-full bg-primary"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>

        {/* What We Do Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <span className="text-sm uppercase tracking-widest text-primary font-medium">What We Do</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6 text-foreground">
              Vidhai's Offerings
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
              We support founders across the early stages of their startup journey by combining mentorship, capital access, and ecosystem support.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {whatWeDo.map((item, index) => (
              <motion.div
                key={item.title}
                className="group relative p-8 rounded-2xl bg-card/50 border border-border hover:border-primary/50 transition-all duration-500 card-lift gradient-border"
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
                    className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: -5 }}
                  >
                    <item.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  
                  <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
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
