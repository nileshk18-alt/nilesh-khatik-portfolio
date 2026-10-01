/**
 * Lightweight, privacy-conscious analytics utility for Nilesh Khatik's Portfolio.
 * 
 * Features:
 * - Zero third-party cookies or tracker scripts (preserves 100% privacy and zero bundle bloat).
 * - Tracks meaningful user engagement events: Resume views, downloads, contact actions, project interactions.
 * - Dispatches standard custom events on `window` for extensible integration.
 * 
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
export function trackEvent(eventName, details = {}) {
  try {
    const payload = {
      event: eventName,
      timestamp: new Date().toISOString(),
      ...details,
    };

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('portfolio:analytics', { detail: payload }));
    }

    if (process.env.NODE_ENV === 'development') {
      console.debug(`[Analytics] ${eventName}:`, payload);
    }
  } catch (e) {
    // Fail silently to never interrupt user interaction
  }
}
