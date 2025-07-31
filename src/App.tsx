import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './pages/HomePage';
import TherapistPage from './pages/TherapistPage';
import TherapistListPage from './pages/TherapistListPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60, // 1 hour
      gcTime: 1000 * 60 * 60 * 24, // 24 hours 
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/terapeuci" element={<TherapistListPage />} />
          <Route path="/terapeuta/:slug" element={<TherapistPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;