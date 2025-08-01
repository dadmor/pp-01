import { Home, Lock, Clock } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const defaultFeatures: Feature[] = [
  {
    icon: <Home className="w-8 h-8" />,
    title: 'Komfort i intymność',
    description: 'Sesje odbywają się w Twoim bezpiecznym miejscu. Możesz otworzyć się w znanym otoczeniu, co często ułatwia proces terapeutyczny.'
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: 'Pełna dyskrecja',
    description: 'Wszystkie rozmowy są poufne i odbywają się przez szyfrowane połączenie. Twoje dane i historia terapii są bezpieczne.'
  },
  {
    icon: <Clock className="w-8 h-8" />,
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
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-6">
            Czym jest terapia online?
          </h2>
          <p className="text-lg text-warm-gray max-w-2xl mx-auto font-light">
            Profesjonalne wsparcie psychologiczne dostosowane do współczesnego stylu życia
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card bg-cream p-8 rounded-lg transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-elegant relative overflow-hidden group feature-border"
            >
              <div className="relative z-10">
                <div className="w-16 h-16 bg-khaki-light rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-sage text-sage group-hover:text-white">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold text-charcoal mb-4">
                  {feature.title}
                </h3>
                <p className="text-warm-gray leading-relaxed font-light">
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