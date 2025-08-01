// src/components/SEO.tsx
import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  preloadImage?: string; // Dodaj nową opcję
}

export default function SEO({ 
  title, 
  description, 
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  preloadImage // Dodaj parametr
}: SEOProps) {
  useEffect(() => {
    // Update title
    document.title = title;
    
    // Update meta tags
    const updateMetaTag = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`) || 
                    document.querySelector(`meta[property="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        if (name.startsWith('og:')) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };
    
    // Update canonical
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonical;
    }
    
    // Add preload for hero/LCP image
    if (preloadImage) {
      const existingPreload = document.querySelector(`link[rel="preload"][href="${preloadImage}"]`);
      if (!existingPreload) {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        preloadLink.href = preloadImage;
        preloadLink.setAttribute('fetchpriority', 'high');
        document.head.appendChild(preloadLink);
      }
    }
    
    // Add preload for og:image if different from preloadImage
    if (ogImage && ogImage !== preloadImage) {
      const existingPreload = document.querySelector(`link[rel="preload"][href="${ogImage}"]`);
      if (!existingPreload) {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        preloadLink.href = ogImage;
        document.head.appendChild(preloadLink);
      }
    }
    
    // Update meta tags
    if (description) updateMetaTag('description', description);
    if (ogTitle) updateMetaTag('og:title', ogTitle);
    if (ogDescription) updateMetaTag('og:description', ogDescription);
    if (ogImage) updateMetaTag('og:image', ogImage);
    if (ogUrl) updateMetaTag('og:url', ogUrl);
    updateMetaTag('og:type', 'website');
    
    // Cleanup function
    return () => {
      // Remove preload links when component unmounts
      if (preloadImage) {
        const preloadLink = document.querySelector(`link[rel="preload"][href="${preloadImage}"]`);
        if (preloadLink) {
          preloadLink.remove();
        }
      }
      if (ogImage && ogImage !== preloadImage) {
        const preloadLink = document.querySelector(`link[rel="preload"][href="${ogImage}"]`);
        if (preloadLink) {
          preloadLink.remove();
        }
      }
    };
    
  }, [title, description, canonical, ogTitle, ogDescription, ogImage, ogUrl, preloadImage]);
  
  return null;
}