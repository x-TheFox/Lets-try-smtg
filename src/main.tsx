import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { initCrisp, initGA4 } from './utils/analytics';

// Lazy bootstrap tracking channels without blocking critical paint
if (typeof window !== 'undefined') {
  // Defer tracking slightly to prioritize initial content rendering
  setTimeout(() => {
    initCrisp();
    initGA4();
  }, 1200);
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

