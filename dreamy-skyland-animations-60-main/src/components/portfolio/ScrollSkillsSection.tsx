
import { motion } from "framer-motion";
import { ContainerScroll } from "../ui/container-scroll-animation";

interface SkillCardProps {
  name: string;
  level: number;
  icon: React.ReactNode;
  delay?: number;
}

const SkillCard = ({ name, level, icon, delay = 0 }: SkillCardProps) => {
  return (
    <motion.div 
      className="glass rounded-xl p-6 h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-white mr-3">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-white">{name}</h3>
      </div>
      
      <div className="w-full bg-white/10 rounded-full h-2 mb-4">
        <div 
          className="bg-sky-light h-2 rounded-full" 
          style={{ width: `${level}%` }}
        ></div>
      </div>
      
      <span className="text-white/70 text-sm">{level}%</span>
    </motion.div>
  );
};

const ScrollSkillsSection = () => {
  const skills = [
    {
      name: "Web Development",
      level: 90,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
    },
    {
      name: "React & Frontend",
      level: 85,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-dashboard"><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg>
    },
    {
      name: "C Programming",
      level: 80,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code-2"><path d="m18 16 4-4-4-4"></path><path d="m6 8-4 4 4 4"></path><path d="m14.5 4-5 16"></path></svg>
    },
    {
      name: "Electronics & Power",
      level: 85,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cpu"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><path d="M15 2v2"></path><path d="M15 20v2"></path><path d="M2 15h2"></path><path d="M2 9h2"></path><path d="M20 15h2"></path><path d="M20 9h2"></path><path d="M9 2v2"></path><path d="M9 20v2"></path></svg>
    },
    {
      name: "Robotics & Arduino",
      level: 80,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cpu"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><path d="M15 2v2"></path><path d="M15 20v2"></path><path d="M2 15h2"></path><path d="M2 9h2"></path><path d="M20 15h2"></path><path d="M20 9h2"></path><path d="M9 2v2"></path><path d="M9 20v2"></path></svg>
    },
    {
      name: "Digital Marketing",
      level: 70,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-megaphone"><path d="m3 11 18-5v12L3 13"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></svg>
    }
  ];

  return (
    <section id="scroll-skills" className="pb-20">
      <ContainerScroll
        titleComponent={
          <div className="text-center">
            <span className="inline-block px-3 py-1 rounded-full glass text-white text-sm font-medium mb-4 animate-fade-in">
              My Skills
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">
              Technical <span className="text-sky-light">Expertise</span>
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto animate-delay-200">
              A comprehensive overview of my technical skills and proficiency levels across various domains.
            </p>
          </div>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 h-full overflow-y-auto">
          {skills.map((skill, index) => (
            <SkillCard 
              key={index}
              name={skill.name}
              level={skill.level}
              icon={skill.icon}
              delay={index}
            />
          ))}
          
          <motion.div 
            className="glass sm:col-span-2 lg:col-span-3 rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">Languages</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="glass p-4 rounded-lg">
                <h4 className="text-lg font-medium text-white mb-2">English</h4>
                <p className="text-white/70">Fluent</p>
              </div>
              
              <div className="glass p-4 rounded-lg">
                <h4 className="text-lg font-medium text-white mb-2">Bangla</h4>
                <p className="text-white/70">Native</p>
              </div>
              
              <div className="glass p-4 rounded-lg">
                <h4 className="text-lg font-medium text-white mb-2">Hindi</h4>
                <p className="text-white/70">Conversational</p>
              </div>
            </div>
          </motion.div>
        </div>
      </ContainerScroll>
    </section>
  );
};

export default ScrollSkillsSection;
