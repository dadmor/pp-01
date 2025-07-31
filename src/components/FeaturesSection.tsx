interface Feature {
    icon: string;
    title: string;
    description: string;
  }
  
  const defaultFeatures: Feature[] = [
    {
      icon: 'fa-home',
      title: 'Komfort i intymność',
      description: 'Sesje odbywają się w Twoim bezpiecznym miejscu. Możesz otworzyć się w znanym otoczeniu, co często ułatwia proces terapeutyczny.'
    },
    {
      icon: 'fa-lock',
      title: 'Pełna dyskrecja',
      description: 'Wszystkie rozmowy są poufne i odbywają się przez szyfrowane połączenie. Twoje dane i historia terapii są bezpieczne.'
    },
    {
      icon: 'fa-clock',
      title: 'Elastyczność',
      description: 'Dopasowujemy terminy do Twojego rytmu życia. Możliwość spotkań wieczornych i weekendowych.'
    }
  ];
  
  interface FeaturesSectionProps {
    features?: Feature[];
  }
  
  export default function FeaturesSection({ features = defaultFeatures }: FeaturesSectionProps) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
              Czym jest terapia online?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Profesjonalne wsparcie psychologiczne dostosowane do współczesnego stylu życia
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card bg-cream p-8 rounded-lg transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 w-1 bg-therapy-600 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-therapy-100 rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-therapy-600">
                    <i className={`fas ${feature.icon} text-2xl text-therapy-600 group-hover:text-white transition-colors duration-300`}></i>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }