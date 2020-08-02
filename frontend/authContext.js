import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import api from './api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromCookies() {
      const jwt = Cookies.get('jwt');
      if (jwt) {
        const {
          data: { user }
        } = await api.get('profile');
        if (user) {
          setUser(user);
        }
      }
      setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  const logout = () => {
    Cookies.remove('jwt');
    setUser(null);
    window.location.pathname = '/login';
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function ProtectedRoute(Component) {
  return () => {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated && !loading) {
        router.push('/login');
      }
    }, [loading, isAuthenticated]);

    return <Component {...arguments} />;
  };
}

export default function useAuth() {
  return useContext(AuthContext);
}
