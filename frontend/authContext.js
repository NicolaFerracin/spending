import { createContext, useState, useContext, useEffect } from 'react';
import { withRouter } from 'next/router';
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

class UnwrappedProtectedRoute extends React.Component {
  render() {
    return (
      <AuthContext.Consumer>
        {({ isAuthenticated, loading }) => {
          if (!isAuthenticated && !loading) {
            this.props.router.push('/login');
          }
          return this.props.children;
        }}
      </AuthContext.Consumer>
    );
  }
}
export const ProtectedRoute = withRouter(UnwrappedProtectedRoute);

export default function useAuth() {
  return useContext(AuthContext);
}
