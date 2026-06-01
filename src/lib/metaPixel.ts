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

type ViewContentParams = {
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  content_type?: string;
  value?: number;
  currency?: string;
};

type InitiateCheckoutParams = {
  content_name?: string;
  value?: number;
  currency?: string;
};

export function trackLead(params?: LeadParams): void {
  if (typeof window === 'undefined' || !window.fbq) return;
  window.fbq('track', 'Lead', params as Record<string, unknown>);
}

export function trackContact(): void {
  if (typeof window === 'undefined' || !window.fbq) return;
  window.fbq('track', 'Contact');
}

export function trackViewContent(params?: ViewContentParams): void {
  if (typeof window === 'undefined' || !window.fbq) return;
  window.fbq('track', 'ViewContent', params as Record<string, unknown>);
}

export function trackInitiateCheckout(params?: InitiateCheckoutParams): void {
  if (typeof window === 'undefined' || !window.fbq) return;
  window.fbq('track', 'InitiateCheckout', params as Record<string, unknown>);
}
