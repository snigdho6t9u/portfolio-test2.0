
import { BackgroundPaths } from './ui/background-paths';
import { Meteors } from './ui/meteors';

const HeroSection = () => {
  return (
    <section id="hero" className="min-h-screen relative">
      <BackgroundPaths 
        title="Golam Murtaza Snigdho" 
        ctaText="View Projects" 
        ctaLink="#scroll-projects" 
        showCta={true}
        sectionHeight="min-h-screen"
        textColor="white"
        pathColor="white"
      />
      
      <div className="absolute inset-0 overflow-hidden">
        <Meteors number={20} className="opacity-70" />
      </div>
      
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
