import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Briefcase, MapPin, Clock } from 'lucide-react';

const jobOpenings = [
  {
    title: "Investor Relations Associate",
    location: "Chennai",
    type: "Full-time",
    description: "Vidhai Accelerator is looking for a dynamic and driven Investor Relations Associate to join our team in Chennai. If you love building meaningful relationships, understand the startup funding landscape, and enjoy being at the intersection of founders and investors, this role is for you.",
    responsibilities: [
      "Conduct in-depth market research to identify emerging trends and opportunities.",
      "Evaluate startups based on business potential, scalability, and market fit.",
      "Assist in preparing business reports, presentations, and due diligence documents.",
      "Support with fundraising activities, investor documents & data rooms.",
      "Collaborate with internal teams to strategize and support portfolio startups.",
      "Support in organizing networking events, pitch sessions, and accelerator programs."
    ],
    eligibility: [
      "A strong interest and knowledge in the startup ecosystem.",
      "Educational background: MBA, BCom/MCom, BBA, Economics or Engineering graduates.",
      "Excellent analytical and problem-solving skills.",
      "Strong communication and presentation abilities."
    ]
  }
];

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

          <div className="space-y-8">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={index}
                className="bg-card/50 border border-border/50 rounded-2xl p-6 md:p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-foreground flex items-center gap-3">
                      <Briefcase className="w-6 h-6 text-primary" />
                      {job.title}
                    </h2>
                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">
                  {job.description}
                </p>

                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-3">Key Responsibilities:</h3>
                  <ul className="space-y-2">
                    {job.responsibilities.map((item, i) => (
                      <li key={i} className="text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8">
                  <h3 className="font-semibold text-foreground mb-3">Eligibility Criteria:</h3>
                  <ul className="space-y-2">
                    {job.eligibility.map((item, i) => (
                      <li key={i} className="text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-border/50">
                  <p className="text-muted-foreground">
                    If you're passionate about enabling founders and shaping the investment landscape, we'd love to meet you.
                  </p>
                  <p className="mt-4">
                    <span className="text-muted-foreground">📩 Mail your resume at: </span>
                    <a 
                      href="mailto:connect@vidhai.io" 
                      className="text-primary hover:underline underline-offset-4 font-medium"
                    >
                      connect@vidhai.io
                    </a>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;
