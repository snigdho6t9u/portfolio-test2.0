
import { useState, useEffect } from 'react';
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, Facebook } from 'lucide-react';

const ContactCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Enable hover effect only on non-touch devices
  useEffect(() => {
    const isTouchDevice = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };
    
    if (!isTouchDevice()) {
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      
      const card = document.querySelector('.parent-3d');
      if (card) {
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);
      }
      
      return () => {
        if (card) {
          card.removeEventListener('mouseenter', handleMouseEnter);
          card.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
    }
  }, []);
  
  return (
    <div className="parent-3d perspective">
      <div 
        className={`card-3d ${isHovered ? 'hovered' : ''}`}
      >
        <div className="glass-effect"></div>
        <div className="content-3d">
          <span className="title-3d">Contact Information</span>
          <div className="contact-info">
            <div className="info-item">
              <div className="icon-wrapper">
                <MapPin className="icon" size={18} />
              </div>
              <div>
                <h4 className="info-title">Location</h4>
                <p className="info-text">Dhaka, Bangladesh</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="icon-wrapper">
                <Mail className="icon" size={18} />
              </div>
              <div>
                <h4 className="info-title">Email</h4>
                <p className="info-text">cyber.snigdho.dev@gmail.com</p>
                <p className="info-text">golam.murtaza@g.bracu.ac.bd</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="icon-wrapper">
                <Phone className="icon" size={18} />
              </div>
              <div>
                <h4 className="info-title">Skype</h4>
                <p className="info-text">live:.cid.9102e7abc5960652</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="logo-3d">
          <span className="circle circle1"></span>
          <span className="circle circle2"></span>
          <span className="circle circle3"></span>
          <span className="circle circle4"></span>
          <span className="circle circle5">
            <span className="logo-text">GMS</span>
          </span>
        </div>
        
        <div className="bottom-3d">
          <div className="social-buttons-container">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-button"
            >
              <Github size={15} />
            </a>
            
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-button"
            >
              <Linkedin size={15} />
            </a>
            
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-button"
            >
              <Twitter size={15} />
            </a>
            
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-button"
            >
              <Facebook size={15} />
            </a>
          </div>
          
          <div className="view-more">
            <a href="#contact" className="view-more-button">
              Contact Me
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="svg" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
