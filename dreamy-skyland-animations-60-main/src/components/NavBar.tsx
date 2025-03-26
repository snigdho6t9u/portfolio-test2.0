
import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Memoized scroll handler with optimization
  const handleScroll = useCallback(() => {
    const isScrolled = window.scrollY > 20;
    if (isScrolled !== scrolled) {
      setScrolled(isScrolled);
    }
  }, [scrolled]);

  useEffect(() => {
    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-40 py-4 px-6 transition-all duration-300", 
      scrolled ? "glass-dark backdrop-blur-md" : "bg-transparent"
    )}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold text-xl">GMS</div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <a href="#hero" className="text-white/80 hover:text-white transition-colors">Home</a>
            <a href="#about" className="text-white/80 hover:text-white transition-colors">About</a>
            <a href="#scroll-skills" className="text-white/80 hover:text-white transition-colors">Skills</a>
            <a href="#experience" className="text-white/80 hover:text-white transition-colors">Experience</a>
            <a href="#scroll-projects" className="text-white/80 hover:text-white transition-colors">Projects</a>
            <a href="#contact" className="text-white/80 hover:text-white transition-colors">Contact</a>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden text-white focus:outline-none"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 glass-dark p-4 rounded-lg animate-fade-in">
            <div className="flex flex-col space-y-4">
              <a href="#hero" className="text-white/80 hover:text-white transition-colors">Home</a>
              <a href="#about" className="text-white/80 hover:text-white transition-colors">About</a>
              <a href="#scroll-skills" className="text-white/80 hover:text-white transition-colors">Skills</a>
              <a href="#experience" className="text-white/80 hover:text-white transition-colors">Experience</a>
              <a href="#scroll-projects" className="text-white/80 hover:text-white transition-colors">Projects</a>
              <a href="#contact" className="text-white/80 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
