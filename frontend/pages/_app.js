import { useRouter } from 'next/router';
import Layout from '../componets/Layout';
import { AuthProvider, ProtectedRoute } from '../authContext';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();

  return !pathname.startsWith('/login') ? (
    <AuthProvider>
      <ProtectedRoute>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ProtectedRoute>
    </AuthProvider>
  ) : (
    <Component {...pageProps} />
  );
}
