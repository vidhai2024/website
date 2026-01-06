import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import vidhaiLogo from '@/assets/vidhai-logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
    ],
    legal: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Security', href: '#' },
    ],
  };

  return (
    <footer className="relative border-t border-border/50 bg-card/30">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={vidhaiLogo} alt="Vidhai" className="h-8 w-auto" />
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed mb-6">
              Seeding young entrepreneurs and disruptive ideas. Empowering early-stage innovators to build scalable ventures.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <motion.a
                href="https://www.linkedin.com/company/vidhai-llp/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold text-sm mb-4 text-foreground">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4 text-foreground">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Vidhai Accelerator. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Building the future of entrepreneurship.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
