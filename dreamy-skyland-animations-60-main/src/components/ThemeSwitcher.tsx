
import { useState } from 'react';
import { SkyboxTheme } from './SkyboxViewer';
import Button from './Button';
import { Palette } from 'lucide-react';

interface ThemeSwitcherProps {
  themes: SkyboxTheme[];
  currentTheme: SkyboxTheme;
  onThemeChange: (theme: SkyboxTheme) => void;
  dockMode?: boolean;
}

const ThemeSwitcher = ({ themes, currentTheme, onThemeChange, dockMode = false }: ThemeSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Don't render if it's dock mode as it will be rendered in the dock
  if (dockMode) return null;

  return (
    <div className="fixed top-24 right-6 z-50">
      <div className="relative">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="glass text-white border-white/20 hover:bg-white/20"
        >
          <span>{currentTheme.name}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-2"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </Button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 origin-top-right glass rounded-md shadow-lg py-1 focus:outline-none">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => {
                  onThemeChange(theme);
                  setIsOpen(false);
                }}
                className={`block px-4 py-2 text-sm w-full text-left hover:bg-white/10 transition-colors ${
                  currentTheme.id === theme.id ? 'text-sky-light font-medium' : 'text-white'
                }`}
              >
                {theme.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
