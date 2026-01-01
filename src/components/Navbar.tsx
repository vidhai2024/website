import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Home, Lightbulb, Rocket, Users, Mail, Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#', icon: Home },
  { label: 'Vision', href: '#vision', icon: Lightbulb },
  { label: 'Programs', href: '#technology', icon: Rocket },
  { label: 'About', href: '#about', icon: Users },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <>
      {/* Desktop & Mobile Top Navbar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-3 md:py-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="max-w-7xl mx-auto flex items-center justify-between rounded-2xl px-4 md:px-6 py-2.5 md:py-3"
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
            className="flex items-center gap-2 md:gap-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative w-8 h-8 md:w-10 md:h-10">
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
                <span className="text-primary font-display font-bold text-base md:text-lg">V</span>
              </div>
            </div>
            <span className="font-display font-semibold text-base md:text-lg text-foreground">
              Vidhai
            </span>
          </motion.a>

          {/* Desktop Nav Links */}
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
                <motion.div
                  className="absolute bottom-1 left-1/2 h-px bg-primary"
                  initial={{ width: 0, x: '-50%' }}
                  whileHover={{ width: '60%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <motion.button
            className="hidden md:block relative px-6 py-2.5 rounded-xl font-medium text-sm overflow-hidden group"
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
            <span className="relative z-10 text-primary-foreground">Apply Now</span>
            <motion.div
              className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </motion.button>

          {/* Mobile Menu Toggle */}
          <motion.button
            className="md:hidden p-2 text-foreground"
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </motion.div>
      </motion.nav>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 pt-20">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 text-2xl font-display font-semibold text-foreground"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => setMobileMenuOpen(false)}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="w-6 h-6 text-primary" />
                  {item.label}
                </motion.a>
              ))}
              <motion.button
                className="mt-8 px-8 py-4 rounded-xl font-medium text-lg bg-primary text-primary-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Apply for Funding
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation */}
      <motion.nav
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="mx-4 mb-4 rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 px-2 py-2">
          <div className="flex items-center justify-around">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground hover:text-primary transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <item.icon className="w-5 h-5" />
                </motion.div>
                <span className="text-[10px] font-medium">{item.label}</span>
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              className="flex flex-col items-center gap-1 px-4 py-2 text-primary"
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className="p-2 rounded-full bg-primary"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail className="w-4 h-4 text-primary-foreground" />
              </motion.div>
            </motion.a>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
