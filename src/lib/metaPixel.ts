declare global {
  interface Window {
    fbq?: (
      command: 'track' | 'trackCustom',
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

type LeadParams = {
  value?: number;
  currency?: string;
  content_name?: string;
};

export function trackLead(params?: LeadParams): void {
  if (typeof window === 'undefined' || !window.fbq) return;
  window.fbq('track', 'Lead', params as Record<string, unknown>);
}

export function trackContact(): void {
  if (typeof window === 'undefined' || !window.fbq) return;
  window.fbq('track', 'Contact');
}
