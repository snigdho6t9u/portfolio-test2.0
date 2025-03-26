
import { motion } from "framer-motion";

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

const SkillsSection = () => {
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
      name: "Git & GitHub",
      level: 75,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-git-branch"><line x1="6" x2="6" y1="3" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></svg>
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
    },
    {
      name: "Project Management",
      level: 75,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-kanban"><path d="M6 5v11"></path><path d="M12 5v6"></path><path d="M18 5v14"></path></svg>
    },
    {
      name: "Machine Learning",
      level: 65,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.04Z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.04Z"></path></svg>
    }
  ];

  return (
    <section id="skills" className="py-20 px-6 md:px-10 min-h-screen flex items-center">
      <div className="container mx-auto">
        <div className="text-center mb-16">
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <SkillCard 
              key={index}
              name={skill.name}
              level={skill.level}
              icon={skill.icon}
              delay={index}
            />
          ))}
        </div>
        
        <div className="mt-16">
          <div className="glass rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-white mb-6">Languages</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                className="glass-dark p-4 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-medium text-white mb-2">English</h4>
                <p className="text-white/70">Fluent</p>
              </motion.div>
              
              <motion.div 
                className="glass-dark p-4 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-medium text-white mb-2">Bangla</h4>
                <p className="text-white/70">Native</p>
              </motion.div>
              
              <motion.div 
                className="glass-dark p-4 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-medium text-white mb-2">Hindi</h4>
                <p className="text-white/70">Conversational</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
