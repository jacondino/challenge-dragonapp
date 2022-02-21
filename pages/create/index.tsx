import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import { FormCreate } from '../../src/components';
import { DragonsService } from '../../src/service';
import { DragonProp } from '../../src/types';

export default function CreatePage() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const { data } = useSession();

  useEffect(() => {
    if (!data) {
      router.push('/login');
    }
  }, []);

  const onSetDragon = async (dragon: DragonProp) => {
    try {
      await DragonsService.createDragon(dragon);
    } catch {
      setError(true);
    } finally {
      router.push('/');
    }
  };

  return (
    <>
      <FormCreate onCreate={(e) => onSetDragon(e)} />
      {error && <Alert variant="danger">Erro ao enviar a solicitação!</Alert>}
    </>
  );
}
