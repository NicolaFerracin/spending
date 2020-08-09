import { createContext, useState, useContext, useEffect } from 'react';
import { withRouter } from 'next/router';
import api from './api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromCookies() {
      const jwt = window.localStorage.getItem('jwt');
      if (jwt) {
        const {
          data: { user }
        } = await api.get('profile', { headers: { cookie: jwt } });
        if (user) {
          setUser(user);
        }
      }
      setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  const logout = () => {
    window.location.pathname = '/login';
    window.localStorage.clear('jwt');
    setUser(null);
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
        {({ isAuthenticated, loading, user }) => {
          if (!isAuthenticated && !loading) {
            this.props.router.push('/login');
            return null;
          }

          return loading ? null : this.props.children;
        }}
      </AuthContext.Consumer>
    );
  }
}
export const ProtectedRoute = withRouter(UnwrappedProtectedRoute);

export default function useAuth() {
  return useContext(AuthContext);
}
