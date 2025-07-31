import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

interface NavigationProps {
  therapistName?: string;
}

export default function Navigation({ therapistName }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
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
          <button className="md:hidden p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}