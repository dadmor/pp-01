// src/components/ProcessSection.tsx
import { headingVariants, sectionVariants, textVariants } from '@/lib/tailwindVariants';
import { memo } from 'react';


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

const ProcessSection = memo(({ steps = defaultSteps }: ProcessSectionProps) => {
  return (
    <section id="process" className={sectionVariants({ background: 'cream' })}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={headingVariants({ size: 'h2', align: 'center' })}>
            Jak wygląda proces terapii?
          </h2>
          <p className={textVariants({ 
            size: 'lg', 
            color: 'gray', 
            align: 'center' 
          }) + ' max-w-2xl mx-auto'}>
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
                    <h3 className={headingVariants({ size: 'h4' })}>
                      {step.title}
                    </h3>
                    <p className={textVariants({ color: 'gray' })}>
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
});

ProcessSection.displayName = 'ProcessSection';

export default ProcessSection;