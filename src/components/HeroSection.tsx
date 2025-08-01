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
    <section className="hero-section mt-20 pt-20 pb-16 px-4 sm:px-6 lg:px-8 min-h-[85vh] flex items-center relative overflow-hidden bg-gradient-to-br from-cream to-khaki-light">
      {/* Decorative circle */}
      <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-khaki/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="hero-text">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-charcoal mb-6">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-sage uppercase tracking-wider mb-8 font-normal">
              {subtitle}
            </p>
            <p className="text-lg text-warm-gray mb-10 leading-relaxed">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#book" className="btn-primary text-center">
                Rozpocznij terapię
              </a>
              <a href="#consultation" className="btn-secondary text-center">
                Bezpłatna konsultacja
              </a>
            </div>
          </div>
          
          <div className="hero-image relative">
            <div className="relative aspect-[4/3] lg:aspect-[3/2] w-full">
              <img 
                src={imageUrl || 'https://psychocare.pl/wp-content/uploads/2019/09/DSC_0750b-1-scaled-e1614098812392.jpg'} 
                alt={therapistName || 'Psychoterapeuta'}
                className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-elegant"
                loading="eager"
              />
            </div>
            <div className="absolute top-5 left-5 -right-5 -bottom-5 bg-khaki-light/50 rounded-lg -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}