import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, Users, Briefcase, Rocket, Award, Network } from 'lucide-react';

const offerings = [
  {
    id: 'workshops',
    icon: BookOpen,
    title: 'Product Sessions',
    subtitle: 'Founder Enablement',
    description: 'Structured workshops and training programs designed to sharpen product thinking and execution skills.',
    color: 'hsl(358 87% 53%)',
    features: [
      { label: 'Workshops/Month', value: '8+' },
      { label: 'Topics Covered', value: '20+' },
    ],
  },
  {
    id: 'mentorship',
    icon: Users,
    title: 'Expert Mentorship',
    subtitle: '1:1 Guidance',
    description: 'One-on-one and group mentorship from experienced founders, operators, and industry experts.',
    color: 'hsl(358 87% 60%)',
    features: [
      { label: 'Mentors', value: '50+' },
      { label: 'Sessions', value: 'Unlimited' },
    ],
  },
  {
    id: 'market-access',
    icon: Briefcase,
    title: 'Market Access',
    subtitle: 'Industry Connections',
    description: 'Curated introductions to potential customers, partners, and industry stakeholders.',
    color: 'hsl(358 87% 55%)',
    features: [
      { label: 'Partner Network', value: '100+' },
      { label: 'Industries', value: '15+' },
    ],
  },
  {
    id: 'demo-days',
    icon: Award,
    title: 'Demo Days',
    subtitle: 'Investor Showcase',
    description: 'Regular opportunities to showcase your startup to investors and partners in curated events.',
    color: 'hsl(358 87% 58%)',
    features: [
      { label: 'Events/Year', value: '4' },
      { label: 'Investors', value: '200+' },
    ],
  },
  {
    id: 'funding',
    icon: Rocket,
    title: 'Funding Support',
    subtitle: 'Capital Access',
    description: 'Direct investor access, pitch practice, and follow-on funding support for growth.',
    color: 'hsl(358 87% 52%)',
    features: [
      { label: 'VC Partners', value: '30+' },
      { label: 'Success Rate', value: '70%' },
    ],
  },
  {
    id: 'ecosystem',
    icon: Network,
    title: 'Startup Tools',
    subtitle: 'Ecosystem Support',
    description: 'Cloud credits, startup tooling, alumni network access, and co-founder matching support.',
    color: 'hsl(358 87% 57%)',
    features: [
      { label: 'Cloud Credits', value: '$100K+' },
      { label: 'Tools Access', value: '50+' },
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
            background: 'radial-gradient(circle, hsl(358 87% 53% / 0.05) 0%, transparent 70%)',
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
          <span className="text-sm uppercase tracking-widest text-primary font-medium">Our Programs</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold mt-4 mb-6">
            <span className="text-foreground">The </span>
            <span className="text-gradient">Vidhai Stack</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Comprehensive programs designed to help startups validate ideas, strengthen execution, and prepare for growth.
          </p>
        </motion.div>

        {/* Offerings Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offerings.map((item, index) => (
            <motion.div
              key={item.id}
              className="group relative rounded-2xl bg-card/30 border border-border overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              onMouseEnter={() => setHoveredId(item.id)}
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
                  background: `linear-gradient(135deg, ${item.color}20 0%, transparent 50%, ${item.color}10 100%)`,
                }}
              />
              
              {/* Glow effect */}
              <motion.div
                className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${item.color}40 0%, transparent 40%, transparent 60%, ${item.color}20 100%)`,
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
                    background: `${item.color}15`,
                  }}
                  animate={{
                    rotate: hoveredId === item.id ? [0, 5, -5, 0] : 0,
                    scale: hoveredId === item.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <item.icon 
                    className="w-7 h-7 transition-colors duration-300" 
                    style={{ color: item.color }}
                  />
                </motion.div>

                {/* Content */}
                <div className="mb-6">
                  <span 
                    className="text-xs font-medium uppercase tracking-wider"
                    style={{ color: item.color }}
                  >
                    {item.subtitle}
                  </span>
                  <h3 className="font-display text-xl font-semibold mt-1 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border/50">
                  {item.features.map((feature) => (
                    <div key={feature.label}>
                      <motion.div
                        className="text-2xl font-display font-bold"
                        style={{ color: item.color }}
                        animate={{
                          opacity: hoveredId === item.id ? [0.7, 1, 0.7] : 1,
                        }}
                        transition={{
                          duration: 2,
                          repeat: hoveredId === item.id ? Infinity : 0,
                        }}
                      >
                        {feature.value}
                      </motion.div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {feature.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Hover expand indicator */}
                <motion.div
                  className="absolute bottom-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: `${item.color}20` }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: hoveredId === item.id ? 1 : 0,
                    scale: hoveredId === item.id ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-xs" style={{ color: item.color }}>→</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm text-muted-foreground">
            All programs designed with <span className="text-primary">founder success</span> as the core metric
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologyStack;
