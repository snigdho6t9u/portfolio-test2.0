
import { motion } from "framer-motion";
import { Meteors } from "../ui/meteors";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-6 md:px-10 min-h-screen flex items-center relative">
      <div className="absolute inset-0 overflow-hidden">
        <Meteors number={15} className="opacity-30" />
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full glass text-white text-sm font-medium mb-4 animate-fade-in">
            About Me
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">
            Professional <span className="text-sky-light">Summary</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div 
            className="glass p-8 rounded-2xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-white/90 mb-6 text-lg leading-relaxed">
              Detail-oriented and driven Full Stack Web Developer currently pursuing a degree in Electrical and Electronic Engineering at Brac University, complemented by a Diploma in Full Stack Web Development from Creative IT Institute.
            </p>
            <p className="text-white/90 mb-6 text-lg leading-relaxed">
              Adept at both front-end and back-end development with hands-on experience in electronics, robotics, and project management. Committed to delivering high-quality web solutions while leveraging strong analytical and problem-solving skills in dynamic environments.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <span className="glass px-4 py-2 rounded-full text-white/90 text-sm">Full Stack Developer</span>
              <span className="glass px-4 py-2 rounded-full text-white/90 text-sm">Electrical Engineer</span>
              <span className="glass px-4 py-2 rounded-full text-white/90 text-sm">Project Management</span>
              <span className="glass px-4 py-2 rounded-full text-white/90 text-sm">Creative Problem Solver</span>
            </div>
          </motion.div>
          
          <motion.div 
            className="glass p-8 rounded-2xl flex flex-col justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-3">Location</h3>
              <p className="text-white/80">Dhaka, Bangladesh</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-3">Email</h3>
              <p className="text-white/80">cyber.snigdho.dev@gmail.com</p>
              <p className="text-white/80">golam.murtaza@g.bracu.ac.bd</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-3">Skype</h3>
              <p className="text-white/80">live:.cid.9102e7abc5960652</p>
            </div>
            
            <div className="flex gap-4 mt-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
