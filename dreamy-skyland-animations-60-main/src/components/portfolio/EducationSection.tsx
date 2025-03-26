import { motion } from "framer-motion";
import { Meteors } from "../ui/meteors";

interface EducationCardProps {
  degree: string;
  institution: string;
  period: string;
  description?: string;
  courses?: string[];
  index: number;
}

const EducationCard = ({ degree, institution, period, description, courses, index }: EducationCardProps) => {
  return (
    <motion.div 
      className="glass rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white">{degree}</h3>
            <p className="text-sky-light">{institution}</p>
          </div>
          <span className="glass-dark px-4 py-1 rounded-full text-white/80 text-sm mt-2 lg:mt-0 inline-block">
            {period}
          </span>
        </div>
        
        {description && (
          <p className="text-white/80 mb-4">{description}</p>
        )}
        
        {courses && courses.length > 0 && (
          <div>
            <h4 className="text-white text-md font-medium mb-2">Relevant Coursework:</h4>
            <ul className="list-disc pl-5 text-white/80 space-y-1">
              {courses.map((course, i) => (
                <li key={i}>{course}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const EducationSection = () => {
  return (
    <section id="education" className="py-20 px-6 md:px-10 min-h-screen flex items-center relative">
      <div className="absolute inset-0 overflow-hidden">
        <Meteors number={18} className="opacity-30" />
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full glass text-white text-sm font-medium mb-4 animate-fade-in">
            My Education
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">
            Academic <span className="text-sky-light">Background</span>
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto animate-delay-200">
            My educational journey and academic qualifications.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <EducationCard 
            degree="Bachelor of Science in Electrical and Electronic"
            institution="Brac University"
            period="2023 - 2027"
            courses={[
              "Digital Systems",
              "Circuit Theory",
              "Control Systems",
              "Embedded Systems"
            ]}
            index={0}
          />
          
          <EducationCard 
            degree="Diploma in Full Stack Web Development"
            institution="Creative IT Institute"
            period="2024 - 2025"
            courses={[
              "HTML5, CSS3, JavaScript",
              "React",
              "Web Development Frameworks",
              "Raw JS,Vue.js,MongoDB,Database,OOP,AJAX,Node.js,Express JS, eCommerce Project with Laravel,Vue,API,Inventory Management etc."
            ]}
            index={1}
          />
          
          <EducationCard 
            degree="Higher Secondary Certificate"
            institution="Govt Mohammadpur Model School & College"
            period="2020 - 2021"
            description="Group: Science"
            index={2}
          />
          
          <motion.div 
            className="glass rounded-xl overflow-hidden bg-sky-dark/20 p-6 flex items-center justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap mx-auto text-sky-light mb-4"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
              <h3 className="text-xl font-semibold text-white mb-2">Continuous Learning</h3>
              <p className="text-white/80">
                Always expanding my knowledge through online courses, workshops, and self-directed learning.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
