
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Import decomp globally for matter.js
import decomp from 'poly-decomp';

// Add decomp to window for Matter.js to use
if (typeof window !== 'undefined') {
  window.decomp = decomp;
}

createRoot(document.getElementById("root")!).render(<App />);
