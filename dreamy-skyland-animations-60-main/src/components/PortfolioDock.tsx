
import {
  HomeIcon,
  User,
  Award,
  Briefcase,
  GraduationCap,
  Code,
  Mail,
  Palette
} from 'lucide-react';

import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';
import { useState } from 'react';
import { SkyboxTheme } from './SkyboxViewer';

interface PortfolioDockProps {
  onThemeChange?: (theme: SkyboxTheme) => void;
  themes?: SkyboxTheme[];
  currentTheme?: SkyboxTheme;
}

const PortfolioDock = ({ onThemeChange, themes = [], currentTheme }: PortfolioDockProps) => {
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  
  const scrollToSection = (id: string) => {
    // Improved scroll functionality with fallback
    const element = document.getElementById(id);
    if (element) {
      // Use a try-catch block to handle potential scroll errors
      try {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      } catch (error) {
        console.error("Scroll error:", error);
        // Fallback to standard scroll if smooth scroll fails
        window.scrollTo({
          top: element.offsetTop,
          behavior: 'auto'
        });
      }
    }
  };

  const dockItems = [
    {
      title: 'Home',
      icon: <HomeIcon className='h-full w-full text-white' />,
      sectionId: 'hero',
    },
    {
      title: 'About',
      icon: <User className='h-full w-full text-white' />,
      sectionId: 'about',
    },
    {
      title: 'Skills',
      icon: <Award className='h-full w-full text-white' />,
      sectionId: 'scroll-skills',
    },
    {
      title: 'Experience',
      icon: <Briefcase className='h-full w-full text-white' />,
      sectionId: 'experience',
    },
    {
      title: 'Education',
      icon: <GraduationCap className='h-full w-full text-white' />,
      sectionId: 'education',
    },
    {
      title: 'Projects',
      icon: <Code className='h-full w-full text-white' />,
      sectionId: 'scroll-projects',
    },
    {
      title: 'Contact',
      icon: <Mail className='h-full w-full text-white' />,
      sectionId: 'contact',
    },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
      <Dock className='glass-dark items-end pb-3 border border-white/10'>
        {dockItems.map((item, idx) => (
          <DockItem
            key={idx}
            className='aspect-square rounded-full glass-dark border border-white/10'
            onClick={() => scrollToSection(item.sectionId)}
          >
            <DockLabel>{item.title}</DockLabel>
            <DockIcon>{item.icon}</DockIcon>
          </DockItem>
        ))}
        
        {/* Theme Switcher Dock Item */}
        <DockItem
          className='aspect-square rounded-full glass-dark border border-white/10'
          onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
        >
          <DockLabel>{currentTheme?.name || 'Theme'}</DockLabel>
          <DockIcon>
            <Palette className='h-full w-full text-white' />
          </DockIcon>
          
          {/* Theme Selector Menu */}
          {isThemeMenuOpen && themes.length > 0 && onThemeChange && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 glass-dark rounded-md shadow-lg py-2 z-50">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onThemeChange(theme);
                    setIsThemeMenuOpen(false);
                  }}
                  className={`block px-4 py-2 text-sm w-full text-left hover:bg-white/10 transition-colors ${
                    currentTheme?.id === theme.id ? 'text-blue-400 font-medium' : 'text-white'
                  }`}
                >
                  {theme.name}
                </button>
              ))}
            </div>
          )}
        </DockItem>
      </Dock>
    </div>
  );
};

export default PortfolioDock;
