export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', name, params);
  }
}
