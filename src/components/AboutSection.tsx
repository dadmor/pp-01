interface AboutSectionProps {
  name: string;
  description: string;
  imageUrl?: string;
  credentials?: string[];
}

export default function AboutSection({ 
  name, 
  description, 
  imageUrl,
  credentials = [] 
}: AboutSectionProps) {
  // Split description into paragraphs
  const paragraphs = description.split('\n').filter(p => p.trim());
  
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-1 relative">
            <img 
              src={imageUrl || 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=500&fit=crop'} 
              alt={name}
              className="w-full rounded-lg shadow-elegant"
            />
            <div className="absolute -top-4 -left-4 right-4 bottom-4 bg-khaki-light rounded-lg -z-10"></div>
          </div>
          
          <div className="lg:col-span-2">
            <h3 className="text-4xl font-serif font-bold text-charcoal mb-8">
              Kim jestem?
            </h3>
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-warm-gray mb-6 leading-relaxed text-lg font-light">
                {paragraph}
              </p>
            ))}
            
            {credentials.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-8">
                {credentials.map((credential, index) => (
                  <span 
                    key={index}
                    className="bg-cream px-6 py-2 rounded-full text-sm font-medium text-charcoal border border-khaki-light hover:bg-sage hover:text-white hover:border-sage transition-all duration-300"
                  >
                    {credential}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}