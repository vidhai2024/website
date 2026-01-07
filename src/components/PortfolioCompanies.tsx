import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface StartupInfo {
  legalName: string;
  brandName: string;
  founders: string;
  foundedYear: string;
  website: string;
  brief: string;
  logo: string;
}

const startups: StartupInfo[] = [
  {
    legalName: 'SCRAPIFY ECOTECH PRIVATE LIMITED',
    brandName: 'Scrapify',
    founders: 'Rishika Duvvur, Azhagu Pandia Raja',
    foundedYear: '2022',
    website: 'https://scrapifyecotech.in/',
    brief: 'Scrapify is a clean tech company developing AI-enabled, cutting-edge, innovative products to clean and restore water bodies and building tech solutions to foster the circular economy.',
    logo: '/portfolio/scrapify.png',
  },
  {
    legalName: 'VIZAI ENGINEERING PRIVATE LIMITED',
    brandName: 'Vizai',
    founders: 'Balasubramaniyan, Baskar, Santhosh Kumar',
    foundedYear: '2021',
    website: 'https://vizaiengineering.com/',
    brief: 'Vizai Engineering delivers smart, scalable automation and material handling solutions that cut costs and boost efficiency. The IoT Industry 4.0 solution VPACS platform extends battery life, optimizes energy use, and unlocks AI-driven insights for sustainable growth.',
    logo: '/portfolio/vizai.png',
  },
  {
    legalName: 'GRIFFIN AI TECH PRIVATE LIMITED',
    brandName: 'Infinitraq',
    founders: 'Rajaraman Sindhu, Seetharaman Rajaraman',
    foundedYear: '2025',
    website: 'https://www.infinitraq.com/',
    brief: 'infiniTraq uses AI-powered video analytics on existing CCTV infrastructure to deliver a deep understanding of people movement, behavior, and engagement in physical spaces.',
    logo: '/portfolio/infinitraq.png',
  },
  {
    legalName: 'LEXIN CITY PRIVATE LIMITED',
    brandName: 'Lexdoo',
    founders: 'Kamaleshkumar, Ravi Ramya',
    foundedYear: '2023',
    website: 'https://lexdoo.com/',
    brief: 'Lexdoo delivers AI-powered insights and automation designed specifically for elite legal professionals, giving an unprecedented advantage.',
    logo: '/portfolio/lexdoo.png',
  },
  {
    legalName: 'Royan & Jose Private Limited',
    brandName: 'Madras Defence Company',
    founders: 'Bibin Joe Jose, Sanju Royan',
    foundedYear: '2024',
    website: 'https://www.madrasdefencecompany.com/',
    brief: 'Building Physical AI agents to execute battlefield tasks, taking military systems beyond autonomy.',
    logo: '/portfolio/madras-defence.png',
  },
  {
    legalName: 'KOCHADAI TECHNOLOGY SOLUTION PRIVATE LIMITED',
    brandName: 'Make Gpt',
    founders: 'Naveena Swamy, Nanu Swamy',
    foundedYear: '2022',
    website: 'https://makegpt.com/',
    brief: "The world's first AI-powered hardware development platform. Build fully executable IoT prototypes from natural language prompts in minutes.",
    logo: '/portfolio/makegpt.png',
  },
];

const PortfolioCompanies = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredStartup, setHoveredStartup] = useState<StartupInfo | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [isHoveringPopup, setIsHoveringPopup] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const scrollPositionRef = useRef(0);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Smooth continuous scroll animation
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const totalWidth = scrollContainer.scrollWidth / 2;
    const speed = 0.5;

    const animate = () => {
      if (!isPaused && !isHoveringPopup) {
        scrollPositionRef.current += speed;
        if (scrollPositionRef.current >= totalWidth) {
          scrollPositionRef.current = 0;
        }
        scrollContainer.style.transform = `translateX(-${scrollPositionRef.current}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, isHoveringPopup]);

  const handleMouseEnter = (startup: StartupInfo, e: React.MouseEvent) => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setIsPaused(true);
    setHoveredStartup(startup);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setPopupPosition({ x: rect.left + rect.width / 2, y: rect.top });
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      if (!isHoveringPopup) {
        setIsPaused(false);
        setHoveredStartup(null);
      }
    }, 150);
  };

  const handlePopupMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setIsHoveringPopup(true);
  };

  const handlePopupMouseLeave = () => {
    setIsHoveringPopup(false);
    setIsPaused(false);
    setHoveredStartup(null);
  };

  const duplicatedStartups = [...startups, ...startups, ...startups];

  return (
    <motion.section
      ref={containerRef}
      className="relative py-12 md:py-16 overflow-hidden"
      style={{ opacity }}
    >
      {/* Section Header */}
      <motion.div
        className="text-center mb-8 md:mb-10 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-xs md:text-sm uppercase tracking-widest text-primary font-medium">
          Our Portfolio
        </span>
        <h3 className="font-display text-xl md:text-3xl font-bold mt-2 md:mt-3 text-foreground">
          Startups We Are Proud to Back
        </h3>
      </motion.div>

      {/* Scrolling Logos Container */}
      <div className="relative overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-6 md:gap-10 will-change-transform"
          style={{ width: 'max-content' }}
        >
          {duplicatedStartups.map((startup, index) => (
            <motion.div
              key={`${startup.brandName}-${index}`}
              className="flex-shrink-0 relative cursor-pointer"
              onMouseEnter={(e) => handleMouseEnter(startup, e)}
              onMouseLeave={handleMouseLeave}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-28 h-16 md:w-40 md:h-24 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300 flex items-center justify-center p-4 backdrop-blur-sm">
                <img
                  src={startup.logo}
                  alt={startup.brandName}
                  className="max-w-full max-h-full object-contain filter brightness-90 hover:brightness-110 transition-all duration-300"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<span class="text-sm md:text-base font-semibold text-foreground/80">${startup.brandName}</span>`;
                    }
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      </div>

      {/* Hover Popup - Fixed position above the logo */}
      <AnimatePresence>
        {hoveredStartup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed z-50"
            style={{
              left: popupPosition.x,
              top: popupPosition.y - 16,
              transform: 'translate(-50%, -100%)',
            }}
            onMouseEnter={handlePopupMouseEnter}
            onMouseLeave={handlePopupMouseLeave}
          >
            <div className="w-80 md:w-96 p-5 rounded-xl bg-card/95 backdrop-blur-xl border border-border/50 shadow-2xl">
              {/* Glass effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent" />
              
              <div className="relative z-10">
                {/* Header */}
                <div className="mb-3">
                  <h4 className="font-display text-lg font-semibold text-foreground">
                    {hoveredStartup.brandName}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {hoveredStartup.legalName}
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Founded:</span>
                    <span className="text-foreground">{hoveredStartup.foundedYear}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-muted-foreground">Founders:</span>
                    <span className="text-foreground">{hoveredStartup.founders}</span>
                  </div>
                </div>

                {/* Brief */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {hoveredStartup.brief}
                </p>

                {/* Website Link */}
                <a
                  href={hoveredStartup.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium"
                >
                  Visit Website
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default PortfolioCompanies;
