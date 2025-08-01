// src/App.tsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load pages
const HomePage = lazy(() => 
  import(/* webpackChunkName: "home" */ './pages/HomePage')
);
const TherapistPage = lazy(() => 
  import(/* webpackChunkName: "therapist" */ './pages/TherapistPage')
);
const TherapistListPage = lazy(() => 
  import(/* webpackChunkName: "therapist-list" */ './pages/TherapistListPage')
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false, // Wyłączamy odświeżanie przy fokusie
      refetchOnReconnect: false, // Wyłączamy odświeżanie przy reconnect
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/terapeuta/:slug" element={<TherapistPage />} />
            <Route path="/terapeuci" element={<TherapistListPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;