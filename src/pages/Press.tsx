import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import yourstoryImg from '@/assets/press/yourstory.avif';
import ssvmImg from '@/assets/press/ssvm-institute.jpg';
import forbesImg from '@/assets/press/forbes100-vidhai.jpg';
import ametImg from '@/assets/press/amet.jpg';
import simatsImg from '@/assets/press/simats.jpg';
import cohortImg from '@/assets/press/cohort.png';

const pressArticles = [
  {
    title: "We are proud to share that one of our portfolio companies, Scrapify Ecotech Private Limited from our current cohort has been featured in Forbes India | Top 100 Startups to Watch.",
    image: forbesImg,
    link: "https://www.linkedin.com/posts/vidhai-llp_vidhaiaccelerator-startupecosystem-forbesindia-activity-7409507232993730560-i9r6?utm_source=share&utm_medium=member_desktop&rcm=ACoAABRMAJEBdkApQrQ5Bk43Dg5UoPUpQXcgBY8",
    source: "LinkedIn",
    date: "Dec 24, 2025"
  },
  {
    title: "Trailblazing Tomorrow: Igniting the Spark of Student Startups at SSVM!",
    image: ssvmImg,
    link: "https://www.facebook.com/ssvminstitutions2324/posts/trailblazing-tomorrow-igniting-the-spark-of-student-startups-at-ssvma-captivatin/1440066524788634/",
    source: "SSVM Institute",
    date: "Oct 10, 2025"
  },
  {
    title: "We have successfully launched the Vidhai-Vaanam Accelerator Program! A heartfelt thank you to our incredible mentors, visionary startup founders, and passionate ecosystem enablers.",
    image: cohortImg,
    link: "https://www.linkedin.com/posts/vidhai-llp_launch-highlights-activity-7366017448745058305-1xW6?utm_source=share&utm_medium=member_desktop&rcm=ACoAABRMAJEBdkApQrQ5Bk43Dg5UoPUpQXcgBY8",
    source: "LinkedIn",
    date: "Aug 25, 2025"
  },
  {
    title: "We have officially signed an MoU with Amet University Chennai Incubation Cell — a significant step towards fostering innovation, entrepreneurship, and industry-academia collaboration.",
    image: ametImg,
    link: "https://www.linkedin.com/posts/vidhai-llp_we-have-officially-signed-an-mou-with-amet-activity-7339213990734065664-xF09?utm_source=share&utm_medium=member_desktop&rcm=ACoAABRMAJEBdkApQrQ5Bk43Dg5UoPUpQXcgBY8",
    source: "LinkedIn",
    date: "Jun 11, 2025"
  },
  {
    title: "It was a pleasure visiting SIMATS ENGINEERING and engaging with the bright minds on campus. We're excited to have signed an MoU with SIMATS ENGINEERING.",
    image: simatsImg,
    link: "https://www.linkedin.com/posts/vidhai-llp_it-was-a-pleasure-visiting-simats-engineering-activity-7336272149793386497-huv2?utm_source=share&utm_medium=member_desktop&rcm=ACoAABRMAJEBdkApQrQ5Bk43Dg5UoPUpQXcgBY8",
    source: "LinkedIn",
    date: "May 27, 2025"
  },
  {
    title: "Tamil Nadu-based accelerator Vidhai aims to support startups with tools, funding",
    image: yourstoryImg,
    link: "https://yourstory.com/2024/09/tamil-nadu-based-accelerator-vidhai-support-startups-tools-funding",
    source: "YourStory",
    date: "Sep 17, 2024"
  }
];

const Press = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm uppercase tracking-widest text-primary font-medium">
              Media
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mt-4 mb-8 text-foreground">
              Press & <span className="text-gradient">News</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-12">
              Stay updated with the latest news, announcements, and media coverage about Vidhai.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {pressArticles.map((article, index) => (
              <motion.a
                key={index}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-card/50 border border-border/50 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-wider text-primary font-medium">
                      {article.source}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {article.date}
                    </span>
                  </div>
                  <h3 className="font-display text-base md:text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-3">
                    {article.title}
                  </h3>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-sm text-muted-foreground">
              For media inquiries, contact us at{' '}
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

export default Press;
