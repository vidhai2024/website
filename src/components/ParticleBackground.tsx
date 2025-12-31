import { useRef, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useMousePosition } from '@/hooks/useAnimations';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  angle: number;
}

const ParticleBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition();
  const { scrollYProgress } = useScroll();
  
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const backgroundY = useTransform(smoothScrollProgress, [0, 1], [0, -200]);
  const particleRotation = useTransform(smoothScrollProgress, [0, 1], [0, 360]);

  // Generate particles
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 20 + 10,
      angle: Math.random() * 360,
    }));
  }, []);

  // Orbital rings data
  const orbitalRings = useMemo(() => {
    return Array.from({ length: 3 }, (_, i) => ({
      id: i,
      radius: 150 + i * 100,
      duration: 30 + i * 15,
      opacity: 0.15 - i * 0.03,
      dotCount: 8 + i * 4,
    }));
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Base gradient */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 50% at ${50 + mousePosition.normalizedX * 5}% ${50 + mousePosition.normalizedY * 5}%, hsl(220 30% 8%) 0%, hsl(220 20% 4%) 70%)`,
          y: backgroundY,
        }}
      />

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(185 100% 50% / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(185 100% 50% / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, hsl(185 100% 70% / ${particle.opacity}) 0%, transparent 70%)`,
            boxShadow: `0 0 ${particle.size * 2}px hsl(185 100% 50% / ${particle.opacity * 0.5})`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(particle.angle) * 20, 0],
            opacity: [particle.opacity * 0.5, particle.opacity, particle.opacity * 0.5],
          }}
          transition={{
            duration: particle.speed,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: particle.id * 0.1,
          }}
        />
      ))}

      {/* Orbital rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {orbitalRings.map((ring) => (
          <motion.div
            key={ring.id}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{
              width: ring.radius * 2,
              height: ring.radius * 2,
              borderColor: `hsl(185 100% 50% / ${ring.opacity})`,
              rotate: particleRotation,
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: ring.duration,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {/* Dots on the ring */}
            {Array.from({ length: ring.dotCount }).map((_, dotIndex) => {
              const angle = (dotIndex / ring.dotCount) * 360;
              return (
                <motion.div
                  key={dotIndex}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    left: '50%',
                    top: 0,
                    marginLeft: -3,
                    marginTop: -3,
                    background: `hsl(185 100% 60%)`,
                    boxShadow: `0 0 10px hsl(185 100% 50% / 0.5)`,
                    transformOrigin: `3px ${ring.radius}px`,
                    rotate: `${angle}deg`,
                  }}
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: dotIndex * 0.2,
                  }}
                />
              );
            })}
          </motion.div>
        ))}
      </div>

      {/* Large gradient orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          left: '10%',
          top: '20%',
          background: 'radial-gradient(circle, hsl(185 100% 50% / 0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          right: '15%',
          bottom: '30%',
          background: 'radial-gradient(circle, hsl(200 100% 60% / 0.05) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default ParticleBackground;
