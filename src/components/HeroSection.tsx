interface HeroSectionProps {
    title: string;
    subtitle: string;
    description: string;
    imageUrl?: string;
    therapistName?: string;
  }
  
  export default function HeroSection({ 
    title, 
    subtitle, 
    description, 
    imageUrl,
    therapistName 
  }: HeroSectionProps) {
    return (
      <section className="hero-section mt-20 pt-20 pb-16 px-4 sm:px-6 lg:px-8 min-h-[85vh] flex items-center relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-cream to-therapy-50 -z-10"></div>
        
        {/* Decorative circle */}
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-therapy-100 rounded-full opacity-20 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="hero-text">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-6 animate-fade-in-up">
                {title}
              </h1>
              <p className="text-lg md:text-xl text-therapy-600 uppercase tracking-wider mb-8 font-normal animate-fade-in-up animation-delay-200">
                {subtitle}
              </p>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed animate-fade-in-up animation-delay-400">
                {description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-600">
                <a href="#book" className="btn-primary text-center">
                  Rozpocznij terapię
                </a>
                <a href="#consultation" className="btn-secondary text-center">
                  Bezpłatna konsultacja
                </a>
              </div>
            </div>
            
            <div className="hero-image relative animate-fade-in animation-delay-800">
              <img 
                src={imageUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=450&fit=crop'} 
                alt={therapistName || 'Psychoterapeuta'}
                className="w-full rounded-lg shadow-2xl"
              />
              <div className="absolute top-5 left-5 -right-5 -bottom-5 bg-therapy-100 rounded-lg -z-10 opacity-50"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }