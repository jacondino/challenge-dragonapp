import { signIn } from 'next-auth/react';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import { FormLogin } from '../../src/components';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleLogin = async (email: string, password: string) => {
    const response = await signIn('credentials', {
      username: email,
      password,
      redirect: false,
    });

    if (!response.ok) {
      setError('Usuário ou senha inválidos');
      return;
    }

    const redirect = router.query?.redirect || '/';
    router.push(redirect as string);
  };

  return <FormLogin onLogin={handleLogin} errorMessage={error} />;
}
