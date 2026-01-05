import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Import team images
import sameerImg from '@/assets/team/sameer-bharat-ram.avif';
import hariharanImg from '@/assets/team/hariharan-vedamurthy.jpg';
import sabarisanImg from '@/assets/team/sabarisan-vedamurthy.avif';
import arunNandaImg from '@/assets/team/chevalier-arun-nanda.avif';
import raviMariwalaImg from '@/assets/team/ravi-mariwala.avif';
import ashwinChariImg from '@/assets/team/ashwin-chari.avif';
import madhavanImg from '@/assets/team/r-madhavan.avif';

const coFounders = [
  {
    name: 'Sameer Bharat Ram',
    role: 'Co-Founder',
    image: sameerImg,
  },
  {
    name: 'Hariharan Vedamurthy',
    role: 'Co-Founder',
    image: hariharanImg,
  },
];

const mentors = [
  {
    name: 'Sabarisan Vedamurthy',
    role: 'Tech Entrepreneur and Investor',
    image: sabarisanImg,
  },
  {
    name: 'Chevalier Arun Nanda',
    role: 'Former President and Executive Director at Mahindra & Mahindra',
    image: arunNandaImg,
  },
  {
    name: 'Ravi Mariwala',
    role: 'Industrialist & Investor',
    image: raviMariwalaImg,
  },
];

const advisoryBoard = [
  {
    name: 'Ashwin Chari',
    role: 'Director of Venture Building, NTUitive',
    image: ashwinChariImg,
  },
  {
    name: 'R. Madhavan',
    role: 'Actor/Director',
    image: madhavanImg,
  },
];

interface TeamMemberCardProps {
  name: string;
  role: string;
  image: string;
  index: number;
}

const TeamMemberCard = ({ name, role, image, index }: TeamMemberCardProps) => (
  <motion.div
    className="group relative"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
  >
    <div className="relative overflow-hidden rounded-2xl bg-secondary/30 border border-white/5">
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
        <h3 className="font-display text-lg md:text-xl font-semibold text-foreground mb-1">
          {name}
        </h3>
        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
          {role}
        </p>
      </div>
    </div>
  </motion.div>
);

interface TeamSectionProps {
  title: string;
  subtitle: string;
  members: typeof coFounders;
  columns?: number;
}

const TeamSection = ({ title, subtitle, members, columns = 2 }: TeamSectionProps) => (
  <motion.section
    className="mb-16 md:mb-24"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <div className="mb-8 md:mb-12">
      <p className="text-xs md:text-sm font-medium text-primary tracking-widest uppercase mb-2">
        {title}
      </p>
      <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground">
        {subtitle}
      </h2>
    </div>
    <div
      className={`grid gap-4 md:gap-8 ${
        columns === 2
          ? 'grid-cols-2 max-w-2xl'
          : 'grid-cols-2 md:grid-cols-3'
      }`}
    >
      {members.map((member, index) => (
        <TeamMemberCard
          key={member.name}
          name={member.name}
          role={member.role}
          image={member.image}
          index={index}
        />
      ))}
    </div>
  </motion.section>
);

const Team = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Simple gradient background */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 50%, hsl(220 30% 8%) 0%, hsl(220 20% 4%) 70%)',
          }}
        />
      </div>

      <Navbar />

      <main className="relative z-10 pt-24 md:pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 md:mb-12"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </motion.div>

          {/* Page Header */}
          <motion.div
            className="mb-12 md:mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Our Team
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
              Meet the people driving innovation and supporting the next generation of entrepreneurs.
            </p>
          </motion.div>

          {/* Co-Founders */}
          <TeamSection
            title="OUR PEOPLE"
            subtitle="The Minds Behind Vidhai"
            members={coFounders}
            columns={2}
          />

          {/* Mentors */}
          <TeamSection
            title="OUR PEOPLE"
            subtitle="Mentors"
            members={mentors}
            columns={3}
          />

          {/* Advisory Board */}
          <TeamSection
            title="OUR PEOPLE"
            subtitle="Advisory Board"
            members={advisoryBoard}
            columns={2}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Team;
