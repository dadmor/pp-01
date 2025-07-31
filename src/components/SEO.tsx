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
    
    // Update meta tags
    if (description) updateMetaTag('description', description);
    if (ogTitle) updateMetaTag('og:title', ogTitle);
    if (ogDescription) updateMetaTag('og:description', ogDescription);
    if (ogImage) updateMetaTag('og:image', ogImage);
    if (ogUrl) updateMetaTag('og:url', ogUrl);
    updateMetaTag('og:type', 'website');
    
  }, [title, description, canonical, ogTitle, ogDescription, ogImage, ogUrl]);
  
  return null;
}