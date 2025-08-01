// src/components/Footer.tsx
import { memo } from 'react';

import IconLinkedin from '~icons/lucide/linkedin';
import IconInstagram from '~icons/lucide/instagram';
import IconFacebook from '~icons/lucide/facebook';
import IconMail from '~icons/lucide/mail';
import { sectionVariants, textVariants } from '@/lib/tailwindVariants';

interface FooterProps {
  therapistName?: string;
  socialLinks?: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
  };
}

const Footer = memo(({ therapistName, socialLinks }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={sectionVariants({ background: 'dark' }) + ' py-12'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {socialLinks && (
            <div className="flex justify-center space-x-6 mb-8">
              {socialLinks.linkedin && (
                <a 
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-sage transition-all duration-300 hover:-translate-y-1"
                  aria-label="LinkedIn"
                >
                  <IconLinkedin className="w-5 h-5" />
                </a>
              )}
              {socialLinks.instagram && (
                <a 
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-sage transition-all duration-300 hover:-translate-y-1"
                  aria-label="Instagram"
                >
                  <IconInstagram className="w-5 h-5" />
                </a>
              )}
              {socialLinks.facebook && (
                <a 
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-sage transition-all duration-300 hover:-translate-y-1"
                  aria-label="Facebook"
                >
                  <IconFacebook className="w-5 h-5" />
                </a>
              )}
              <a 
                href="#contact"
                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-sage transition-all duration-300 hover:-translate-y-1"
                aria-label="Email"
              >
                <IconMail className="w-5 h-5" />
              </a>
            </div>
          )}
          
          <p className={textVariants({ color: 'white' }) + ' mb-2 opacity-80'}>
            &copy; {currentYear} {therapistName || 'Profesjonalna Psychoterapia'} - Wszelkie prawa zastrzeżone
          </p>
          <p className="text-sm">
            <a 
              href="/polityka-prywatnosci" 
              className="text-gray-300 hover:text-white transition-colors underline decoration-dotted underline-offset-4"
            >
              Polityka prywatności
            </a>
            <span className="text-gray-400 mx-2">|</span>
            <a 
              href="/regulamin" 
              className="text-gray-300 hover:text-white transition-colors underline decoration-dotted underline-offset-4"
            >
              Regulamin
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;