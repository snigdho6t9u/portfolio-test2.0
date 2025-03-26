
import { useState, useEffect, useRef } from 'react';
import { Gravity, MatterBody } from "../ui/gravity";
import { motion, AnimatePresence } from "framer-motion";

const GravitySkillsSection = () => {
  const [loaded, setLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Optimized physics properties for better performance
  const bodyOptions = {
    friction: 0.05,
    restitution: 0.2,
    density: 0.00008
  };
  
  useEffect(() => {
    // Progressive loading strategy with intersection observer
    let timer: NodeJS.Timeout;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          
          // Staggered loading to prevent layout shifts
          timer = setTimeout(() => {
            setLoaded(true);
          }, 300);
        } else {
          // Only unload when scrolled far away
          if (entry.boundingClientRect.top > window.innerHeight * 2 || 
              entry.boundingClientRect.bottom < -window.innerHeight) {
            setIsInView(false);
            setLoaded(false);
          }
        }
      },
      { 
        threshold: 0.1,
        rootMargin: "100px 0px"
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      clearTimeout(timer);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section 
      id="gravity-skills" 
      ref={sectionRef}
      className="py-16 lg:py-24 relative overflow-visible perspective h-[800px] md:h-[900px]"
    >
      {/* 3D space backdrop with subtle blur */}
      <div className="absolute inset-0 backdrop-blur-[1px] z-0"></div>
      
      {/* 3D floating particles */}
      <div className="absolute inset-0 z-0 opacity-30 perspective preserve-3d" style={{ perspective: "1000px" }}>
        {isInView && Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/50"
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`,
              opacity: 0,
              z: Math.random() * 500 - 250
            }}
            animate={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`, 
              opacity: [0.2, 0.5, 0.2],
              scale: [0.8, 1.2, 0.8],
              z: [Math.random() * 500 - 250, Math.random() * 500 - 250]
            }}
            transition={{ 
              duration: 5 + Math.random() * 10, 
              repeat: Infinity,
              ease: "linear" 
            }}
            style={{ 
              filter: `blur(${Math.random() * 2}px)`,
              transform: `translateZ(${Math.random() * 500 - 250}px)`
            }}
          />
        ))}
      </div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10 h-full">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient animate-fade-in">
            Skills Universe
          </h2>
        </motion.div>

        {/* Gravity animation container - only render when in view */}
        <div className="relative h-[500px] md:h-[600px] w-full mb-8 rounded-2xl overflow-visible preserve-3d z-10" style={{ transformStyle: "preserve-3d" }}>
          <AnimatePresence>
            {loaded && isInView && (
              <motion.div
                className="w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Gravity 
                  gravity={{ x: 0, y: 0.05 }}
                  resetOnResize={false}
                  className="w-full h-full preserve-3d"
                  autoStart={true}
                >
                  {/* Web Development Skills */}
                  <MatterBody 
                    matterBodyOptions={bodyOptions} 
                    x="20%" 
                    y="20%" 
                    bodyType="circle"
                  >
                    <motion.div 
                      className="flex items-center justify-center w-32 h-32 rounded-full backdrop-blur-md border border-white/20 shadow-lg text-white font-bold text-lg glass preserve-3d"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,255,255,0.3)" }}
                      style={{ transform: "translateZ(50px)" }}
                    >
                      <motion.span
                        className="text-center"
                        animate={{ 
                          rotateY: [0, 10, 0, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                      >
                        React
                      </motion.span>
                    </motion.div>
                  </MatterBody>
                  
                  <MatterBody 
                    matterBodyOptions={bodyOptions} 
                    x="70%" 
                    y="30%" 
                    bodyType="circle"
                  >
                    <motion.div 
                      className="flex items-center justify-center w-28 h-28 rounded-full backdrop-blur-md border border-white/20 shadow-lg text-white font-bold text-lg glass preserve-3d"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,255,255,0.3)" }}
                      style={{ transform: "translateZ(30px)" }}
                    >
                      <motion.span
                        className="text-center"
                        animate={{ 
                          rotateY: [0, -10, 0, 10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 4.5,
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                      >
                        TypeScript
                      </motion.span>
                    </motion.div>
                  </MatterBody>
                  
                  <MatterBody 
                    matterBodyOptions={bodyOptions} 
                    x="45%" 
                    y="15%" 
                    bodyType="circle"
                  >
                    <motion.div 
                      className="flex items-center justify-center w-36 h-36 rounded-full backdrop-blur-md border border-white/20 shadow-lg text-white font-bold text-lg glass preserve-3d"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,255,255,0.3)" }}
                      style={{ transform: "translateZ(70px)" }}
                    >
                      <motion.span
                        className="text-center"
                        animate={{ 
                          rotateY: [0, 15, 0, -15, 0],
                          scale: [1, 1.15, 1]
                        }}
                        transition={{ 
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                      >
                        Next.js
                      </motion.span>
                    </motion.div>
                  </MatterBody>
                  
                  <MatterBody 
                    matterBodyOptions={bodyOptions} 
                    x="30%" 
                    y="40%" 
                    bodyType="circle"
                  >
                    <motion.div 
                      className="flex items-center justify-center w-24 h-24 rounded-full backdrop-blur-md border border-white/20 shadow-lg text-white font-bold text-lg glass preserve-3d"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,255,255,0.3)" }}
                      style={{ transform: "translateZ(40px)" }}
                    >
                      <motion.span
                        className="text-center"
                        animate={{ 
                          rotateY: [0, -12, 0, 12, 0],
                          scale: [1, 1.12, 1]
                        }}
                        transition={{ 
                          duration: 5.5,
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                      >
                        Tailwind
                      </motion.span>
                    </motion.div>
                  </MatterBody>
                  
                  <MatterBody 
                    matterBodyOptions={bodyOptions} 
                    x="80%" 
                    y="15%" 
                    bodyType="circle"
                  >
                    <motion.div 
                      className="flex items-center justify-center w-28 h-28 rounded-full backdrop-blur-md border border-white/20 shadow-lg text-white font-bold text-lg glass preserve-3d"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,255,255,0.3)" }}
                      style={{ transform: "translateZ(60px)" }}
                    >
                      <motion.span
                        className="text-center"
                        animate={{ 
                          rotateY: [0, 14, 0, -14, 0],
                          scale: [1, 1.14, 1]
                        }}
                        transition={{ 
                          duration: 5.2,
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                      >
                        Node.js
                      </motion.span>
                    </motion.div>
                  </MatterBody>

                  {/* New Web Development Skills */}
                  <MatterBody 
                    matterBodyOptions={bodyOptions} 
                    x="60%" 
                    y="50%" 
                    bodyType="circle"
                  >
                    <motion.div 
                      className="flex items-center justify-center w-30 h-30 rounded-full backdrop-blur-md border border-white/20 shadow-lg text-white font-bold text-lg glass preserve-3d"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,255,255,0.3)" }}
                      style={{ transform: "translateZ(45px)" }}
                    >
                      <motion.span
                        className="text-center"
                        animate={{ 
                          rotateY: [0, 12, 0, -12, 0],
                          scale: [1, 1.12, 1]
                        }}
                        transition={{ 
                          duration: 4.8,
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                      >
                        GraphQL
                      </motion.span>
                    </motion.div>
                  </MatterBody>

                  <MatterBody 
                    matterBodyOptions={bodyOptions} 
                    x="15%" 
                    y="65%" 
                    bodyType="circle"
                  >
                    <motion.div 
                      className="flex items-center justify-center w-26 h-26 rounded-full backdrop-blur-md border border-white/20 shadow-lg text-white font-bold text-lg glass preserve-3d"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,255,255,0.3)" }}
                      style={{ transform: "translateZ(35px)" }}
                    >
                      <motion.span
                        className="text-center"
                        animate={{ 
                          rotateY: [0, -13, 0, 13, 0],
                          scale: [1, 1.13, 1]
                        }}
                        transition={{ 
                          duration: 5.3,
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                      >
                        Three.js
                      </motion.span>
                    </motion.div>
                  </MatterBody>

                  {/* Computer Vision Skills */}
                  <MatterBody 
                    matterBodyOptions={bodyOptions} 
                    x="25%" 
                    y="60%" 
                    bodyType="circle"
                  >
                    <motion.div 
                      className="flex items-center justify-center w-36 h-36 rounded-full backdrop-blur-md border border-white/20 shadow-lg text-white font-bold text-lg glass preserve-3d"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,255,255,0.3)" }}
                      style={{ transform: "translateZ(65px)" }}
                    >
                      <motion.span
                        className="text-center"
                        animate={{ 
                          rotateY: [0, -15, 0, 15, 0],
                          scale: [1, 1.15, 1]
                        }}
                        transition={{ 
                          duration: 5.8,
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                      >
                        OpenCV
                      </motion.span>
                    </motion.div>
                  </MatterBody>
                  
                  <MatterBody 
                    matterBodyOptions={bodyOptions} 
                    x="60%" 
                    y="70%" 
                    bodyType="circle"
                  >
                    <motion.div 
                      className="flex items-center justify-center w-32 h-32 rounded-full backdrop-blur-md border border-white/20 shadow-lg text-white font-bold text-lg glass preserve-3d"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,255,255,0.3)" }}
                      style={{ transform: "translateZ(55px)" }}
                    >
                      <motion.span
                        className="text-center"
                        animate={{ 
                          rotateY: [0, 13, 0, -13, 0],
                          scale: [1, 1.13, 1]
                        }}
                        transition={{ 
                          duration: 5.6,
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                      >
                        TensorFlow
                      </motion.span>
                    </motion.div>
                  </MatterBody>

                  {/* New Computer Vision Skills */}
                  <MatterBody 
                    matterBodyOptions={bodyOptions} 
                    x="75%" 
                    y="55%" 
                    bodyType="circle"
                  >
                    <motion.div 
                      className="flex items-center justify-center w-30 h-30 rounded-full backdrop-blur-md border border-white/20 shadow-lg text-white font-bold text-lg glass preserve-3d"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,255,255,0.3)" }}
                      style={{ transform: "translateZ(40px)" }}
                    >
                      <motion.span
                        className="text-center"
                        animate={{ 
                          rotateY: [0, 11, 0, -11, 0],
                          scale: [1, 1.11, 1]
                        }}
                        transition={{ 
                          duration: 4.9,
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                      >
                        PyTorch
                      </motion.span>
                    </motion.div>
                  </MatterBody>

                  <MatterBody 
                    matterBodyOptions={bodyOptions} 
                    x="40%" 
                    y="65%" 
                    bodyType="circle"
                  >
                    <motion.div 
                      className="flex items-center justify-center w-28 h-28 rounded-full backdrop-blur-md border border-white/20 shadow-lg text-white font-bold text-lg glass preserve-3d"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,255,255,0.3)" }}
                      style={{ transform: "translateZ(35px)" }}
                    >
                      <motion.span
                        className="text-center"
                        animate={{ 
                          rotateY: [0, -12, 0, 12, 0],
                          scale: [1, 1.12, 1]
                        }}
                        transition={{ 
                          duration: 5.1,
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                      >
                        YOLO
                      </motion.span>
                    </motion.div>
                  </MatterBody>

                  {/* Electrical Engineering Skills */}
                  <MatterBody 
                    matterBodyOptions={bodyOptions} 
                    x="35%" 
                    y="80%" 
                    bodyType="circle"
                  >
                    <motion.div 
                      className="flex items-center justify-center w-28 h-28 rounded-full backdrop-blur-md border border-white/20 shadow-lg text-white font-bold text-lg glass preserve-3d"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,255,255,0.3)" }}
                      style={{ transform: "translateZ(45px)" }}
                    >
                      <motion.span
                        className="text-center"
                        animate={{ 
                          rotateY: [0, -14, 0, 14, 0],
                          scale: [1, 1.14, 1]
                        }}
                        transition={{ 
                          duration: 5.4,
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                      >
                        Circuit Design
                      </motion.span>
                    </motion.div>
                  </MatterBody>

                  {/* New Electrical Engineering Skills */}
                  <MatterBody 
                    matterBodyOptions={bodyOptions} 
                    x="85%" 
                    y="80%" 
                    bodyType="circle"
                  >
                    <motion.div 
                      className="flex items-center justify-center w-32 h-32 rounded-full backdrop-blur-md border border-white/20 shadow-lg text-white font-bold text-lg glass preserve-3d"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,255,255,0.3)" }}
                      style={{ transform: "translateZ(60px)" }}
                    >
                      <motion.span
                        className="text-center"
                        animate={{ 
                          rotateY: [0, 16, 0, -16, 0],
                          scale: [1, 1.16, 1]
                        }}
                        transition={{ 
                          duration: 6.2,
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                      >
                        PCB Design
                      </motion.span>
                    </motion.div>
                  </MatterBody>

                  <MatterBody 
                    matterBodyOptions={bodyOptions} 
                    x="55%" 
                    y="85%" 
                    bodyType="circle"
                  >
                    <motion.div 
                      className="flex items-center justify-center w-30 h-30 rounded-full backdrop-blur-md border border-white/20 shadow-lg text-white font-bold text-lg glass preserve-3d"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,255,255,0.3)" }}
                      style={{ transform: "translateZ(50px)" }}
                    >
                      <motion.span
                        className="text-center"
                        animate={{ 
                          rotateY: [0, -13, 0, 13, 0],
                          scale: [1, 1.13, 1]
                        }}
                        transition={{ 
                          duration: 5.7,
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                      >
                        Microcontrollers
                      </motion.span>
                    </motion.div>
                  </MatterBody>

                  <MatterBody 
                    matterBodyOptions={bodyOptions} 
                    x="15%" 
                    y="85%" 
                    bodyType="circle"
                  >
                    <motion.div 
                      className="flex items-center justify-center w-26 h-26 rounded-full backdrop-blur-md border border-white/20 shadow-lg text-white font-bold text-lg glass preserve-3d"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,255,255,0.3)" }}
                      style={{ transform: "translateZ(30px)" }}
                    >
                      <motion.span
                        className="text-center"
                        animate={{ 
                          rotateY: [0, 10, 0, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 4.5,
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                      >
                        FPGA
                      </motion.span>
                    </motion.div>
                  </MatterBody>
                </Gravity>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Static placeholder when not in view */}
          {(!loaded || !isInView) && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.p 
                className="text-white/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Loading skills visualization...
              </motion.p>
            </div>
          )}

          {/* Instructions overlay */}
          {isInView && loaded && (
            <motion.div 
              className="absolute bottom-4 left-0 right-0 text-center text-white/70 text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <p>Drag and interact with the skill bubbles</p>
            </motion.div>
          )}
        </div>

        {/* Skills Categories - 3D glass cards with depth */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
          <motion.div 
            className="p-6 rounded-xl backdrop-blur-md border border-white/10 glass preserve-3d"
            initial={{ opacity: 0, y: 20, z: -20 }}
            whileInView={{ opacity: 1, y: 0, z: 30 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, z: 50 }}
            style={{ transformStyle: "preserve-3d", transform: "translateZ(30px)" }}
          >
            <h3 className="text-2xl font-bold mb-4 text-white">Web Development</h3>
            <p className="text-white/80">Creating modern web applications using React, Next.js, TypeScript, and other cutting-edge technologies.</p>
          </motion.div>
          
          <motion.div 
            className="p-6 rounded-xl backdrop-blur-md border border-white/10 glass preserve-3d"
            initial={{ opacity: 0, y: 20, z: -20 }}
            whileInView={{ opacity: 1, y: 0, z: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, z: 50 }}
            style={{ transformStyle: "preserve-3d", transform: "translateZ(30px)" }}
          >
            <h3 className="text-2xl font-bold mb-4 text-white">Computer Vision</h3>
            <p className="text-white/80">Implementing AI-powered vision systems using OpenCV, TensorFlow, PyTorch and custom algorithms.</p>
          </motion.div>
          
          <motion.div 
            className="p-6 rounded-xl backdrop-blur-md border border-white/10 glass preserve-3d"
            initial={{ opacity: 0, y: 20, z: -20 }}
            whileInView={{ opacity: 1, y: 0, z: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, z: 50 }}
            style={{ transformStyle: "preserve-3d", transform: "translateZ(30px)" }}
          >
            <h3 className="text-2xl font-bold mb-4 text-white">Electrical Engineering</h3>
            <p className="text-white/80">Designing electronic systems, PCBs, and embedded solutions with focus on precision and efficiency.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GravitySkillsSection;
