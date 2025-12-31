import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Technology', href: '#technology' },
  { label: 'Vision', href: '#vision' },
  { label: 'About', href: '#about' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(9, 11, 17, 0)', 'rgba(9, 11, 17, 0.8)']
  );
  
  const navBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(20px)']
  );
  
  const navBorder = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.05)']
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="max-w-7xl mx-auto flex items-center justify-between rounded-2xl px-6 py-3"
        style={{
          backgroundColor: navBackground,
          backdropFilter: navBlur,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: navBorder,
        }}
      >
        {/* Logo */}
        <motion.a
          href="#"
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative w-10 h-10">
            <motion.div
              className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-accent"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <div className="absolute inset-[2px] rounded-lg bg-background flex items-center justify-center">
              <span className="text-primary font-display font-bold text-lg">N</span>
            </div>
          </div>
          <span className="font-display font-semibold text-lg text-foreground">
            Nexus<span className="text-primary">AI</span>
          </span>
        </motion.a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="relative z-10">{item.label}</span>
              <motion.div
                className="absolute inset-0 rounded-lg bg-secondary/50 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              {/* Animated underline */}
              <motion.div
                className="absolute bottom-1 left-1/2 h-px bg-primary"
                initial={{ width: 0, x: '-50%' }}
                whileHover={{ width: '60%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          className="relative px-6 py-2.5 rounded-xl font-medium text-sm overflow-hidden group"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary to-accent"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{ backgroundSize: '200% 200%' }}
          />
          <span className="relative z-10 text-primary-foreground">Get Early Access</span>
          
          {/* Hover glow */}
          <motion.div
            className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </motion.button>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
