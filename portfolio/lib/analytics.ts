'use client';

import { track as vercelTrack } from '@vercel/analytics';

type AnalyticsValue = string | number | boolean | null | undefined;
type AnalyticsPayload = Record<string, AnalyticsValue>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function sanitizePayload(payload: AnalyticsPayload): Record<string, string | number | boolean | null> {
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined)
  ) as Record<string, string | number | boolean | null>;
}

export function trackEvent(eventName: string, payload: AnalyticsPayload = {}) {
  const cleanPayload = sanitizePayload(payload);

  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, cleanPayload);
    }
  } catch {
    // Ignore analytics transport failures.
  }

  try {
    vercelTrack(eventName, cleanPayload);
  } catch {
    // Ignore analytics transport failures.
  }
}

