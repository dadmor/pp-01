import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useTherapists } from '../hooks/useTherapists';
import { MapPin, Loader2 } from 'lucide-react';

export default function TherapistListPage() {
  const { data: therapists = [], isLoading, error } = useTherapists();

  return (
    <>
      <SEO
        title="Nasi Terapeuci - Profesjonalna Psychoterapia"
        description="Poznaj naszych certyfikowanych psychoterapeutów. Znajdź specjalistę dopasowanego do Twoich potrzeb."
      />

      <Navigation />
      
      {/* Header */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-therapy-50 to-cream">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-serif font-bold text-gray-900 mb-6">
            Nasi Terapeuci
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Wszyscy nasi specjaliści posiadają odpowiednie kwalifikacje i doświadczenie w pracy terapeutycznej
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-6 py-2 rounded-full bg-therapy-600 text-white font-medium">
              Wszyscy
            </button>
            <button className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors font-medium">
              Lęk i depresja
            </button>
            <button className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors font-medium">
              Relacje
            </button>
            <button className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors font-medium">
              Rozwój osobisty
            </button>
          </div>
        </div>
      </section>

      {/* Therapists Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 text-therapy-600 mx-auto" />
              <p className="mt-4 text-gray-600">Ładowanie terapeutów...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">Wystąpił błąd podczas ładowania terapeutów.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {therapists.map((therapist) => (
                <Link
                  key={therapist.id}
                  to={`/terapeuta/${therapist.slug}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="aspect-w-4 aspect-h-3 bg-gray-200">
                    <img 
                      src={therapist.image_url || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop'} 
                      alt={therapist.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                      {therapist.name}
                    </h3>
                    <p className="text-therapy-600 font-medium mb-4">
                      {therapist.title}
                    </p>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {therapist.short_description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {therapist.specializations && therapist.specializations.length > 0 ? (
                        <>
                          {therapist.specializations.slice(0, 3).map((spec: string, index: number) => (
                            <span 
                              key={index}
                              className="text-xs bg-therapy-50 text-therapy-700 px-3 py-1 rounded-full"
                            >
                              {spec}
                            </span>
                          ))}
                          {therapist.specializations.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{therapist.specializations.length - 3} więcej
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-xs text-gray-500">Brak specjalizacji</span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {therapist.location?.city || 'Warszawa'}
                      </span>
                      <span className="text-therapy-600 font-semibold">
                        {therapist.price_per_hour ? `${therapist.price_per_hour} zł/h` : 'Cena do uzgodnienia'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}