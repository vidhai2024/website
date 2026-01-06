import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Ecosystem partner logos - placeholder paths for now
const partnerLogos = [
  { name: 'Partner 1', logo: '/ecosystem/partner-1.png' },
  { name: 'Partner 2', logo: '/ecosystem/partner-2.png' },
  { name: 'Partner 3', logo: '/ecosystem/partner-3.png' },
  { name: 'Partner 4', logo: '/ecosystem/partner-4.png' },
  { name: 'Partner 5', logo: '/ecosystem/partner-5.png' },
  { name: 'Partner 6', logo: '/ecosystem/partner-6.png' },
  { name: 'Partner 7', logo: '/ecosystem/partner-7.png' },
  { name: 'Partner 8', logo: '/ecosystem/partner-8.png' },
];

const EcosystemPartners = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef1 = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const scrollPosition1Ref = useRef(0);
  const scrollPosition2Ref = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Smooth continuous scroll animation
  useEffect(() => {
    const scroll1 = scrollRef1.current;
    const scroll2 = scrollRef2.current;
    if (!scroll1 || !scroll2) return;

    const speed1 = 0.4;
    const speed2 = 0.3;

    const animate = () => {
      const totalWidth1 = scroll1.scrollWidth / 2;
      const totalWidth2 = scroll2.scrollWidth / 2;

      scrollPosition1Ref.current += speed1;
      scrollPosition2Ref.current -= speed2;

      if (scrollPosition1Ref.current >= totalWidth1) {
        scrollPosition1Ref.current = 0;
      }
      if (scrollPosition2Ref.current <= -totalWidth2) {
        scrollPosition2Ref.current = 0;
      }

      scroll1.style.transform = `translateX(-${scrollPosition1Ref.current}px)`;
      scroll2.style.transform = `translateX(${scrollPosition2Ref.current}px)`;

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const duplicatedLogos = [...partnerLogos, ...partnerLogos, ...partnerLogos];
  const reversedLogos = [...partnerLogos.slice().reverse(), ...partnerLogos.slice().reverse(), ...partnerLogos.slice().reverse()];

  return (
    <motion.section
      ref={containerRef}
      className="relative py-10 md:py-14 overflow-hidden"
      style={{ opacity }}
    >
      {/* Section Header */}
      <motion.div
        className="text-center mb-6 md:mb-8 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-xs md:text-sm uppercase tracking-widest text-primary font-medium">
          Ecosystem Partners
        </span>
        <h3 className="font-display text-xl md:text-3xl font-bold mt-2 md:mt-3 text-foreground">
          Backed by Industry Leaders
        </h3>
      </motion.div>

      {/* First Row - moves left */}
      <div className="relative overflow-hidden mb-4 md:mb-6">
        <div
          ref={scrollRef1}
          className="flex gap-4 md:gap-8 will-change-transform"
          style={{ width: 'max-content' }}
        >
          {duplicatedLogos.map((partner, index) => (
            <motion.div
              key={`row1-${index}`}
              className="flex-shrink-0 w-24 h-12 md:w-36 md:h-16 rounded-lg md:rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors duration-300 flex items-center justify-center p-3 md:p-4"
              whileHover={{ scale: 1.05, y: -3 }}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-w-full max-h-full object-contain filter brightness-90 hover:brightness-110 transition-all duration-300"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `<span class="text-xs md:text-sm font-medium text-foreground/70">${partner.name}</span>`;
                  }
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Second Row - moves right */}
      <div className="relative overflow-hidden">
        <div
          ref={scrollRef2}
          className="flex gap-4 md:gap-8 will-change-transform"
          style={{ width: 'max-content' }}
        >
          {reversedLogos.map((partner, index) => (
            <motion.div
              key={`row2-${index}`}
              className="flex-shrink-0 w-24 h-12 md:w-36 md:h-16 rounded-lg md:rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors duration-300 flex items-center justify-center p-3 md:p-4"
              whileHover={{ scale: 1.05, y: -3 }}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-w-full max-h-full object-contain filter brightness-90 hover:brightness-110 transition-all duration-300"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `<span class="text-xs md:text-sm font-medium text-foreground/70">${partner.name}</span>`;
                  }
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
    </motion.section>
  );
};

export default EcosystemPartners;
