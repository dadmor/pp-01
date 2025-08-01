import { Cloud, HeartCrack, Sprout, Users, Battery, Compass, Apple, Activity, Bird, Brain, Link, Moon, Star } from 'lucide-react';

interface SpecializationsSectionProps {
  specializations: string[];
}

const iconMap: Record<string, React.ReactNode> = {
  "Lęk i niepokój": <Cloud className="w-12 h-12" />,
  Depresja: <HeartCrack className="w-12 h-12" />,
  "Rozwój osobisty": <Sprout className="w-12 h-12" />,
  "Trudności w relacjach": <Users className="w-12 h-12" />,
  "Wypalenie zawodowe": <Battery className="w-12 h-12" />,
  "Kryzysy życiowe": <Compass className="w-12 h-12" />,
  "Zaburzenia odżywiania": <Apple className="w-12 h-12" />,
  Traumy: <Activity className="w-12 h-12" />,
  Żałoba: <Bird className="w-12 h-12" />,
  Stres: <Brain className="w-12 h-12" />,
  Uzależnienia: <Link className="w-12 h-12" />,
  "Zaburzenia snu": <Moon className="w-12 h-12" />,
};

export default function SpecializationsSection({
  specializations,
}: SpecializationsSectionProps) {
  return (
    <section id="specializations" className="py-24 bg-khaki-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-6">
            W czym mogę Ci pomóc?
          </h2>
          <p className="text-lg text-warm-gray max-w-2xl mx-auto font-light">
            Specjalizuję się w terapii dorosłych, stosując podejście integracyjne
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
          {specializations.map((spec, index) => (
            <div
              key={index}
              className="bg-white px-8 py-6 rounded-lg text-center transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-medium border border-khaki/20 hover:border-sage group min-w-[250px] flex-shrink-0"
            >
              <div className="text-terracotta mb-4 flex justify-center group-hover:text-sage transition-colors">
                {iconMap[spec] || <Star className="w-12 h-12" />}
              </div>
              <h4 className="font-serif text-lg font-semibold text-charcoal whitespace-nowrap">
                {spec}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}