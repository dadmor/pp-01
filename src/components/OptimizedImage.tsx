// src/components/OptimizedImage.tsx
import { useState, useEffect, CSSProperties } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: string;
  style?: CSSProperties;
  sizes?: string;
  srcSet?: string;
}

export default function OptimizedImage({
  src,
  alt,
  className = "",
  width,
  height,
  priority = false,
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="100%25" height="100%25" fill="%23f3f4f6"/%3E%3C/svg%3E',
  style,
  sizes,
  srcSet,
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(priority ? src : placeholder);
  const [isLoaded, setIsLoaded] = useState(priority);
  const [isInView, setIsInView] = useState(priority);

  useEffect(() => {
    if (!priority && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observer.disconnect();
            }
          });
        },
        { rootMargin: "50px" }
      );

      const element = document.querySelector(`img[data-src="${src}"]`);
      if (element) {
        observer.observe(element);
      }

      return () => observer.disconnect();
    }
  }, [src, priority]);

  useEffect(() => {
    if (isInView && !priority) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
    }
  }, [isInView, src, priority]);

  return (
    <img
      {...{ 'data-src': src }} // Używamy spread operatora dla data attributes
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={`${className} ${!isLoaded ? "blur-sm" : ""} transition-all duration-300`}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      style={style}
      sizes={sizes}
      srcSet={srcSet}
      {...(priority ? { fetchPriority: "high" } : {})} // fetchPriority zamiast fetchpriority
    />
  );
}