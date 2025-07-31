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
        <section id="contact" className="py-24 bg-gradient-to-br from-therapy-50 to-cream">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
              Zróbmy pierwszy krok
            </h2>
            <p className="text-lg text-gray-600">
              Informacje kontaktowe są obecnie aktualizowane.
            </p>
          </div>
        </section>
      );
    }
    return (
      <section id="contact" className="py-24 bg-gradient-to-br from-therapy-50 to-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
              Zróbmy pierwszy krok
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Zdecydowanie się na terapię wymaga odwagi. Jestem tu, aby Cię wesprzeć
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {contact?.phone && (
              <div className="contact-item bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                <i className="fas fa-phone-alt text-3xl text-therapy-600 mb-4"></i>
                <h4 className="font-serif text-xl font-bold text-gray-900 mb-2">
                  Telefon
                </h4>
                <p className="text-gray-600">
                  {contact?.phone}
                </p>
              </div>
            )}
            
            <div className="contact-item bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
              <i className="fas fa-envelope text-3xl text-therapy-600 mb-4"></i>
              <h4 className="font-serif text-xl font-bold text-gray-900 mb-2">
                Email
              </h4>
              <p className="text-gray-600">
                {contact?.email || 'kontakt@profesjonalna-psychoterapia.pl'}
              </p>
            </div>
            
            {contact?.availability && (
              <div className="contact-item bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                <i className="fas fa-calendar-alt text-3xl text-therapy-600 mb-4"></i>
                <h4 className="font-serif text-xl font-bold text-gray-900 mb-2">
                  Dostępność
                </h4>
                <p className="text-gray-600">
                  {contact.availability.days?.join(', ')}<br />
                  {contact.availability.hours}
                </p>
              </div>
            )}
          </div>
          
          <div className="text-center">
            <a 
              href="#book" 
              className="inline-flex items-center btn-primary text-lg px-8 py-4 animate-pulse"
            >
              <i className="fas fa-calendar-check mr-3"></i>
              Umów pierwszą wizytę
            </a>
          </div>
        </div>
      </section>
    );
  }