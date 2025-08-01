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
}

export default function SEO({ 
  title, 
  description, 
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl
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
    
    // Add preload for og:image if it exists
    if (ogImage) {
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
      // Remove preload link when component unmounts
      if (ogImage) {
        const preloadLink = document.querySelector(`link[rel="preload"][href="${ogImage}"]`);
        if (preloadLink) {
          preloadLink.remove();
        }
      }
    };
    
  }, [title, description, canonical, ogTitle, ogDescription, ogImage, ogUrl]);
  
  return null;
}