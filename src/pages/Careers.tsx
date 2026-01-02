import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Careers = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm uppercase tracking-widest text-primary font-medium">
              Join Us
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mt-4 mb-8 text-foreground">
              Careers at <span className="text-gradient">Vidhai</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-12">
              Be part of our mission to empower early-stage innovators and build the future of entrepreneurship.
            </p>
          </motion.div>

          <motion.div
            className="bg-card/50 border border-border/50 rounded-2xl p-8 md:p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
              Coming Soon
            </h2>
            <p className="text-muted-foreground mb-6">
              We're preparing exciting opportunities. Check back soon for open positions.
            </p>
            <p className="text-sm text-muted-foreground">
              In the meantime, reach out to us at{' '}
              <a 
                href="mailto:connect@vidhai.io" 
                className="text-primary hover:underline underline-offset-4"
              >
                connect@vidhai.io
              </a>
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;
