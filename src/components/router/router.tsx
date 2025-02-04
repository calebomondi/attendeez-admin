// src/components/Header.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../home/home';
import Authenticate from '../auth/authenticate';
import MyAccount from '../myaccount/myaccount';
import { AuthProvider } from '../auth/authProvider';
import { ProtectedRoute } from '../auth/protectedRoute';
import { useAuth } from '../auth/useAuth';


const AuthenticatedApp: React.FC = () => {
  const { user } = useAuth();
  const email: string = user?.email || 'macharianancy@jkuat.ac.ke';
  console.log(`user-email-> ${email}`)

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/attendance" 
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <MyAccount />
          </ProtectedRoute>
        } 
      />
      <Route path="/auth" element={<Authenticate />} />
    </Routes>
  );
};

// Main Header component
export default function MyRouter() {
  return (
    <Router>
      <AuthProvider>
        <>
          <AuthenticatedApp />
        </>
      </AuthProvider>
    </Router>
  );
}