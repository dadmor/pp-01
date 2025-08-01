// src/components/SpecializationsSection.tsx
import { memo } from 'react';
import IconCloud from '~icons/lucide/cloud';
import IconHeartCrack from '~icons/lucide/heart-crack';
import IconSprout from '~icons/lucide/sprout';
import IconUsers from '~icons/lucide/users';
import IconBattery from '~icons/lucide/battery';
import IconCompass from '~icons/lucide/compass';
import IconApple from '~icons/lucide/apple';
import IconActivity from '~icons/lucide/activity';
import IconBird from '~icons/lucide/bird';
import IconBrain from '~icons/lucide/brain';
import IconLink from '~icons/lucide/link';
import IconMoon from '~icons/lucide/moon';
import IconStar from '~icons/lucide/star';
import { headingVariants, sectionVariants, textVariants } from '@/lib/tailwindVariants';

interface SpecializationsSectionProps {
  specializations: string[];
}

const iconComponents: Record<string, React.FC<{ className?: string }>> = {
  "Lęk i niepokój": IconCloud,
  "Depresja": IconHeartCrack,
  "Rozwój osobisty": IconSprout,
  "Trudności w relacjach": IconUsers,
  "Wypalenie zawodowe": IconBattery,
  "Kryzysy życiowe": IconCompass,
  "Zaburzenia odżywiania": IconApple,
  "Traumy": IconActivity,
  "Żałoba": IconBird,
  "Stres": IconBrain,
  "Uzależnienia": IconLink,
  "Zaburzenia snu": IconMoon,
};

const SpecializationsSection = memo(({
  specializations,
}: SpecializationsSectionProps) => {
  return (
    <section id="specializations" className={sectionVariants({ background: 'khaki' })}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={headingVariants({ size: 'h2', align: 'center' })}>
            W czym mogę Ci pomóc?
          </h2>
          <p className={textVariants({ 
            size: 'lg', 
            color: 'gray', 
            align: 'center' 
          }) + ' max-w-2xl mx-auto'}>
            Specjalizuję się w terapii dorosłych, stosując podejście integracyjne
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
          {specializations.map((spec, index) => {
            const IconComponent = iconComponents[spec] || IconStar;
            
            return (
              <div
                key={index}
                className="bg-white px-8 py-6 rounded-lg text-center transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-medium border border-khaki/20 hover:border-sage-dark group min-w-[250px] flex-shrink-0"
              >
                <div className="text-terracotta mb-4 flex justify-center group-hover:text-sage-dark transition-colors">
                  <IconComponent className="w-12 h-12" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-charcoal whitespace-nowrap">
                  {spec}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

SpecializationsSection.displayName = 'SpecializationsSection';

export default SpecializationsSection;