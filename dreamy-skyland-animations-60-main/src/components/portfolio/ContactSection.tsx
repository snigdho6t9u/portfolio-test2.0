
import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import Button from '../Button';
import { useToast } from "@/hooks/use-toast";
import { Meteors } from "../ui/meteors";
import ContactCard from './ContactCard';

const ContactSection = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isHovered, setIsHovered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const animationControls = useAnimation();
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [glowOpacity, setGlowOpacity] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [mouseOverCard, setMouseOverCard] = useState(false);
  const [particleIntensity, setParticleIntensity] = useState(0);
  
  // Create dynamically changing particles
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i, 
    size: Math.random() * 5 + 2, 
    speed: Math.random() * 0.5 + 0.1,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    color: `hsla(${Math.random() * 60 + 180}, 100%, 70%, ${Math.random() * 0.5 + 0.3})`
  }));
  
  // Keyboard interaction handler to make the form more interactive
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeField) {
        // Enhance typing experience with subtle animations
        animationControls.start({
          scale: [1, 1.01, 1],
          transition: { duration: 0.15 }
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeField, animationControls]);
  
  // Critical fix for input field interaction - now with enhanced focus handling
  useEffect(() => {
    const fixInputInteraction = () => {
      const inputElements = document.querySelectorAll('.form-input-3d, textarea.form-input-3d');
      inputElements.forEach(input => {
        // Ensure pointer events are properly set
        (input as HTMLElement).style.pointerEvents = 'auto';
        (input as HTMLElement).style.zIndex = '20';
        
        // Fix for all browsers - direct event capture
        input.addEventListener('pointerdown', (e) => {
          e.stopPropagation();
          (e.target as HTMLElement).focus();
        }, true);
        
        // Ensure click events are captured
        input.addEventListener('click', (e) => {
          e.stopPropagation();
          (e.target as HTMLElement).focus();
        }, true);
        
        // Fix for touch devices
        input.addEventListener('touchstart', (e) => {
          e.stopPropagation();
          setTimeout(() => {
            (e.target as HTMLElement).focus();
          }, 0);
        }, true);
      });
      
      // Fix for the entire form container
      const formContainer = document.querySelector('.form-card-3d');
      if (formContainer) {
        const fixFormContainer = formContainer as HTMLElement;
        fixFormContainer.style.transform = 'translateZ(0)'; // Force hardware acceleration
        
        // Set all inner elements to have proper pointer-events
        const innerElements = fixFormContainer.querySelectorAll('input, textarea, button, label');
        innerElements.forEach(el => {
          (el as HTMLElement).style.pointerEvents = 'auto';
          (el as HTMLElement).style.position = 'relative';
          (el as HTMLElement).style.zIndex = '5';
        });
      }
    };
    
    // Run fix immediately and after a short delay to ensure DOM is fully loaded
    fixInputInteraction();
    const timer = setTimeout(fixInputInteraction, 500);
    const timer2 = setTimeout(fixInputInteraction, 1500); // Additional delay for slow connections
    
    // Run the fix whenever there's a resize or orientation change
    window.addEventListener('resize', fixInputInteraction);
    window.addEventListener('orientationchange', fixInputInteraction);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      window.removeEventListener('resize', fixInputInteraction);
      window.removeEventListener('orientationchange', fixInputInteraction);
    };
  }, []);
  
  // NEW EFFECT: Add a MutationObserver to continuously ensure form inputs are working
  useEffect(() => {
    // Create a MutationObserver to watch for any DOM changes that might affect input functionality
    const observer = new MutationObserver(() => {
      const inputs = document.querySelectorAll('.form-input-3d');
      inputs.forEach(input => {
        (input as HTMLElement).style.pointerEvents = 'auto';
        (input as HTMLElement).style.zIndex = '20';
      });
    });
    
    // Start observing the form container
    const formContainer = document.querySelector('.form-card-3d');
    if (formContainer) {
      observer.observe(formContainer, { 
        childList: true, 
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
      });
    }
    
    return () => observer.disconnect();
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Add ripple effect on input change
    animationControls.start({
      scale: [1, 1.01, 1],
      transition: { duration: 0.2 }
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Enhanced rocket animation
    const rocketEl = document.querySelector('.rocket-container') as HTMLElement;
    if (rocketEl) {
      rocketEl.style.transform = 'translate3d(0, -200px, 100px) rotate(-45deg) scale(1.2)';
      rocketEl.style.opacity = '0';
      
      // Add particle burst effect
      setParticleIntensity(1);
      setTimeout(() => setParticleIntensity(0), 1500);
    }
    
    // Simulate form submission with enhanced visual feedback
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      
      setFormSubmitted(true);
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setIsSubmitting(false);
        setFormSubmitted(false);
        
        if (rocketEl) {
          rocketEl.style.transition = 'none';
          rocketEl.style.transform = 'translate3d(0, 0, 30px) rotate(-45deg)';
          rocketEl.style.opacity = '1';
          
          rocketEl.offsetHeight; // Force reflow
          
          rocketEl.style.transition = 'all 0.5s ease';
        }
      }, 2000);
    }, 1500);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setMouseOverCard(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlowOpacity(0);
    setMouseOverCard(false);
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!formRef.current) return;
    
    const rect = formRef.current.getBoundingClientRect();
    
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;
    
    const percentX = x / rect.width;
    const percentY = y / rect.height;
    
    // Enhanced rotation effect for more dramatic 3D
    const maxRotation = 6; // Increased for more dramatic effect
    const newRotateX = maxRotation - (percentY * maxRotation * 2);
    const newRotateY = (percentX * maxRotation * 2) - maxRotation;
    
    setRotateX(newRotateX);
    setRotateY(newRotateY);
    setMousePosition({ x, y });
    
    // Enhanced glow effect based on mouse position
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const distanceFromCenter = Math.sqrt(
      Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
    );
    const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
    const normalizedDistance = 1 - (distanceFromCenter / maxDistance);
    setGlowOpacity(normalizedDistance * 0.7); // Increased intensity
  };
  
  const handleFieldFocus = (name: string) => {
    setActiveField(name);
    setIsFocused(true);
    
    // Enhanced focus effect
    animationControls.start({
      scale: 1.02,
      transition: { duration: 0.3, type: "spring", stiffness: 300 }
    });
  };
  
  const handleFieldBlur = () => {
    setActiveField(null);
    setIsFocused(false);
    
    animationControls.start({
      scale: 1,
      transition: { duration: 0.3 }
    });
  };

  return (
    <section id="contact" className="py-20 px-6 md:px-10 min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <Meteors number={20} className="opacity-30" /> {/* Increased number of meteors */}
        
        {/* Enhanced dynamic particles */}
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full pointer-events-none z-0"
            initial={{ opacity: 0.3 }}
            animate={{ 
              opacity: mouseOverCard ? [0.5, 0.8, 0.5] : 0.3,
              scale: mouseOverCard ? [1, 1.2, 1] : 1
            }}
            transition={{ 
              duration: 2 / particle.speed,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              left: `${particle.initialX}%`,
              top: `${particle.initialY}%`,
              filter: 'blur(1px)'
            }}
          />
        ))}
        
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10" />
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            className="inline-block px-3 py-1 rounded-full glass text-white text-sm font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Let's <span className="text-sky-light relative">
              Connect
              <motion.span 
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.7 }}
                viewport={{ once: true }}
              />
            </span>
          </motion.h2>
          <motion.p 
            className="text-white/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Have a project in mind or want to collaborate? Feel free to reach out!
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-start"
          >
            <ContactCard />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="perspective relative z-10" // Added z-index and relative positioning
          >
            <AnimatePresence>
              {formSubmitted && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 flex items-center justify-center z-20 backdrop-blur-sm"
                >
                  <div className="success-checkmark">
                    <div className="check-icon">
                      <span className="icon-line line-tip"></span>
                      <span className="icon-line line-long"></span>
                      <div className="icon-circle"></div>
                      <div className="icon-fix"></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <motion.div 
              className={`form-card-3d ${isHovered ? 'hovered' : ''} ${isFocused ? 'focused' : ''}`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
              animate={{ 
                rotateX: rotateX, 
                rotateY: rotateY,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
              style={{
                transformStyle: 'preserve-3d',
                position: 'relative', // Ensure it's a positioned element
                zIndex: 10, // Ensure form is above background
                pointerEvents: 'auto', // Ensure events are captured
              }}
            >
              <div className="glass-effect-form"></div>
              
              {/* Enhanced radial glow effect */}
              <motion.div 
                className="absolute inset-0 rounded-[30px] pointer-events-none z-10" 
                animate={{
                  opacity: isHovered ? 1 : 0,
                }}
                transition={{
                  duration: 0.5
                }}
                style={{
                  background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
                                rgba(51, 195, 240, ${glowOpacity}), 
                                rgba(51, 195, 240, 0) 60%)`,
                  filter: 'blur(5px)',
                }}
              />
              
              {/* Dynamic background for the form */}
              <motion.div 
                className="absolute inset-0 rounded-[30px] overflow-hidden pointer-events-none z-0"
                initial={{ opacity: 0.1 }}
                animate={{ 
                  opacity: isHovered ? 0.15 : 0.1,
                }}
                transition={{ duration: 0.5 }}
              >
                <svg className="w-full h-full absolute" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <motion.path
                    d="M0,0 L100,0 L100,100 L0,100 Z"
                    fill="url(#gradientBg)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  />
                  <defs>
                    <linearGradient id="gradientBg" x1="0%" y1="0%" x2="100%" y2="100%">
                      <motion.stop 
                        stopColor="#33c3f0" 
                        stopOpacity="0.2" 
                        animate={{ 
                          stopOpacity: [0.1, 0.3, 0.1],
                          offset: [0, 0.5, 1]
                        }}
                        transition={{ duration: 5, repeat: Infinity }}
                      />
                      <motion.stop 
                        stopColor="#1eaedb" 
                        stopOpacity="0.5" 
                        animate={{ 
                          stopOpacity: [0.3, 0.6, 0.3],
                          offset: [0, 0.5, 1]
                        }}
                        transition={{ duration: 5, repeat: Infinity }}
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
              
              {/* Enhanced floating orbs with more dynamic animation */}
              <div className="orbs-container">
                <motion.div 
                  className={`orb orb1`}
                  animate={{ 
                    x: isHovered ? [-20, 10, -20] : 0,
                    y: isHovered ? [20, -15, 20] : 0,
                    z: isHovered ? 60 : 30,
                    opacity: isHovered ? [0.4, 0.6, 0.4] : 0.2
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity, 
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                >
                  <motion.div 
                    className="orb-inner"
                    animate={{ 
                      boxShadow: isHovered 
                        ? ['0 0 20px rgba(51, 195, 240, 0.4)', '0 0 30px rgba(51, 195, 240, 0.7)', '0 0 20px rgba(51, 195, 240, 0.4)']
                        : '0 0 15px rgba(51, 195, 240, 0.3)'
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  ></motion.div>
                </motion.div>
                <motion.div 
                  className={`orb orb2`}
                  animate={{ 
                    x: isHovered ? [20, -15, 20] : 0,
                    y: isHovered ? [-30, 10, -30] : 0,
                    z: isHovered ? 100 : 70,
                    opacity: isHovered ? [0.6, 0.8, 0.6] : 0.4
                  }}
                  transition={{ 
                    duration: 7, 
                    repeat: Infinity, 
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                >
                  <motion.div 
                    className="orb-inner"
                    animate={{ 
                      boxShadow: isHovered 
                        ? ['0 0 25px rgba(51, 195, 240, 0.5)', '0 0 40px rgba(51, 195, 240, 0.8)', '0 0 25px rgba(51, 195, 240, 0.5)']
                        : '0 0 20px rgba(51, 195, 240, 0.4)'
                    }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  ></motion.div>
                </motion.div>
                <motion.div 
                  className={`orb orb3`}
                  animate={{ 
                    x: isHovered ? [-30, 15, -30] : 0,
                    y: isHovered ? [-50, 20, -50] : 0,
                    z: isHovered ? 130 : 100,
                    opacity: isHovered ? [0.8, 0.9, 0.8] : 0.7
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                >
                  <motion.div 
                    className="orb-inner"
                    animate={{ 
                      boxShadow: isHovered 
                        ? ['0 0 30px rgba(51, 195, 240, 0.6)', '0 0 50px rgba(51, 195, 240, 0.9)', '0 0 30px rgba(51, 195, 240, 0.6)']
                        : '0 0 25px rgba(51, 195, 240, 0.5)'
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  ></motion.div>
                </motion.div>
                <motion.div 
                  className={`orb orb4`}
                  animate={{ 
                    x: isHovered ? [15, -10, 15] : 0,
                    y: isHovered ? [-70, 30, -70] : 0,
                    z: isHovered ? 150 : 120,
                    opacity: isHovered ? [0.95, 1, 0.95] : 0.9
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                >
                  <motion.div 
                    className="orb-inner"
                    animate={{ 
                      boxShadow: isHovered 
                        ? ['0 0 35px rgba(255, 255, 255, 0.7)', '0 0 60px rgba(255, 255, 255, 0.95)', '0 0 35px rgba(255, 255, 255, 0.7)']
                        : '0 0 30px rgba(255, 255, 255, 0.6)'
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  ></motion.div>
                </motion.div>
              </div>
              
              {/* Enhanced holographic grid */}
              <motion.div 
                className="holographic-grid"
                animate={{ 
                  opacity: isHovered ? [0.05, 0.15, 0.05] : 0
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {Array.from({ length: 15 }).map((_, i) => (
                  <motion.div 
                    key={`h-${i}`} 
                    className="grid-line horizontal" 
                    style={{ top: `${i * 7}%` }}
                    animate={{
                      opacity: isHovered ? [0.3, 0.8, 0.3] : 0.3,
                      boxShadow: isHovered ? 
                        ['0 0 2px rgba(51, 195, 240, 0.3)', '0 0 4px rgba(51, 195, 240, 0.6)', '0 0 2px rgba(51, 195, 240, 0.3)'] : 
                        '0 0 1px rgba(51, 195, 240, 0.2)'
                    }}
                    transition={{ 
                      duration: 2 + i * 0.2, 
                      repeat: Infinity, 
                      repeatType: "reverse"
                    }}
                  />
                ))}
                {Array.from({ length: 15 }).map((_, i) => (
                  <motion.div 
                    key={`v-${i}`} 
                    className="grid-line vertical" 
                    style={{ left: `${i * 7}%` }}
                    animate={{
                      opacity: isHovered ? [0.3, 0.8, 0.3] : 0.3,
                      boxShadow: isHovered ? 
                        ['0 0 2px rgba(51, 195, 240, 0.3)', '0 0 4px rgba(51, 195, 240, 0.6)', '0 0 2px rgba(51, 195, 240, 0.3)'] : 
                        '0 0 1px rgba(51, 195, 240, 0.2)'
                    }}
                    transition={{ 
                      duration: 2 + i * 0.2, 
                      repeat: Infinity, 
                      repeatType: "reverse"
                    }}
                  />
                ))}
              </motion.div>
              
              <motion.div 
                className="content-3d-form"
                animate={animationControls}
              >
                <motion.span 
                  className="title-3d"
                  animate={{ 
                    textShadow: isHovered 
                      ? ['0 0 5px rgba(51, 195, 240, 0.5)', '0 0 10px rgba(51, 195, 240, 0.8)', '0 0 5px rgba(51, 195, 240, 0.5)']
                      : '0 0 3px rgba(51, 195, 240, 0.3)'
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Send Me a Message
                </motion.span>
                
                <form ref={formRef} onSubmit={handleSubmit} className="form-content">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="form-field-wrapper">
                      <label htmlFor="name" className="block text-white/80 mb-2 relative z-10">Name</label>
                      <div className={`input-container ${activeField === 'name' ? 'active' : ''}`}>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => handleFieldFocus('name')}
                          onBlur={handleFieldBlur}
                          className="form-input-3d"
                          required
                          disabled={isSubmitting}
                          style={{ position: 'relative', zIndex: 20, pointerEvents: 'auto' }}
                        />
                        <div className="input-border"></div>
                        <div className="input-glow"></div>
                        
                        {activeField === 'name' && (
                          <motion.div 
                            className="scan-line"
                            animate={{
                              boxShadow: ['0 0 10px rgba(51, 195, 240, 0.7)', '0 0 20px rgba(51, 195, 240, 0.9)', '0 0 10px rgba(51, 195, 240, 0.7)']
                            }}
                            transition={{ duration: 1, repeat: Infinity }}
                          ></motion.div>
                        )}
                      </div>
                    </div>
                    
                    <div className="form-field-wrapper">
                      <label htmlFor="email" className="block text-white/80 mb-2 relative z-10">Email</label>
                      <div className={`input-container ${activeField === 'email' ? 'active' : ''}`}>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => handleFieldFocus('email')}
                          onBlur={handleFieldBlur}
                          className="form-input-3d"
                          required
                          disabled={isSubmitting}
                          style={{ position: 'relative', zIndex: 20, pointerEvents: 'auto' }}
                        />
                        <div className="input-border"></div>
                        <div className="input-glow"></div>
                        
                        {activeField === 'email' && (
                          <motion.div 
                            className="scan-line"
                            animate={{
                              boxShadow: ['0 0 10px rgba(51, 195, 240, 0.7)', '0 0 20px rgba(51, 195, 240, 0.9)', '0 0 10px rgba(51, 195, 240, 0.7)']
                            }}
                            transition={{ duration: 1, repeat: Infinity }}
                          ></motion.div>
                        )}
                      </div>
                    </div>
                    
                    <div className="form-field-wrapper">
                      <label htmlFor="subject" className="block text-white/80 mb-2 relative z-10">Subject</label>
                      <div className={`input-container ${activeField === 'subject' ? 'active' : ''}`}>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          onFocus={() => handleFieldFocus('subject')}
                          onBlur={handleFieldBlur}
                          className="form-input-3d"
                          disabled={isSubmitting}
                          style={{ position: 'relative', zIndex: 20, pointerEvents: 'auto' }}
                        />
                        <div className="input-border"></div>
                        <div className="input-glow"></div>
                        
                        {activeField === 'subject' && (
                          <motion.div 
                            className="scan-line"
                            animate={{
                              boxShadow: ['0 0 10px rgba(51, 195, 240, 0.7)', '0 0 20px rgba(51, 195, 240, 0.9)', '0 0 10px rgba(51, 195, 240, 0.7)']
                            }}
                            transition={{ duration: 1, repeat: Infinity }}
                          ></motion.div>
                        )}
                      </div>
                    </div>
                    
                    <div className="form-field-wrapper">
                      <label htmlFor="message" className="block text-white/80 mb-2 relative z-10">Message</label>
                      <div className={`input-container textarea-container ${activeField === 'message' ? 'active' : ''}`}>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => handleFieldFocus('message')}
                          onBlur={handleFieldBlur}
                          rows={4}
                          className="form-input-3d"
                          required
                          disabled={isSubmitting}
                          style={{ position: 'relative', zIndex: 20, pointerEvents: 'auto' }}
                        ></textarea>
                        <div className="input-border"></div>
                        <div className="input-glow"></div>
                        
                        {activeField === 'message' && (
                          <motion.div 
                            className="scan-line"
                            animate={{
                              boxShadow: ['0 0 10px rgba(51, 195, 240, 0.7)', '0 0 20px rgba(51, 195, 240, 0.9)', '0 0 10px rgba(51, 195, 240, 0.7)']
                            }}
                            transition={{ duration: 1, repeat: Infinity }}
                          ></motion.div>
                        )}
                      </div>
                    </div>
                    
                    <div className="form-bottom-3d">
                      <div className="send-icon-container">
                        <motion.div 
                          className="rocket-container"
                          animate={isHovered ? {
                            y: [0, -10, 0],
                            x: [0, 5, 0],
                            rotate: [-45, -43, -45]
                          } : {}}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <div className="rocket">
                            <motion.div 
                              className="rocket-body"
                              animate={{ 
                                boxShadow: isHovered ? 
                                  ['0 0 10px rgba(51, 195, 240, 0.7)', '0 0 20px rgba(51, 195, 240, 0.9)', '0 0 10px rgba(51, 195, 240, 0.7)'] :
                                  '0 0 10px rgba(51, 195, 240, 0.5)'
                              }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <motion.div 
                                className="window"
                                animate={{ 
                                  boxShadow: isHovered ? 
                                    ['inset 0 0 3px rgba(0, 0, 0, 0.5), 0 0 5px rgba(255, 255, 255, 0.7)', 
                                     'inset 0 0 5px rgba(0, 0, 0, 0.7), 0 0 10px rgba(255, 255, 255, 0.9)', 
                                     'inset 0 0 3px rgba(0, 0, 0, 0.5), 0 0 5px rgba(255, 255, 255, 0.7)'] :
                                    'inset 0 0 3px rgba(0, 0, 0, 0.5), 0 0 5px rgba(255, 255, 255, 0.5)'
                                }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                              <div className="rocket-engine">
                                <div className="engine-circle"></div>
                              </div>
                            </motion.div>
                            <motion.div 
                              className="rocket-fin fin-left"
                              animate={{ 
                                boxShadow: isHovered ? 
                                  ['0 0 5px rgba(51, 195, 240, 0.7)', '0 0 10px rgba(51, 195, 240, 0.9)', '0 0 5px rgba(51, 195, 240, 0.7)'] :
                                  '0 0 5px rgba(51, 195, 240, 0.5)'
                              }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <motion.div 
                              className="rocket-fin fin-right"
                              animate={{ 
                                boxShadow: isHovered ? 
                                  ['0 0 5px rgba(51, 195, 240, 0.7)', '0 0 10px rgba(51, 195, 240, 0.9)', '0 0 5px rgba(51, 195, 240, 0.7)'] :
                                  '0 0 5px rgba(51, 195, 240, 0.5)'
                              }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <div className="rocket-flames">
                              <motion.div 
                                className="flame flame-1"
                                animate={{ 
                                  height: isHovered ? [20, 25, 20] : [15, 20, 15],
                                  opacity: isHovered ? [0.8, 1, 0.8] : [0.5, 0.7, 0.5]
                                }}
                                transition={{ duration: 0.3, repeat: Infinity }}
                              />
                              <motion.div 
                                className="flame flame-2"
                                animate={{ 
                                  height: isHovered ? [15, 20, 15] : [12, 15, 12],
                                  opacity: isHovered ? [0.7, 0.9, 0.7] : [0.4, 0.6, 0.4]
                                }}
                                transition={{ duration: 0.2, repeat: Infinity, delay: 0.1 }}
                              />
                              <motion.div 
                                className="flame flame-3"
                                animate={{ 
                                  height: isHovered ? [10, 15, 10] : [8, 10, 8],
                                  opacity: isHovered ? [0.6, 0.8, 0.6] : [0.3, 0.5, 0.3]
                                }}
                                transition={{ duration: 0.15, repeat: Infinity, delay: 0.2 }}
                              />
                              <div className="flame-particles">
                                {Array.from({ length: 6 }).map((_, i) => (
                                  <motion.div 
                                    key={i} 
                                    className="flame-particle"
                                    animate={{ 
                                      y: [0, 10],
                                      opacity: [1, 0],
                                      boxShadow: isHovered ? 
                                        ['0 0 5px #FFC107', '0 0 10px #FFC107', '0 0 5px #FFC107'] :
                                        '0 0 5px #FFC107'
                                    }}
                                    transition={{ 
                                      duration: 1 - (i * 0.1),
                                      repeat: Infinity,
                                      delay: i * 0.1
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                      
                      <motion.button
                        type="submit" 
                        disabled={isSubmitting}
                        className={`submit-button-3d ${isSubmitting ? 'submitting' : ''}`}
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.98 }}
                        style={{ position: 'relative', zIndex: 20, pointerEvents: 'auto' }}
                      >
                        <span className="button-text">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                        <motion.div 
                          className="button-glow"
                          animate={{ 
                            opacity: isHovered ? [0.3, 0.7, 0.3] : 0,
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        
                        <motion.div 
                          className="pulse-ring ring1"
                          animate={{ 
                            scale: [1, 1.5],
                            opacity: [0.5, 0],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div 
                          className="pulse-ring ring2"
                          animate={{ 
                            scale: [1, 1.5],
                            opacity: [0.5, 0],
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        />
                      </motion.button>
                    </div>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
