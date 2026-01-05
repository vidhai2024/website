import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, Rocket, Users, Newspaper, Menu, X } from 'lucide-react';
import vidhaiLogo from '@/assets/vidhai-logo.png';

const navItems = [
  { label: 'Home', href: '/', icon: Home, isRoute: true },
  { label: 'Programs', href: '/#technology', icon: Rocket, isRoute: false },
  { label: 'Team', href: '/team', icon: Users, isRoute: true },
  { label: 'Press', href: '/press', icon: Newspaper, isRoute: true },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
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
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link to="/" className="flex items-center">
              <img 
                src={vidhaiLogo} 
                alt="Vidhai" 
                className="h-8 md:h-10 w-auto"
              />
            </Link>
          </motion.div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => {
              const isActive = item.isRoute && location.pathname === item.href;
              const NavComponent = item.isRoute ? Link : 'a';
              const navProps = item.isRoute ? { to: item.href } : { href: item.href };
              
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <NavComponent
                    {...navProps as any}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium transition-colors duration-300 block",
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-secondary/50 opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                    {isActive && (
                      <motion.div
                        className="absolute bottom-1 left-1/2 h-px bg-primary w-[60%] -translate-x-1/2"
                        layoutId="activeNav"
                      />
                    )}
                  </NavComponent>
                </motion.div>
              );
            })}
          </div>

          {/* Desktop CTA Button */}
          <Link to="/apply">
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
          </Link>

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
              {navItems.map((item, index) => {
                const NavComponent = item.isRoute ? Link : 'a';
                const navProps = item.isRoute ? { to: item.href } : { href: item.href };
                
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <NavComponent
                      {...navProps as any}
                      className="flex items-center gap-4 text-2xl font-display font-semibold text-foreground"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className="w-6 h-6 text-primary" />
                      {item.label}
                    </NavComponent>
                  </motion.div>
                );
              })}
              <Link to="/apply" onClick={() => setMobileMenuOpen(false)}>
                <motion.button
                  className="mt-8 px-8 py-4 rounded-xl font-medium text-lg bg-primary text-primary-foreground"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Apply for Funding
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
};

export default Navbar;
