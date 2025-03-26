import { useEffect, useState, lazy, Suspense } from 'react';
import SkyboxViewer, { SkyboxTheme } from '../components/SkyboxViewer';
import NavBar from '../components/NavBar';
import HeroSection from '../components/HeroSection';
import ThemeSwitcher from '../components/ThemeSwitcher';
import AboutSection from '../components/portfolio/AboutSection';
import ExperienceSection from '../components/portfolio/ExperienceSection';
import EducationSection from '../components/portfolio/EducationSection';
import CertificationsSection from '../components/portfolio/CertificationsSection';
import ContactSection from '../components/portfolio/ContactSection';
import PortfolioDock from '../components/PortfolioDock';

// Lazy load heavy components to improve initial loading performance
const GravitySkillsSection = lazy(() => import('../components/portfolio/GravitySkillsSection'));
const ScrollSkillsSection = lazy(() => import('../components/portfolio/ScrollSkillsSection'));
const ScrollProjectsSection = lazy(() => import('../components/portfolio/ScrollProjectsSection'));

// Define available themes
const skyboxThemes: SkyboxTheme[] = [
  {
    id: 'bold-sky',
    name: 'Bold Sky',
    url: 'https://skybox.blockadelabs.com/e/1c36c9e4a0c59ca4fe3db65cf9b7f99c'
  },
  {
    id: 'multiverse',
    name: 'Multiverse',
    url: 'https://skybox.blockadelabs.com/e/b667ed8e8a877f266374cc891fe6a96c'
  },
  {
    id: 'starry-night',
    name: 'Starry Night Sky',
    url: 'https://skybox.blockadelabs.com/e/5471f5a18632c51ac641e7706f867c59'
  }
];

const Index = () => {
  const [currentTheme, setCurrentTheme] = useState<SkyboxTheme>(skyboxThemes[0]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href')!);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
    
    // Set loading false after initial render
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Loading placeholder
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Loading Portfolio</h1>
          <div className="w-16 h-16 border-4 border-t-sky-light border-white/30 rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden no-scrollbar">
      {/* 3D Skybox Background */}
      <SkyboxViewer theme={currentTheme} />
      
      {/* Theme Switcher (this will now be in the dock) */}
      <ThemeSwitcher 
        themes={skyboxThemes} 
        currentTheme={currentTheme} 
        onThemeChange={setCurrentTheme} 
        dockMode={true}
      />
      
      {/* Content */}
      <div className="content-container relative">
        <NavBar />
        
        {/* Hero Section */}
        <HeroSection />
        
        {/* About Section */}
        <AboutSection />
        
        {/* Suspense fallbacks for lazy-loaded components */}
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-t-sky-light border-white/30 rounded-full animate-spin"></div>
          </div>
        }>
          {/* Gravity Skills Section */}
          <GravitySkillsSection />
          
          {/* Scroll Skills Section */}
          <ScrollSkillsSection />
        </Suspense>
        
        {/* Experience Section */}
        <ExperienceSection />
        
        {/* Education Section */}
        <EducationSection />
        
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-t-sky-light border-white/30 rounded-full animate-spin"></div>
          </div>
        }>
          {/* Scroll Projects Section */}
          <ScrollProjectsSection />
        </Suspense>
        
        {/* Certifications Section */}
        <CertificationsSection />
        
        {/* Contact Section */}
        <ContactSection />
        
        {/* Footer */}
        <footer className="py-10 px-6 md:px-10 border-t border-white/10">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <span className="text-2xl font-bold text-white">Golam Murtaza Snigdho</span>
                <p className="text-white/60 mt-2">© {new Date().getFullYear()} All rights reserved.</p>
              </div>
              
              <div className="flex space-x-8">
                <a href="#about" className="text-white/80 hover:text-white transition-colors">About</a>
                <a href="#scroll-projects" className="text-white/80 hover:text-white transition-colors">Projects</a>
                <a href="#contact" className="text-white/80 hover:text-white transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </footer>
        
        {/* Dock Navigation */}
        <PortfolioDock onThemeChange={setCurrentTheme} themes={skyboxThemes} currentTheme={currentTheme} />
      </div>
    </div>
  );
};

export default Index;
