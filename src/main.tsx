import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { initCrisp, initGA4 } from './utils/analytics';

// Defer third-party telemetry (Crisp, GA4) to avoid blocking FCP/LCP and forced reflows
if (typeof window !== 'undefined') {
  let loaded = false;
  const loadTracking = () => {
    if (loaded) return;
    loaded = true;
    initCrisp();
    initGA4();
    window.removeEventListener('scroll', loadTracking);
    window.removeEventListener('pointerdown', loadTracking);
    window.removeEventListener('keydown', loadTracking);
  };

  // Trigger on user engagement
  window.addEventListener('scroll', loadTracking, { passive: true, once: true });
  window.addEventListener('pointerdown', loadTracking, { passive: true, once: true });
  window.addEventListener('keydown', loadTracking, { passive: true, once: true });

  // Idle timeout fallback
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => {
      setTimeout(loadTracking, 3000);
    });
  } else {
    setTimeout(loadTracking, 4000);
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

