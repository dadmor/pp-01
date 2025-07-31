import { Therapist } from '../types';

interface SchemaOrgProps {
  therapist: Therapist;
}

export default function SchemaOrg({ therapist }: SchemaOrgProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": therapist.name,
    "jobTitle": therapist.title,
    "description": therapist.short_description,
    "image": therapist.image_url,
    "url": `https://profesjonalna-psychoterapia.pl/terapeuta/${therapist.slug}`,
    "sameAs": [
      therapist.contact?.linkedin || "",
      therapist.contact?.instagram || ""
    ].filter(Boolean),
    "address": {
      "@type": "PostalAddress",
      "addressLocality": therapist.location?.city || "Warszawa",
      "addressCountry": "PL"
    },
    "offers": {
      "@type": "Offer",
      "price": therapist.price_per_hour,
      "priceCurrency": "PLN",
      "url": `https://profesjonalna-psychoterapia.pl/terapeuta/${therapist.slug}#book`
    },
    "makesOffer": therapist.specializations?.map(spec => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": `Psychoterapia - ${spec}`,
        "description": `Profesjonalna pomoc psychoterapeutyczna w zakresie: ${spec}`
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}