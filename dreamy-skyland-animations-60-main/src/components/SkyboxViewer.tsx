
import { useEffect, useRef } from 'react';

export interface SkyboxTheme {
  id: string;
  name: string;
  url: string;
}

interface SkyboxViewerProps {
  theme: SkyboxTheme;
}

const SkyboxViewer = ({ theme }: SkyboxViewerProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeIframe = () => {
      if (iframeRef.current) {
        // Make iframe fill the entire viewport
        iframeRef.current.style.width = '100vw';
        iframeRef.current.style.height = '100vh';
      }
    };

    // Initial resize
    resizeIframe();
    
    // Resize on window size change
    window.addEventListener('resize', resizeIframe);
    
    // Critical fix for iframe capturing click events
    if (containerRef.current) {
      containerRef.current.addEventListener('click', (e) => {
        // This ensures that clicks pass through the iframe container
        e.stopPropagation();
      });
    }
    
    return () => {
      window.removeEventListener('resize', resizeIframe);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="skybox-container animate-blur-in fixed top-0 left-0 w-full h-full z-[-1]"
      style={{ pointerEvents: 'none' }} // Ensure entire container doesn't capture events
    >
      <iframe 
        ref={iframeRef}
        src={theme.url} 
        style={{ 
          border: 0,
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none', // Allow clickthrough to the content
          transform: 'scale(1.05)', // Slight scale to prevent edge gaps
          transformOrigin: 'center center',
          transition: 'opacity 0.8s ease, transform 2s ease',
          zIndex: -2
        }}
        allow="fullscreen"
        title={`3D Skybox - ${theme.name}`}
      />
      {/* Overlay to control opacity of the skybox - making it more translucent for portfolio content */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] pointer-events-none" 
        aria-hidden="true"
        style={{ zIndex: -1 }}
      ></div>
    </div>
  );
};

export default SkyboxViewer;
