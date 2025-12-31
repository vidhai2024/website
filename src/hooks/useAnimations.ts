import { useEffect, useState, useCallback, RefObject } from 'react';

interface ScrollProgress {
  progress: number;
  direction: 'up' | 'down' | null;
  velocity: number;
}

export function useScrollProgress(): ScrollProgress {
  const [scrollProgress, setScrollProgress] = useState<ScrollProgress>({
    progress: 0,
    direction: null,
    velocity: 0,
  });
  const [lastScrollY, setLastScrollY] = useState(0);
  const [lastTime, setLastTime] = useState(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? currentScrollY / maxScroll : 0;
      const direction = currentScrollY > lastScrollY ? 'down' : currentScrollY < lastScrollY ? 'up' : null;
      const timeDiff = currentTime - lastTime;
      const velocity = timeDiff > 0 ? Math.abs(currentScrollY - lastScrollY) / timeDiff : 0;

      setScrollProgress({ progress, direction, velocity });
      setLastScrollY(currentScrollY);
      setLastTime(currentTime);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, lastTime]);

  return scrollProgress;
}

interface ElementVisibility {
  isVisible: boolean;
  progress: number;
}

export function useElementVisibility(ref: RefObject<HTMLElement>, threshold = 0.1): ElementVisibility {
  const [visibility, setVisibility] = useState<ElementVisibility>({
    isVisible: false,
    progress: 0,
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisibility({
            isVisible: entry.isIntersecting,
            progress: entry.intersectionRatio,
          });
        });
      },
      { threshold: Array.from({ length: 20 }, (_, i) => i / 20) }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return visibility;
}

interface ParallaxValue {
  y: number;
  opacity: number;
}

export function useParallax(ref: RefObject<HTMLElement>, speed = 0.5): ParallaxValue {
  const [parallax, setParallax] = useState<ParallaxValue>({ y: 0, opacity: 1 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const distance = elementCenter - viewportCenter;
      const y = distance * speed * 0.1;
      const opacity = Math.max(0, 1 - Math.abs(distance) / (viewportHeight * 0.8));
      
      setParallax({ y, opacity });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref, speed]);

  return parallax;
}

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const normalizedX = (clientX / window.innerWidth - 0.5) * 2;
      const normalizedY = (clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({
        x: clientX,
        y: clientY,
        normalizedX,
        normalizedY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePosition;
}

export function useMagneticEffect(ref: RefObject<HTMLElement>, strength = 0.3) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = event.clientX - centerX;
    const distanceY = event.clientY - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    const maxDistance = Math.max(rect.width, rect.height);

    if (distance < maxDistance) {
      const factor = 1 - distance / maxDistance;
      setOffset({
        x: distanceX * strength * factor,
        y: distanceY * strength * factor,
      });
    } else {
      setOffset({ x: 0, y: 0 });
    }
  }, [ref, strength]);

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, handleMouseMove, handleMouseLeave]);

  return offset;
}
