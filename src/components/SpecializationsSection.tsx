import { Cloud, HeartCrack, Sprout, Users, Battery, Compass, Apple, Activity, Bird, Brain, Link, Moon, Star } from 'lucide-react';

interface SpecializationsSectionProps {
  specializations: string[];
}

const iconMap: Record<string, React.ReactNode> = {
  "Lęk i niepokój": <Cloud className="w-10 h-10" />,
  Depresja: <HeartCrack className="w-10 h-10" />,
  "Rozwój osobisty": <Sprout className="w-10 h-10" />,
  "Trudności w relacjach": <Users className="w-10 h-10" />,
  "Wypalenie zawodowe": <Battery className="w-10 h-10" />,
  "Kryzysy życiowe": <Compass className="w-10 h-10" />,
  "Zaburzenia odżywiania": <Apple className="w-10 h-10" />,
  Traumy: <Activity className="w-10 h-10" />,
  Żałoba: <Bird className="w-10 h-10" />,
  Stres: <Brain className="w-10 h-10" />,
  Uzależnienia: <Link className="w-10 h-10" />,
  "Zaburzenia snu": <Moon className="w-10 h-10" />,
};

export default function SpecializationsSection({
  specializations,
}: SpecializationsSectionProps) {
  return (
    <section id="specializations" className="py-24 bg-therapy-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            W czym mogę Ci pomóc?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Specjalizuję się w terapii dorosłych, stosując podejście
            integracyjne
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {specializations.map((spec, index) => (
            <div
              key={index}
              className="spec-item bg-white p-6 rounded-lg text-center transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg hover:border-therapy-600 border border-transparent"
            >
              <div className="text-therapy-700 mb-4 flex justify-center">
                {iconMap[spec] || <Star className="w-10 h-10" />}
              </div>
              <h4 className="font-serif text-lg font-semibold text-gray-900">
                {spec}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}