import { useRouter } from 'next/router';

export default function LoginCallback() {
  const router = useRouter();
  const { jwt } = router.query;
  if (!jwt) {
    return null;
  }
  window.localStorage.setItem('jwt', jwt);
  router.push('/');

  return null;
}
