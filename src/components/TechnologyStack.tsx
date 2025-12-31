import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Layers, GitBranch, Fingerprint, Database, Lock, Workflow } from 'lucide-react';

const techModules = [
  {
    id: 'neural-core',
    icon: Layers,
    title: 'Neural Architecture',
    subtitle: 'Self-Organizing Networks',
    description: 'Dynamic neural topologies that evolve during inference, enabling continuous adaptation without retraining.',
    color: 'hsl(185 100% 50%)',
    stats: [
      { label: 'Adaptation Speed', value: '10ms' },
      { label: 'Memory Efficiency', value: '94%' },
    ],
  },
  {
    id: 'distributed',
    icon: GitBranch,
    title: 'Distributed Intelligence',
    subtitle: 'Federated Learning 2.0',
    description: 'Privacy-preserving collaborative learning across heterogeneous compute environments.',
    color: 'hsl(200 100% 60%)',
    stats: [
      { label: 'Privacy Score', value: '99.9%' },
      { label: 'Sync Latency', value: '<5ms' },
    ],
  },
  {
    id: 'verification',
    icon: Fingerprint,
    title: 'Formal Verification',
    subtitle: 'Provable Guarantees',
    description: 'Mathematical proofs ensuring behavioral bounds hold across all possible inputs and states.',
    color: 'hsl(150 100% 45%)',
    stats: [
      { label: 'Coverage', value: '100%' },
      { label: 'Proof Time', value: '<1hr' },
    ],
  },
  {
    id: 'knowledge',
    icon: Database,
    title: 'Knowledge Substrate',
    subtitle: 'Persistent Memory',
    description: 'Hierarchical memory systems enabling lifelong learning with zero catastrophic forgetting.',
    color: 'hsl(280 100% 60%)',
    stats: [
      { label: 'Retention', value: '99.7%' },
      { label: 'Retrieval', value: '0.3ms' },
    ],
  },
  {
    id: 'security',
    icon: Lock,
    title: 'Adversarial Shield',
    subtitle: 'Attack Resilience',
    description: 'Multi-layer defense mechanisms providing robustness against known and novel attack vectors.',
    color: 'hsl(30 100% 55%)',
    stats: [
      { label: 'Attack Block', value: '99.99%' },
      { label: 'False Positive', value: '<0.01%' },
    ],
  },
  {
    id: 'orchestration',
    icon: Workflow,
    title: 'Agentic Orchestration',
    subtitle: 'Multi-Agent Systems',
    description: 'Coordinated autonomous agents with emergent collaborative behaviors and goal alignment.',
    color: 'hsl(340 100% 60%)',
    stats: [
      { label: 'Agents', value: '1M+' },
      { label: 'Coherence', value: '98%' },
    ],
  },
];

const TechnologyStack = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="technology" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-0 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(185 100% 50% / 0.05) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [-50, 50, -50],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm uppercase tracking-widest text-primary font-medium">Technology</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold mt-4 mb-6">
            <span className="text-foreground">The </span>
            <span className="text-gradient">Nexus Stack</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Six interconnected modules forming a complete platform for building autonomous AI systems.
          </p>
        </motion.div>

        {/* Tech Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techModules.map((module, index) => (
            <motion.div
              key={module.id}
              className="group relative rounded-2xl bg-card/30 border border-border overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              onMouseEnter={() => setHoveredId(module.id)}
              onMouseLeave={() => setHoveredId(null)}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 },
              }}
            >
              {/* Gradient border on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${module.color}20 0%, transparent 50%, ${module.color}10 100%)`,
                }}
              />
              
              {/* Glow effect */}
              <motion.div
                className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${module.color}40 0%, transparent 40%, transparent 60%, ${module.color}20 100%)`,
                  padding: 1,
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'xor',
                  WebkitMaskComposite: 'xor',
                }}
              />

              <div className="relative z-10 p-8">
                {/* Icon */}
                <motion.div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300"
                  style={{
                    background: `${module.color}15`,
                  }}
                  animate={{
                    rotate: hoveredId === module.id ? [0, 5, -5, 0] : 0,
                    scale: hoveredId === module.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <module.icon 
                    className="w-7 h-7 transition-colors duration-300" 
                    style={{ color: module.color }}
                  />
                </motion.div>

                {/* Content */}
                <div className="mb-6">
                  <span 
                    className="text-xs font-medium uppercase tracking-wider"
                    style={{ color: module.color }}
                  >
                    {module.subtitle}
                  </span>
                  <h3 className="font-display text-xl font-semibold mt-1 text-foreground">
                    {module.title}
                  </h3>
                  <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                    {module.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border/50">
                  {module.stats.map((stat) => (
                    <div key={stat.label}>
                      <motion.div
                        className="text-2xl font-display font-bold"
                        style={{ color: module.color }}
                        animate={{
                          opacity: hoveredId === module.id ? [0.7, 1, 0.7] : 1,
                        }}
                        transition={{
                          duration: 2,
                          repeat: hoveredId === module.id ? Infinity : 0,
                        }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Hover expand indicator */}
                <motion.div
                  className="absolute bottom-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: `${module.color}20` }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: hoveredId === module.id ? 1 : 0,
                    scale: hoveredId === module.id ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-xs" style={{ color: module.color }}>→</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Connection Lines Visual */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm text-muted-foreground">
            All modules interconnected via our proprietary <span className="text-primary">Neural Bus Protocol</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologyStack;
