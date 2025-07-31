import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import SEO from '../components/SEO';
import SchemaOrg from '../components/SchemaOrg';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import SpecializationsSection from '../components/SpecializationsSection';
import AboutSection from '../components/AboutSection';
import ProcessSection from '../components/ProcessSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { getTherapistBySlug } from '../lib/supabase';
import { getPreRenderedTherapist } from '../lib/window-data';
import { Loader2 } from 'lucide-react';


export default function TherapistPage() {
  const { slug } = useParams<{ slug: string }>();
  
  // Check if we have pre-rendered data
  const preRenderedData = getPreRenderedTherapist();
  
  const { data: therapist, isLoading, error } = useQuery({
    queryKey: ['therapist', slug],
    queryFn: () => getTherapistBySlug(slug!),
    initialData: preRenderedData,
    enabled: !!slug && !preRenderedData,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-therapy-600 mx-auto" />
          <p className="mt-4 text-gray-600">Ładowanie...</p>
        </div>
      </div>
    );
  }

  if (error || !therapist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Nie znaleziono terapeuty
          </h1>
          <a href="/" className="text-therapy-600 hover:underline">
            Wróć do strony głównej
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={therapist.meta_title || `${therapist.name} - ${therapist.title}`}
        description={therapist.meta_description || therapist.short_description}
        ogTitle={`${therapist.name} - ${therapist.title}`}
        ogDescription={therapist.short_description}
        ogUrl={`https://profesjonalna-psychoterapia.pl/terapeuta/${therapist.slug}`}
        ogImage={therapist.image_url}
        canonical={`https://profesjonalna-psychoterapia.pl/terapeuta/${therapist.slug}`}
      />
      
      <SchemaOrg therapist={therapist} />

      <Navigation therapistName={therapist.name} />
      
      <HeroSection
        title="Przestrzeń dla Twojego rozwoju"
        subtitle="PSYCHOTERAPIA ONLINE W BEZPIECZNEJ ATMOSFERZE"
        description={therapist.short_description}
        imageUrl={therapist.image_url}
        therapistName={therapist.name}
      />
      
      <FeaturesSection />
      
      <SpecializationsSection specializations={therapist.specializations} />
      
      <AboutSection
        name={therapist.name}
        description={therapist.description}
        imageUrl={therapist.image_url}
        credentials={therapist.specializations}
      />
      
      <ProcessSection />
      
      <ContactSection contact={therapist.contact} />
      
      <Footer 
        therapistName={therapist.name}
        socialLinks={{
          linkedin: '#',
          instagram: '#'
        }}
      />
    </>
  );
}