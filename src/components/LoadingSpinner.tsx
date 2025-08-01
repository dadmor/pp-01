// src/components/LoadingSpinner.tsx
export default function LoadingSpinner() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-sage border-t-transparent"></div>
          <p className="mt-4 text-warm-gray font-light">Ładowanie...</p>
        </div>
      </div>
    );
  }