/**
 * High-velocity route prefetching utility.
 * Triggered on nav-link hover, focus, or idle to ensure route chunks
 * are already in browser memory before the user clicks, delivering
 * instant transitions with zero layout flash.
 */

const prefetchedRoutes = new Set<string>();

export const prefetchRoute = (path: string): void => {
  if (typeof window === 'undefined' || prefetchedRoutes.has(path)) {
    return;
  }

  prefetchedRoutes.add(path);

  switch (path) {
    case '/accounting-hub':
      import('../pages/AccountingHubPage');
      break;
    case '/cfo':
      import('../pages/CfoPage');
      break;
    case '/cfo-support':
      import('../pages/CfoSupportPage');
      break;
    case '/story':
      import('../pages/StoryPage');
      break;
    case '/team':
      import('../pages/TeamPage');
      break;
    case '/tools/runway-calculator':
      import('../pages/RunwayCalculatorPage');
      break;
    case '/terms':
      import('../pages/TermsPage');
      break;
    case '/privacy':
      import('../pages/PrivacyPage');
      break;
    default:
      break;
  }
};

/**
 * Automatically prefetches core secondary routes when browser is idle.
 */
export const scheduleIdlePrefetch = (): void => {
  if (typeof window === 'undefined') return;

  const coreRoutes = ['/cfo', '/accounting-hub', '/team', '/story'];

  const run = () => {
    coreRoutes.forEach((route, idx) => {
      setTimeout(() => prefetchRoute(route), idx * 150);
    });
  };

  if ('requestIdleCallback' in window) {
    (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(run);
  } else {
    setTimeout(run, 1200);
  }
};
