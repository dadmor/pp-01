// src/components/ContactSection.tsx
import { memo } from 'react';
import IconPhone from '~icons/lucide/phone';
import IconMail from '~icons/lucide/mail';
import IconCalendar from '~icons/lucide/calendar';
import IconCalendarCheck from '~icons/lucide/calendar-check';
import { buttonVariants, cardVariants, headingVariants, textVariants } from '@/lib/tailwindVariants';

interface ContactInfo {
  phone?: string;
  email: string;
  availability?: {
    days: string[];
    hours: string;
  };
}

interface ContactSectionProps {
  contact?: ContactInfo | null;
}

const ContactSection = memo(({ contact }: ContactSectionProps) => {
  // Zabezpieczenie przed brakiem danych kontaktowych
  if (!contact) {
    return (
      <section id="contact" className="py-24 bg-gradient-to-br from-khaki-light to-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={headingVariants({ size: 'h2', align: 'center' })}>
            Zróbmy pierwszy krok
          </h2>
          <p className={textVariants({ size: 'lg', color: 'gray' })}>
            Informacje kontaktowe są obecnie aktualizowane.
          </p>
        </div>
      </section>
    );
  }
  
  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-khaki-light to-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={headingVariants({ size: 'h2', align: 'center' })}>
            Zróbmy pierwszy krok
          </h2>
          <p className={textVariants({ 
            size: 'lg', 
            color: 'gray', 
            align: 'center' 
          }) + ' max-w-2xl mx-auto'}>
            Zdecydowanie się na terapię wymaga odwagi. Jestem tu, aby Cię wesprzeć
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {contact?.phone && (
            <div className={cardVariants({ variant: 'elevated' }) + ' text-center'}>
              <IconPhone className="w-8 h-8 text-sage-dark mb-4 mx-auto" />
              <h3 className={headingVariants({ size: 'h5' }) + ' text-center'}>
                Telefon
              </h3>
              <p className={textVariants({ color: 'gray' })}>
                {contact.phone}
              </p>
            </div>
          )}
          
          <div className={cardVariants({ variant: 'elevated' }) + ' text-center'}>
            <IconMail className="w-8 h-8 text-sage-dark mb-4 mx-auto" />
            <h3 className={headingVariants({ size: 'h5' }) + ' text-center'}>
              Email
            </h3>
            <p className={textVariants({ color: 'gray' })}>
              {contact.email || 'kontakt@profesjonalna-psychoterapia.pl'}
            </p>
          </div>
          
          {contact?.availability && (
            <div className={cardVariants({ variant: 'elevated' }) + ' text-center'}>
              <IconCalendar className="w-8 h-8 text-sage-dark mb-4 mx-auto" />
              <h3 className={headingVariants({ size: 'h5' }) + ' text-center'}>
                Dostępność
              </h3>
              <p className={textVariants({ color: 'gray' })}>
                {contact.availability.days?.join(', ')}<br />
                {contact.availability.hours}
              </p>
            </div>
          )}
        </div>
        
        <div className="text-center">
          <a 
            href="#book" 
            className={buttonVariants({ size: 'lg' })}
          >
            <IconCalendarCheck className="w-5 h-5 mr-3" />
            Umów pierwszą wizytę
          </a>
        </div>
      </div>
    </section>
  );
});

ContactSection.displayName = 'ContactSection';

export default ContactSection;