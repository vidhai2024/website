import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { AlertTriangle, Zap, Shield, Brain, Network, Cpu } from 'lucide-react';

const problems = [
  {
    icon: AlertTriangle,
    title: 'Fragile AI Systems',
    description: 'Current AI breaks under distribution shift. Models trained on historical data fail catastrophically when reality changes.',
  },
  {
    icon: Zap,
    title: 'Unsustainable Compute',
    description: 'Training frontier models requires exponentially more compute. The current paradigm is economically and environmentally untenable.',
  },
  {
    icon: Shield,
    title: 'Alignment Uncertainty',
    description: 'We cannot reliably ensure AI systems pursue intended objectives. Misalignment risk scales with capability.',
  },
];

const solutions = [
  {
    icon: Brain,
    title: 'Adaptive Learning Core',
    description: 'Self-modifying architectures that continuously learn and adapt without catastrophic forgetting.',
  },
  {
    icon: Network,
    title: 'Efficient Neural Synthesis',
    description: 'Novel compression and distillation techniques achieving 100x compute efficiency.',
  },
  {
    icon: Cpu,
    title: 'Verified Alignment Protocol',
    description: 'Formal verification methods ensuring behavioral bounds with mathematical guarantees.',
  },
];

const ProblemSolution = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Section transition gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Problem Section */}
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
            <span className="text-sm uppercase tracking-widest text-destructive font-medium">The Problem</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6 text-foreground">
              AI Development Has Hit a Wall
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
              The current generation of AI systems face fundamental limitations that scaling alone cannot solve.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {problems.map((problem, index) => (
              <motion.div
                key={problem.title}
                className="group relative p-8 rounded-2xl bg-card/50 border border-border hover:border-destructive/50 transition-all duration-500 card-lift"
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at center, hsl(0 84% 60% / 0.1) 0%, transparent 70%)',
                  }}
                />
                
                <motion.div
                  className="relative z-10"
                >
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 5 }}
                  >
                    <problem.icon className="w-6 h-6 text-destructive" />
                  </motion.div>
                  
                  <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                    {problem.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {problem.description}
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
            className="absolute w-px h-full bg-gradient-to-b from-destructive/50 via-primary to-primary/50"
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

        {/* Solution Section */}
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
            <span className="text-sm uppercase tracking-widest text-primary font-medium">Our Solution</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6 text-foreground">
              A New Foundation for AI
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
              We're developing breakthrough technologies that address these challenges at their root.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                className="group relative p-8 rounded-2xl bg-card/50 border border-border hover:border-primary/50 transition-all duration-500 card-lift gradient-border"
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              >
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at center, hsl(185 100% 50% / 0.1) 0%, transparent 70%)',
                  }}
                />
                
                <motion.div className="relative z-10">
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: -5 }}
                  >
                    <solution.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  
                  <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                    {solution.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {solution.description}
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
