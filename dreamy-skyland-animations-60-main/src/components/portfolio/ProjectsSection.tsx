import { useState } from 'react';
import { motion } from 'framer-motion';
import { Meteors } from '../ui/meteors';

interface Project {
  id: number;
  title: string;
  category: 'web' | 'electrical' | 'robotics';
  image: string;
  description: string;
  technologies: string[];
}

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'electrical' | 'robotics'>('all');
  
  const projects: Project[] = [
    {
      id: 1,
      title: "Full Stack Web Application",
      category: "web",
      image: "/lovable-uploads/b41cb53a-e3e1-495c-ac07-c760d09323f7.png",
      description: "Developed a full stack application featuring user authentication, data storage, and dynamic content generation.",
      technologies: ["React", "Node.js", "MongoDB", "Express"]
    },
    {
      id: 2,
      title: "Electrical & Electronic Engineering Project",
      category: "electrical",
      image: "/lovable-uploads/b41cb53a-e3e1-495c-ac07-c760d09323f7.png",
      description: "Led a team to design and implement electronic systems, focusing on sustainable energy solutions.",
      technologies: ["Circuit Design", "Power Electronics", "Energy Systems"]
    },
    {
      id: 3,
      title: "E-Commerce Platform",
      category: "web",
      image: "/lovable-uploads/b41cb53a-e3e1-495c-ac07-c760d09323f7.png",
      description: "Built a responsive e-commerce platform with inventory management system using Laravel and Vue.",
      technologies: ["Vue.js", "Laravel", "API Integration", "Inventory Management"]
    },
    {
      id: 4,
      title: "Arduino-based Home Automation",
      category: "robotics",
      image: "/lovable-uploads/b41cb53a-e3e1-495c-ac07-c760d09323f7.png",
      description: "Created a smart home automation system using Arduino for controlling lights, temperature, and security.",
      technologies: ["Arduino", "IoT", "Sensors", "Automation"]
    },
    {
      id: 5,
      title: "Energy Efficiency Monitoring Tool",
      category: "electrical",
      image: "/lovable-uploads/b41cb53a-e3e1-495c-ac07-c760d09323f7.png",
      description: "Developed a tool to measure and optimize energy consumption in residential buildings.",
      technologies: ["Power Measurement", "Energy Efficiency", "Data Analysis"]
    },
    {
      id: 6,
      title: "Portfolio Website",
      category: "web",
      image: "/lovable-uploads/b41cb53a-e3e1-495c-ac07-c760d09323f7.png",
      description: "Designed and built a personal portfolio website showcasing projects and skills with modern UI/UX principles.",
      technologies: ["React", "Tailwind CSS", "Framer Motion", "Responsive Design"]
    }
  ];
  
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 px-6 md:px-10 min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <Meteors number={25} className="opacity-40" />
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full glass text-white text-sm font-medium mb-4 animate-fade-in">
            My Work
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">
            Featured <span className="text-sky-light">Projects</span>
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto animate-delay-200 mb-8">
            A collection of projects I've worked on across various domains.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full transition-all ${
                activeFilter === 'all' 
                  ? 'bg-sky-light text-white' 
                  : 'glass text-white hover:bg-white/10'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setActiveFilter('web')}
              className={`px-4 py-2 rounded-full transition-all ${
                activeFilter === 'web' 
                  ? 'bg-sky-light text-white' 
                  : 'glass text-white hover:bg-white/10'
              }`}
            >
              Web Development
            </button>
            <button
              onClick={() => setActiveFilter('electrical')}
              className={`px-4 py-2 rounded-full transition-all ${
                activeFilter === 'electrical' 
                  ? 'bg-sky-light text-white' 
                  : 'glass text-white hover:bg-white/10'
              }`}
            >
              Electrical Projects
            </button>
            <button
              onClick={() => setActiveFilter('robotics')}
              className={`px-4 py-2 rounded-full transition-all ${
                activeFilter === 'robotics' 
                  ? 'bg-sky-light text-white' 
                  : 'glass text-white hover:bg-white/10'
              }`}
            >
              Robotics & IoT
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div 
              key={project.id}
              className="glass rounded-xl overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="text-xs bg-white/20 px-2 py-1 rounded text-white">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-white/80 mb-4">{project.description}</p>
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.category === 'web' ? 'bg-blue-400/20 text-blue-300' :
                    project.category === 'electrical' ? 'bg-yellow-400/20 text-yellow-300' :
                    'bg-green-400/20 text-green-300'
                  }`}>
                    {project.category === 'web' ? 'Web Development' :
                     project.category === 'electrical' ? 'Electrical Engineering' :
                     'Robotics & IoT'}
                  </span>
                  <button className="text-sky-light hover:text-white transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
