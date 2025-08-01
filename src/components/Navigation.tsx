// src/components/Navigation.tsx
import { Link } from 'react-router-dom';
import { useState, useEffect, memo } from 'react';
import IconMenu from '~icons/lucide/menu';

interface NavigationProps {
  therapistName?: string;
}

const Navigation = memo(({ therapistName }: NavigationProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full top-0 z-50 bg-white transition-shadow duration-300 ${
      scrolled ? 'shadow-lg' : 'shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-5">
          <Link 
            to={therapistName ? `/terapeuta/${therapistName}` : '/'} 
            className="text-2xl font-serif font-bold text-gray-900 hover:text-therapy-600 transition-colors"
          >
            {therapistName || 'Profesjonalna Psychoterapia'}
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="nav-link">O mnie</a>
            <a href="#specializations" className="nav-link">Specjalizacje</a>
            <a href="#process" className="nav-link">Jak pracuję</a>
            <a href="#contact" className="nav-link">Kontakt</a>
            <a href="#book" className="btn-primary">
              Umów wizytę
            </a>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <IconMenu className="w-6 h-6" />
          </button>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <a href="#about" className="nav-link block px-4">O mnie</a>
              <a href="#specializations" className="nav-link block px-4">Specjalizacje</a>
              <a href="#process" className="nav-link block px-4">Jak pracuję</a>
              <a href="#contact" className="nav-link block px-4">Kontakt</a>
              <a href="#book" className="btn-primary block text-center mx-4">
                Umów wizytę
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;