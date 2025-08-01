// src/ui/variants.ts
import { cva, type VariantProps } from 'class-variance-authority';

// Warianty nagłówków
export const headingVariants = cva(
  'font-serif font-bold text-charcoal',
  {
    variants: {
      size: {
        h1: 'text-4xl md:text-5xl lg:text-6xl mb-8',
        h2: 'text-4xl md:text-5xl mb-6',
        h3: 'text-3xl md:text-4xl mb-6',
        h4: 'text-2xl mb-4',
        h5: 'text-xl mb-3',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      }
    },
    defaultVariants: {
      size: 'h2',
      align: 'left',
    }
  }
);

// Warianty paragrafów - używamy klas zdefiniowanych w CSS
export const textVariants = cva(
  'font-light leading-relaxed',
  {
    variants: {
      size: {
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
      },
      color: {
        gray: 'text-gray-700', 
        muted: 'text-gray-600',
        charcoal: 'text-charcoal',
        white: 'text-white',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      }
    },
    defaultVariants: {
      size: 'base',
      color: 'gray',
      align: 'left',
    }
  }
);

// Warianty przycisków - używamy klas CSS zamiast apply
export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full font-semibold tracking-wide transition-all duration-300 transform hover:-translate-y-0.5',
  {
    variants: {
      variant: {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        tertiary: 'bg-terracotta-dark text-white hover:bg-terracotta-darker hover:shadow-lg',
      },
      size: {
        sm: 'px-6 py-2 text-sm',
        base: 'px-8 py-3',
        lg: 'px-8 py-4 text-lg',
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'base',
    }
  }
);

// Warianty kart
export const cardVariants = cva(
  'rounded-lg transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-white shadow-soft hover:shadow-medium',
        cream: 'bg-cream',
        elevated: 'bg-white shadow-soft hover:shadow-elegant hover:transform hover:-translate-y-1',
      },
      padding: {
        none: '',
        sm: 'p-4',
        base: 'p-6',
        lg: 'p-8',
      }
    },
    defaultVariants: {
      variant: 'default',
      padding: 'base',
    }
  }
);

// Warianty sekcji
export const sectionVariants = cva(
  'py-24',
  {
    variants: {
      background: {
        white: 'bg-white',
        cream: 'bg-cream',
        khaki: 'bg-khaki-light',
        gradient: 'bg-gradient-to-br from-cream to-white',
        dark: 'bg-gray-900 text-white',
      }
    },
    defaultVariants: {
      background: 'white',
    }
  }
);

// Export typów
export type HeadingVariants = VariantProps<typeof headingVariants>;
export type TextVariants = VariantProps<typeof textVariants>;
export type ButtonVariants = VariantProps<typeof buttonVariants>;
export type CardVariants = VariantProps<typeof cardVariants>;
export type SectionVariants = VariantProps<typeof sectionVariants>;