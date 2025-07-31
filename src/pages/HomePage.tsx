import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Award, Video, Shield } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <SEO
        title="Profesjonalna Psychoterapia - Znajdź Swojego Terapeutę"
        description="Platforma łącząca pacjentów z wykwalifikowanymi psychoterapeutami. Terapia online w bezpiecznej atmosferze."
      />

      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cream to-therapy-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-900 mb-8">
            Znajdź swojego <span className="text-therapy-600">terapeutę</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Połączymy Cię z wykwalifikowanymi psychoterapeutami, 
            którzy pomogą Ci w drodze do lepszego samopoczucia
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/terapeuci" className="btn-primary text-lg px-8 py-4">
              Przeglądaj terapeutów
            </Link>
            <a href="#how-it-works" className="btn-secondary text-lg px-8 py-4">
              Jak to działa?
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-bold text-center text-gray-900 mb-16">
            Dlaczego warto wybrać naszą platformę?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-therapy-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-therapy-600" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                Certyfikowani specjaliści
              </h3>
              <p className="text-gray-600">
                Współpracujemy tylko z wykwalifikowanymi terapeutami posiadającymi odpowiednie certyfikaty
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-therapy-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Video className="w-10 h-10 text-therapy-600" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                Terapia online
              </h3>
              <p className="text-gray-600">
                Sesje w komfortowych warunkach domowych, bez konieczności dojazdu
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-therapy-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-therapy-600" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                Bezpieczeństwo
              </h3>
              <p className="text-gray-600">
                Szyfrowane połączenia i pełna poufność wszystkich sesji terapeutycznych
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 bg-therapy-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-bold text-center text-gray-900 mb-16">
            Jak rozpocząć terapię?
          </h2>
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-therapy-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                  Wybierz terapeutę
                </h3>
                <p className="text-gray-600">
                  Przeglądaj profile terapeutów, ich specjalizacje i doświadczenie
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-therapy-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                  Umów konsultację
                </h3>
                <p className="text-gray-600">
                  Skorzystaj z bezpłatnej 15-minutowej konsultacji telefonicznej
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-therapy-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                  Rozpocznij terapię
                </h3>
                <p className="text-gray-600">
                  Zacznij regularnie spotykać się ze swoim terapeutą online
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link to="/terapeuci" className="btn-primary text-lg px-8 py-4">
              Zobacz dostępnych terapeutów
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-therapy-600 to-therapy-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">
            Gotowy na zmianę?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Pierwszy krok jest zawsze najtrudniejszy. Jesteśmy tu, aby Ci pomóc.
          </p>
          <Link to="/terapeuci" className="bg-white text-therapy-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-block">
            Znajdź swojego terapeutę
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}