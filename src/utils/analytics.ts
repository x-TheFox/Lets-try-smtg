// Agrya Telemetry & Live Chat Integration
// Crisp Website ID from verified legacy production baseline: 0d2afd41-48ab-4f4f-9b6a-9bcba18f6d85

declare global {
  interface Window {
    $crisp?: any[];
    CRISP_WEBSITE_ID?: string;
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

const DEFAULT_CRISP_ID = '0d2afd41-48ab-4f4f-9b6a-9bcba18f6d85';
const DEFAULT_GA_ID = 'G-AGRYA2026';

export function initCrisp(websiteId: string = DEFAULT_CRISP_ID) {
  if (typeof window === 'undefined') return;
  if (window.$crisp) return; // Already initialized

  window.$crisp = [];
  window.CRISP_WEBSITE_ID = import.meta.env.VITE_CRISP_WEBSITE_ID || websiteId;

  const script = document.createElement('script');
  script.src = 'https://client.crisp.chat/l.js';
  script.async = true;
  document.head.appendChild(script);
}

export function openCrispChat() {
  if (typeof window !== 'undefined' && window.$crisp) {
    window.$crisp.push(['do', 'chat:open']);
  }
}

export function initGA4(measurementId?: string) {
  if (typeof window === 'undefined') return;
  const id = measurementId || import.meta.env.VITE_GA_MEASUREMENT_ID || DEFAULT_GA_ID;
  if (!id) return;

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer?.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', id);
}

export type AnalyticsEvent = 
  | 'simulator_interact'
  | 'calculator_calculate'
  | 'diagnostic_complete'
  | 'booking_select_slot'
  | 'inquiry_submit'
  | 'partner_direct_click';

export function trackEvent(event: AnalyticsEvent, payload: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;
  
  // Custom DOM event for internal reactive listeners
  const customEvent = new CustomEvent('agrya_analytics', { detail: { event, payload, timestamp: Date.now() } });
  window.dispatchEvent(customEvent);

  // GA4 dispatch if available
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, payload);
  }

  // Development telemetry logging
  if (import.meta.env.DEV) {
    console.log(`[Telemetry] ${event}`, payload);
  }
}
