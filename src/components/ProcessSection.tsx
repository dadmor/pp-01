interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

const defaultSteps: ProcessStep[] = [
  {
    number: 1,
    title: 'Pierwszy kontakt',
    description: 'Krótka, bezpłatna rozmowa telefoniczna (15-20 minut), podczas której poznamy się i omówimy Twoje oczekiwania.'
  },
  {
    number: 2,
    title: 'Sesja wstępna',
    description: 'Pierwsze spotkanie poświęcone jest dokładnemu poznaniu Twojej sytuacji i ustaleniu celów terapii.'
  },
  {
    number: 3,
    title: 'Plan współpracy',
    description: 'Wspólnie ustalimy częstotliwość i formę spotkań. Zazwyczaj spotykamy się raz w tygodniu.'
  },
  {
    number: 4,
    title: 'Praca terapeutyczna',
    description: 'Regularne sesje, podczas których będziemy pracować nad osiągnięciem Twoich celów w bezpiecznej atmosferze.'
  }
];

interface ProcessSectionProps {
  steps?: ProcessStep[];
}

export default function ProcessSection({ steps = defaultSteps }: ProcessSectionProps) {
  return (
    <section id="process" className="py-24 bg-cream">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-6">
            Jak wygląda proces terapii?
          </h2>
          <p className="text-lg text-warm-gray max-w-2xl mx-auto font-light">
            Każda droga jest inna, ale oto typowe etapy naszej wspólnej pracy
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-khaki-light hidden lg:block"></div>
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`flex items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } flex-col lg:gap-8`}
              >
                <div className="flex-1" />
                
                <div className="relative z-10">
                  <div className="timeline-dot">
                    {step.number}
                  </div>
                </div>
                
                <div className="flex-1 mt-6 lg:mt-0">
                  <div className="bg-white p-8 rounded-lg shadow-soft hover:shadow-medium transition-shadow duration-300">
                    <h4 className="text-2xl font-serif font-bold text-charcoal mb-3">
                      {step.title}
                    </h4>
                    <p className="text-warm-gray leading-relaxed font-light">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}