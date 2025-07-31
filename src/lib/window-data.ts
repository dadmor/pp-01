import type { Therapist } from '../types';

// Extend Window interface properly
declare global {
  interface Window {
    __THERAPIST_DATA__?: Therapist;
    __STATIC_DATA__?: {
      therapists?: Therapist[];
    };
  }
}

// Helper functions to access window data safely
export function getPreRenderedTherapist(): Therapist | undefined {
  if (typeof window !== 'undefined') {
    return window.__THERAPIST_DATA__;
  }
  return undefined;
}

export function getStaticTherapists(): Therapist[] | undefined {
  if (typeof window !== 'undefined') {
    return window.__STATIC_DATA__?.therapists;
  }
  return undefined;
}