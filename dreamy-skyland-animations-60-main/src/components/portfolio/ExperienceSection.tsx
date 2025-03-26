import { motion } from "framer-motion";
import { Meteors } from "../ui/meteors";

interface ExperienceCardProps {
  title: string;
  company: string;
  period: string;
  description: React.ReactNode;
  index: number;
}

const ExperienceCard = ({ title, company, period, description, index }: ExperienceCardProps) => {
  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      {/* Timeline dot */}
      <div className="absolute left-0 w-4 h-4 rounded-full bg-sky-light -ml-2 mt-1.5"></div>
      
      {/* Content */}
      <div className="ml-8 glass rounded-xl p-6 mb-10 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="text-sky-light">{company}</p>
          </div>
          <span className="glass-dark px-4 py-1 rounded-full text-white/80 text-sm mt-2 md:mt-0">
            {period}
          </span>
        </div>
        <div className="text-white/80 space-y-2">
          {description}
        </div>
      </div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 px-6 md:px-10 min-h-screen flex items-center relative">
      <div className="absolute inset-0 overflow-hidden">
        <Meteors number={16} className="opacity-30" />
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full glass text-white text-sm font-medium mb-4 animate-fade-in">
            My Experience
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">
            Professional <span className="text-sky-light">Journey</span>
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto animate-delay-200">
            A timeline of my professional experiences and accomplishments.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-0 before:w-0.5 before:bg-sky-light/50">
          <ExperienceCard 
            title="Founder & CEO"
            company="Nextskin Creative Hub"
            period="2023 - Present"
            description={
              <>
                <p>Built an industry-leading creative agency driving innovation in web, branding, and marketing.</p>
                <p>Delivered transformative projects and scalable strategies, positioning the company as a market disruptor.</p>
              </>
            }
            index={0}
          />
          
          <ExperienceCard 
            title="Lead Mentor"
            company="Roxa IT Studio"
            period="2022 - 2023"
            description={
              <>
                <p>Championed digital marketing excellence by mentoring teams in advanced SEO, social media, and growth-hacking strategies.</p>
                <p>Designed dynamic training modules, engaged future marketers with cutting-edge tools and insights.</p>
                <p>Spearheaded impactful campaigns, driving measurable client growth and solidifying a reputation for delivering results.</p>
              </>
            }
            index={1}
          />
          
          <ExperienceCard 
            title="Full Stack Developer"
            company="Creative IT Institute"
            period="2020 - 2022"
            description={
              <>
                <p>Collaborated on full-stack development projects, encompassing both front-end and back-end technologies to create dynamic web applications.</p>
                <p>Developed responsive user interfaces and optimized application performance using React and CSS, ensuring an excellent user experience.</p>
              </>
            }
            index={2}
          />
          
          <ExperienceCard 
            title="Student Tutor (ST)"
            company="Brac University"
            period="2019 - 2020"
            description={
              <>
                <p>Facilitated learning by creating effective slides and technical materials for student presentations and workshops on complex engineering concepts.</p>
                <p>Assessed students' progress and provided constructive feedback to support their academic development in electrical and electronic engineering topics.</p>
              </>
            }
            index={3}
          />
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
