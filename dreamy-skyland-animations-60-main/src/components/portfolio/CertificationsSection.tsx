import { motion } from "framer-motion";
import { Award, Trophy, Medal } from "lucide-react";
import DisplayCards from "@/components/ui/display-cards";
import { Meteors } from "@/components/ui/meteors";

const CertificationsSection = () => {
  const certificationCards = [
    {
      icon: <Award className="size-4 text-sky-300" />,
      title: "Electrical and Electronic Engineering",
      description: "Brac University",
      date: "2023",
      iconClassName: "text-sky-300",
      titleClassName: "text-sky-light",
      className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Trophy className="size-4 text-yellow-300" />,
      title: "Digital Marketing Certification",
      description: "US Software Institute",
      date: "2022",
      iconClassName: "text-yellow-300",
      titleClassName: "text-yellow-300",
      className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Medal className="size-4 text-sky-light" />,
      title: "Outstanding Student Award",
      description: "Academic Excellence",
      date: "2021",
      iconClassName: "text-sky-light",
      titleClassName: "text-sky-light",
      className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
    },
  ];

  return (
    <section id="certifications" className="py-20 px-6 md:px-10 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <Meteors number={18} className="opacity-30" />
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full glass text-white text-sm font-medium mb-4 animate-fade-in">
            My Achievements
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">
            Certifications & <span className="text-sky-light">Awards</span>
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto animate-delay-200">
            Professional certifications and recognitions I've earned throughout my career.
          </p>
        </div>
        
        <div className="flex flex-col gap-10">
          {/* Stacked Display Cards */}
          <div className="flex min-h-[400px] w-full items-center justify-center">
            <div className="w-full max-w-3xl">
              <DisplayCards cards={certificationCards} />
            </div>
          </div>
          
          {/* Additional Awards & Recognition */}
          <motion.div 
            className="glass rounded-xl p-6 mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">Additional Awards & Recognition</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-dark p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Trophy className="text-yellow-400 mr-2 h-5 w-5" />
                  <h4 className="text-white font-medium">Best Innovation Award</h4>
                </div>
                <p className="text-white/70">For developing a sustainable energy solution at the University Hackathon.</p>
              </div>
              
              <div className="glass-dark p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Medal className="text-sky-light mr-2 h-5 w-5" />
                  <h4 className="text-white font-medium">Outstanding Student Award</h4>
                </div>
                <p className="text-white/70">Recognition for academic excellence and contribution to university projects.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
