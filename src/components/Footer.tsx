import { Linkedin, Instagram, Facebook, Mail } from 'lucide-react';

interface FooterProps {
  therapistName?: string;
  socialLinks?: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
  };
}

export default function Footer({ therapistName, socialLinks }: FooterProps) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {socialLinks && (
            <div className="flex justify-center space-x-6 mb-8">
              {socialLinks.linkedin && (
                <a 
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-therapy-600 transition-all duration-300 hover:-translate-y-1"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {socialLinks.instagram && (
                <a 
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-therapy-600 transition-all duration-300 hover:-translate-y-1"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {socialLinks.facebook && (
                <a 
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-therapy-600 transition-all duration-300 hover:-translate-y-1"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              <a 
                href="#contact"
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-therapy-600 transition-all duration-300 hover:-translate-y-1"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          )}
          
          <p className="text-gray-400 mb-2">
            &copy; {currentYear} {therapistName || 'Profesjonalna Psychoterapia'} - Wszelkie prawa zastrzeżone
          </p>
          <p className="text-gray-500 text-sm">
            <a href="/polityka-prywatnosci" className="hover:text-white transition-colors">
              Polityka prywatności
            </a>
            {' | '}
            <a href="/regulamin" className="hover:text-white transition-colors">
              Regulamin
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}