import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const partners = [
  'Google for Startups',
  'AWS Activate',
  'Microsoft for Startups',
  'Razorpay',
  'Zoho',
  'Freshworks',
  'Stripe Atlas',
  'Notion',
  'Slack',
  'Figma',
  'HubSpot',
  'Airtable',
];

const PartnersParallax = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Create horizontal movement based on scroll
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-200, 200]);

  return (
    <section ref={containerRef} className="relative py-20 overflow-hidden">
      {/* Section Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-sm uppercase tracking-widest text-primary font-medium">Ecosystem Partners</span>
        <h3 className="font-display text-2xl md:text-3xl font-bold mt-4 text-foreground">
          Backed by Industry Leaders
        </h3>
      </motion.div>

      {/* First Row - moves left */}
      <motion.div
        className="flex gap-8 mb-8"
        style={{ x: x1 }}
      >
        {[...partners, ...partners].map((partner, index) => (
          <motion.div
            key={`row1-${index}`}
            className="flex-shrink-0 px-8 py-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors duration-300"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <span className="text-lg font-medium text-foreground/80 whitespace-nowrap">
              {partner}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Second Row - moves right */}
      <motion.div
        className="flex gap-8"
        style={{ x: x2 }}
      >
        {[...partners.slice().reverse(), ...partners.slice().reverse()].map((partner, index) => (
          <motion.div
            key={`row2-${index}`}
            className="flex-shrink-0 px-8 py-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors duration-300"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <span className="text-lg font-medium text-foreground/80 whitespace-nowrap">
              {partner}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default PartnersParallax;
