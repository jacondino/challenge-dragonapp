import { useEffect, useState } from 'react';
import { DragonsService } from '../../../src/service';
import { NextPageContext } from 'next';
import { DateUtils } from '../../../src/utils';
import Link from 'next/link';

import styles from './style.module.css';

import { Container } from 'react-bootstrap';
import { DragonProp } from '../../../src/types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

interface DetailProps {
  id: number;
}

export default function Detail({ id }: DetailProps) {
  const [dragon, setDragon] = useState<DragonProp>(null);
  const [error, setError] = useState(false);
  const { data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      getDragonById();
    } else {
      router.push('/login');
    }
  }, []);

  const getDragonById = async () => {
    try {
      const response = await DragonsService.detailDragon(id);

      setDragon(response);
    } catch {
      setError(true);
    }
  };

  return dragon ? (
    <Container>
      <h2>{dragon.name}</h2>
      <div className={styles.infos}>
        <span>Data de criação: {DateUtils.formatDate(dragon.createdAt)}</span>
        <span>Tipo: {dragon.type}</span>
        {typeof dragon?.histories === 'string' && (
          <>
            <span>Hisória:</span>
            <p>{dragon.histories}</p>
          </>
        )}
        <Link href={`/`}>
          <a className="btn btn-secondary btn-sm">Voltar</a>
        </Link>
      </div>
    </Container>
  ) : (
    <></>
  );
}

Detail.getInitialProps = async ({ query }: NextPageContext) => {
  return {
    id: query.id,
  };
};
