import { useRouter } from 'next/Router';
import Layout from '../componets/Layout';
import { AuthProvider, ProtectedRoute } from '../authContext';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();

  return (
    <AuthProvider>
      {pathname !== '/login' ? (
        <ProtectedRoute>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ProtectedRoute>
      ) : (
        <Component {...pageProps} />
      )}
    </AuthProvider>
  );
}
