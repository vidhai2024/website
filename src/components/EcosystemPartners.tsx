import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Ecosystem partner logos
const partnerLogos = [
  { name: '888VC', logo: '/ecosystem/888vc.png' },
  { name: 'AWS', logo: '/ecosystem/aws.png' },
  { name: 'EarlySeed Ventures', logo: '/ecosystem/earlyseed-ventures.png' },
  { name: 'Faad Capital', logo: '/ecosystem/faad-capital.png' },
  { name: 'Google for Startups', logo: '/ecosystem/google-for-startups.png' },
  { name: 'IAAA', logo: '/ecosystem/iaaa.png' },
  { name: 'Indian Angel Network', logo: '/ecosystem/ian.png' },
  { name: 'IIM Calcutta', logo: '/ecosystem/iim-calcutta.png' },
  { name: 'IPV', logo: '/ecosystem/ipv.png' },
  { name: 'IVB', logo: '/ecosystem/ivb.png' },
  { name: 'Maker Bhavan Foundation', logo: '/ecosystem/maker-bhavan-foundation.png' },
  { name: 'Microsoft for Startups', logo: '/ecosystem/microsoft-for-startups.png' },
  { name: 'Nasscom', logo: '/ecosystem/nasscom.png' },
  { name: 'O2 Angels Network', logo: '/ecosystem/o2-angels.png' },
  { name: 'Realtime', logo: '/ecosystem/realtime.png' },
  { name: 'River Venture Studio', logo: '/ecosystem/river-venture-studio.png' },
  { name: 'Soonicorn Ventures', logo: '/ecosystem/soonicorn-ventures.png' },
  { name: 'Startup TN', logo: '/ecosystem/startup-tn.png' },
  { name: 'Utpata Ventures', logo: '/ecosystem/utpata-ventures.png' },
  { name: 'Venture Catalysts', logo: '/ecosystem/venture-catalysts.png' },
  { name: 'Warmup Ventures', logo: '/ecosystem/warmup-ventures.png' },
  { name: 'WEH Ventures', logo: '/ecosystem/weh-ventures.png' },
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

      // First row moves right to left (negative direction)
      scrollPosition1Ref.current += speed1;
      // Second row moves left to right (positive direction)
      scrollPosition2Ref.current += speed2;

      if (scrollPosition1Ref.current >= totalWidth1) {
        scrollPosition1Ref.current = 0;
      }
      if (scrollPosition2Ref.current >= totalWidth2) {
        scrollPosition2Ref.current = 0;
      }

      // First row: right to left
      scroll1.style.transform = `translateX(-${scrollPosition1Ref.current}px)`;
      // Second row: left to right (start from negative position)
      scroll2.style.transform = `translateX(-${totalWidth2 - scrollPosition2Ref.current}px)`;

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
      <div className="relative overflow-hidden mb-6 md:mb-8">
        <div
          ref={scrollRef1}
          className="flex items-center gap-12 md:gap-20 will-change-transform"
          style={{ width: 'max-content' }}
        >
          {duplicatedLogos.map((partner, index) => (
            <motion.div
              key={`row1-${index}`}
              className="flex-shrink-0 h-10 md:h-14 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-full w-auto object-contain filter grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Second Row - moves right */}
      <div className="relative overflow-hidden">
        <div
          ref={scrollRef2}
          className="flex items-center gap-12 md:gap-20 will-change-transform"
          style={{ width: 'max-content' }}
        >
          {reversedLogos.map((partner, index) => (
            <motion.div
              key={`row2-${index}`}
              className="flex-shrink-0 h-10 md:h-14 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-full w-auto object-contain filter grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
                loading="lazy"
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
