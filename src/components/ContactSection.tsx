import { Phone, Mail, Calendar, CalendarCheck } from 'lucide-react';

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

export default function ContactSection({ contact }: ContactSectionProps) {
  // Zabezpieczenie przed brakiem danych kontaktowych
  if (!contact) {
    return (
      <section id="contact" className="py-24 bg-gradient-to-br from-khaki-light to-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-6">
            Zróbmy pierwszy krok
          </h2>
          <p className="text-lg text-warm-gray font-light">
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
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-6">
            Zróbmy pierwszy krok
          </h2>
          <p className="text-lg text-warm-gray max-w-2xl mx-auto font-light">
            Zdecydowanie się na terapię wymaga odwagi. Jestem tu, aby Cię wesprzeć
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {contact?.phone && (
            <div className="contact-item bg-white p-8 rounded-lg shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 text-center">
              <Phone className="w-8 h-8 text-sage mb-4 mx-auto" />
              <h4 className="font-serif text-xl font-bold text-charcoal mb-2">
                Telefon
              </h4>
              <p className="text-warm-gray font-light">
                {contact?.phone}
              </p>
            </div>
          )}
          
          <div className="contact-item bg-white p-8 rounded-lg shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 text-center">
            <Mail className="w-8 h-8 text-sage mb-4 mx-auto" />
            <h4 className="font-serif text-xl font-bold text-charcoal mb-2">
              Email
            </h4>
            <p className="text-warm-gray font-light">
              {contact?.email || 'kontakt@profesjonalna-psychoterapia.pl'}
            </p>
          </div>
          
          {contact?.availability && (
            <div className="contact-item bg-white p-8 rounded-lg shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 text-center">
              <Calendar className="w-8 h-8 text-sage mb-4 mx-auto" />
              <h4 className="font-serif text-xl font-bold text-charcoal mb-2">
                Dostępność
              </h4>
              <p className="text-warm-gray font-light">
                {contact.availability.days?.join(', ')}<br />
                {contact.availability.hours}
              </p>
            </div>
          )}
        </div>
        
        <div className="text-center">
          <a 
            href="#book" 
            className="inline-flex items-center btn-primary text-lg px-8 py-4"
          >
            <CalendarCheck className="w-5 h-5 mr-3" />
            Umów pierwszą wizytę
          </a>
        </div>
      </div>
    </section>
  );
}