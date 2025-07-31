interface SpecializationsSectionProps {
  specializations: string[];
}

const iconMap: Record<string, string> = {
  "Lęk i niepokój": "fa-cloud",
  Depresja: "fa-heart-crack",
  "Rozwój osobisty": "fa-seedling",
  "Trudności w relacjach": "fa-people-arrows",
  "Wypalenie zawodowe": "fa-battery-quarter",
  "Kryzysy życiowe": "fa-compass",
  "Zaburzenia odżywiania": "fa-apple-alt",
  Traumy: "fa-band-aid",
  Żałoba: "fa-dove",
  Stres: "fa-brain",
  Uzależnienia: "fa-link",
  "Zaburzenia snu": "fa-moon",
};

export default function SpecializationsSection({
  specializations,
}: SpecializationsSectionProps) {
  return (
    <section id="specializations" className="py-24 bg-therapy-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            W czym mogę Ci pomóc?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Specjalizuję się w terapii dorosłych, stosując podejście
            integracyjne
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {specializations.map((spec, index) => (
            <div
              key={index}
              className="spec-item bg-white p-6 rounded-lg text-center transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg hover:border-therapy-600 border border-transparent"
            >
              <i
                className={`fas ${
                  iconMap[spec] || "fa-star"
                } text-4xl text-therapy-700 mb-4`}
              ></i>
              <h4 className="font-serif text-lg font-semibold text-gray-900">
                {spec}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
