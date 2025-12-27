
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem('clinicalUser');
    if (!user) {
      navigate('/', { replace: true, state: { from: location } });
    }
  }, [navigate, location]);

  const user = localStorage.getItem('clinicalUser');
  return user ? <>{children}</> : <Navigate to="/" replace state={{ from: location }} />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;